import {Position} from "../../model/position";
import {Injectable} from "@angular/core";
import {Deactivatable} from "./deactivatable";
import {SnapService} from "./snap.service";
import {Node} from "../../model/node/node";
import {CachingService} from "./caching/caching.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for resizing nodes.
 */
export class ResizeService implements Deactivatable {
  private node?: Node;
  private startPosition?: Position;
  private resizePointIndex?: number;

  constructor(private snapService: SnapService,
              private cachingService: CachingService) { }

  public isActive(): boolean {
    return this.node !== undefined;
  }

  /**
   * Activate the resize service. s
   * @param node The node to be resized.
   * @param resizePointIndex The direction in which the node should be resized.
   *                         Should be between 0 and 7 (inclusive). 0 is top, 1 is top-right, 2 is right etc.
   * @throws Error if the resizePointIndex is not valid.
   */
  public activate(node: Node, resizePointIndex: number): void {
    if (resizePointIndex < 0 || resizePointIndex > 7) {
      throw new Error(`resizePointIndex should be 0..7 but is '${resizePointIndex}'`);
    }
    this.node = node;
    this.startPosition = node.position;
    this.resizePointIndex = resizePointIndex;
  }


  /**
   * Update the size and possibly the position of the node
   * @param mousePosition The position of the mouse at the time update was called.
   * @throws Error if the service is not active.
   */
  public update(mousePosition: Position): void {
    if (!this.isActive()) {
      throw new Error('Calling update while the node and startPosition are undefined. ' +
        'Service was probably not activated.');
    }

    switch (this.resizePointIndex) {
      case 0: // up
        this.handleUp(mousePosition);
        break;
      case 1: //up, right
        this.handleRight(mousePosition)
        this.handleUp(mousePosition);
        break;
      case 2:  //right
        this.handleRight(mousePosition);
        break;
      case 3: // down,right
        this.handleRight(mousePosition);
        this.handleDown(mousePosition)
        break;
      case 4:
        this.handleDown(mousePosition);
        break;
      case 5:
        this.handleDown(mousePosition);
        this.handleLeft(mousePosition);
        break;
      case 6:
        this.handleLeft(mousePosition);
        break;
      case 7:
        this.handleLeft(mousePosition);
        this.handleUp(mousePosition);
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

  /**
   * Deactivate the service. If the service was active when this was called, the diagram is cached.
   */
  public deactivate(): void {
    if (this.isActive()) {
      this.cachingService.save();
    }
    this.node = undefined;
    this.startPosition = undefined;
  }
}
