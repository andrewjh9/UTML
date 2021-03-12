import {Component, Input, OnInit} from '@angular/core';
import {ClassNode} from "../../../model/node/class-node";

@Component({
  selector: '[class-node-render]',
  templateUrl: './class-node-render.component.html',
  styleUrls: ['./class-node-render.component.scss']
})
export class ClassNodeRenderComponent {
  @Input() node!: ClassNode;
}
