import {SerialisedNode} from "./serialised-node";
import {SerialisedEdge} from "./serialised-edge";

export interface SerialisedDiagram {
  nodes: SerialisedNode[];
  edges: SerialisedEdge[];
}
