import {RectangleNode} from "./rectangle-node";

export class CommentNode extends RectangleNode {
  public getNodeTypeName(): string {
    return 'CommentNode';
  }

  public getDeepCopy(): CommentNode {
    let result = new CommentNode(this.width, this.height, this.position.getDeepCopy());
    result.text = this.text;
    return result;
  }
}
