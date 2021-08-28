import {Component, Input} from "@angular/core";
import {Edge} from "../../../model/edge/edge";

@Component({
  selector: '[line-render-component]',
  templateUrl: './line-render.component.html',
})
export class LineRenderComponent {
  @Input() edge!: Edge;
  @Input() styleObject?: {[key: string]: string | number};
}
