import {Position} from "../../assets/serialisation/position";
// import {FormattedElement} from "./reposition.service";
import {Injectable} from "@angular/core";
import {Deactivatable} from "./deactivatable";




@Injectable({
  providedIn: 'root'
})
export class ResizeService implements Deactivatable {
  private formatter?: FormattedResizeElement;
  private startPosition?: Position;
  private direction?: number = 0;
  constructor() { }

  public isActive(): boolean {
    return this.formatter !== undefined;
  }

  public activate(current: FormattedResizeElement, startPosition: Position): void {
    this.formatter = current;
    this.startPosition = startPosition;
  }


  public update(endPosition: Position): void {
    if (this.formatter !== undefined && this.startPosition !== undefined) {
      switch (this.direction) {
        case 0:
          this.formatter.height = this.formatter.height - (endPosition.y - this.formatter.position.y);
          this.formatter.position.y = endPosition.y;
          break;
        case 1:
          this.formatter.height = this.formatter.height - (endPosition.y - this.formatter.position.y);
          this.formatter.position.y = endPosition.y;
          this.formatter.width = endPosition.x - this.formatter.position.x;
          break;
        case 2:
          this.formatter.width = endPosition.x - this.formatter.position.x;
          break;
        case 3:
          this.formatter.height = endPosition.y - this.formatter.position.y;
          this.formatter.width = endPosition.x - this.formatter.position.x;
          break;
        case 4:
          this.formatter.height = endPosition.y - this.formatter.position.y;
          break;
        case 5:
          this.formatter.height = endPosition.y - this.formatter.position.y;
          this.formatter.width = this.formatter.width - (endPosition.x - this.formatter.position.x);
          this.formatter.position.x = endPosition.x;
          break;
        case 6:
          this.formatter.width = this.formatter.width - (endPosition.x - this.formatter.position.x);
          this.formatter.position.x = endPosition.x;
          break;
        case 7:
          this.formatter.width = this.formatter.width - (endPosition.x - this.formatter.position.x);
          this.formatter.position.x = endPosition.x;
          this.formatter.height = this.formatter.height - (endPosition.y - this.formatter.position.y);
          this.formatter.position.y = endPosition.y;
          break;
      }

    }
  }

  public deactivate(): void {
    this.formatter = undefined;
    this.startPosition = undefined;
  }
}

export interface FormattedResizeElement {
  position: Position
  width: number
  height: number
}
