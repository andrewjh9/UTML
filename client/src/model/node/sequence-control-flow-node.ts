import {RectangleNode} from "./rectangle-node";
import {Position} from "../position";
import {Node} from "./node";
import {SerialisedSequenceControlFlowNode} from "../../serialisation/serialised-data-structures/serialised-node";

export class SequenceControlFlowNode extends RectangleNode {
  /** The text that will be displayed in the top-left of the controlFlowNode. */
  public readonly name: string;

  constructor(width: number, height: number, position: Position, name: string) {
    super(width, height, position);
    this.name = name;
    this._transparent = true;
  }

  protected getAllOffsets(): Position[] {
    return [];
  }

  public getNodeTypeName(): string {
    return 'SequenceControlFlowNode';
  }

  public getDeepCopy(): Node {
    return new SequenceControlFlowNode(this.width, this.height, this.position.getDeepCopy(), this.name);
  }

  public serialise(): SerialisedSequenceControlFlowNode {
    return {
      width: this.width,
      height: this.height,
      position: this.position.serialise(),
      text: this.text,
      name: this.name,
      type: this.getNodeTypeName(),
      hasDoubleBorder: false,
      styleObject: Node.copyStyleObject(this.styleObject)
    }
  }
}
