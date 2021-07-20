import {Component, Input, OnInit} from '@angular/core';
import {RectangleNode} from "../../../model/node/rectangle-node";

@Component({
  selector: 'g[rectangle-node-render]',
  templateUrl: './rectangle-node-render.component.html',
  styleUrls: ['./rectangle-node-render.component.scss']
})
export class RectangleNodeRenderComponent {
  @Input() node!: RectangleNode;
}
