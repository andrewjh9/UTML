import {Position} from "../assets/serialisation/position";
import {FormattedElement, RepositionService} from "./reposition.service";

export abstract class Movable {
  abstract getFormatter(): FormattedElement | undefined;

  protected constructor(private repositionService: RepositionService) { }

  public handleMouseDown(event: MouseEvent): void {
    if (this.getFormatter() !== undefined) {
      this.repositionService.activate(this.getFormatter() as FormattedElement, new Position(event.clientX, event.clientY))
    }
  }
}
