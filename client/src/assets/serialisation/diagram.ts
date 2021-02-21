import {Edge, EdgeFormatter} from "./edge";
import {Node} from "./node/node";


export interface Diagram {
  edges: Edge[],
  nodes: Node[],
  unstructuredEdges: EdgeFormatter[]
}
