import {Injectable} from '@angular/core';
import {Position} from "../../../assets/serialisation/position";
import {Node} from "../../../assets/serialisation/node/node";
import {Edge, LineType} from "../../../assets/serialisation/edge";
import {Deactivatable} from "../deactivatable";
import {StartEndRepositioner} from "./start-end-repositioner";
import {ArcMiddleRepositioner} from "./arc-middle-repositioner";
import {FixedPointRepositioner} from "./fixed-point-repositioner";

@Injectable({
  providedIn: 'root'
})
export class EdgeRepositionService implements Deactivatable {
  public readonly SNAP_DISTANCE = 10;
  public readonly SELECT_DISTANCE = 25;
  public readonly arcMiddleRepositioner = new ArcMiddleRepositioner();
  public readonly fixedPointRepositioner = new FixedPointRepositioner();
  public readonly startEndRepositioner = new StartEndRepositioner(this.SNAP_DISTANCE);

  public activate(edge: Edge, mousePosition: Position): void {
    if (Position.getDistance(edge.getStartPosition(), mousePosition) <= this.SELECT_DISTANCE) {
      this.startEndRepositioner.activate(edge, true);
      return;
    } else if (Position.getDistance(edge.getEndPosition(), mousePosition) <= this.SELECT_DISTANCE) {
      this.startEndRepositioner.activate(edge, false);
      return;
    }

    if (edge.lineType === LineType.Arc) {
      this.arcMiddleRepositioner.activate(edge);
      return;
    }

    for (let middle of edge.middlePositions) {
      if (Position.getDistance(middle, mousePosition) <= this.SELECT_DISTANCE) {
        this.fixedPointRepositioner.activate(edge, middle);
        return;
      }
    }

    if (edge.lineType === LineType.Line) {
      let allPoints = edge.getAllPoints();
      let indexToBeInserted: number | undefined;
      for (let i = 0; i < allPoints.length - 1; i++) {
        if (EdgeRepositionService.liesOnSegment(mousePosition, allPoints[i], allPoints[i + 1])) {
          indexToBeInserted = i;
          break;
        }
      }

      if (indexToBeInserted !== undefined) {
        edge.middlePositions.splice(indexToBeInserted, 0, mousePosition);
        this.fixedPointRepositioner.activate(edge, mousePosition);
        return;
      }
    }

    throw new Error('Trying to reposition an edge that is not a start, end or middle but also does not ' +
      'lie on a segment. This should be impossible');
  }

  public update(position: Position) {
    if (this.fixedPointRepositioner.isActive()) {
      this.fixedPointRepositioner.update(position);
    } else if (this.arcMiddleRepositioner.isActive()) {
      this.arcMiddleRepositioner.update(position);
    } else if (this.startEndRepositioner.isActive()) {
      this.startEndRepositioner.update(position);
    } else {
      throw new Error('Updating whilst no repositioner is active.');
    }
  }

  public deactivate() {
    if (this.fixedPointRepositioner.isActive()) {
      this.fixedPointRepositioner.deactivate();
    } else if (this.arcMiddleRepositioner.isActive()) {
      this.arcMiddleRepositioner.deactivate();
    } else if (this.startEndRepositioner.isActive()) {
      this.startEndRepositioner.deactivate();
    }
  }

  public setNodes(nodes: Node[]): void {
    this.startEndRepositioner.setNodes(nodes);
  }

  public static liesOnSegment(point: Position, start: Position, end: Position): boolean {
    let actualSegment: Position = Position.subtract(end, start);
    let ourSegment: Position = Position.subtract(point, start);
    let angle: number = Math.atan2(-actualSegment.y, actualSegment.x);
    let rotationMatrix: number[][] = [[Math.cos(angle), Math.sin(angle)],[-Math.sin(angle), Math.cos(angle)]];
    let baseVector: number[] = this.matrixVectorMult(rotationMatrix, [actualSegment.x, actualSegment.y]);
    let transformedPoint: number[] = this.matrixVectorMult(rotationMatrix, [ourSegment.x, ourSegment.y]);
    return (Math.abs(transformedPoint[1]) < 10 && (transformedPoint[0] >= 0) && (transformedPoint[0] <= baseVector[0]));

  }

  private static matrixVectorMult(matrix: number[][], vector: number[]): number[] {
    return [matrix[0][0] * vector[0] + matrix[1][0] * vector[1], matrix[0][1] * vector[0] + matrix[1][1] * vector[1]]
  }

  public isActive(): boolean {
    return this.startEndRepositioner.isActive() || this.arcMiddleRepositioner.isActive()
      || this.fixedPointRepositioner.isActive();
  }
}

