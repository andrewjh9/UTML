import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ArrowStyle, Edge} from "../model/diagram";
import {Position} from "../model/position";

@Component({
  selector: '[edge-component]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss'],
})
export class EdgeComponent {
  @Input() mode?: boolean;
  @Input() edge?: Edge;
  @Output() edgeChange = new EventEmitter<Edge>();
  constructor() {

  }

  getPoints(): string | undefined {
    if (!this.edge) {
      return undefined;
    }
    let result: string = "";
    result += this.positionToText(this.edge.startPosition);
    for (let position of this.edge.points) {
      result += this.positionToText(position)
    }
    result += this.positionToText(this.edge.endPosition);
    return result;
  }

  getEndMarker(): string {
    if (!this.edge) {
      return "none";
    }

    switch (this.edge.arrowStyle) {
      case ArrowStyle.None:
        return "none";
      case ArrowStyle.End:
        return "url(#arrow)"
    }
    return "none";
  }

  positionToText(position: Position): string {
    return `${position.x}, ${position.y} `;
  }

  onClick(event: MouseEvent): void {
    if (!this.edge) {
      return;
    }
    this.edge.startPosition.y += 10;
    this.edge.endPosition.y += 10;
    this.edgeChange.emit(this.edge);
  }
}
