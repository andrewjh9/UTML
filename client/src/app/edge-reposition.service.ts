import { Injectable } from '@angular/core';
import {Position} from "../assets/serialisation/position";
import {AttachmentDirection, Node} from "../assets/serialisation/node";
import {Edge, EdgeFormatter} from "../assets/serialisation/edge";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EdgeRepositionService {
  private position?: Position;
  private edge?: Edge;
  private nodes?: Node[];
  private readonly DISTANCE_THRESHOLD: number = 50;
  private mode: Mode = Mode.Inactive;

  constructor() { }

  public isActive(): boolean {
    return this.mode !== Mode.Inactive;
  }

  public activate(mousePosition: Position, edge: Edge): void {
    this.edge = edge;
    // Check existing middle positions
    for (let pointOnLine of edge.formatter!.middlePositions) {
      if (Position.getDistance(pointOnLine, mousePosition) <= this.DISTANCE_THRESHOLD) {
        this.position = pointOnLine;
        this.mode = Mode.MiddlePosition;
        return;
      }
    }

    // Check start and end position
    if (Position.getDistance(mousePosition, edge.formatter!.getStartPosition()) <= this.DISTANCE_THRESHOLD) {
      this.mode = Mode.StartPosition;
      return;
    } else if (Position.getDistance(mousePosition, edge.formatter!.getEndPosition()) <= this.DISTANCE_THRESHOLD) {
      this.mode = Mode.EndPosition;
      return;
    }

    let allPoints = this.edge!.formatter!.getAllPoints();
    console.log(allPoints);
    let indexToBeInserted: number | undefined;
    for (let i = 0; i < allPoints.length - 1; i++) {
      if (EdgeRepositionService.liesOnSegment(mousePosition, allPoints[i], allPoints[i + 1])) {
        indexToBeInserted = i;
        break;
      }
    }

    if (indexToBeInserted !== undefined) {
      this.edge!.formatter!.middlePositions.splice(indexToBeInserted, 0, mousePosition);
      this.position = mousePosition;
      this.mode = Mode.MiddlePosition;
    }
  }

  private static liesOnSegment(point: Position, start: Position, end: Position): boolean {
    let actualSegment: Position = Position.subtract(end, start);
    let ourSegment: Position = Position.subtract(point, start);
    let angle: number = Math.atan2(-actualSegment.y, actualSegment.x);
    let rotationMatrix: number[][] = [[Math.cos(angle), Math.sin(angle)],[-Math.sin(angle), Math.cos(angle)]];
    let baseVector: number[] = this.matrixVectorMult(rotationMatrix, [actualSegment.x, actualSegment.y]);
    let transformedPoint: number[] = this.matrixVectorMult(rotationMatrix, [ourSegment.x, ourSegment.y]);
    console.log([actualSegment.x, actualSegment.y]);
    console.log(baseVector);
    console.log([ourSegment.x, ourSegment.y]);
    console.log(transformedPoint);
    console.log(Math.abs(transformedPoint[1]) < 10 && transformedPoint[0] >= 0 && transformedPoint[0] <= baseVector[0])
    return transformedPoint[1] < Math.abs(30) && transformedPoint[0] >= 0 && transformedPoint[0] <= baseVector[0]
  }


//   private static matrixInverse(matrix: number[][]): number[][] {
//     let c = 1 / (matrix[0][0] * matrix[1][1] - matrix[1][0] * matrix[0][1]);
//     let inverse: number[][] = [
//       [c*matrix[1][1], -c*matrix[1][0]],
//       [-c*matrix[0][1], c*matrix[0][0]]
//     ];
//     return inverse
// }

  private static matrixVectorMult(matrix: number[][], vector: number[]): number[] {
    return [matrix[0][0] * vector[0] + matrix[1][0] * vector[1], matrix[0][1] * vector[0] + matrix[1][1] * vector[1]]
  }

  // private static matrixConstantMult(matrix: number[][], constant: number): number[][] {
  //   for (let i=0; i<matrix.length; i++) {
  //     for (let j=0; j<matrix[0].length; j++){
  //       matrix[i][j] = constant * matrix[i][j];
  //     }
  //   }
  //   return matrix
  // }

  public update(newPosition: Position): void {
    if (this.isActive()) {
      switch (this.mode) {
        case Mode.Inactive:
          break;
        case Mode.EndPosition:
          for (let node of this.nodes!) {
            for (let direction: number = 0; direction < 8; direction++) {
              let attachmentPosition = node.formatter!.getAttachmentPointPosition(direction as AttachmentDirection);
              if (Position.getDistance(attachmentPosition, newPosition) <= this.DISTANCE_THRESHOLD / 2) {
                this.edge!.endNode = node;
                this.edge!.formatter!.endPosition = direction as AttachmentDirection;
                this.edge!.formatter!.endNode = node;
                return;
              }
            }
          }
          this.edge!.formatter!.endPosition = newPosition;
          break;
        case Mode.MiddlePosition:
          this.position!.x = newPosition.x;
          this.position!.y = newPosition.y;
          break;
        case Mode.StartPosition:
          for (let node of this.nodes!) {
            for (let direction: number = 0; direction < 8; direction++) {
              let attachmentPosition = node.formatter!.getAttachmentPointPosition(direction as AttachmentDirection);
              if (Position.getDistance(attachmentPosition, newPosition) <= this.DISTANCE_THRESHOLD / 2) {
                this.edge!.startNode = node;
                this.edge!.formatter!.startPosition = direction as AttachmentDirection;
                this.edge!.formatter!.startNode = node;
                return;
              }
            }
          }
          this.edge!.formatter!.startPosition = newPosition;
          break;
      }
    }
  }

  public deactivate(): void {
    if (this.mode == Mode.MiddlePosition && this.position) {
      let foundIndex: number = -1;
      let allPoints = this.edge!.formatter!.getAllPoints();
      for (let i = 0; i < allPoints.length; i++) {
        if (allPoints[i] == this.position) {
          foundIndex = i;
        }
      }

      if (foundIndex !== -1) {
        if (EdgeRepositionService.liesOnSegment(this.position, allPoints[foundIndex - 1], allPoints[foundIndex + 1])) {
          // Remove the found index from the middle position array of the edge.
          // Since the allPoints contains the start and the middlePositions does not we subtract 1.
          this.edge!.formatter!.middlePositions.splice(foundIndex - 1, 1);
        }
      }
    }
    this.position = undefined;
    this.edge = undefined;
    this.mode = Mode.Inactive;
  }

  public setNodes(nodes: Node[]) {
    this.nodes = nodes;
  }
}

enum Mode {
  Inactive,
  MiddlePosition,
  StartPosition,
  EndPosition
}
