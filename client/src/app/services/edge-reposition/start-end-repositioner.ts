import {Edge} from "../../../model/edge/edge";
import {Node} from "../../../model/node/node";
import {Position} from "../../../model/position";
import {Injectable} from "@angular/core";
import {SnapService} from "../snap.service";
import {DiagramContainerService} from "../diagram-container.service";
import {CachingService} from "../caching/caching.service";

/**
 * Class responsible for repositioning the start and end points of an edge.
 * This class is meant to be used as a singleton, only a single instance should ever be created.
 * It is also responsible for updating the startNode and endNode properties of the edge if applicable.
 * Lastly it also snaps to attachmentPoints of nodes during updates if their distance is within the SNAP_DISTANCE
 */
@Injectable({
  'providedIn': 'root'
})
export class StartEndRepositioner {
  private nodes: Node[];
  private readonly SNAP_DISTANCE: number = 25;
  private edge?: Edge;
  private isStart?: boolean;

  constructor(private snapService: SnapService,
              private cachingService: CachingService,
              diagramContainerService: DiagramContainerService) {
    this.nodes = diagramContainerService.get().nodes;
    diagramContainerService.diagramObservable.subscribe(diagram => this.nodes = diagram.nodes);
  }

  /**
   * Returns whether the StartEndRepositioner is currently active.
   * @returns true if active, false otherwise.
   */
  public isActive(): boolean {
    // return this.edge !== undefined && this.isStart !== undefined;
    return this.edge !== undefined;
  }

  /**
   * Activate the repositioner.
   * @param edge The edge of which the start or end will be repositioned.
   * @param isStart Set to true if you want to move the start, set to false if you want to move the end.
   */
  public activate(edge: Edge, isStart: boolean): void {
    this.edge = edge;
    this.isStart = isStart;
  }

  /**
   * Update the start/end position to the provided position. Snaps to attachment point if within SNAP_DISTANCE.
   * @param position
   */
  public update(position: Position): void {
    let foundNode: undefined | Node = undefined;
    let foundAttachment: undefined | number = undefined;

    for (let node of this.nodes) {
      let attachmentPoint = StartEndRepositioner.getAttachmentPoint(node, position, this.SNAP_DISTANCE);
      if (attachmentPoint !== -1) {
        foundNode = node;
        foundAttachment = attachmentPoint;
        break;
      }
    }

    if (foundNode !== undefined && foundAttachment !== undefined) {
      this.set(foundAttachment, foundNode);
    } else {
      this.set(position, undefined);
    }
  }

  private set(position: Position | number, node: Node | undefined) {
    if (position instanceof Position) {
      position = this.snapService.snapIfApplicable(position, 5);
    }

    if (this.isStart) {
      this.edge!.startPosition = position;
      this.edge!.startNode = node;
    } else {
      this.edge!.endPosition = position;
      this.edge!.endNode = node;
    }
  }

  /**
   * Deactivate the repositioner.
   */
  public deactivate(): void {
    if (this.isActive()) {
      this.cachingService.save();
    }
    this.edge = undefined;
    this.isStart = undefined;
  }

  /**
   * Determine for a certain node on which attachmentPosition a given position lies.
   * It can allow a certain error, as we can not expect users to be perfectly accurate.
   * If no attachment point lies within the error, -1 is returned.
   * @param node The node of which the attachmentPoints will be checked
   * @param position The position which may lie on an attachment point.
   * @param allowed_error The index of the attachment on which the given position approximately lies
   *                      or -1 if it the position does not lie on any attachment points.
   */
  public static getAttachmentPoint(node: Node, position: Position, allowed_error: number): number {
    let attachmentPoints = node.getAllAttachmentPoints();
    for (let i = 0; i < attachmentPoints.length; i++) {
      let attachmentPoint = attachmentPoints[i];
      if (Position.getDistance(attachmentPoint, position) <= allowed_error) {
        return i;
      }
    }

    return -1;
  }
}
