import {Component, Input, OnInit} from '@angular/core';
import {Node} from "../../../model/node/node";
import {EdgeCreationService} from "../../services/edge-creation.service";

@Component({
  selector: '[clickable-attachment-points]',
  templateUrl: './clickable-attachment-points.component.html',
  styleUrls: ['./clickable-attachment-points.component.scss']
})
export class ClickableAttachmentPointsComponent {
  @Input() node!: Node;

  constructor(private edgeCreationService: EdgeCreationService) {
  }

  handleMouseDown($event: MouseEvent, attachmentPoint: number) {
    if (!this.edgeCreationService.startHasBeenSelected()) {
      this.edgeCreationService.setStart(this.node, attachmentPoint);
    }
  }

  handleMouseUp($event: MouseEvent, attachmentPoint: number) {
    if (this.edgeCreationService.startHasBeenSelected()) {
      this.edgeCreationService.setEnd(this.node, attachmentPoint);
    }
  }
}
