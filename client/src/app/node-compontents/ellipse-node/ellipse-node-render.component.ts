import {Component, Input, OnInit} from '@angular/core';
import {EllipseNode} from "../../../model/node/ellipse-node";
import {EditService} from "../../services/edit.service";

@Component({
  selector: '[ellipse-node-render]',
  templateUrl: './ellipse-node-render.component.html',
  styleUrls: ['./ellipse-node-render.component.scss']
})
export class EllipseNodeRenderComponent {
  @Input() node!: EllipseNode;

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
