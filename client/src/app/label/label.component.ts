import {Component, Input} from '@angular/core';
import {Label} from "../../model/label";
import {Position} from "../../model/position";
import {RepositionService} from "../services/reposition.service";
import {ModeService} from "../services/mode.service";
import {ModeAwareComponent} from "../mode-aware-component";
import {SelectionService} from "../services/selection.service";
import {LabelRepositionService} from "../services/label-reposition.service";
import {MousePositionTransformService} from "../services/mouse-position-transform.service";
import {EditService} from "../services/edit.service";

@Component({
  selector: '[label-component]',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {
  @Input() label!: Label;
  isSelected: boolean = false;
  inEditMode = false;
  constructor(private labelRepositionService: LabelRepositionService,
              private selectionService: SelectionService,
              private mousePositionTransformService: MousePositionTransformService,
              private editService: EditService) {
    selectionService.selectedObservable.subscribe(selectedList => {
      this.isSelected = selectedList.includes(this.label);
    });

    this.editService.editElementObservable.subscribe(element => this.inEditMode = element === this.label);
  }

  handleDoubleClick(ignored: MouseEvent): void {
    this.editService.activate(this.label);
  }

  textRows() : string[]{
    return (this.inEditMode ? this.editService.includeCursor(this.label.value) : this.label.value).split('\\n');
  }

  public handleMouseDown(event: MouseEvent): void {
    if (!this.isSelected) {
      this.selectionService.setLabel(this.label);
    } else {
      this.labelRepositionService.activate(this.mousePositionTransformService.transformPosition(
        new Position(event.x, event.y)), this.label);
    }
  }
}
