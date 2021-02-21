import {Mode, ModeService} from "./services/mode.service";

export abstract class ModeAwareComponent {
  protected mode: Mode;

  protected constructor(modeService: ModeService) {
    this.mode = modeService.getLatestMode();
    modeService.modeObservable.subscribe(mode => this.mode = mode);
  }
}
