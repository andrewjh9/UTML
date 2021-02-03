import { Position } from '../model/position';
import { Component, OnInit } from '@angular/core';
import { Node, Edge, Diagram, Shape } from '../model/diagram';

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {
  public diagram: Diagram;

  constructor() {
    const node: Node = {
      shape: Shape.Rectangle,
      width: 100,
      height: 100,
      position: {x: 10, y: 110},
      texts: ['something']
    };
    const node2: Node = {
      shape: Shape.Rectangle,
      width: 100,
      height: 100,
      position: {x: 400, y: 110},
      texts: ['something else ']
    };
    this.diagram = {nodes: [node, node2], edges: []};
  }

  ngOnInit(): void {
  }

  renderNode(node: Node): string {
    return `<div>${node.texts[0]}</div>`;
  }
}

