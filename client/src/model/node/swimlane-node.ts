import {RectangleNode} from "./rectangle-node";

export class SwimlaneNode extends RectangleNode {
  getNodeTypeName(): string {
    return 'SwimlaneNode';
  }

  getDeepCopy(): SwimlaneNode {
    return new SwimlaneNode(this.width, this.height, this.position.getDeepCopy());
  }
}
