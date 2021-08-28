import {SerialisedEdge} from "../serialised-data-structures/serialised-edge";
import {Edge, LineType} from "../../model/edge/edge";
import {deserialiseLabel} from "./deserialise-label";
import {deserialisePosition} from "./deserialise-position";
import {Position} from "../../model/position";
import {SerialisedPosition} from "../serialised-data-structures/serialised-position";
import {FaultTreeEdge} from "../../model/edge/fault-tree-edge";

export function deserialiseEdge(serialisedEdge: SerialisedEdge): Edge {
  let startPos: number | Position;
  let endPos: number | Position;
  if (isNaN(Number(serialisedEdge.startPosition))) {
    startPos = new Position((serialisedEdge.startPosition as SerialisedPosition).x,
      (serialisedEdge.startPosition as SerialisedPosition).y);
  } else {
    startPos = serialisedEdge.startPosition as number;
  }

  if (isNaN(Number(serialisedEdge.endPosition))) {
    endPos = new Position((serialisedEdge.endPosition as SerialisedPosition).x,
      (serialisedEdge.endPosition as SerialisedPosition).y);
  } else {
    endPos = serialisedEdge.endPosition as number;
  }

  let result: Edge;

  if (serialisedEdge.lineType === LineType.FaultTreeLine) {
    result = new FaultTreeEdge(startPos, endPos);
  } else {
    result = new Edge(startPos, endPos);
  }

  // Add formatting
  result.lineType = serialisedEdge.lineType;
  result.lineStyle = serialisedEdge.lineStyle;
  result.startStyle = serialisedEdge.startStyle;
  result.endStyle = serialisedEdge.endStyle;

  if (result.lineType !== LineType.FaultTreeLine) {
    result.middlePositions = serialisedEdge.middlePositions.map(p => deserialisePosition(p));
  }

  // Add labels, if defined.
  if (serialisedEdge.startLabel) {
    result.startLabel = deserialiseLabel(serialisedEdge.startLabel);
    result.startLabel.anchors = result.labelAnchors;
  }

  if (serialisedEdge.middleLabel) {
    result.middleLabel = deserialiseLabel(serialisedEdge.middleLabel);
    result.middleLabel.anchors = result.labelAnchors;
  }

  if (serialisedEdge.endLabel) {
    result.endLabel = deserialiseLabel(serialisedEdge.endLabel);
    result.endLabel.anchors = result.labelAnchors;
  }

  return result;
}
