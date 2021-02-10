import {Position} from '../../assets/serialisation/position';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AttachmentDirection, Node, NodeFormatter, Shape} from '../../assets/serialisation/node';
import {Edge, EdgeFormatter, EndStyle} from "../../assets/serialisation/edge";
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
  public diagramString: string;
  constructor() {
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

    edge.formatter.endStyle = EndStyle.SmallFilledArrow;
    const edge2: Edge = {
      startNode: node2,
      endNode: node3,
    };
    edge2.formatter = new EdgeFormatter(AttachmentDirection.East, AttachmentDirection.South, node2, node3);
    edge2.formatter.endStyle = EndStyle.SmallFilledArrow;

    this.diagram = {nodes: [node, node2, node3], edges: [edge, edge2]};
    this.diagramString = JSON.stringify(this.diagram);
  }

  log(): void {
    console.log(this.diagram);
  }

  setMode(mode: boolean): void {
    this.mode = mode;
    this.modeChange.emit(this.mode);
  }
}

