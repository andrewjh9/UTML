import {SerialisedDiagram} from "../serialised-data-structures/serialised-diagram";
import {Diagram} from "../../model/diagram";
import {Node} from "../../model/node/node";
import {deserialiseNode} from "./deserialise-node";
import {deserialiseEdge} from "./deserialise-edge";

export function deserialiseDiagram(serialisedDiagram: SerialisedDiagram): Diagram {
  let nodes = serialisedDiagram.nodes.map(n => deserialiseNode(n));
  let edges = serialisedDiagram.edges.map(e => deserialiseEdge(e));

  for (let i = 0; i < edges.length; i++) {
    if (serialisedDiagram.edges[i].startNodeId !== undefined) {
      edges[i].startNode = nodes[serialisedDiagram.edges[i].startNodeId as number];
   }

    if (serialisedDiagram.edges[i].endNodeId !== undefined) {
      edges[i].endNode = nodes[serialisedDiagram.edges[i].endNodeId as number];
    }
  }

  return new Diagram(nodes, edges);
}
