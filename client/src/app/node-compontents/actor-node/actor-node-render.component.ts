import {Component, Input, OnInit} from '@angular/core';
import {ActorNode} from "../../../model/node/actor-node";
import {Position} from "../../../model/position";

@Component({
  selector: '[actor-node-render]',
  templateUrl: './actor-node-render.component.html',
  styleUrls: ['./actor-node-render.component.scss']
})
export class ActorNodeRenderComponent {
  @Input() node!: ActorNode;

  get ellipseRadius(): number {
    return this.node.width / 4;
  }

  // TODO: Draw body
}
