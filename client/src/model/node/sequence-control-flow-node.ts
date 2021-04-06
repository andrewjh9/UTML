import {RectangleNode} from "./rectangle-node";
import {Position} from "../position";
import {Node} from "./node";

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
}
