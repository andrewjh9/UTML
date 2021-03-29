import {Node} from './node'
import {Position} from "../position";

export class RectangleNode extends Node {
  public constructor(width: number, height: number, position: Position) {
    super(width, height, position);
  }

  protected getAllOffsets(): Position[] {
    return [
      new Position(this.width / 2, 0),
      new Position(this.width, 0),
      new Position(this.width, this.height / 2),
      new Position(this.width, this.height),
      new Position(this.width / 2, this.height),
      new Position(0, this.height),
      new Position(0, this.height / 2),
      new Position(0, 0),
    ];
  }

  getDeepCopy(): Node {
    let result =  new RectangleNode(this.width, this.height, this.position.getDeepCopy());
    result.text = this.text;
    result.hasDoubleBorder = this.hasDoubleBorder;
    return result;
  }

  public getNodeTypeName(): string {
    return 'RectangleNode';
  }
}
