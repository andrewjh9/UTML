import {Position} from "../../model/position";
// import {FormattedElement} from "./reposition.service";
import {Injectable} from "@angular/core";
import {Deactivatable} from "./deactivatable";
import {SnapService} from "./snap.service";
import {Node} from "../../model/node/node";
import {CachingService} from "./caching/caching.service";
import {MousePositionTransformService} from "./mouse-position-transform.service";

@Injectable({
  providedIn: 'root'
})
export class ResizeService implements Deactivatable {
  private node?: Node;
  private startPosition?: Position;
  private resizePointIndex?: number;
  constructor(private snapService: SnapService,
              private cachingService: CachingService,
              private mousePositionTransformService: MousePositionTransformService) { }

  public isActive(): boolean {
    return this.node !== undefined;
  }

  public activate(current: Node, resizePointIndex: number): void {
    this.node = current;
    this.startPosition = current.position;
    this.resizePointIndex = resizePointIndex;
  }


  public update(endPosition: Position): void {
    if (!this.isActive()) {
      throw new Error('Calling update while the node and startPosition are undefined. ' +
        'Service was probably not activated.');
    }

    switch (this.resizePointIndex) {
      case 0: // up
        this.node!.height = Math.round((this.node!.height - this.snapService.snapIfApplicable(Position.subtract(endPosition, this.node!.position), 10).y)/10) * 10;
        this.node!.position.y = this.snapService.snapIfApplicable(endPosition,10).y;
        break;
      case 1: //right
        this.node!.width = this.snapService.snapIfApplicable(Position.subtract(endPosition, this.node!.position), 10).x;
        break;
      case 2:  //down
        this.node!.height = this.snapService.snapIfApplicable(Position.subtract(endPosition, this.node!.position), 10).y;
        break;
      case 3: // left
        this.node!.width = Math.round((this.node!.width - this.snapService.snapIfApplicable(Position.subtract(endPosition, this.node!.position), 10).x)/10) * 10;
        this.node!.position.x = this.snapService.snapIfApplicable(endPosition,10).x;
        break;
    }
  }

  public deactivate(): void {
    if (this.isActive()) {
      this.cachingService.save();
    }
    this.node = undefined;
    this.startPosition = undefined;
  }
}
