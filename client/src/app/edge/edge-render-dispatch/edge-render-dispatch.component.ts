import {Component, Input} from '@angular/core';
import {Edge, LineType} from "../../../model/edge";

@Component({
  selector: '[edge-render-dispatch]',
  templateUrl: './edge-render-dispatch.component.html',
  styleUrls: ['./edge-render-dispatch.component.scss']
})
export class EdgeRenderDispatchComponent {
  @Input() edge!: Edge;

  isLine() {
    return this.edge.lineType === LineType.Line;
  }

  isArc() {
    return this.edge.lineType === LineType.Arc;
  }
}
