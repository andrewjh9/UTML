import {Component, Input, OnInit} from '@angular/core';
import {AbstractNodeComponent} from "../abstract-node-component";
import {DiamondNode} from "../../../assets/serialisation/node/diamond-node";

@Component({
  selector: '[diamond-node]',
  templateUrl: './diamond-node.component.html',
  styleUrls: ['./diamond-node.component.scss']
})
export class DiamondNodeComponent extends AbstractNodeComponent {
  @Input() node?: DiamondNode;

  constructor() {
    super();
  }
}
