import {Position} from '../../assets/serialisation/position';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AttachmentDirection, Node, NodeFormatter, Shape} from '../../assets/serialisation/node';
import {Edge, EdgeFormatter, EndStyle, LineStyle, LineType} from "../../assets/serialisation/edge";
import {Diagram} from "../../assets/serialisation/diagram";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent {
  @Input() public mode?: boolean;
  @Output() public modeChange: EventEmitter<boolean> = new EventEmitter();

  public diagram: Diagram;
  constructor() {
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
    e1.formatter.middlePositions = [new Position(250, -50)];
    e1.formatter.endStyle = EndStyle.SmallFilledArrow;

    e1.middleLabel = "transition 1";

    const e2: Edge = {
      startNode: n1,
      endNode: n2
    }
    e2.formatter = new EdgeFormatter(AttachmentDirection.South, AttachmentDirection.South, n2, n3);
    e2.formatter.lineType = LineType.Arc;
    e2.formatter.lineStyle = LineStyle.Dashed;
    e2.formatter.middlePositions = [new Position(450, 350)];
    e2.formatter.endStyle = EndStyle.SmallFilledArrow;
    e2.middleLabel = "transition 2"
    this.diagram = {
      nodes: [n1, n2, n3],
      edges: [e1, e2]
    }




    const node: Node = {
      texts: ['( ͡° ͜ʖ ͡°)'],
      formatter: new NodeFormatter(100, 100, new Position(100, 100), Shape.Diamond)
    };
    const node2: Node = {
      texts: ['( ͡° ͜ʖ ͡°)'],
      formatter: new NodeFormatter(100, 100, new Position(100, 400), Shape.Ellipse)
    };
    const node3: Node = {
      texts: ['( ͡° ͜ʖ ͡°)'],
      formatter: new NodeFormatter(100, 100, new Position(600, 250), Shape.Ellipse)
    };
    const edge: Edge = {
      startNode: node,
      endNode: node3,
    };
    edge.formatter = new EdgeFormatter(AttachmentDirection.East, AttachmentDirection.North, node, node3);
    edge.startLabel = "start";
    edge.endLabel = "end";
    edge.middleLabel = "middle";

    // edge.formatter.endStyle = EndStyle.SmallFilledArrow;
    edge.formatter.lineStyle = LineStyle.Dashed

    const edge2: Edge = {
      startNode: node2,
      endNode: node3,
    };
    edge2.formatter = new EdgeFormatter(AttachmentDirection.East, AttachmentDirection.South, node2, node3);
    // edge2.formatter.endStyle = EndStyle.SmallFilledArrow;
    edge2.formatter.lineStyle = LineStyle.Dotted

    // this.diagram = {nodes: [node, node2, node3], edges: [edge, edge2]};
    // this.diagramString = JSON.stringify(this.diagram);
  }

  log(): void {
    console.log(this.diagram);
  }

  setMode(mode: boolean): void {
    this.mode = mode;
    this.modeChange.emit(this.mode);
  }
}

