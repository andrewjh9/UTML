import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Position} from "../../assets/serialisation/position";
import {Edge, EndStyle, LineStyle, LineType} from "../../assets/serialisation/edge";
import {LabelFormatter} from "../../assets/serialisation/label";
import {EdgeRepositionService} from "../services/edge-reposition/edge-reposition.service";
import {AbstractEdgeComponent} from "../abstract-edge-component";
import {EdgeCreationService} from "../services/edge-creation.service";
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

  getStartLabelFormatterAndSetIfAbsent(): LabelFormatter {
    if (this.edge === undefined) {
      console.error("Somehow the edge formatter is undefined.");
      return new LabelFormatter(new Position(-1, -1));
    }

    if (this.edge.startLabelFormatter === undefined) {
      this.edge.startLabelFormatter = new LabelFormatter(this.edge.getStartPosition());
    }

    return this.edge.startLabelFormatter;
  }

  getMiddleLabelFormatterAndSetIfAbsent(): LabelFormatter {
    if (this.edge === undefined) {
      console.error("Somehow the edge formatter is undefined.");
      return new LabelFormatter(new Position(-1, -1));
    }

    if (this.edge.middleLabelFormatter === undefined) {
      this.edge.middleLabelFormatter = new LabelFormatter(
        Position.multiply(0.5, Position.add(this.edge.getStartPosition(), this.edge.getEndPosition())));
    }

    return this.edge.middleLabelFormatter;
  }

  getEndLabelFormatterAndSetIfAbsent(): LabelFormatter {
    if (this.edge === undefined) {
      console.error("Somehow the edge formatter is undefined.");
      return new LabelFormatter(new Position(-1, -1));
    }
    if (this.edge.endLabelFormatter === undefined) {
      this.edge.endLabelFormatter = new LabelFormatter(this.edge.getEndPosition());
    }

    return this.edge.endLabelFormatter;
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
      if (this.edge?.middlePositions) {
        // Todo: fix mouse Positioning
        let mousePosition = new Position(event.clientX, event.clientY);
        this.edgeRepositionService.activate(this.edge, mousePosition);
      }
    } else if (this.mode === Mode.Select && this.edge) {
      this.selectionService.setEdge(this.edge);
    }
  }

  public isLine(): boolean {
    return this.edge?.lineType === LineType.Line || false;
  }

  public isArc(): boolean {
    return this.edge?.lineType === LineType.Arc || false;
  }

  ngOnDestroy(): void {
    console.log("Edge component is being destroyed.")
  }
}
