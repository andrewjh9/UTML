import {Component, Input, OnInit} from '@angular/core';
import {DiamondNode} from "../../../model/node/diamond-node";
import {EditService} from "../../services/edit.service";

@Component({
  selector: '[diamond-node-render]',
  templateUrl: './diamond-node-render.component.html',
  styleUrls: ['./diamond-node-render.component.scss']
})
export class DiamondNodeRenderComponent {
  @Input() node!: DiamondNode;

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
