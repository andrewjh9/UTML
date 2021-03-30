import {RectangleNode} from "./rectangle-node";

export class SystemBoundaryNode extends RectangleNode {
  public getNodeTypeName(): string {
    return 'SystemBoundaryNode';
  }

  public getDeepCopy() {
    let result = new SystemBoundaryNode(this.width, this.height, this.position.getDeepCopy());
    result.text = this.text;
    return result;
  }
}
