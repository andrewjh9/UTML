import {ChangeDetectorRef, Component, Input, NgZone} from '@angular/core';
import {Mode, ModeService} from "../services/mode.service";

@Component({
  selector: 'app-mode-selector',
  templateUrl: './mode-selector.component.html',
  styleUrls: ['./mode-selector.component.scss']
})
export class ModeSelectorComponent {
  @Input() mode: Mode;
  ModeType = Mode;
  constructor(private modeService: ModeService) {
    modeService.modeObservable.subscribe((mode: Mode) => this.mode = mode);
    this.mode = modeService.getLatestMode();
  }

  inSelectMode(): boolean {
    return this.mode === Mode.Select;
  }

  inCreateMode(): boolean {
    return this.mode === Mode.Create;
  }

  inMoveMode(): boolean {
    return this.mode === Mode.Move;
  }

  setMode(mode: Mode): void {
    this.modeService.setMode(mode);
  }
}
