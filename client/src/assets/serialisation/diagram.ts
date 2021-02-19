import {Edge, EdgeFormatter} from "./edge";
import {Node} from "./node";


export interface Diagram {
  edges: Edge[],
  nodes: Node[],
  unstructuredEdges: EdgeFormatter[]
}
