import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Node, Shape } from '../model/diagram';

@Component({
  selector: '[node-component]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {
  @Input() node?: Node;
  @Output() nodeChange = new EventEmitter<Node>();
  constructor() {
    // this.node = {
    //   shape: Shape.Rectangle,
    //   width: 100,
    //   height: 100,
    //   position: {x: 10, y: 110},
    //   texts: ['something']
    // };
  }
}
