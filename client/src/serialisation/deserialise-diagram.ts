import {SerialisedDiagram} from "./serialised-diagram";
import {Diagram} from "../model/diagram";
import {Node} from "../model/node/node";
import {deserialiseNode} from "./deserialise-node";
import {deserialiseEdge} from "./deserialise-edge";

export function deserialiseDiagram(serialisedDiagram: SerialisedDiagram): Diagram {
  let nodes = serialisedDiagram.nodes.map(n => deserialiseNode(n));
  let edges = serialisedDiagram.edges.map(e => deserialiseEdge(e));

  return new Diagram(nodes, edges);
}
