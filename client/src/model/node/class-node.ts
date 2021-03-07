import {RectangleNode} from "./rectangle-node";
import {SerialisedClassNode, SerialisedNode} from "../../serialisation/serialised-data-structures/serialised-node";
import {Node} from "./node";

export class ClassNode extends RectangleNode {
  public firstLine: number = 0;
  public secondLine: number | undefined = undefined;

  public getNodeTypeName(): string {
    return 'ClassNode';
  }

  public serialise(): SerialisedClassNode {
    let result: any = super.serialise();
    result.firstLine = this.firstLine;
    result.secondLine = this.secondLine;
    return result as SerialisedClassNode;
  }

  public getDeepCopy(): Node {
    let result = new ClassNode(this.width, this.height, this.position.getDeepCopy());
    result.text = this.text;
    result.styleObject = this.styleObject;
    result.firstLine = this.firstLine;
    result.secondLine = this.secondLine;
    return result as Node;
  }
}
