import {Position} from '../../assets/serialisation/position';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Node, NodeFormatter, Shape} from '../../assets/serialisation/node';
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
      texts: ['something'],
      formatter: new NodeFormatter(100, 100, new Position(100, 100), Shape.Rectangle)
    };
    const node2: Node = {
      texts: ['something'],
      formatter: new NodeFormatter(100, 100, new Position(300, 300), Shape.Rectangle)
    };
    const edge: Edge = {
      startNode: node,
      endNode: node2,
    };
    edge.formatter = new EdgeFormatter(new Position(200, 200), new Position(300 ,300), node, node2);
    edge.formatter.endStyle = EndStyle.SmallFilledArrow;

    this.diagram = {nodes: [node, node2], edges: [edge]};
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

