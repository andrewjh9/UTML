import {Component, Input, OnInit} from '@angular/core';
import {Edge} from "../../../model/edge";

@Component({
  selector: '[arc-render-component]',
  templateUrl: './arc-render.component.html',
})
export class ArcRenderComponent {
  @Input() edge!: Edge
  @Input() styleObject?: { [key: string]: string | number };
}
