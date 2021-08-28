import {Component, Input} from '@angular/core';
import {Edge, LineType} from "../../../model/edge/edge";

@Component({
  selector: '[edge-render-dispatch]',
  templateUrl: './edge-render-dispatch.component.html',
  styleUrls: ['./edge-render-dispatch.component.scss']
})
export class EdgeRenderDispatchComponent {
  @Input() edge!: Edge;
  @Input() styleObject?: {[key: string]: string | number} = {
    'stroke': 'black',
    'stroke-width': 2
  };

  isLine() {
    return this.edge.lineType === LineType.Line;
  }

  isFaultTree() {
    return this.edge.lineType === LineType.FaultTreeLine;
  }

  isArc() {
    return this.edge.lineType === LineType.Arc;
  }
}
