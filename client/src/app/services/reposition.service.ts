import {Injectable} from '@angular/core';
import {Position} from "../../model/position";
import {Deactivatable} from "./deactivatable";
import {CachingService} from "./caching/caching.service";
import {SnapService} from "./snap.service";

@Injectable({
  providedIn: 'root'
})
export class RepositionService implements Deactivatable {
  private positionable?: Positionable;
  private startPosition?: Position;
  private difference?: Position;

  constructor(private snapService: SnapService, private cachingService: CachingService) { }

  public isActive(): boolean {
    return this.positionable !== undefined;
  }

  public activate(current: Positionable, startPosition: Position): void {
    this.positionable = current;
    this.startPosition = startPosition;
    // this.snapService.activate(current, startPosition);
    this.difference = Position.subtract(this.positionable.position, this.startPosition);
  }

  public update(mousePosition: Position): void {
    if (this.positionable !== undefined && this.startPosition !== undefined && this.difference !== undefined) {
      // if (this.snapService.isActive()) {
      let snappedPosition: Position = this.snapService.snapIfApplicable(Position.add(mousePosition, this.difference), 10);
      this.positionable.position = snappedPosition;
        // }
      this.startPosition = mousePosition;
    }
  }

  public deactivate(): void {
    this.positionable = undefined;
    this.startPosition = undefined;
    this.difference = undefined;
    this.cachingService.save();
  }
}

export interface Positionable {
  position: Position;
}
