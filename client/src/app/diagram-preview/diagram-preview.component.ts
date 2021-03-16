import {Component, Input, OnInit} from '@angular/core';
import {Diagram} from "../../model/diagram";

@Component({
  selector: '[diagram-preview]',
  templateUrl: './diagram-preview.component.html',
  styleUrls: ['./diagram-preview.component.scss']
})
export class DiagramPreviewComponent {
  @Input() diagram!: Diagram;
}
