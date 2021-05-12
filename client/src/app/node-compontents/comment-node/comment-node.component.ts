import {Component, Input, OnInit} from '@angular/core';
import {RectangleNode} from "../../../model/node/rectangle-node";

@Component({
  selector: '[comment-node-render]',
  templateUrl: './comment-node.component.html',
  styleUrls: ['./comment-node.component.scss']
})
export class CommentNodeComponent {
  @Input() node!: RectangleNode;

  get d(): string {
    let x = this.node.position.x;
    let y = this.node.position.y;
    let w = this.node.width;
    let h = this.node.height;
    const CORNER_OFFSET = 25;
    return `M ${x},${y} 
          L ${x + w},${y} 
          L ${x + w},${y + h - CORNER_OFFSET}
          L ${x + w - CORNER_OFFSET},${y + h}
          L ${x},${y + h}
          L ${x},${y}`
  }

  get d2(): string {
    let x = this.node.position.x;
    let y = this.node.position.y;
    let w = this.node.width;
    let h = this.node.height;
    const CORNER_OFFSET = 25;
    return `M ${x + w},${y + h - CORNER_OFFSET} 
          L ${x + w - CORNER_OFFSET},${y + h - CORNER_OFFSET}
           ${x + w - CORNER_OFFSET},${y + h}`;
  }
}
