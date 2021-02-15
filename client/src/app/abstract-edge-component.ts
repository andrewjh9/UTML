import {EdgeFormatter, LineType} from "../assets/serialisation/edge";
import {LabelFormatter} from "../assets/serialisation/label";

export abstract class AbstractEdgeComponent {
  public abstract getFormatter(): EdgeFormatter | undefined;
  public abstract formatterIsDefined(): boolean;

  // Label stuff only relevant for structural component
  public readonly abstract hasLabels: boolean;
  public abstract getStartLabelFormatterAndSetIfAbsent(): LabelFormatter
  public abstract getMiddleLabelFormatterAndSetIfAbsent(): LabelFormatter
  public abstract getEndLabelFormatterAndSetIfAbsent(): LabelFormatter
  public abstract getStartLabel(): string | undefined;
  public abstract getMiddleLabel(): string | undefined;
  public abstract getEndLabel(): string | undefined;


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
