import {Component, Input, OnInit} from '@angular/core';
import {Edge} from "../../../model/edge";
import {StartEndRepositioner} from "../../services/edge-reposition/start-end-repositioner";
import {MousePositionTransformService} from "../../services/mouse-position-transform.service";

@Component({
  selector: '[clickable-start-end-points]',
  templateUrl: './clickable-start-end-points.component.html',
  styleUrls: ['./clickable-start-end-points.component.scss']
})
export class ClickableStartEndPointsComponent {
  @Input() edge!: Edge;
  readonly RADIUS: number = 8;

  constructor(private startEndRepositioner: StartEndRepositioner) { }

  handleMouseDown(event: MouseEvent, type: 'start' | 'end'): void {
    this.startEndRepositioner.activate(this.edge, type === 'start');
  }
}
