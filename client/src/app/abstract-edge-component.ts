import {EdgeFormatter, LineType} from "../assets/serialisation/edge";
import {LabelFormatter} from "../assets/serialisation/label";
import {SelectionService} from "./services/selection.service";
import {Mode, ModeService} from "./services/mode.service";
import {OnDestroy} from "@angular/core";

export abstract class AbstractEdgeComponent {
  public abstract getFormatter(): EdgeFormatter | undefined;
  public abstract formatterIsDefined(): boolean;
  protected mode: Mode;

  protected constructor(protected selectionService: SelectionService,
              modeService: ModeService) {
    modeService.modeObservable.subscribe((mode: Mode) => this.mode = mode);
    this.mode = modeService.getLatestMode();
  }

  // Label stuff only relevant for structural component
  public readonly abstract hasLabels: boolean;
  public abstract getStartLabelFormatterAndSetIfAbsent(): LabelFormatter
  public abstract getMiddleLabelFormatterAndSetIfAbsent(): LabelFormatter
  public abstract getEndLabelFormatterAndSetIfAbsent(): LabelFormatter
  public abstract getStartLabel(): string | undefined;
  public abstract getMiddleLabel(): string | undefined;
  public abstract getEndLabel(): string | undefined;
  public abstract setStartLabel(label: string): void;
  public abstract setMiddleLabel(label: string): void;
  public abstract setEndLabel(label: string): void;


  public isLine(): boolean {
    if (this.formatterIsDefined()) {
      return this.getFormatter()!.lineType == LineType.Line;
    } else {
      return false;
    }
  }

  public isArc(): boolean {
    if (this.formatterIsDefined()) {
      return this.getFormatter()!.lineType == LineType.Arc;
    } else {
      return false;
    }
  }
}
