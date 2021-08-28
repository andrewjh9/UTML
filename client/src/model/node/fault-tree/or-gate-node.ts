import {Node} from '../node';
import {Position} from '../../position';

export class OrGateNode extends Node {
  public static readonly LOWER_HAT_PERCENTAGE = 0.2;

  constructor(width: number, height: number, position: Position) {
    super(width, height, position);
  }

  protected getAllOffsets(): Position[] {
    return [
      this.lowerOffsetPoint,
      new Position(this.width / 2, 0)
    ];
  }

  getDeepCopy(): Node {
    return new OrGateNode(this.width, this.height, this.position.getDeepCopy());
  }

  getNodeTypeName(): string {
    return "OR Gate";
  }

  public get lowerOffsetPoint() {
    let hatHeight = this.height * OrGateNode.LOWER_HAT_PERCENTAGE;
    return new Position(this.width / 2, this.height - hatHeight)
  }
}
