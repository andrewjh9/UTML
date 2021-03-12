import {Component, Input, OnInit} from '@angular/core';
import {DiamondNode} from "../../../model/node/diamond-node";

@Component({
  selector: '[diamond-node-render]',
  templateUrl: './diamond-node-render.component.html',
  styleUrls: ['./diamond-node-render.component.scss']
})
export class DiamondNodeRenderComponent {
  @Input() node!: DiamondNode;
}
