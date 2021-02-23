import {Mode, ModeService} from "./services/mode.service";

export abstract class ModeAwareComponent {
  protected mode: Mode;

  protected constructor(modeService: ModeService) {
    this.mode = modeService.getLatestMode();
    modeService.modeObservable.subscribe(mode => this.mode = mode);
  }

  public isInCreateMode(): boolean {
    return this.mode === Mode.Create;
  }

  public isInSelectMode(): boolean {
    return this.mode === Mode.Select;
  }

  public isInMoveMode(): boolean {
    return this.mode === Mode.Move;
  }
}
