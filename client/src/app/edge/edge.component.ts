import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Position} from "../../assets/serialisation/position";
import {Edge, EndStyle} from "../../assets/serialisation/edge";

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
    if (!this.edge?.formatter) {
      return undefined;
    }
    let result: string = "";
    result += this.positionToText(this.edge.formatter.getStartPosition());
    for (let position of this.edge.formatter.middlePositions) {
      result += this.positionToText(position)
    }
    result += this.positionToText(this.edge.formatter.getEndPosition());
    return result;
  }

  getEndMarker(): string {
    if (!this.edge?.formatter) {
      return "none";
    }

    switch (this.edge.formatter.endStyle) {
      case EndStyle.None:
        return "none";
      case EndStyle.SmallFilledArrow:
        return "url(#arrow)"
    }
    return "none";
  }

  positionToText(position: Position): string {
    return `${position.x}, ${position.y} `;
  }

  onClick(event: MouseEvent): void {
    if (!this.edge?.formatter) {
      return;
    }
    this.edge.formatter.middlePositions.push(new Position(0, 500))
    this.edgeChange.emit(this.edge);
  }
}
