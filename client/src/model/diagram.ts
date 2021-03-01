import {Edge} from "./edge";
import {Node} from "./node/node";
import {SerialisedDiagram} from "../serialisation/serialised-diagram";


export class Diagram {
  public edges: Edge[];
  public nodes: Node[];


  constructor(nodes: Node[] = [], edges: Edge[] = []) {
    this.edges = edges;
    this.nodes = nodes;
  }

  public serialise(): SerialisedDiagram {
    return {
      nodes: this.nodes.map((node) => node.serialise()),
      edges: this.edges.map((edge) => edge.serialise()),
    }
  }
}
