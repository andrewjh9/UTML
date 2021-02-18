import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Position} from "../../assets/serialisation/position";
import {Edge, EdgeFormatter, EndStyle, LineStyle, LineType} from "../../assets/serialisation/edge";
import {LabelFormatter} from "../../assets/serialisation/label";
import {EdgeRepositionService} from "../services/edge-reposition.service";
import {FormattedElement} from "../services/reposition.service";
import {AbstractEdgeComponent} from "../abstract-edge-component";
import {EdgeCreationService} from "../services/edge-creation-service.service";
import {Mode, ModeService} from "../services/mode.service";
import {SelectionService} from "../services/selection.service";

@Component({
  selector: '[edge-component]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss'],
})
export class EdgeComponent extends AbstractEdgeComponent implements OnDestroy {
  @Input() edge?: Edge;
  @Output() edgeChange = new EventEmitter<Edge>();
  public readonly hasLabels = true;

  constructor(private edgeRepositionService: EdgeRepositionService,
              modeService: ModeService, selectionService: SelectionService) {
    super(selectionService, modeService);
  }

  public formatterIsDefined(): boolean {
    return this.edge?.formatter !== undefined;
  }

  public getFormatter(): EdgeFormatter | undefined {
    return this.edge?.formatter;
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

  public getStartLabel(): string | undefined {
    return this.edge?.startLabel;
  }

  public setStartLabel(label: string) {
    if (this.edge) {
      this.edge.startLabel = label;
    }
  }

  public getMiddleLabel(): string | undefined {
    return this.edge?.middleLabel;
  }

  public setMiddleLabel(label: string) {
    if (this.edge) {
      this.edge.middleLabel = label;
    }
  }
  public getEndLabel(): string | undefined {
    return this.edge?.endLabel;
  }

  public setEndLabel(label: string) {
    if (this.edge) {
      this.edge.endLabel = label;
    }
  }

  public handleMouseDown(event: MouseEvent): void {
    if (this.mode === Mode.Move) {
      if (this.edge?.formatter?.middlePositions) {
        // Todo: fix mouse positioning
        let mousePosition = new Position(event.clientX, event.clientY);
        this.edgeRepositionService.activate(mousePosition, this.edge, this.edge.formatter);
      }
    } else if (this.mode === Mode.Select && this.edge) {
      this.selectionService.setEdge(this.edge);
    }
  }

  ngOnDestroy(): void {
    console.log("Edge component is being destroyed.")
  }
}
