import {Component, Input, OnInit} from '@angular/core';
import {CrossNode} from "../../../model/node/cross-node";

@Component({
  selector: '[cross-node-render]',
  templateUrl: './cross-node-render.component.html',
  styleUrls: ['./cross-node-render.component.scss']
})
export class CrossNodeRenderComponent {
  @Input() node!: CrossNode;
  constructor() { }
}
