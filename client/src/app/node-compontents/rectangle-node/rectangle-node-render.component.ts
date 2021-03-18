import {Component, Input, OnInit} from '@angular/core';
import {RectangleNode} from "../../../model/node/rectangle-node";
import {EditService} from "../../services/edit.service";

@Component({
  selector: '[rectangle-node-render]',
  templateUrl: './rectangle-node-render.component.html',
  styleUrls: ['./rectangle-node-render.component.scss']
})
export class RectangleNodeRenderComponent {
  @Input() node!: RectangleNode;

  isInEditMode: boolean = false;

  constructor(private editService: EditService) {

  }

  activateEditMode() {
    if (this.node && !this.editService.isActive()) {
      this.isInEditMode = true;
      this.editService.activate(this.node);
    } else if (this.node == this.editService.getNode()) {
      this.editService.addField();
    }
  }
}
