import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Position} from "../../assets/serialisation/position";
import {Edge, EdgeFormatter, EndStyle, LineStyle, LineType} from "../../assets/serialisation/edge";
import {LabelFormatter} from "../../assets/serialisation/label";
import {EdgeRepositionService} from "../edge-reposition.service";
import {FormattedElement} from "../reposition.service";

@Component({
  selector: '[edge-component]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss'],
})
export class EdgeComponent {
  @Input() mode?: boolean;
  @Input() edge?: Edge;
  @Output() edgeChange = new EventEmitter<Edge>();
  constructor(private edgeRepositionService: EdgeRepositionService) {

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

  getStartMarker(): string {
    if (!this.edge?.formatter) {
      return "none";
    }

    switch (this.edge.formatter.startStyle) {
      case EndStyle.None:
        return "none";
      case EndStyle.SmallFilledArrow:
        return "url(#start-small-filled-arrow)"
    }
    return "none";
  }


  getEndMarker(): string {
    if (!this.edge?.formatter) {
      return "none";
    }

    switch (this.edge.formatter.endStyle) {
      case EndStyle.None:
        return "none";
      case EndStyle.SmallFilledArrow:
        return "url(#end-small-filled-arrow)"
    }
    return "none";
  }

  positionToText(position: Position): string {
    return `${position.x}, ${position.y} `;
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

  getStartLabel(): string {
    return this.edge?.startLabel || "error";
  }

  handleStartLabelUpdate($event: any): void {

  }

  getStartLabelFormatterAndSetIfAbsent(): LabelFormatter {
    if (this.edge?.formatter === undefined) {
      console.error("Somehow the edge formatter is undefined.");
      return new LabelFormatter(new Position(-1, -1));
    }
    let formatter: EdgeFormatter = this.edge.formatter;

    if (formatter.startLabelFormatter === undefined) {
      formatter.startLabelFormatter = new LabelFormatter(formatter.getStartPosition());
    }

    return formatter.startLabelFormatter;
  }

  getMiddleLabelFormatterAndSetIfAbsent(): LabelFormatter {
    if (this.edge?.formatter === undefined) {
      console.error("Somehow the edge formatter is undefined.");
      return new LabelFormatter(new Position(-1, -1));
    }
    let formatter: EdgeFormatter = this.edge.formatter;

    if (formatter.middleLabelFormatter === undefined) {
      formatter.middleLabelFormatter = new LabelFormatter(
        Position.multiply(0.5, Position.add(formatter.getStartPosition(), formatter.getEndPosition())));
    }

    return formatter.middleLabelFormatter;
  }

  getEndLabelFormatterAndSetIfAbsent(): LabelFormatter {
    if (this.edge?.formatter === undefined) {
      console.error("Somehow the edge formatter is undefined.");
      return new LabelFormatter(new Position(-1, -1));
    }
    let formatter: EdgeFormatter = this.edge.formatter;

    if (formatter.endLabelFormatter === undefined) {
      formatter.endLabelFormatter = new LabelFormatter(formatter.getEndPosition());
    }

    return formatter.endLabelFormatter;
  }

  public handleMouseDown(event: MouseEvent): void {
    if (this.edge?.formatter?.middlePositions) {
      let position = new Position(event.clientX, event.clientY);
      this.edge.formatter.middlePositions.push(position);
      this.edgeRepositionService.activate(position);
    }
  }
}
