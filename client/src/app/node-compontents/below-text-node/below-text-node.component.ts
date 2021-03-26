import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Node} from "../../../model/node/node";
import {AbstractTextNode} from "../abstract-text-node";
import {EditService} from "../../services/edit.service";

@Component({
  selector: '[below-node-text]',
  templateUrl: './below-text-node.component.html',
  styleUrls: ['./below-text-node.component.scss']
})
export class BelowTextNodeComponent extends AbstractTextNode implements AfterViewInit {
  @Input() node!: Node;

  constructor(editService: EditService) {
    super(editService);
  }

  ngAfterViewInit() {
    this.subscribeToEditService();
  }

  readonly FONT_SIZE = 16;

  get centerX() {
    return this.node.position.x + this.node.width / 2;
  }

  getY(index: number) {
    return this.node.position.y + this.node.height + (this.FONT_SIZE * (index + 1));
  }
}
