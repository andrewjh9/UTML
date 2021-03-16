import {RectangleNode} from "./rectangle-node";

export class ActorNode extends RectangleNode {
  getNodeTypeName(): string {
    return "Actor";
  }

  getDeepCopy(): ActorNode {
    return new ActorNode(this.width, this.height, this.position.getDeepCopy());
  }
}
