import {Injectable} from '@angular/core';
import {Position} from "../../model/position";
import {Deactivatable} from "./deactivatable";
import {CachingService} from "./caching/caching.service";

@Injectable({
  providedIn: 'root'
})
export class RepositionService implements Deactivatable {
  private positionable?: Positionable;
  private startPosition?: Position;
  constructor(private cachingService: CachingService) { }

  public isActive(): boolean {
    return this.positionable !== undefined;
  }

  public activate(current: Positionable, startPosition: Position): void {
    this.positionable = current;
    this.startPosition = startPosition;
  }

  public update(mousePosition: Position): void {
    if (this.positionable !== undefined && this.startPosition !== undefined) {
      let difference = Position.subtract(mousePosition, this.startPosition);
      this.positionable.position = Position.add(this.positionable.position, difference);
      this.startPosition = mousePosition;
    }
  }

  public deactivate(): void {
    this.positionable = undefined;
    this.startPosition = undefined;
    this.cachingService.save();
  }
}

export interface Positionable {
  position: Position;
}
