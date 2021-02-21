import {Component, Input, OnInit} from '@angular/core';
import {Node} from "../../../assets/serialisation/node/node";
import {RectangleNode} from "../../../assets/serialisation/node/rectangle-node";
@Component({
  selector: '[node-dispatcher]',
  templateUrl: './node-dispatcher.component.html',
  styleUrls: ['./node-dispatcher.component.scss']
})
export class NodeDispatcherComponent {
  @Input() nodes?: Node[];

  constructor() { }

  castToRectangle(node: Node): RectangleNode {
    return <RectangleNode> node;
  }
}
