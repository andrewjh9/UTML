import {Component, Input, OnInit} from '@angular/core';
import {Edge} from "../../../model/edge";
import {Position} from "../../../model/position";
import {FixedPointRepositioner} from "../../services/edge-reposition/fixed-point-repositioner";
import {MousePositionTransformService} from "../../services/mouse-position-transform.service";
import {SelectionService} from "../../services/selection.service";
import {EdgeFormattingModalComponent} from "../../edge-formatting-modal/edge-formatting-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Label} from "../../../model/label";
import {EditService} from "../../services/edit.service";
import {EdgeDependentComponent} from "../edge-dependent-component";

@Component({
  selector: '[clickable-middle-points]',
  templateUrl: './clickable-middle-points.component.html',
  styleUrls: ['./clickable-middle-points.component.scss']
})
export class ClickableMiddlePointsComponent extends EdgeDependentComponent {
  readonly RADIUS = 8;

  @Input() edge!: Edge;

  constructor(private fixedPointRepositioner: FixedPointRepositioner,
              selectionService: SelectionService,
              modalService: NgbModal,
              mousePositionTransformService: MousePositionTransformService,
              editService: EditService) {
    super(editService, modalService, selectionService, mousePositionTransformService);
  }

  handleMouseDown(event: MouseEvent, index: number): void {
    this.selectionService.set(this.edge);
    let position = this.edge.middlePositions[index];
    this.fixedPointRepositioner.activate(this.edge, position);
  }

  handleDoubleClick(event: MouseEvent) {
    if (event.ctrlKey) {
      this.openAdvancedFormatting();
    } else {
      this.createAppropriateLabel(event);
    }
  }
}
