import {AttachmentDirection, Node, NodeFormatter, Shape} from "../node";
import {Position} from "../position";
import {Edge, EdgeFormatter, EndStyle, LineStyle, LineType} from "../edge";
import {Diagram} from "../diagram";

export let fsm: Diagram;

const n1: Node = {
  texts: ['n1'],
  formatter: new NodeFormatter(100, 100, new Position(100, 100), Shape.Ellipse)
}
const n2: Node = {
  texts: ['n2'],
  formatter: new NodeFormatter(100, 100, new Position(300, 100), Shape.Ellipse)
}
const n3: Node = {
  texts: ['n3'],
  formatter: new NodeFormatter(100, 100, new Position(500, 100), Shape.Ellipse)
}

const e1: Edge = {
  startNode: n1,
  endNode: n2
}
e1.formatter = new EdgeFormatter(AttachmentDirection.North, AttachmentDirection.North, n1, n2);
e1.formatter.lineType = LineType.Arc;
e1.formatter.lineStyle = LineStyle.Dotted;
e1.formatter.middlePositions = [new Position(250, 50)];
e1.formatter.endStyle = EndStyle.SmallFilledArrow;

e1.middleLabel = "transition 1";

const e2: Edge = {
  startNode: n1,
  endNode: n2
}
e2.formatter = new EdgeFormatter(AttachmentDirection.South, AttachmentDirection.South, n2, n3);
e2.formatter.lineType = LineType.Arc;
e2.formatter.lineStyle = LineStyle.Dashed;
e2.formatter.middlePositions = [new Position(450, 250)];
e2.formatter.endStyle = EndStyle.SmallFilledArrow;
e2.middleLabel = "transition 2"

fsm = {
  nodes: [n1, n2, n3],
  edges: [e1, e2]
}
