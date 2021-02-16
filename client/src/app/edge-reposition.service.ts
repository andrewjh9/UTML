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
  private readonly DISTANCE_THRESHOLD: number = 25;
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
    console.log(allPoints)
    let indexToBeInserted: number | undefined;
    for (let i = 0; i < allPoints.length - 1; i++) {
      if (this.liesOnSegment(mousePosition, allPoints[i], allPoints[i + 1])) {
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

  private liesOnSegment(point: Position, start: Position, end: Position, allowed_error: number = 50): boolean {
    let actualSegment = Position.subtract(end, start);
    let actualAngle = Math.atan2(actualSegment.y, actualSegment.x);
    let ourSegment = Position.subtract(point, start);
    let ourAngle = Math.atan2(ourSegment.y, ourSegment.x);

    return Math.abs(actualAngle - ourAngle) <= 0.5 &&
      EdgeRepositionService.between(start.x, point.x, end.x) &&
      EdgeRepositionService.between(start.y, point.y, end.y);
  }

  private static between(start: number, between: number, end: number): boolean {
    return (start <= between && between <= end) || (end <= between && between <= start)
  }

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
              if (Position.getDistance(attachmentPosition, newPosition) <= this.DISTANCE_THRESHOLD) {
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
