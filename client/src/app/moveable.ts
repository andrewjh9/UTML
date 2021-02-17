import {Position} from "../assets/serialisation/position";
import {FormattedElement, RepositionService} from "./services/reposition.service";
import {ModeService, Mode} from "./services/mode.service";

export abstract class Movable {
  abstract getFormatter(): FormattedElement | undefined;
  private mode?: Mode;

  protected constructor(private repositionService: RepositionService, modeService: ModeService) {
    modeService.modeObservable.subscribe(mode => this.mode = mode);
  }

  public isInMoveMode(): boolean {
    return this.mode === Mode.Move;
  }

  public handleMouseDown(event: MouseEvent): void {
    if (this.isInMoveMode()) {
      if (this.getFormatter() !== undefined) {
        this.repositionService.activate(this.getFormatter() as FormattedElement, new Position(event.clientX, event.clientY))
      }
    }
  }
}
