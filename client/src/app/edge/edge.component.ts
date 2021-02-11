import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Position} from "../../assets/serialisation/position";
import {Edge, EdgeFormatter, EndStyle, LineStyle, LineType} from "../../assets/serialisation/edge";

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
    if (this.edge?.formatter && this.edge.formatter.lineType == LineType.Line) {
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
    } else if (this.edge?.formatter && this.edge.formatter.lineType == LineType.Arc){
      let formatter: EdgeFormatter = this.edge.formatter;
      if (formatter.middlePositions.length != 1) {
        console.error(`An Arc typed edge should have exactly 1 middle position. Edge ${this} has
        ${formatter.middlePositions.length}.`);
        return undefined;
      }

      let start: string = formatter.getStartPosition().toString(' ', ', ');
      let startWithoutEnd = formatter.getStartPosition().toString(' ', '')
      let middle: string = formatter.middlePositions[0].toString();
      let end: string = formatter.getEndPosition().toString();
      // Todo: Alter this in such a way that the curve goes through the point.
      // return `M ${startWithoutEnd} C ${start} ${middle} ${end}`;
      return `M ${startWithoutEnd} Q ${middle} ${end}`;

    } else {
      return undefined;
    }
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

  getDashArray(): string {
    if (this.edge?.formatter) {
      switch(this.edge.formatter.lineStyle) {
        case LineStyle.Filled:
          return "none";
        case LineStyle.Dashed:
          return "12, 2"
        case LineStyle.Dotted:
          return "4, 4"
      }
    }

    return "none";
  }

  isArc(): boolean {
    return this.edge?.formatter?.lineType == LineType.Arc;
  }

  isLine(): boolean {
    return this.edge?.formatter?.lineType == LineType.Line;

  }
}
