import {Edge} from "./edge";
import {Node} from "./node";


export interface Diagram {
  edges: Edge[],
  nodes: Node[]
}
