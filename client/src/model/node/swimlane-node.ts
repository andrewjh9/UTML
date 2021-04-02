import {RectangleNode} from "./rectangle-node";

export class SwimlaneNode extends RectangleNode {
  getNodeTypeName(): string {
    return 'SwimlaneNode';
  }

  getDeepCopy(): SwimlaneNode {
    let result = new SwimlaneNode(this.width, this.height, this.position.getDeepCopy());
    result.text = this.text;
    return result;
  }
}
