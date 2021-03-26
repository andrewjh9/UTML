import {Edge} from "./edge";
import {Node} from "./node/node";
import {SerialisedDiagram} from "../serialisation/serialised-data-structures/serialised-diagram";


export class Diagram {
  public edges: Edge[];
  public nodes: Node[];


  constructor(nodes: Node[] = [], edges: Edge[] = []) {
    this.edges = edges;
    this.nodes = nodes;
  }

  public serialise(): SerialisedDiagram {
    let serialisedNodes = this.nodes.map((node) => node.serialise());
    let serialisedEdges = this.edges.map((edge) => edge.serialise());

    for (let edgeIndex = 0; edgeIndex < this.edges.length; edgeIndex++) {
      let serialisedEdge = serialisedEdges[edgeIndex];
      let actualEdge = this.edges[edgeIndex];

      if (actualEdge.startNode !== undefined) {
        console.log('aaa')
        serialisedEdge.startNodeId = this.nodes.indexOf(actualEdge.startNode);
      }

      if (actualEdge.endNode !== undefined) {
        console.log('bbb')
        serialisedEdge.endNodeId = this.nodes.indexOf(actualEdge.endNode);
      }
    }
    return {
      edges: serialisedEdges,
      nodes: serialisedNodes
    }
  }
}
