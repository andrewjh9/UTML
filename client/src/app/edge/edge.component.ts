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

  constructor(private edgeRepositionService: EdgeRepositionService) { }

  isArc(): boolean {
    return this.edge?.formatter?.lineType == LineType.Arc;
  }

  isLine(): boolean {
    return this.edge?.formatter?.lineType == LineType.Line;
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
