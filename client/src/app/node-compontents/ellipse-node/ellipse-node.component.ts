import {Component, Input, OnInit} from '@angular/core';
import {AbstractNodeComponent} from "../abstract-node-component";
import {EllipseNode} from "../../../assets/serialisation/node/ellipse-node";

@Component({
  selector: '[ellipse-node]',
  templateUrl: './ellipse-node.component.html',
  styleUrls: ['./ellipse-node.component.scss']
})
export class EllipseNodeComponent extends AbstractNodeComponent {
  @Input() node?: EllipseNode;

  constructor() {
    super();
  }
}
