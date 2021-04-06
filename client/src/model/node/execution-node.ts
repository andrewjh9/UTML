import {RectangleNode} from "./rectangle-node";
import {Node} from "./node";
import {Position} from "../position";

// This node is just a rectangle with fewer attachment points.
// This is important in sequence diagrams as messages between executions do not always align with attachment points.
// The rendering is just done by the rectangle-node-render component.
export class ExecutionNode extends RectangleNode {
  public getNodeTypeName(): string {
    return "ExecutionNode";
  }

  protected getAllOffsets(): Position[] {
    return [
      new Position(this.width / 2, 0),
      new Position(this.width / 2, this.height),
    ];
  }

  public getDeepCopy(): Node {
    return new ExecutionNode(this.width, this.height, this.position.getDeepCopy());
  }
}
