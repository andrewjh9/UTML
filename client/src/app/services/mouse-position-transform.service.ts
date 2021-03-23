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
    position.x += this.zoomService.getXY().x;
    position.y += this.zoomService.getXY().y;

    return position;
  }

  public transFormZoomAndMenubar(position: Position): Position {
    position.y -= MENUBAROFFSET;
    position.x *= this.zoomService.getCurrentZoomFactor();
    position.y *= this.zoomService.getCurrentZoomFactor();
    return position;
  }

  //without zoom factor
  public simpleTransform(position: Position): Position {
    position.y -= MENUBAROFFSET;
    return position;
  }

}
