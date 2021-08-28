import {Edge, LineType} from "./edge";
import {Position} from "../position";
import {Node} from "../node/node";
import {OrGateNode} from "../node/fault-tree/or-gate-node";

export class FaultTreeEdge extends Edge {
  constructor(startPosition: Position | number, endPosition: Position | number,
              startNode: Node | undefined = undefined, endNode: Node | undefined = undefined) {
    super(startPosition, endPosition, startNode, endNode);
    this.lineType = LineType.FaultTreeLine;
  }

  get middlePositions(): Position[] {
    let start = this.getStartPosition();
    let end = this.getEndPosition();
    let middleY = (start.y + end.y) / 2

    return [
      new Position(start.x, middleY),
      new Position(end.x, middleY)
    ];
  }

  set middlePositions(value: Position[]) {
    // this intentionally does nothing
  }

  private offsetIfOrGate(position: Position, node: Node | undefined) {
    if (node !== undefined && node instanceof OrGateNode) {
      return Position.add(position, new Position(0, OrGateNode.LOWER_HAT_PERCENTAGE * node.height));
    } else {
      return position;
    }
  }

  getDeepCopy(): FaultTreeEdge {
    let result = new FaultTreeEdge(this.startPosition, this.endPosition, this.startNode, this.endNode);

    result.startLabel = this.startLabel?.getDeepCopy();
    if (result.startLabel) {
      result.startLabel.anchors = result.labelAnchors;
    }
    result.middleLabel = this.middleLabel?.getDeepCopy();
    if (result.middleLabel) {
      result.middleLabel.anchors = result.labelAnchors;
    }
    result.endLabel = this.endLabel?.getDeepCopy();
    if (result.endLabel) {
      result.endLabel.anchors = result.labelAnchors;
    }
    result.startStyle = this.startStyle;
    result.endStyle = this.endStyle;
    result.lineStyle = this.lineStyle;
    result.lineType = LineType.FaultTreeLine;
    return result;
  }
}
