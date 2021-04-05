import {Component, Input, OnInit} from '@angular/core';
import {Diagram} from "../../model/diagram";

@Component({
  selector: 'diagram-preview',
  templateUrl: './diagram-preview.component.html',
  styleUrls: ['./diagram-preview.component.scss']
})
export class DiagramPreviewComponent {
  @Input() diagram!: Diagram;
  @Input() width!: number;
  @Input() height!: number;

  get viewBox() {
    let dimensions =  this.diagram.getDimensions();
    return `${dimensions.leftX} ${dimensions.topY} ${dimensions.width} ${dimensions.height};`
  }
}
