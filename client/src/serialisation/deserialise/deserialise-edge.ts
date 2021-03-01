import {SerialisedEdge} from "../serialised-data-structures/serialised-edge";
import {Edge} from "../../model/edge";
import {deserialiseLabel} from "./deserialise-label";
import {deserialisePosition} from "./deserialise-position";

export function deserialiseEdge(serialisedEdge: SerialisedEdge): Edge {
  let result = new Edge(serialisedEdge.startPosition, serialisedEdge.endPosition);

  // Add labels, if defined.
  if (serialisedEdge.startLabel) {
    result.startLabel = deserialiseLabel(serialisedEdge.startLabel);
  }

  if (serialisedEdge.middleLabel) {
    result.middleLabel = deserialiseLabel(serialisedEdge.middleLabel);
  }

  if (serialisedEdge.endLabel) {
    result.endLabel = deserialiseLabel(serialisedEdge.endLabel);
  }

  // Add formatting
  if (serialisedEdge.lineType) {
    result.lineType = serialisedEdge.lineType;
  }

  if (serialisedEdge.lineStyle) {
    result.lineStyle = serialisedEdge.lineStyle;
  }

  if (serialisedEdge.startStyle) {
    result.startStyle = serialisedEdge.startStyle
  }

  if (serialisedEdge.endStyle) {
    result.endStyle = serialisedEdge.endStyle
  }

  result.middlePositions = serialisedEdge.middlePositions.map(p => deserialisePosition(p));

  return result;
}
