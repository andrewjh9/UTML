import {Component, Input, OnInit} from '@angular/core';
import {Edge} from "../../../model/edge/edge";
import {Position} from "../../../model/position";
import {FixedPointRepositioner} from "../../services/edge-reposition/fixed-point-repositioner";
import {MousePositionTransformService} from "../../services/mouse-position-transform.service";
import {SelectionService} from "../../services/selection.service";

@Component({
  selector: '[clickable-new-points]',
  templateUrl: './clickable-new-points.component.html',
  styleUrls: ['./clickable-new-points.component.scss']
})
export class ClickableNewPointsComponent {
  @Input() edge!: Edge;
  readonly RADIUS: number = 8;

  constructor(private fixedPointRepositioner: FixedPointRepositioner,
              private mouseTransformer: MousePositionTransformService,
              private selectionService: SelectionService) { }

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
    let position = this.mouseTransformer.transformPosition(new Position(event.x, event.y));
    this.edge.middlePositions.splice(index, 0, position);
    this.fixedPointRepositioner.activate(this.edge, position);
  }
}
