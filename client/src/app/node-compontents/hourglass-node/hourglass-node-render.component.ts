import {Component, Input, OnInit} from '@angular/core';
import {HourglassNode} from "../../../model/node/hourglass-node";
import {Position} from "../../../model/position";

@Component({
  selector: '[hourglass-node-render]',
  templateUrl: './hourglass-node-render.component.html',
})
export class HourglassNodeRenderComponent {
  @Input() node!: HourglassNode;

  getPoints() {
    return [
      Position.zero(),
      new Position(this.node.width, 0),
      new Position(0, this.node.height),
      new Position(this.node.width, this.node.height),
      Position.zero()
    ].map(pos => Position.add(pos, this.node.position))
     .map(pos => pos.toString(',', ' ')).join();
  }
}
