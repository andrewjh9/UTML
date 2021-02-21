import {Component, Input, OnInit} from '@angular/core';
import {RectangleNode} from "../../../assets/serialisation/node/rectangle-node";

@Component({
  selector: '[rectangle-node]',
  templateUrl: './rectangle-node.component.html',
  styleUrls: ['./rectangle-node.component.scss']
})
export class RectangleNodeComponent {
  @Input() node?: RectangleNode;

  constructor() {
  }
}
