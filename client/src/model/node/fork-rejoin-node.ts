import {RectangleNode} from "./rectangle-node";
import {Position} from "../position";

export class ForkRejoinNode extends RectangleNode {
  constructor(width: number, height: number, position: Position) {
    super(width, height, position);
    this.styleObject['fill'] = 'black';
    this.styleObject['fill-opacity'] = '1';
  }

  public getAllOffsets(): Position[] {
    let bigDimension = Math.max(this.width, this.height);
    const POINT_AMOUNT = 5;

    let result: Position[] = [];
    for (let offset = 0; offset <= bigDimension; offset += (bigDimension / (POINT_AMOUNT - 1))) {
      if (this.width > this.height) {
        result.push(new Position(offset, 0), new Position(offset, this.height));
      } else {
        result.push(new Position(0, offset), new Position(this.width, offset));
      }
    }

    return result;
  }

  public getNodeTypeName(): string {
    return 'ForkRejoinNode';
  }

  public getDeepCopy(): ForkRejoinNode {
    return new ForkRejoinNode(this.width, this.height, this.position.getDeepCopy());
  }
}
