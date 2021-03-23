import {Injectable} from '@angular/core';
import {Position} from "../../../model/position";
import {Node} from "../../../model/node/node";
import {Edge, LineType} from "../../../model/edge";
import {Deactivatable} from "../deactivatable";
import {StartEndRepositioner} from "./start-end-repositioner";
import {ArcMiddleRepositioner} from "./arc-middle-repositioner";
import {FixedPointRepositioner} from "./fixed-point-repositioner";
import {CachingService} from "../caching/caching.service";
import {SnapService} from "../snap.service";
import {DiagramContainerService} from "../diagram-container.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Service responsible for repositioning an edge. This happens in four distinct ways.
 * 1) Moving of start/end position and possibly snapping to attachment point of node.
 * 2) Adding a middle point to an Line edge.
 * 3) Moving an existing middle point of a line edge.
 * 4) Moving the middle point of an Arc.
 */
export class EdgeRepositionService implements Deactivatable {
  /** Distance within which a start/end/middle point will be selected to be moved */
  public readonly SELECT_DISTANCE = 25;
  public readonly arcMiddleRepositioner = new ArcMiddleRepositioner();

  constructor(private cachingService: CachingService,
              private snapService: SnapService,
              public fixedPointRepositioner: FixedPointRepositioner,
              public startEndRepositioner: StartEndRepositioner,
              diagramContainerService: DiagramContainerService) {
    diagramContainerService.diagramObservable.subscribe(diagram => this.setNodes(diagram.nodes));
  }

  /**
   * Activate the edge repositioner.
   * This function determines wwhich of the 4 move methods will be used.
   * @param edge Edge to be repositioned.
   * @param mousePosition Position of the mouse when the service was activated.
   */
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

  /**
   * Updates the position of the correct part of the edge with which the repositioner was activated.
   * @param position The position to which the edge position needs to be updated.
   * @throws Throws an error if the repositioner is not active.
   */
  public update(position: Position) {
    if (this.fixedPointRepositioner.isActive()) {
      this.fixedPointRepositioner.update(this.snapService.snapIfApplicable(position,5));
    } else if (this.arcMiddleRepositioner.isActive()) {
      this.arcMiddleRepositioner.update(this.snapService.snapIfApplicable(position, 5));
    } else if (this.startEndRepositioner.isActive()) {
      this.startEndRepositioner.update(this.snapService.snapIfApplicable(position,5));
    } else {
      throw new Error('Updating whilst no repositioner is active.');
    }
  }

  public deactivate() {
    if (this.fixedPointRepositioner.isActive()) {
      this.fixedPointRepositioner.deactivate();
      this.cachingService.save();
    } else if (this.arcMiddleRepositioner.isActive()) {
      this.arcMiddleRepositioner.deactivate();
      this.cachingService.save();
    } else if (this.startEndRepositioner.isActive()) {
      this.startEndRepositioner.deactivate();
      this.cachingService.save();
    }
  }

  /**
   * Set the nodes in the current diagram.
   * @param nodes Reference to the list of nodes. Note that if the reference used by the diagram is updated,
   *              this one must be updated too.
   */
  private setNodes(nodes: Node[]): void {
    this.startEndRepositioner.setNodes(nodes);
  }

  /**
   * Determines whether a given point lies on a given line segment within some margin of error.
   * The margin of error is there because the user can not perfectly click on the line.
   * @param point Point for which it will be checked whether it lies on the segment.
   * @param start Start of the line segment.
   * @param end End of the line segment.
   * @returns True if the point approximately lies on the line segment, false otherwise.
   */
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
