import { Injectable } from '@angular/core';
import {Position} from "../../model/position";

@Injectable({
  providedIn: 'root'
})
export class SnapService {
  private snapIsActive: boolean = true;

  public isActive(): boolean {
     return this.snapIsActive;
  }

  public setSnapState(snapIsActive: boolean): void {
    this.snapIsActive = snapIsActive;
  }

  public snapIfApplicable(position: Position, accuracy: number = 10): Position {
    if (this.snapIsActive) {
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
}
