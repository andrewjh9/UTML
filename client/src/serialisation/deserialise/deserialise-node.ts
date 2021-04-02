import {SerialisedClassNode, SerialisedNode} from "../serialised-data-structures/serialised-node";
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
  }

  throw new Error("Node of unknown type and the node can therefore not be deserialised.");
}

type GenericNodeConstructor = {
  new (width: number, height: number, position: Position): Node;
}
