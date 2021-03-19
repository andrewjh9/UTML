import {Component, Input} from '@angular/core';
import {Node} from "../../../model/node/node";
import {EditService} from "../../services/edit.service";

@Component({
  selector: '[basic-node-text]',
  templateUrl: './basic-node-text.component.html',
  styleUrls: ['./basic-node-text.component.scss']
})
export class BasicNodeTextComponent {
  @Input() node?: Node;

  constructor(private editService: EditService) {

  }

  setActive(index: number) {
    if (this.editService.isActive()) {
      this.editService.setActiveTextLine(index, false)
    }
  }
}
