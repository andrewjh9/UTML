import {AttachmentDirection, Node, NodeFormatter, Shape} from "../node";
import {Position} from "../position";
import {Edge, EdgeFormatter, EndStyle, LineStyle} from "../edge";
import {Diagram} from "../diagram";

export let ad: Diagram;

const node: Node = {
  texts: ['( ͡° ͜ʖ ͡°)'],
  formatter: new NodeFormatter(200, 100, new Position(100, 100), Shape.Rectangle)
};
const node2: Node = {
  texts: ['( ͡° ͜ʖ ͡°)'],
  formatter: new NodeFormatter(100, 100, new Position(100, 400), Shape.Rectangle)
};
const node3: Node = {
  texts: ['( ͡° ͜ʖ ͡°)'],
  formatter: new NodeFormatter(100, 100, new Position(600, 250), Shape.Rectangle)
};
const edge: Edge = {
  startNode: node,
  endNode: node3,
};
edge.formatter = new EdgeFormatter(AttachmentDirection.SouthEast, AttachmentDirection.NorthWest, node, node3);
edge.startLabel = "start";
edge.endLabel = "end";
edge.middleLabel = "middle";

edge.formatter.startStyle = EndStyle.UnfilledDiamond;
edge.formatter.endStyle = EndStyle.FilledDiamond;
edge.formatter.lineStyle = LineStyle.Dashed
// edge.formatter.middlePositions.push(new Position(200, 0))

const edge2: Edge = {
  startNode: node2,
  endNode: node3,
};
edge2.formatter = new EdgeFormatter(AttachmentDirection.South, AttachmentDirection.SouthWest, node2, node3);
// edge2.formatter.endStyle = EndStyle.SmallFilledArrow;
edge2.formatter.lineStyle = LineStyle.Dotted
edge2.formatter.endStyle = EndStyle.SmallFilledArrow;

let edgeFormatter = new EdgeFormatter(new Position(10, 150), new Position(100, 150));
edgeFormatter.endStyle = EndStyle.SmallFilledArrow;
edgeFormatter.lineStyle = LineStyle.Dashed;

ad = {nodes: [node, node2, node3], edges: [edge, edge2], unstructuredEdges: [edgeFormatter]};
// ad = {nodes: [node, node2, node3], edges: []};

// this.diagramString = JSON.stringify(this.diagram);
