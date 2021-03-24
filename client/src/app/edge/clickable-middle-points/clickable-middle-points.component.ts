import {Component, Input, OnInit} from '@angular/core';
import {Edge} from "../../../model/edge";
import {Position} from "../../../model/position";
import {FixedPointRepositioner} from "../../services/edge-reposition/fixed-point-repositioner";
import {MousePositionTransformService} from "../../services/mouse-position-transform.service";

@Component({
  selector: '[clickable-middle-points]',
  templateUrl: './clickable-middle-points.component.html',
  styleUrls: ['./clickable-middle-points.component.scss']
})
export class ClickableMiddlePointsComponent {
  readonly RADIUS = 8;

  @Input() edge!: Edge;

  constructor(private fixedPointRepositioner: FixedPointRepositioner,
              private mouseTransformer: MousePositionTransformService) { }

  handleMouseDown(event: MouseEvent, index: number): void {
    let position = this.edge.middlePositions[index];
    this.fixedPointRepositioner.activate(this.edge, position);
  }
}
