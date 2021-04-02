import {RectangleNode} from "./rectangle-node";

export class SystemClockNode extends RectangleNode {
  public getNodeTypeName(): string {
    return 'SystemClockNode';
  }

  public getDeepCopy() {
    return new SystemClockNode(this.width, this.height, this.position.getDeepCopy());
  }
}
