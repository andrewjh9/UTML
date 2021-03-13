import {Component, Input} from '@angular/core';
import {Label} from "../../model/label";
import {Position} from "../../model/position";
import {RepositionService} from "../services/reposition.service";
import {ModeService} from "../services/mode.service";
import {ModeAwareComponent} from "../mode-aware-component";

@Component({
  selector: '[label-component]',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent extends ModeAwareComponent {
  @Input() label?: Label;

  constructor(private repositionService: RepositionService,
              modeService: ModeService) {
    super(modeService);
  }

  handleDoubleClick($event: MouseEvent): void {
    if (this.label) {
      this.label.value = window.prompt("New label?") || this.label.value;
    }
  }

  lineBreakLabel() : string[]{
    if (this.label){
      return this.label.value.split("\\n");
    }
    throw new Error("Somehow the application is trying to render a label which is undefined.");
  }

  public handleMouseDown(event: MouseEvent): void {
    if (this.isInMoveMode()) {
      if (this.label !== undefined) {
        this.repositionService.activate(this.label, new Position(event.clientX, event.clientY - 50));
      }
    }
  }
}
