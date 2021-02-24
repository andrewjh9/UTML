import {Edge, LineType} from "../../../assets/serialisation/edge";
import {Position} from "../../../assets/serialisation/position";

export class ArcMiddleRepositioner {
  private edge?: Edge;

  public activate(edge: Edge): void {
    if (edge.lineType !== LineType.Arc) {
      throw new Error('Any edges passed to the ArcMiddleRepositioner should be of LineType Arc.');
    }

    if (edge.middlePositions.length !== 1) {
      throw new Error('The edge should have exactly 1 middle point.');
    }

    this.edge = edge;
  }

  public update(position: Position) {
    if (!this.isActive()) {
      throw new Error('Updating an inactive repositioner.');
    }

    this.edge!.middlePositions[0] = position;
  }

  public deactivate() {
    if (!this.isActive()) {
      throw new Error('Deactivating an inactive repositioner.');
    }

    this.edge = undefined;
  }


  public isActive(): boolean {
    return this.edge !== undefined;
  }
}
