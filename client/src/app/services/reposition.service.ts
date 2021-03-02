import {Injectable} from '@angular/core';
import {Position} from "../../assets/serialisation/position";
import {Deactivatable} from "./deactivatable";
import {SnapService} from "./snap.service";

@Injectable({
  providedIn: 'root'
})
export class RepositionService implements Deactivatable {
  private positionable?: Positionable;
  private startPosition?: Position;

  constructor(private snapService: SnapService) {}

  public isActive(): boolean {
    return this.positionable !== undefined;
  }

  public activate(current: Positionable, startPosition: Position): void {
    this.positionable = current;
    this.startPosition = startPosition;
    this.snapService.activate(current, startPosition);
  }

  public update(mousePosition: Position): void {
    if (this.positionable !== undefined && this.startPosition !== undefined) {
      if (this.snapService.isActive()) {
        this.snapService.update(mousePosition);
      }
      // let difference = Position.subtract(mousePosition, this.startPosition);
      // this.positionable.position = Position.add(this.positionable.position, difference);
      this.startPosition = mousePosition;
    }
  }

  public deactivate(): void {
    this.positionable = undefined;
    this.startPosition = undefined;
    this.snapService.deactivate();
  }
}

export interface Positionable {
  position: Position;
}
