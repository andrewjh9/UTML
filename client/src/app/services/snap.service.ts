import { Injectable } from '@angular/core';
import {Position} from "../../model/position";

@Injectable({
  providedIn: 'root'
})
/**
 * Service for rounding positions. This helps users with aligning elements of the diagram.
 * All positions assigned to elements of the diagram should go through snapIfApplicable.
 * The snapping services can be enabled and disabled.
 */
export class SnapService {
  private snapIsActive: boolean = true;

  /**
   * Whether the service is currently active.
   */
  public isActive(): boolean {
     return this.snapIsActive;
  }

  /**
   * Set whether the activity of the service.
   * @param snapIsActive Whether the service should be on or off.
   */
  public setSnapState(snapIsActive: boolean): void {
    this.snapIsActive = snapIsActive;
  }

  /**
   * Snap a position to the closest snapped position of that accurary.
   * For instance if accuracy is 10 then snap(1, 9) = (0, 10).
   * @param position The position to be snapped
   * @param accuracy Accuracy of the snapping.
   * @returns The snapped position whose coordinates will be multiples of the accuracy.
   */
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
      return corners[index];
    } else {
      return position;
    }
  }
}
