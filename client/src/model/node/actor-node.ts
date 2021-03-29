import {RectangleNode} from "./rectangle-node";

export class ActorNode extends RectangleNode {
  getNodeTypeName(): string {
    return 'ActorNode';
  }

  getDeepCopy(): ActorNode {
    return new ActorNode(this.width, this.height, this.position.getDeepCopy());
  }
}
