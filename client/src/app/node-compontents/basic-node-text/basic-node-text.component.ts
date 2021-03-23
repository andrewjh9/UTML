import {Component, Input} from '@angular/core';
import {Node} from "../../../model/node/node";
import {EditService} from "../../services/edit.service";

@Component({
  selector: '[basic-node-text]',
  templateUrl: './basic-node-text.component.html',
  styleUrls: ['./basic-node-text.component.scss']
})
export class BasicNodeTextComponent {
  @Input() node!: Node;
  readonly FONT_SIZE = 16;

  constructor(public editService: EditService) {}

  get lineAmount(): number {
    return this.node!.getTextLines().length;
  }

  get centerX(): number {
    return this.node.position.x + this.node.width / 2;
  }

  get centerY(): number {
    return this.node.position.y + this.node.height / 2;
  }

  getY(lineIndex: number): number {
    const CENTER_INDEX = Math.floor(this.lineAmount / 2);
    const EVEN_ODD_OFFSET = this.lineAmount % 2 === 0 ? this.FONT_SIZE / 2 : 0;
    let offset = lineIndex - CENTER_INDEX;
    return this.centerY + (offset * this.FONT_SIZE) + EVEN_ODD_OFFSET;
  }

  setActive(index: number) {
    if (this.editService.isActive()) {
      this.editService.setNewLineActive(index);
    }
  }
}
