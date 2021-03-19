import { Injectable } from '@angular/core';
import {Position} from "../../model/position";
import {ZoomService} from "./zoom.service";

@Injectable({
  providedIn: 'root'
})
export class LensOffsetService {
  private isInOffsetChangeMode: boolean = false;
  private startPosition?: Position;
  constructor(private zoomService: ZoomService) { }

  public activate(position: Position): void {
    this.isInOffsetChangeMode = true;
    this.startPosition = position;
  }

  public isActive () {
    return this.isInOffsetChangeMode;
  }

  public update(position: Position) {
    if (this.isActive()) {
      let difference = Position.subtract(this.startPosition!, position);
      let x = difference.x;
      let y = difference.y;
      console.log(x + "," + y)
      this.zoomService.setXY(x, y);
      this.startPosition = position;
    }
  }


  public deactivate(): void {
    this.isInOffsetChangeMode = false;
    this.startPosition = undefined;
  }
}
