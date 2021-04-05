import {RectangleNode} from "./rectangle-node";

export class CrossNode extends RectangleNode {
  public getNodeTypeName(): string {
    return 'CrossNode';
  }

  public getDeepCopy(): CrossNode {
    return new CrossNode(this.width, this.height, this.position.getDeepCopy());
  }
}
