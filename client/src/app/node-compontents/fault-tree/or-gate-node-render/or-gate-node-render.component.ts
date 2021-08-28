import {Component, Input, OnInit} from '@angular/core';
import {Position} from '../../../../model/position';
import {computeCubicCurve, computeSVGArcString} from '../../../../util/curve-render-util';
import {OrGateNode} from '../../../../model/node/fault-tree/or-gate-node';

@Component({
  selector: '[or-gate-node-render]',
  templateUrl: './or-gate-node-render.component.html',
  styleUrls: ['./or-gate-node-render.component.scss']
})
export class OrGateNodeRenderComponent {
  @Input() node!: OrGateNode;

  getPath(): string {
    let controlXOffset = this.node.width * 0.5;
    let controlYOffset = this.node.height * 0.1;

    let topMiddle = Position.add(this.node.position, new Position(this.node.width / 2, 0));
    let leftControl = new Position(topMiddle.x + controlXOffset, topMiddle.y + controlYOffset);
    let rightControl = new Position(topMiddle.x - controlXOffset, topMiddle.y + controlYOffset);

    let bottomLeft = Position.add(this.node.position, new Position(0, this.node.height));
    let bottomMiddle = Position.add(this.node.position, this.node.lowerOffsetPoint);
    let bottomRight = Position.add(this.node.position, new Position(this.node.width, this.node.height));


    let hatPath = computeSVGArcString(bottomLeft, bottomMiddle, bottomRight);
    let leftCurve = computeCubicCurve(bottomRight, leftControl, topMiddle);
    let rightCurve = computeCubicCurve(topMiddle, rightControl, bottomLeft);


    return `${hatPath}
            ${leftCurve}
            ${rightCurve}`;
  }
}
