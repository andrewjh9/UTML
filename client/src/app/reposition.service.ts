import { Injectable } from '@angular/core';
import {Position} from "../assets/serialisation/position";

@Injectable({
  providedIn: 'root'
})
export class RepositionService {
  private formatter?: FormattedElement;
  private startPosition?: Position;
  constructor() { }

  public isActive(): boolean {
    return this.formatter !== undefined;
  }

  public activate(current: FormattedElement, startPosition: Position): void {
    this.formatter = current;
    this.startPosition = startPosition;
  }

  public update(endPosition: Position): void {
    if (this.formatter !== undefined && this.startPosition !== undefined) {
      let difference = Position.subtract(endPosition, this.startPosition);
      let newPosition = Position.add(this.formatter.position, difference);
      this.formatter.position = newPosition;
      this.startPosition = endPosition;
    }
  }

  public deactivate(): void {
    this.formatter = undefined;
    this.startPosition = undefined;
  }
}

export interface FormattedElement {
  position: Position
}
