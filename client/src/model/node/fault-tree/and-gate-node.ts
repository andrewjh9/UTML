import {Node} from '../node';
import {Position} from '../../position';

export class AndGateNode extends Node {
  constructor(width: number, height: number, position: Position) {
    super(width, height, position);
  }

  protected getAllOffsets(): Position[] {
    return [
      new Position(this.width / 2, 0),
      new Position(this.width / 2, this.height)
    ];
  }

  getDeepCopy(): Node {
    return new AndGateNode(this.width, this.height, this.position.getDeepCopy());
  }

  getNodeTypeName(): string {
    return "AND Gate";
  }
}
