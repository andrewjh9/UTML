import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ClassNode} from "../../../model/node/class-node";
import {EditService} from "../../services/edit.service";
import {KeyboardEventCallerService} from "../../services/keyboard-event-caller.service";
import {AbstractTextNode} from "../abstract-text-node";

@Component({
  selector: '[class-node-render]',
  templateUrl: './class-node-render.component.html',
  styleUrls: ['./class-node-render.component.scss']
})
export class ClassNodeRenderComponent extends AbstractTextNode implements AfterViewInit {
  @Input() node!: ClassNode;

  constructor(editService: EditService) {
    super(editService);
  }

  ngAfterViewInit() {
    this.subscribeToEditService();
  }

  getTextLineX(index: number): number {
    const OFFSET = 5;
    return this.node.position.x + (index == 0 ? this.node.width / 2 : OFFSET);
  }

  getTextLineAnchor(index: number): string {
    return index == 0 ? 'middle' : 'left';
  }
}
