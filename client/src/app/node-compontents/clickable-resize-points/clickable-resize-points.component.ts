import {Component, Input, OnInit} from '@angular/core';
import {Node} from "../../../model/node/node";
import {EdgeCreationService} from "../../services/edge-creation.service";
import {ResizeService} from "../../services/resize.service";
import {Position} from "../../../model/position";

@Component({
  selector: '[clickable-resize-points]',
  templateUrl: './clickable-resize-points.component.html',
  styleUrls: ['./clickable-resize-points.component.scss']
})
export class ClickableResizePointsComponent {
  @Input() node?: Node;

  constructor(private resizeService: ResizeService) {
  }

  handleClick($event: MouseEvent, resizePointIndex: number) {
    if (this.node === undefined) {
      throw new Error("You are clicking on clickable resize points that have no associated node. " +
        "This should be impossible");
    }
    this.resizeService.activate(this.node, resizePointIndex);
  }
  public getPosition(attachmentNumber: number): Position | undefined {
    return this.node?.getPositionOfAttachment(attachmentNumber) ;
  }
}
