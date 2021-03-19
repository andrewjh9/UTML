import {Component, Input, OnInit} from '@angular/core';
import {Node} from "../../../model/node/node";

@Component({
  selector: '[below-node-text]',
  templateUrl: './below-text-node.component.html',
  styleUrls: ['./below-text-node.component.scss']
})
export class BelowTextNodeComponent {
  @Input() node!: Node;
  constructor() { }

  readonly FONT_SIZE = 16;

  get centerX() {
    return this.node.position.x + this.node.width / 2;
  }

  getY(index: number) {
    return this.node.position.y + this.node.height + (this.FONT_SIZE * (index + 1));
  }
}
