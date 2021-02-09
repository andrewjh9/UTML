import { Position } from '../model/position';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Node, Edge, Diagram, Shape, ArrowStyle, EdgeStyle} from '../model/diagram';

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
      shape: Shape.Rectangle,
      width: 100,
      height: 100,
      position: {x: 10, y: 10},
      texts: ['something']
    };
    const node2: Node = {
      shape: Shape.Rectangle,
      width: 100,
      height: 100,
      position: {x: 400, y: 10},
      texts: ['something else ']
    };
    const edge: Edge = {
      startPosition: {x: 110, y: 60},
      endPosition: {x: 450, y: 100},
      arrowStyle: ArrowStyle.End,
      edgeStyle: EdgeStyle.Filled,
      points: [{x:200, y: 200}]
    };
    const edge2: Edge = {
      startPosition: {x: 500, y: 500},
      endPosition: {x: 600, y: 600},
      arrowStyle: ArrowStyle.None,
      edgeStyle: EdgeStyle.Filled,
      points: []
    };
    this.diagram = {nodes: [node, node2], edges: [edge, edge2]};
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

