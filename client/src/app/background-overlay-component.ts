import {ZoomService} from "./services/zoom.service";

export abstract class BackgroundOverlayComponent {
  x!: number;
  y!: number;
  width!: number;
  height!: number;

  protected constructor(zoomService: ZoomService) {
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
