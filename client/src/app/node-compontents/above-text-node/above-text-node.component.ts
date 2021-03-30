import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {AbstractTextNode} from "../abstract-text-node";
import {EditService} from "../../services/edit.service";
import {Node} from "../../../model/node/node";

@Component({
  selector: '[above-node-text]',
  templateUrl: './above-text-node.component.html',
  styleUrls: ['./above-text-node.component.scss']
})
export class AboveTextNodeComponent extends AbstractTextNode implements AfterViewInit {
  @Input() node!: Node;

  constructor(editService: EditService) {
    super(editService)
  }

  ngAfterViewInit(): void {
    this.subscribeToEditService()
  }

  readonly FONT_SIZE = 24;

  get centerX() {
    return this.node.position.x + this.node.width / 2;
  }

  getY(index: number) {
    return this.node.position.y - ((this.node.getTextLines().length - 1) - (this.FONT_SIZE * (index + 1)));
  }
}
