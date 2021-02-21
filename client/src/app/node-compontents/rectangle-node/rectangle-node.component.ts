import {Component, Input, OnInit} from '@angular/core';
import {RectangleNode} from "../../../assets/serialisation/node/rectangle-node";
import {AbstractNodeComponent} from "../abstract-node-component";

@Component({
  selector: '[rectangle-node]',
  templateUrl: './rectangle-node.component.html',
  styleUrls: ['./rectangle-node.component.scss']
})
export class RectangleNodeComponent extends AbstractNodeComponent {
  @Input() node?: RectangleNode;

  constructor() {
    super();
  }
}
