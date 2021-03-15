import {Component, Input, OnInit} from '@angular/core';
import {ClassNode} from "../../../model/node/class-node";
import {EditService} from "../../services/edit.service";
import {KeyboardEventCallerService} from "../../services/keyboard-event-caller.service";

@Component({
  selector: '[class-node-render]',
  templateUrl: './class-node-render.component.html',
  styleUrls: ['./class-node-render.component.scss']
})
export class ClassNodeRenderComponent {
  public isInEditMode: boolean = false;
  @Input() node!: ClassNode;

  constructor(public editService: EditService,
              private keyboardEventCallerService: KeyboardEventCallerService) {
  }

  addLine() {
    this.editService.addField()
  }

  setActive(index: number) {
    this.editService.setActive(index)
  }



  activateEditMode() {
    if (this.node) {
      this.isInEditMode = true;
      this.editService.activate(this.node);
    }
  }
}
