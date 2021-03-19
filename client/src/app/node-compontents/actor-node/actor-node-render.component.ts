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
  pathStyle = {
    'stroke': 'black',
    'stroke-width': 2,
    'fill': 'none',
    'stroke-opacity': 0.75
  };

  get ellipseRadius(): number {
    return this.node.width / 4;
  }

  get armsPath(): string {
    let left = this.addPos(new Position(0, 0.75 * this.node.width));
    let right = this.addPos(new Position(this.node.width, 0.75 * this.node.width));

    return `M${left.toString(' ', '')} L${right.toString(' ', '')}`;
  }

  get spinePath(): string {
    let up = this.addPos(new Position(this.node.width / 2, 0.5 * this.node.width));
    let down = this.addPos(new Position(this.node.width / 2, 1.25 * this.node.width));

    return `M${up.toString(' ', '')} L${down.toString(' ', '')}`;
  }

  get leftLegPath(): string {
    let up = this.addPos(new Position(this.node.width / 2, 1.25 * this.node.width));
    let down = this.addPos(new Position(this.node.width / 4, this.node.height));

    return `M${up.toString(' ', '')} L${down.toString(' ', '')}`;
  }

  get rightLegPath(): string {
    let up = this.addPos(new Position(this.node.width / 2, 1.25 * this.node.width));
    let down = this.addPos(new Position(3 * this.node.width / 4, this.node.height));

    return `M${up.toString(' ', '')} L${down.toString(' ', '')}`;
  }

  private addPos(p: Position) {
    return Position.add(p, new Position(this.node.position.x, this.node.position.y));
  }
}
