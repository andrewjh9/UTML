import {Component, Input, OnInit} from '@angular/core';
import {AndGateNode} from '../../../../model/node/fault-tree/and-gate-node';
import {Node} from '../../../../model/node/node';
import {Position} from '../../../../model/position';
import {computeSVGArcString} from '../../../../util/curve-render-util';

@Component({
  selector: '[and-gate-node-render]',
  templateUrl: './and-gate-node-render.component.html',
  styleUrls: ['./and-gate-node-render.component.scss']
})
export class AndGateNodeRenderComponent {
  @Input() node!: AndGateNode;

  getPath(): string {
    // This is the percentage of the height that is taken up by the curved top part of and gate.
    // Note that this part is henceforth called the hat.
    const HAT_PERCENTAGE = 0.5;
    let hatHeight = this.node.height * HAT_PERCENTAGE;

    let hatStart = Position.add(this.node.position, new Position(0, hatHeight));
    let hatMiddle = Position.add(this.node.position, new Position(this.node.width / 2, 0));
    let hatEnd = Position.add(this.node.position, new Position(this.node.width, hatHeight));

    let bottomLeft = Position.add(this.node.position, new Position(0, this.node.height));
    let bottomRight = Position.add(this.node.position, new Position(this.node.width, this.node.height));


    let hatPath = computeSVGArcString(hatStart, hatMiddle, hatEnd);
    let lowerPath = `L ${bottomRight.x} ${bottomRight.y} L ${bottomLeft.x} ${bottomLeft.y}  
                     L ${hatStart.x} ${hatStart.y}`;

    return hatPath + lowerPath;
  }
}
