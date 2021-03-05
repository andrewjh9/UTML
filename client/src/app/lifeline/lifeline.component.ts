import {Component, Input, OnInit} from '@angular/core';
import {Lifeline} from "../../model/sequence-diagram/lifeline";

@Component({
  selector: '[lifeline-node]',
  templateUrl: './lifeline.component.html',
  styleUrls: ['./lifeline.component.scss']
})
export class LifelineComponent {
  public readonly RENDERING = Lifeline.RENDERING_CONSTANTS;
  @Input() lifeline?: Lifeline;

  constructor() { }

  getX(): number {
    if (this.lifeline === undefined) {
      throw new Error('Rendering a lifeline whilst it is not defined.');
    }

    return this.lifeline.horizontalPosition  * (Lifeline.RENDERING_CONSTANTS.actorWidth +
      Lifeline.RENDERING_CONSTANTS.actorBetweenOffset) + Lifeline.RENDERING_CONSTANTS.actorBetweenOffset;
  }

  getCenterX(): number {
    if (this.lifeline === undefined) {
      throw new Error('Rendering a lifeline whilst it is not defined.');
    }

    return this.getX() + Lifeline.RENDERING_CONSTANTS.actorWidth / 2;
  }

  getStartY() {
    if (this.lifeline === undefined) {
      throw new Error('Rendering a lifeline whilst it is not defined.');
    }

    return Lifeline.RENDERING_CONSTANTS.actorYOffset + Lifeline.RENDERING_CONSTANTS.actorHeight;
  }

  getLineSegments(): number[][] {
    if (this.lifeline === undefined || (this.lifeline?.connections.length % 2 !== 0 && this.lifeline?.connections.length >= 2)) {
      throw new Error('Connections must contain an even amount and be at least 2.')
    }

    let result = [];

    for (let i = 0; i < this.lifeline!.connections.length; i += 2) {
      result.push([this.lifeline!.connections[i], this.lifeline!.connections[i + 1]]);
    }

    return result;
  }

  getActiveSegments(): number[][] {
    if (this.lifeline === undefined || (this.lifeline?.connections.length % 2 !== 0 && this.lifeline?.connections.length >= 2)) {
      throw new Error('Connections must contain an even amount and be at least 2.')
    }

    let result = [];

    for (let i = 1; i !== this.lifeline!.connections.length - 1; i += 2) {
      result.push([this.lifeline!.connections[i], this.lifeline!.connections[i + 1]]);
    }

    return result;
  }
}
