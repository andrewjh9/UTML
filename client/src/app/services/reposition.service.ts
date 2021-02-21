import { Injectable } from '@angular/core';
import {Position} from "../../assets/serialisation/position";
import {Deactivatable} from "./deactivatable";
import {Node} from '../../assets/serialisation/node/node';

@Injectable({
  providedIn: 'root'
})
export class RepositionService implements Deactivatable {
  private node?: Positionable;
  private startPosition?: Position;
  constructor() { }

  public isActive(): boolean {
    return this.node !== undefined;
  }

  public activate(current: Positionable, startPosition: Position): void {
    this.node = current;
    this.startPosition = startPosition;
  }

  public update(endPosition: Position): void {
    if (this.node !== undefined && this.startPosition !== undefined) {
      let difference = Position.subtract(endPosition, this.startPosition);
      let newPosition = Position.add(this.node.position, difference);
      this.node.position = newPosition;
      this.startPosition = endPosition;
    }
  }

  public deactivate(): void {
    this.node = undefined;
    this.startPosition = undefined;
  }
}

export interface Positionable {
  position: Position;
}
