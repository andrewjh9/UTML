import {Component, Input} from "@angular/core";
import {Edge} from "../../../model/edge";

@Component({
  selector: '[line-render-component]',
  templateUrl: './line-render.component.html',
})
export class LineRenderComponent {
  @Input() edge!: Edge;
  @Input() styleObject = {'stroke': 'black', 'stroke-width': 2};
}
