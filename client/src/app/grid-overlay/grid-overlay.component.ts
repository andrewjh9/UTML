import { Component, OnInit } from '@angular/core';
import {ZoomService} from "../services/zoom.service";

@Component({
  selector: '[grid-overlay]',
  templateUrl: './grid-overlay.component.html',
  styleUrls: ['./grid-overlay.component.scss']
})
export class GridOverlayComponent {
  x!: number;
  y!: number;
  width!: number;
  height!: number
  active = true;

  constructor(zoomService: ZoomService) {
    let callback = () => {
      this.width = zoomService.getZoomedWidth();
      this.height = zoomService.getZoomedHeight();
      let xy = zoomService.getXY();
      this.x = xy.x;
      this.y = xy.y;
    };
    callback();

    zoomService.updateEmitter.subscribe(callback);
  }
}
