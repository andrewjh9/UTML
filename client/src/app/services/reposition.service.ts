import {Injectable} from '@angular/core';
import {Position} from "../../model/position";
import {Deactivatable} from "./deactivatable";
import {CachingService} from "./caching/caching.service";
import {SnapService} from "./snap.service";
import {SelectionService} from "./selection.service";
import {Node} from "../../model/node/node";
import {Edge} from "../../model/edge";

@Injectable({
  providedIn: 'root'
})
export class RepositionService implements Deactivatable {
  private startMousePosition?: Position;
  private selectedNodes: Array<Node> = [];
  private nodeStartPositions: Array<Position> = [];
  private selectedEdges: Array<Edge> = [];
  private edgeStartPositionsPoints: Array<undefined | Position> = [];
  private edgeEndPositionsPoints: Array<undefined | Position> = [];
  private edgeMiddlePositions: Array<Array<Position>> = [];



  constructor(private snapService: SnapService,
              private cachingService: CachingService,
              selectionService: SelectionService) {
    selectionService.selectedObservable.subscribe(selectedList => {
      this.selectedNodes = selectedList.filter(n => n instanceof Node).map(n => <Node> n);
      this.selectedEdges = selectedList.filter(e => e instanceof Edge).map(e => <Edge> e);
    });
  }

  public isActive(): boolean {
    return this.startMousePosition !== undefined;
  }

  public activate(startPosition: Position): void {
    this.startMousePosition = startPosition;

    if (this.selectedNodes.length > 0) {
      this.nodeStartPositions = this.selectedNodes.map(node => node.position);
    }

    if (this.selectedEdges.length > 0) {
      console.log(this.selectedEdges)
      this.edgeStartPositionsPoints = this.selectedEdges.map(e => {
        return e.startPosition instanceof Position ? e.startPosition : undefined;
      });
      this.edgeEndPositionsPoints = this.selectedEdges.map(e => {
        return e.endPosition instanceof Position ? e.endPosition : undefined;
      });
      this.edgeMiddlePositions = this.selectedEdges.map(e => e.middlePositions.map(e => e));
    }
  }

  public update(mousePosition: Position): void {
    let difference = Position.subtract(mousePosition, this.startMousePosition!);
    this.selectedNodes.forEach((node, index) => {
      node.position = this.snapService.snapIfApplicable(Position.add(this.nodeStartPositions[index], difference));
    });

    this.selectedEdges.forEach((edge, edgeIndex) => {
      this.edgeMiddlePositions[edgeIndex].forEach((initPos, posIndex) => {
       edge.middlePositions[posIndex] = this.snapService.snapIfApplicable(Position.add(initPos, difference), 10);
      });

      if (this.edgeStartPositionsPoints[edgeIndex] !== undefined) {
        edge.startPosition = this.snapService.snapIfApplicable(Position.add(this.edgeStartPositionsPoints[edgeIndex]!, difference), 10)
      }

      if (this.edgeEndPositionsPoints[edgeIndex] !== undefined) {
        edge.endPosition = this.snapService.snapIfApplicable(Position.add(this.edgeEndPositionsPoints[edgeIndex]!, difference), 10)
      }
    })
  }

  public deactivate(): void {
    if (this.isActive()) {
      this.cachingService.save();
    }
    this.startMousePosition = undefined;
  }
}

export interface Positionable {
  position: Position;
}
