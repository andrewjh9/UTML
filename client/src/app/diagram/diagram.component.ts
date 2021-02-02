import { Position } from './model/position';
import { Component, OnInit } from '@angular/core';
import { Node, Edge, Diagram, Shape } from './model/diagram';

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
      position: {x: 10, y: 10},
      texts: ['something']
    };
    this.diagram = {nodes: [node], edges: []};
  }

  ngOnInit(): void {
  }

  renderNode(node: Node): string {
    return `<div>${node.texts[0]}</div>`;
  }
}

