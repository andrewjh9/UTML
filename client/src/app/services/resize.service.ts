import {Position} from "../../model/position";
import {Injectable} from "@angular/core";
import {Deactivatable} from "./deactivatable";
import {SnapService} from "./snap.service";
import {Node} from "../../model/node/node";
import {CachingService} from "./caching/caching.service";

@Injectable({
  providedIn: 'root'
})
export class ResizeService implements Deactivatable {
  private node?: Node;
  private startPosition?: Position;
  private resizePointIndex?: number;
  constructor(private snapService: SnapService,
              private cachingService: CachingService) { }

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
        this.handleUp(endPosition);
        break;
      case 1: //up, right
        this.handleRight(endPosition)
        this.handleUp(endPosition);
        break;
      case 2:  //right
        this.handleRight(endPosition);
        break;
      case 3: // down,right
        this.handleRight(endPosition);
        this.handleDown(endPosition)
        break;
      case 4:
        this.handleDown(endPosition);
        break;
      case 5:
        this.handleDown(endPosition);
        this.handleLeft(endPosition);
        break;
      case 6:
        this.handleLeft(endPosition);
        break;
      case 7:
        this.handleLeft(endPosition);
        this.handleUp(endPosition);
    }
  }

  private handleUp(endPosition: Position): void {
    this.node!.height = Math.round((this.node!.height - this.snapService.snapIfApplicable(Position.subtract(endPosition, this.node!.position), 10).y)/10) * 10;
    this.node!.position.y = this.snapService.snapIfApplicable(endPosition,10).y;
  }

  private handleRight(endPosition: Position): void {
    this.node!.width = this.snapService.snapIfApplicable(Position.subtract(endPosition, this.node!.position), 10).x;
  }

  private handleDown(endPosition: Position): void {
    this.node!.height = this.snapService.snapIfApplicable(Position.subtract(endPosition, this.node!.position), 10).y;
  }

  private handleLeft(endPosition: Position): void {
    this.node!.width = Math.round((this.node!.width - this.snapService.snapIfApplicable(Position.subtract(endPosition, this.node!.position), 10).x)/10) * 10;
    this.node!.position.x = this.snapService.snapIfApplicable(endPosition,10).x;
  }

  public deactivate(): void {
    if (this.isActive()) {
      console.log('Resize Service')
      this.cachingService.save();
    }
    this.node = undefined;
    this.startPosition = undefined;
  }
}
