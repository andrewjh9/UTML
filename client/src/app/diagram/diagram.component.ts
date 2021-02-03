import { Position } from '../model/position';
import { Component, OnInit } from '@angular/core';
import {Node, Edge, Diagram, Shape, ArrowStyle, EdgeStyle} from '../model/diagram';

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
    const edge: Edge = {
      startPosition: {x: 10, y: 100},
      endPosition: {x: 100, y: 10},
      arrowStyle: ArrowStyle.None,
      edgeStyle: EdgeStyle.Filled,
      points: []
    };
    const edge2: Edge = {
      startPosition: {x: 200, y: 200},
      endPosition: {x: 300, y: 300},
      arrowStyle: ArrowStyle.None,
      edgeStyle: EdgeStyle.Filled,
      points: []
    };
    this.diagram = {nodes: [node, node2], edges: [edge, edge2]};
  }

  ngOnInit(): void {
  }

  renderNode(node: Node): string {
    return `<div>${node.texts[0]}</div>`;
  }
}

