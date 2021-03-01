import {Position} from "../model/position";

export interface SerialisedEdge {
  startNodeId?: number;
  endNodeId?: number;
  startPosition: Position | number;
  endPosition: Position | number;
}
