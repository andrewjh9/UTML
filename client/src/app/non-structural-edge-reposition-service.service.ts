import { Injectable } from '@angular/core';
import {Position} from "../assets/serialisation/position";
import {EdgeFormatter, LineType} from "../assets/serialisation/edge";

@Injectable({
  providedIn: 'root'
})
// Todo: refactor
export class NonStructuralEdgeRepositionServiceService {
  private position?: Position;
  private formatter?: EdgeFormatter;
  private readonly DISTANCE_THRESHOLD: number = 50;
  private mode: Mode = Mode.Inactive;

  constructor() { }

  public isActive(): boolean {
    return this.mode !== Mode.Inactive;
  }

  public activate(mousePosition: Position, formatter: EdgeFormatter): void {
    this.formatter = formatter;

    // Check if the point to be moved is one of the middle positions.
    for (let pointOnLine of formatter!.middlePositions) {
      if (Position.getDistance(pointOnLine, mousePosition) <= this.DISTANCE_THRESHOLD) {
        this.position = pointOnLine;
        this.mode = Mode.MiddlePosition;
        console.log(`middle pos: ${this.position.toString()}`)
        return;
      }
    }

    // Check if the point to be moved is either the start or end position.
    if (Position.getDistance(mousePosition, formatter!.getStartPosition()) <= this.DISTANCE_THRESHOLD) {
      this.position = formatter.startPosition as Position;
      this.mode = Mode.MiddlePosition;
      console.log(`middle pos: ${this.position.toString()}`)

      return;
    } else if (Position.getDistance(mousePosition, formatter!.getEndPosition()) <= this.DISTANCE_THRESHOLD) {
      this.position = formatter.endPosition as Position;
      this.mode = Mode.MiddlePosition;
      return;
    }

    // Add a new point to the line. This only happens if we are not dealing with an Arc.
    if (this.formatter?.lineType !== LineType.Arc) {
      let allPoints = this.formatter!.getAllPoints();
      let indexToBeInserted: number | undefined;
      for (let i = 0; i < allPoints.length - 1; i++) {
        if (NonStructuralEdgeRepositionServiceService.liesOnSegment(mousePosition, allPoints[i], allPoints[i + 1])) {
          indexToBeInserted = i;
          break;
        }
      }

      if (indexToBeInserted !== undefined) {
        this.formatter!.middlePositions.splice(indexToBeInserted, 0, mousePosition);
        this.position = mousePosition;
        this.mode = Mode.MiddlePosition;
      }
    } else if (this.formatter?.lineType === LineType.Arc) {
      this.formatter!.middlePositions[0].x = mousePosition.x;
      this.formatter!.middlePositions[0].y = mousePosition.y;
      this.position = this.formatter!.middlePositions[0];
      this.mode = Mode.MiddlePosition;
    }
  }

  public update(newPosition: Position): void {
    if (this.isActive()) {
      switch (this.mode) {
        case Mode.Inactive:
          break;
        case Mode.MiddlePosition:
          this.position!.x = newPosition.x;
          this.position!.y = newPosition.y;
          break;
      }
    }
  }

  public deactivate(): void {
    // This if statement checks if the new position of the middle position lies on the line segment
    // of the point before and after it. If it does we delete it.
    if (this.mode == Mode.MiddlePosition && this.position) {
      let allPoints = this.formatter!.getAllPoints();
      let foundIndex: number = allPoints.indexOf(this.position);

      if (0 < foundIndex && foundIndex < allPoints.length - 1) {
        if (NonStructuralEdgeRepositionServiceService.
        liesOnSegment(this.position, allPoints[foundIndex - 1], allPoints[foundIndex + 1])) {
          // Remove the found index from the middle position array of the edge.
          // Since the allPoints contains the start and the middlePositions does not we subtract 1.
          this.formatter!.middlePositions.splice(foundIndex - 1, 1);
        }
      }
    }
    this.position = undefined;
    this.formatter = undefined;
    this.mode = Mode.Inactive;
  }

  private static liesOnSegment(point: Position, start: Position, end: Position): boolean {
    let actualSegment = Position.subtract(end, start);
    let actualAngle = Math.atan2(actualSegment.y, actualSegment.x);
    let ourSegment = Position.subtract(point, start);
    let ourAngle = Math.atan2(ourSegment.y, ourSegment.x);

    return Math.abs(actualAngle - ourAngle) <= 0.25 &&
      NonStructuralEdgeRepositionServiceService.between(start.x, point.x, end.x) &&
      NonStructuralEdgeRepositionServiceService.between(start.y, point.y, end.y);
  }

  private static between(start: number, between: number, end: number): boolean {
    return (start <= between && between <= end) || (end <= between && between <= start)
  }
}

enum Mode {
  Inactive,
  MiddlePosition,
}
