import {Component, Input, OnInit} from '@angular/core';
import {EllipseNode} from "../../../model/node/ellipse-node";

@Component({
  selector: '[ellipse-node-render]',
  templateUrl: './ellipse-node-render.component.html',
  styleUrls: ['./ellipse-node-render.component.scss']
})
export class EllipseNodeRenderComponent {
  @Input() node!: EllipseNode;

}
