import { Injectable } from '@angular/core';
import {ZoomService} from "./zoom.service";
import {Position} from "../../model/position";
const MENUBAROFFSET: number = 50;

@Injectable({
  providedIn: 'root'
})
export class MousePositionTransformService {

  constructor(private zoomService: ZoomService) { }

  public transformPosition(position: Position): Position {
    position.y -= MENUBAROFFSET;
    position.x *= this.zoomService.getCurrentZoomFactor();
    position.y *= this.zoomService.getCurrentZoomFactor();

    return position;
  }
}
