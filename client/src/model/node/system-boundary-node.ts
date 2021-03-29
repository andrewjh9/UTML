import {RectangleNode} from "./rectangle-node";

export class SystemBoundaryNode extends RectangleNode {
  public getNodeTypeName(): string {
    return 'SystemBoundaryNode';
  }

  public getDeepCopy() {
    return new SystemBoundaryNode(this.width, this.height, this.position.getDeepCopy());
  }
}
