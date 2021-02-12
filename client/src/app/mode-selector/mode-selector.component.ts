import {Component, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-mode-selector',
  templateUrl: './mode-selector.component.html',
  styleUrls: ['./mode-selector.component.scss']
})
export class ModeSelectorComponent implements OnInit {
  public mode: boolean = false;
  @Output() public modeChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {

  }

  ngOnInit(): void {
    this.emitMode();
  }

  private emitMode(): void {
    this.modeChange.emit(this.mode);
  }

  toggleMode() {
    this.mode = !this.mode;
    this.emitMode();
  }
}
