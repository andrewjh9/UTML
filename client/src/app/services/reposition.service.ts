import {Injectable} from '@angular/core';
import {Position} from "../../model/position";
import {Deactivatable} from "./deactivatable";
import {CachingService} from "./caching/caching.service";
import {SnapService} from "./snap.service";
import {SelectionService} from "./selection.service";
import {Node} from "../../model/node/node";

@Injectable({
  providedIn: 'root'
})
export class RepositionService implements Deactivatable {
  private startMousePosition?: Position;
  private selectedNodes: Array<Node> = [];
  private startPositions: Array<Position> = [];

  constructor(private snapService: SnapService,
              private cachingService: CachingService,
              selectionService: SelectionService) {
    selectionService.selectedObservable.subscribe(selectedList => {
      this.selectedNodes = selectedList.filter(n => n instanceof Node).map(n => <Node> n);
    });
  }

  public isActive(): boolean {
    return this.startMousePosition !== undefined;
  }

  public activate(startPosition: Position): void {
    if (this.selectedNodes.length > 0) {
      this.startPositions = this.selectedNodes.map(node => node.position);
      this.startMousePosition = startPosition;

    }
  }

  public update(mousePosition: Position): void {
    let difference = this.snapService.snapIfApplicable(Position.subtract(mousePosition, this.startMousePosition!));
    this.selectedNodes.forEach((node, index) => {
      node.position = Position.add(this.startPositions[index], difference)
    });
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
