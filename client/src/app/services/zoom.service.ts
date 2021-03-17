import { Injectable } from '@angular/core';
import {Position} from "../../model/position";

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  private x: number = 0;
  private y: number = 0;
  private width: number = 1200;
  private height: number = 800;
  private currentZoomFactor: number = 1;
  private zoomStep: number = 1.1;
  private zoomExponent = 0;
  constructor() { }

  public getViewBox(): string {
    return "" + this.x + " " + this.y + " " + this.width * this.currentZoomFactor + " " + this.height * this.currentZoomFactor;
  }

  public getCurrentZoomFactor(): number {
    return this.currentZoomFactor;
  }

  public updateZoomFactor(zoomIn: boolean): void{
    if (zoomIn) {
      this.zoomExponent--;
    } else {
      this.zoomExponent++;
    }
    this.currentZoomFactor = Math.pow(this.zoomStep, this.zoomExponent);
  }

  public setXY(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  public getXY(): Position {
    return new Position(this.x, this.y);
  }
}
