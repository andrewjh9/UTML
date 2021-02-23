import {Component, Input, OnInit} from '@angular/core';
import {Node} from "../../../assets/serialisation/node/node";
import {EdgeCreationService} from "../../services/edge-creation.service";
import {FormattedResizeElement, ResizeService} from "../../services/resize.service";

@Component({
  selector: '[clickable-resize-points]',
  templateUrl: './clickable-resize-points.component.html',
  styleUrls: ['./clickable-resize-points.component.scss']
})
export class ClickableResizePointsComponent {
  @Input() node?: Node;

  constructor(private resizeService: ResizeService) {
  }

  handleClick($event: MouseEvent, attachmentPoint: number) {
    if (this.node === undefined) {
      throw new Error("You are clicking on clickable resize points that have no associated node. " +
        "This should be impossible");
    }
    this.resizeService.activate({width:this.node.width, height: this.node.height, position: this.node.position} as FormattedResizeElement, this.node.getPositionOfAttachment(attachmentPoint));
  }
}
