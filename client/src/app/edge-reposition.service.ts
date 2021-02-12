import { Injectable } from '@angular/core';
import {Position} from "../assets/serialisation/position";
import {FormattedElement} from "./reposition.service";

@Injectable({
  providedIn: 'root'
})
export class EdgeRepositionService {
  private position?: Position;

  constructor() { }

  public isActive(): boolean {
    return this.position !== undefined;
  }

  public activate(position: Position): void {
    this.position = position;
  }

  public update(newPosition: Position): void {
    if (this.isActive()) {
      this.position!.x = newPosition.x;
      this.position!.y = newPosition.y;
    }
  }

  public deactivate(): void {
    this.position = undefined;
  }
}
