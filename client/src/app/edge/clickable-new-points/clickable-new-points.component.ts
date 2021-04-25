import {Component, Input, OnInit} from '@angular/core';
import {Edge} from "../../../model/edge";
import {Position} from "../../../model/position";
import {FixedPointRepositioner} from "../../services/edge-reposition/fixed-point-repositioner";
import {MousePositionTransformService} from "../../services/mouse-position-transform.service";
import {SelectionService} from "../../services/selection.service";
import {EdgeDependentComponent} from "../edge-dependent-component";
import {EditService} from "../../services/edit.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: '[clickable-new-points]',
  templateUrl: './clickable-new-points.component.html',
  styleUrls: ['./clickable-new-points.component.scss']
})
export class ClickableNewPointsComponent extends EdgeDependentComponent {
  @Input() edge!: Edge;
  readonly RADIUS: number = 8;

  constructor(private fixedPointRepositioner: FixedPointRepositioner,
              mousePositionTransformService: MousePositionTransformService,
              selectionService: SelectionService,
              editService: EditService,
              modalService: NgbModal) {
    super(editService, modalService, selectionService, mousePositionTransformService);
  }

  get points(): Position[] {
    let allPoints = this.edge.getAllPoints();
    let result = [];

    for (let i = 0; i < allPoints.length - 1; i++) {
      result.push(Position.multiply(0.5, Position.add(allPoints[i], allPoints[i + 1])));
    }

    return result;
  }

  handleMouseDown(event: MouseEvent, index: number): void {
    this.selectionService.set(this.edge);
    let position = this.mousePositionTransformService.transformPosition(new Position(event.x, event.y));
    this.edge.middlePositions.splice(index, 0, position);
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
