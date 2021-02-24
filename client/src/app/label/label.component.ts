import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LabelFormatter} from "../../assets/serialisation/label";
import {Position} from "../../assets/serialisation/position";
import {RepositionService} from "../services/reposition.service";
import {SafeHtml} from "@angular/platform-browser";
import {Mode, ModeService} from "../services/mode.service";

@Component({
  selector: '[label-component]',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {
  @Input() formatter?: LabelFormatter;
  @Input() label?: string;
  @Output() labelChange: EventEmitter<string> = new EventEmitter<string>();
  private mode: Mode;

  constructor(private repositionService: RepositionService,
              modeService: ModeService) {
    this.mode = modeService.getLatestMode();
    modeService.modeObservable.subscribe(mode => this.mode = mode);
  }

  handleDoubleClick($event: MouseEvent): void {
    this.label = window.prompt("New label?") || this.label;
    this.labelChange.emit(this.label);
  }

  getFormatter(): LabelFormatter | undefined {
    return this.formatter;
  }

  lineBreakLabel() : string[]{
    if (this.label){
      return  this.label.split("\\n");
    }
    return []
  }

  public handleMouseDown(event: MouseEvent): void {
    if (this.isInMoveMode()) {
      if (this.formatter !== undefined) {
        this.repositionService.activate(this.formatter, new Position(event.clientX, event.clientY));
      }
    }
  }

  isInMoveMode(): boolean {
    return this.mode === Mode.Move;
  }
}
