import {SerialisedDiagram} from "../serialised-data-structures/serialised-diagram";
import {Diagram} from "../../model/diagram";
import {Node} from "../../model/node/node";
import {deserialiseNode} from "./deserialise-node";
import {deserialiseEdge} from "./deserialise-edge";

export function deserialiseDiagram(serialisedDiagram: SerialisedDiagram): Diagram {

  // @ts-ignore
  let nodes = (JSON.parse(serialisedDiagram) && JSON.parse(serialisedDiagram).nodes)? JSON.parse(serialisedDiagram).nodes.map(n => deserialiseNode(n)) : [] ;
  // @ts-ignore
  let edges = (JSON.parse(serialisedDiagram) && JSON.parse(serialisedDiagram).edges)? JSON.parse(serialisedDiagram).edges.map(e => deserialiseEdge(e)) : [];

  for (let i = 0; i < edges.length; i++) {
    // @ts-ignore
    if (JSON.parse(serialisedDiagram).edges[i].startNodeId !== undefined) {
      // @ts-ignore

      edges[i].startNode = nodes[JSON.parse(serialisedDiagram).edges[i].startNodeId as number];
   }
    // @ts-ignore

    if (JSON.parse(serialisedDiagram).edges[i].endNodeId !== undefined) {
      // @ts-ignore

      edges[i].endNode = nodes[JSON.parse(serialisedDiagram).edges[i].endNodeId as number];
    }
  }

  return new Diagram(nodes, edges);
}
