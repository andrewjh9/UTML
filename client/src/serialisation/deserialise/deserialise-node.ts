import {
  SerialisedClassNode,
  SerialisedNode,
  SerialisedSequenceControlFlowNode
} from "../serialised-data-structures/serialised-node";
import {Node} from "../../model/node/node";
import {RectangleNode} from "../../model/node/rectangle-node";
import {deserialisePosition} from "./deserialise-position";
import {Position} from "../../model/position";
import {EllipseNode} from "../../model/node/ellipse-node";
import {DiamondNode} from "../../model/node/diamond-node";
import {ForkRejoinNode} from "../../model/node/fork-rejoin-node";
import {ClassNode} from "../../model/node/class-node";
import {ActorNode} from "../../model/node/actor-node";
import {HourglassNode} from "../../model/node/hourglass-node";
import {SwimlaneNode} from "../../model/node/swimlane-node";
import {SystemClockNode} from "../../model/node/system-clock-node";
import {SystemBoundaryNode} from "../../model/node/system-boundary-node";
import {CrossNode} from "../../model/node/cross-node";
import {ExecutionNode} from "../../model/node/execution-node";
import {SequenceControlFlowNode} from "../../model/node/sequence-control-flow-node";
import {CommentNode} from "../../model/node/comment-node";
import {OrGateNode} from "../../model/node/fault-tree/or-gate-node";
import {AndGateNode} from "../../model/node/fault-tree/and-gate-node";

function deserialiseGeneric(serialisedNode: SerialisedNode, constructor: GenericNodeConstructor): Node {
  let result = new constructor(serialisedNode.width, serialisedNode.height,
    deserialisePosition(serialisedNode.position));
  result.styleObject = serialisedNode.styleObject;
  result.text = serialisedNode.text;
  result.hasDoubleBorder = serialisedNode.hasDoubleBorder;
  return result;
}

function deserialiseClassNode(serialisedClassNode: SerialisedClassNode): ClassNode {
  let result = new ClassNode(serialisedClassNode.width, serialisedClassNode.height,
    deserialisePosition(serialisedClassNode.position));
  result.text = serialisedClassNode.text;
  result.firstLine = serialisedClassNode.firstLine;
  result.secondLine = serialisedClassNode.secondLine;
  result.styleObject = serialisedClassNode.styleObject;
  return result;
}

function deserialiseSequenceControlFlowNode(serialised: SerialisedSequenceControlFlowNode): SequenceControlFlowNode {
  return new SequenceControlFlowNode(serialised.width, serialised.height, deserialisePosition(serialised.position),
    serialised.name);
}

export function deserialiseNode(serialisedNode: SerialisedNode): Node {
  switch (serialisedNode.type) {
    case 'RectangleNode':
      return deserialiseGeneric(serialisedNode, RectangleNode);
    case 'EllipseNode':
      return deserialiseGeneric(serialisedNode, EllipseNode);
    case 'DiamondNode':
      return deserialiseGeneric(serialisedNode, DiamondNode);
    case 'ActorNode':
      return deserialiseGeneric(serialisedNode, ActorNode);
    case 'HourglassNode':
      return deserialiseGeneric(serialisedNode, HourglassNode);
    case 'ForkRejoinNode':
      return deserialiseGeneric(serialisedNode, ForkRejoinNode);
    case 'ClassNode':
      return deserialiseClassNode(serialisedNode as SerialisedClassNode);
    case 'SwimlaneNode':
      return deserialiseGeneric(serialisedNode, SwimlaneNode);
    case 'SystemClockNode':
      return deserialiseGeneric(serialisedNode, SystemClockNode);
    case 'SystemBoundaryNode':
      return deserialiseGeneric(serialisedNode, SystemBoundaryNode);
    case 'CrossNode':
      return deserialiseGeneric(serialisedNode, CrossNode);
    case 'CommentNode':
      return deserialiseGeneric(serialisedNode, CommentNode);
    case 'ExecutionNode':
      return deserialiseGeneric(serialisedNode, ExecutionNode);
    case 'OR Gate':
      return deserialiseGeneric(serialisedNode, OrGateNode);
    case 'AND Gate':
      return deserialiseGeneric(serialisedNode, AndGateNode);
    case 'SequenceControlFlowNode':
      return deserialiseSequenceControlFlowNode(serialisedNode as SerialisedSequenceControlFlowNode);
  }

  throw new Error(`Node of unknown type '${serialisedNode.type}' and the node can therefore not be deserialised.`);
}

type GenericNodeConstructor = {
  new (width: number, height: number, position: Position): Node;
}