// export class EdgeRepositionService implements Deactivatable {
//   private position?: Position;
//   private edge?: Edge;
//   private nodes?: Node[];
//   private readonly DISTANCE_THRESHOLD: number = 25;
//   private mode: RepositionMode = RepositionMode.Inactive;
//
//   constructor() { }
//
//   public isActive(): boolean {
//     return this.mode !== RepositionMode.Inactive;
//   }
//
//   public activate(mousePosition: Position, edge: Edge): void {
//     this.edge = edge;
//
//     // Check if the point to be moved is one of the middle positions.
//     for (let pointOnLine of edge.middlePositions) {
//       if (Position.getDistance(pointOnLine, mousePosition) <= this.DISTANCE_THRESHOLD) {
//         this.position = pointOnLine;
//         this.mode = RepositionMode.FixedPosition;
//         return;
//       }
//     }
//
//     // Check if the point to be moved is either the start or end position.
//     if (Position.getDistance(mousePosition, edge.getStartPosition()) <= this.DISTANCE_THRESHOLD) {
//       this.mode = RepositionMode.StartPosition;
//       return;
//     }
//
//     if (Position.getDistance(mousePosition, edge.getEndPosition()) <= this.DISTANCE_THRESHOLD) {
//       this.mode = RepositionMode.EndPosition;
//       return;
//     }
//
//     // Add a new point to the line. This only happens if we are not dealing with an Arc.
//     if (this.edge.lineType === LineType.Line) {
//       let allPoints = this.edge.getAllPoints();
//       let indexToBeInserted: number | undefined;
//       for (let i = 0; i < allPoints.length - 1; i++) {
//         if (EdgeRepositionService.liesOnSegment(mousePosition, allPoints[i], allPoints[i + 1])) {
//           indexToBeInserted = i;
//           break;
//         }
//       }
//
//       if (indexToBeInserted !== undefined) {
//         this.edge!.middlePositions.splice(indexToBeInserted, 0, mousePosition);
//         this.position = mousePosition;
//         this.mode = RepositionMode.FixedPosition;
//       }
//
//       return;
//     }
//
//     if (edge?.lineType === LineType.Arc) {
//       this.edge.middlePositions[0].x = mousePosition.x;
//       this.edge.middlePositions[0].y = mousePosition.y;
//       this.position = edge.middlePositions[0];
//       this.mode = RepositionMode.FixedPosition;
//       return;
//     }
//
//     throw new Error("Trying to reposition an edge that is not a start, end or middle but also does not " +
//       "lie on a segment. This should be impossible");
//   }
//

//
//   public update(newPosition: Position): void {
//     if (!this.isActive()) {
//       throw new Error("You are updating the reposition service even though it is not active!");
//     }
//
//     switch (this.mode) {
//       case RepositionMode.EndPosition:
//         for (let node of this.nodes!) {
//           let attachmentPoint = StartEndRepositioner.getAttachmentPoint(node, newPosition, this.DISTANCE_THRESHOLD);
//
//           if (attachmentPoint !== -1) {
//             this.edge!.endNode = node;
//             this.edge!.endPosition = attachmentPoint;
//             return;
//           }
//         }
//
//         this.edge!.endPosition = newPosition;
//         return;
//       case RepositionMode.FixedPosition:
//         this.position!.x = newPosition.x;
//         this.position!.y = newPosition.y;
//         return;
//       case RepositionMode.StartPosition:
//         for (let node of this.nodes!) {
//           let attachmentPoint = StartEndRepositioner.getAttachmentPoint(node, newPosition, this.DISTANCE_THRESHOLD);
//
//           if (attachmentPoint !== -1) {
//             this.edge!.startNode = node;
//             this.edge!.startPosition = attachmentPoint;
//             return;
//           }
//         }
//
//         this.edge!.startPosition = newPosition;
//         return;
//     }
//   }
//
//   public deactivate(): void {
//     // This if statement checks if the new position of the middle position lies on the line segment
//     // of the point before and after it. If it does we delete it.
//     if (this.mode == RepositionMode.FixedPosition && this.position) {
//       let allPoints = this.edge!.getAllPoints();
//       let foundIndex: number = allPoints.indexOf(this.position);
//       if (0 < foundIndex && foundIndex < allPoints.length - 1) {
//         if (EdgeRepositionService.liesOnSegment(this.position, allPoints[foundIndex - 1], allPoints[foundIndex + 1])) {
//           // Remove the found index from the middle position array of the edge.
//           // Since the allPoints contains the start and the middlePositions does not we subtract 1.
//           this.edge!.middlePositions.splice(foundIndex - 1, 1);
//         }
//       }
//     }
//
//     this.position = undefined;
//     this.edge = undefined;
//     this.mode = RepositionMode.Inactive;
//   }
//
//
//
//   public getRepositionMode(): RepositionMode {
//     return this.mode;
//   }
//
//   public setNodes(nodes: Node[]) {
//     this.nodes = nodes;
//   }
// }
//
// export enum RepositionMode {
//   Inactive,
//   FixedPosition,
//   StartPosition,
//   EndPosition
// }
//
//
