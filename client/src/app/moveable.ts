import {Position} from "../assets/serialisation/position";
import {FormattedElement, RepositionService} from "./services/reposition.service";
import {ModeService, Mode} from "./services/mode.service";

export abstract class Movable {
  abstract getFormatter(): FormattedElement | undefined;
  protected mode: Mode;

  protected constructor(protected repositionService: RepositionService, modeService: ModeService) {
    modeService.modeObservable.subscribe(mode => this.mode = mode);
    this.mode = modeService.getLatestMode();
  }

  public isInMoveMode(): boolean {
    return this.mode === Mode.Move;
  }
}
