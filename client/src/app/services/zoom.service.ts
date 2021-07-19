import {EventEmitter, Injectable} from '@angular/core';
import {Position} from "../../model/position";
import {DiagramComponent} from "../diagram/diagram.component";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for zooming and panning around the diagram
 */
export class ZoomService {
  private x: number = 0;
  private y: number = 0;
  private width: number = window.innerWidth || document.body.clientWidth;
  private height: number = window.innerHeight - DiagramComponent.NAV_HEIGHT || document.body.clientHeight - DiagramComponent.NAV_HEIGHT;
  private currentZoomFactor: number = 1;
  private zoomStep: number = 1.1;
  private zoomExponent = 0;
  /** Anytime the zoomService's internal state is changes updateEmitter.emit() is called. */
  public readonly updateEmitter: EventEmitter<any> = new EventEmitter();
  public readonly resizeEmitter: EventEmitter<any> = new EventEmitter<any>();

  /**
   * Value holding the viewBox we are using to export the canvas to a PNG.
   * If null, return value of getViewBox() should be determined by the zoom part of the service
   * If not null, the stored viewBox string should be returned by getViewBox().
   */
  private downloadViewBox: string | null = null;

  public setDownloadViewBox(value: string): void {
    this.downloadViewBox = value;
  }

  public unsetDownloadViewBox(): void {
    this.downloadViewBox = null;
  }

  /**
   * Get the correctly moved and zoomed value that can be assigned to the 'viewbox' attribute of the svg tag.
   */
  public getViewBox(): string {
    if (this.downloadViewBox == null) {
      return "" + this.x + " " + this.y + " " + this.getZoomedWidth() + " " + this.getZoomedHeight();
    } else {
      return this.downloadViewBox;
    }
  }

  public getCurrentZoomFactor(): number {
    return this.currentZoomFactor;
  }

  public updateZoomFactor(zoomIn: boolean): void {
    if (zoomIn) {
      this.zoomExponent--;
    } else {
      this.zoomExponent++;
    }
    this.currentZoomFactor = Math.pow(this.zoomStep, this.zoomExponent);
    this.updateEmitter.emit();
  }

  /**
   * Set which coordinates will be the top-left of the view shown to the user.
   * This method ensures that this.x and this.y will both always be larger than 0.
   * @param dx The difference in the x-coordinate
   * @param dy The difference to the y-coordinate
   */
  public setXY(dx: number, dy: number) {
    this.x = max(0, this.x + dx);
    this.y = max(0, this.y + dy);
    this.updateEmitter.emit();
  }

  public getXY(): Position {
    return new Position(this.x, this.y);
  }

  public getZoomedWidth(): number {
    return this.width * this.currentZoomFactor;
  }

  public getZoomedHeight(): number {
    return this.height * this.currentZoomFactor;
  }

  public reset() {
    this.zoomExponent = 0;
    this.currentZoomFactor = Math.pow(this.zoomStep, this.zoomExponent);
    this.x = 0;
    this.y = 0;
    this.updateEmitter.emit();
  }

  public handleResize(innerWidth: number, innerHeight: number) {
    this.width = innerWidth;
    this.height = innerHeight - DiagramComponent.NAV_HEIGHT;
    this.resizeEmitter.emit();
  }

  get baseWidth(): number {
    return this.width;
  }

  get baseHeight(): number {
    return this.height;
  }
}

function max(a: number, b: number): number {
  return a < b ? b : a;
}
