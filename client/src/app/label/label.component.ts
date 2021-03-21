import {Component, Input} from '@angular/core';
import {Label} from "../../model/label";
import {Position} from "../../model/position";
import {RepositionService} from "../services/reposition.service";
import {ModeService} from "../services/mode.service";
import {ModeAwareComponent} from "../mode-aware-component";
import {SelectionService} from "../services/selection.service";
import {LabelRepositionService} from "../services/label-reposition.service";
import {MousePositionTransformService} from "../services/mouse-position-transform.service";

@Component({
  selector: '[label-component]',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {
  @Input() label!: Label;
  isSelected: boolean = false;

  constructor(private labelRepositionService: LabelRepositionService,
              private selectionService: SelectionService,
              private mousePositionTransformService: MousePositionTransformService) {
    selectionService.selectedObservable.subscribe(selectedList => {
      this.isSelected = selectedList.includes(this.label);
      console.log(this.isSelected)
    });
  }

  handleDoubleClick(ignored: MouseEvent): void {
    this.label.value = window.prompt("New label?") || this.label.value;
  }

  lineBreakLabel() : string[]{
    return this.label.value.split("\\n");
  }

  public handleMouseDown(event: MouseEvent): void {
    if (!this.isSelected) {
      console.log('selecting')
      this.selectionService.setLabel(this.label);
    } else {
      this.labelRepositionService.activate(this.mousePositionTransformService.transformPosition(
        new Position(event.x, event.y)));
    }
  }
}
