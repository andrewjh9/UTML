import {Position} from "../../model/position";
// import {FormattedElement} from "./reposition.service";
import {Injectable} from "@angular/core";
import {Deactivatable} from "./deactivatable";
import {Node} from "../../model/node/node";
import {CachingService} from "./caching/caching.service";

@Injectable({
  providedIn: 'root'
})
export class ResizeService implements Deactivatable {
  private node?: Node;
  private startPosition?: Position;
  private resizePointIndex?: number;
  constructor(private cachingService: CachingService) { }

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
        this.node!.height = this.node!.height - (endPosition.y - this.node!.position.y);
        this.node!.position.y = endPosition.y;
        break;
      case 1: //right
        this.node!.width = endPosition.x - this.node!.position.x;
        break;
      case 2:  //down
        this.node!.height = endPosition.y - this.node!.position.y;
        break;
      case 3: // left
        this.node!.width = this.node!.width - (endPosition.x - this.node!.position.x);
        this.node!.position.x = endPosition.x;
        break;
    }
  }

  public deactivate(): void {
    this.node = undefined;
    this.startPosition = undefined;
    this.cachingService.save();
  }
}
