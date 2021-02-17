import {Component, Input, OnInit} from '@angular/core';
import {EdgeFormatter, EndStyle, LineStyle, LineType} from "../../assets/serialisation/edge";
import {Position} from "../../assets/serialisation/position";
import {LabelFormatter} from "../../assets/serialisation/label";
import {AbstractEdgeComponent} from "../abstract-edge-component";
import {EdgeRepositionService} from "../edge-reposition.service";

@Component({
  selector: '[non-structural-edge]',
  templateUrl: '../edge/edge.component.html',
  styleUrls: ['../edge/edge.component.scss']
})
export class NonStructuralEdgeComponent extends AbstractEdgeComponent {
  @Input() formatter?: EdgeFormatter;

  constructor(private repositionService: EdgeRepositionService) {
    super();
  }

  public readonly hasLabels = false;

  public getStartLabelFormatterAndSetIfAbsent(): LabelFormatter { throw new Error("Undefined behavior")}
  public getMiddleLabelFormatterAndSetIfAbsent(): LabelFormatter { throw new Error("Undefined behavior")}
  public getEndLabelFormatterAndSetIfAbsent(): LabelFormatter { throw new Error("Undefined behavior")}
  public getStartLabel(): string | undefined  { throw new Error("Undefined behavior")}
  public getMiddleLabel(): string | undefined  { throw new Error("Undefined behavior")}
  public getEndLabel(): string | undefined { throw new Error("Undefined behavior")}
  public setStartLabel(label: string) { throw new Error("Undefined behavior") }
  public setMiddleLabel(label: string) { throw new Error("Undefined behavior") }
  public setEndLabel(label: string) { throw new Error("Undefined behavior") }

  public getFormatter(): EdgeFormatter | undefined {
    return this.formatter;
  }

  public formatterIsDefined(): boolean {
    return this.formatter !== undefined;
  }

  public handleMouseDown(event: MouseEvent) {
    console.log("Handling mouse down event in non-structural edge")
    if (this.formatter) {
      this.repositionService.activate(new Position(event.pageX, event.pageY), undefined, this.formatter);
    }
  }
}
