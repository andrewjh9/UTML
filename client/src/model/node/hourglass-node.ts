import {RectangleNode} from "./rectangle-node";

export class HourglassNode extends RectangleNode {
  public getNodeTypeName(): string {
    return 'HourglassNode';
  }

  public getDeepCopy() {
    return new HourglassNode(this.width, this.height, this.position.getDeepCopy());
  }
}
