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
  @Input() node!: ClassNode;

  constructor(public editService: EditService) {
  }

  // setActive(index: number) {
  //   if (this.editService.isActive()) {
  //     this.editService.setNewLineActive(index);
  //   }
  // }
}
