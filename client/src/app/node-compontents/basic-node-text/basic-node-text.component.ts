import {Component, Input} from '@angular/core';
import {Node} from "../../../assets/serialisation/node/node";

@Component({
  selector: '[basic-node-text]',
  templateUrl: './basic-node-text.component.html',
  styleUrls: ['./basic-node-text.component.scss']
})
export class BasicNodeTextComponent {
  @Input() node?: Node;
}
