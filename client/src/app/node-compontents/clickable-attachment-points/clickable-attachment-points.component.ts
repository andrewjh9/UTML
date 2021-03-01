import {Component, Input, OnInit} from '@angular/core';
import {Node} from "../../../model/node/node";
import {EdgeCreationService} from "../../services/edge-creation.service";

@Component({
  selector: '[clickable-attachment-points]',
  templateUrl: './clickable-attachment-points.component.html',
  styleUrls: ['./clickable-attachment-points.component.scss']
})
export class ClickableAttachmentPointsComponent {
  @Input() node?: Node;

  constructor(private edgeCreationService: EdgeCreationService) {
  }

  handleClick($event: MouseEvent, attachmentPoint: number) {
    if (this.node === undefined) {
      throw new Error("You are clicking on clickable attachment points that have no associated node. " +
        "This should be impossible");
    }

    if (this.edgeCreationService.isActive()) {
      this.edgeCreationService.setEnd(this.node, attachmentPoint);
    } else {
      this.edgeCreationService.setStart(this.node, attachmentPoint);
    }
  }
}
