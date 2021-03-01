import {SerialisedNode} from "./serialised-node";
import {Node} from "../model/node/node";
import {RectangleNode} from "../model/node/rectangle-node";
import {deserialisePosition} from "./deserialise-position";
import {Position} from "../model/position";
import {EllipseNode} from "../model/node/ellipse-node";
import {DiamondNode} from "../model/node/diamond-node";

function deserialiseGeneric(serialisedNode: SerialisedNode, constructor: GenericNodeConstructor): Node {
  let result = new constructor(serialisedNode.width, serialisedNode.height,
    deserialisePosition(serialisedNode.position));
  result.text = serialisedNode.text;
  result.hasDoubleBorder = serialisedNode.hasDoubleBorder;
  return result;
}

export function deserialiseNode(serialisedNode: SerialisedNode): Node {
  switch (serialisedNode.type) {
    case 'Rectangle':
      return deserialiseGeneric(serialisedNode, RectangleNode);
    case 'Ellipse':
      return deserialiseGeneric(serialisedNode, EllipseNode);
    case 'Diamond':
      return deserialiseGeneric(serialisedNode, DiamondNode);
  }

  throw new Error("Node of unknown type and the node can therefore not be deserialised.");
}

type GenericNodeConstructor = {
  new (width: number, height: number, position: Position): Node;
}
