import {RectangleNode} from "./rectangle-node";
import {Position} from "../position";

export class SwimlaneNode extends RectangleNode {
  constructor(width: number, height: number, position: Position) {
    super(width, height, position);
    this._transparent = false;
  }

  getNodeTypeName(): string {
    return 'SwimlaneNode';
  }

  getDeepCopy(): SwimlaneNode {
    let result = new SwimlaneNode(this.width, this.height, this.position.getDeepCopy());
    result.text = this.text;
    return result;
  }
}
