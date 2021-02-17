import {ChangeDetectorRef, Component, Input, NgZone} from '@angular/core';
import {Mode, ModeService} from "../services/mode.service";

@Component({
  selector: 'app-mode-selector',
  templateUrl: './mode-selector.component.html',
  styleUrls: ['./mode-selector.component.scss']
})
export class ModeSelectorComponent {
  @Input() mode: Mode;
  constructor(private modeService: ModeService) {
    modeService.modeOb.subscribe((mode :Mode)=> this.mode = mode);
    this.mode = Mode.Create;
  }
}
