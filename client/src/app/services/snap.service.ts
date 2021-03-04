import { Injectable } from '@angular/core';
// import {Node} from "../../assets/serialisation/node/node";
import {Position} from "../../assets/serialisation/position";
// import {Positionable} from "./reposition.service";

@Injectable({
  providedIn: 'root'
})
export class SnapService {

  constructor() { }
  private snappy: boolean = false;

  public isActive(): boolean {
     return this.snappy;
  }

  public setActive(snappy: boolean): void {
    this.snappy = snappy;
  }

  public snapIfApplicable(position: Position, accuracy: number): Position {
    console.log(this.snappy)
    if (this.snappy) {
      let corners: Position[] = [
        new Position(Math.floor(position.x/accuracy)*accuracy, Math.floor(position.y/accuracy)*accuracy),
        new Position(Math.ceil(position.x/accuracy)*accuracy, Math.floor(position.y/accuracy)*accuracy),
        new Position(Math.ceil(position.x/accuracy)*accuracy, Math.ceil(position.y/accuracy)*accuracy),
        new Position(Math.floor(position.x/accuracy)*accuracy, Math.ceil(position.y/accuracy)*accuracy)
      ];
      let arr: number[] = new Array(corners.length);
      for (let i = 0; i < corners.length; i++){
        arr[i] = Position.getDistance(position, corners[i]);
      }
      let min: number = Math.min(...arr);
      let index: number = arr.indexOf(min);
      return corners[index]
    } else {
      return position
    }

  }

  // public deactivate(): void {
  //   this.snappy = false;
  // }
}

export interface Positionable {
  position: Position;
}
