import {Component, Input, OnInit} from '@angular/core';
import {EdgeFormatter, EndStyle, LineStyle, LineType} from "../../assets/serialisation/edge";
import {Position} from "../../assets/serialisation/position";
import {LabelFormatter} from "../../assets/serialisation/label";
import {AbstractEdgeComponent} from "../abstract-edge-component";

@Component({
  selector: '[non-structural-edge]',
  templateUrl: '../edge/edge.component.html',
  styleUrls: ['../edge/edge.component.scss']
})
export class NonStructuralEdgeComponent extends AbstractEdgeComponent {
  @Input() formatter?: EdgeFormatter;

  public readonly hasLabels = false;

  public getStartLabelFormatterAndSetIfAbsent(): LabelFormatter { throw new Error("Undefined behavior")}
  public getMiddleLabelFormatterAndSetIfAbsent(): LabelFormatter { throw new Error("Undefined behavior")}
  public getEndLabelFormatterAndSetIfAbsent(): LabelFormatter { throw new Error("Undefined behavior")}
  public getStartLabel(): string | undefined  { throw new Error("Undefined behavior")}
  public getMiddleLabel(): string | undefined  { throw new Error("Undefined behavior")}
  public getEndLabel(): string | undefined { throw new Error("Undefined behavior")}

  public getFormatter(): EdgeFormatter | undefined {
    return this.formatter;
  }

  public formatterIsDefined(): boolean {
    return this.formatter !== undefined;
  }
}
