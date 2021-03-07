import {Position} from "../../../model/position";
import {Edge} from "../../../model/edge";
import {EdgeRepositionService} from "./edge-reposition.service";

export class FixedPointRepositioner {
  private position?: Position;
  private edge?: Edge;

  public isActive(): boolean {
    return this.position !== undefined && this.edge !== undefined;
  }

  public activate(edge: Edge, position: Position): void {
    this.edge = edge;
    this.position = position;
  }

  public update(newPosition: Position) {
    if (!this.isActive()) {
      throw new Error("Updating an unactivated repositioner.");
    }

    this.position!.x = newPosition.x;
    this.position!.y = newPosition.y;
  }

  public deactivate(): void {
    if (!this.isActive()) {
      throw new Error("Deactivated an inactive repositioner.");
    }

    // Snap to line segment if the fixed point now lies approximately
    // on the line segment of its predecessor and successor.
    let allPoints = this.edge!.getAllPoints();
    let foundIndex: number = allPoints.indexOf(this.position!);
    if (0 < foundIndex && foundIndex < allPoints.length - 1) {
      if (EdgeRepositionService.liesOnSegment(this.position!, allPoints[foundIndex - 1], allPoints[foundIndex + 1])) {
        // Remove the found index from the middle position array of the edge.
        // Since the allPoints contains the start and the middlePositions does not we subtract 1.
        this.edge!.middlePositions.splice(foundIndex - 1, 1);
      }
    }

    this.edge = undefined;
    this.position = undefined;
  }
}
