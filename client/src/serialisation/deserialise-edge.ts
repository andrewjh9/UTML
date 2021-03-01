import {SerialisedEdge} from "./serialised-edge";
import {Edge} from "../model/edge";

export function deserialiseEdge(serialisedEdge: SerialisedEdge): Edge {
  return new Edge(serialisedEdge.startPosition, serialisedEdge.endPosition);
}
