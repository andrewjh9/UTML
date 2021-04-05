import {RectangleNode} from "./rectangle-node";
import {Position} from "../position";

export class SystemBoundaryNode extends RectangleNode {
  constructor(width: number, height: number, position: Position) {
    super(width, height, position);
    this._transparent = true;
  }

  public getNodeTypeName(): string {
    return 'SystemBoundaryNode';
  }

  public getDeepCopy() {
    let result = new SystemBoundaryNode(this.width, this.height, this.position.getDeepCopy());
    result.text = this.text;
    return result;
  }
}
