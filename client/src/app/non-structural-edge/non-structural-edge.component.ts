import {Component, Input, OnInit} from '@angular/core';
import {EdgeFormatter, EndStyle, LineStyle, LineType} from "../../assets/serialisation/edge";
import {Position} from "../../assets/serialisation/position";
import {LabelFormatter} from "../../assets/serialisation/label";

@Component({
  selector: '[non-structural-edge]',
  templateUrl: './non-structural-edge.component.html',
  styleUrls: ['./non-structural-edge.component.scss']
})
export class NonStructuralEdgeComponent {
  @Input() formatter?: EdgeFormatter;

  isArc(): boolean {
    return this.formatter?.lineType == LineType.Arc;
  }

  isLine(): boolean {
    return this.formatter?.lineType == LineType.Line;
  }
}
