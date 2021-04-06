import {Component, Input, OnInit} from '@angular/core';
import {SequenceControlFlowNode} from "../../../model/node/sequence-control-flow-node";
import {Position} from "../../../model/position";
import {AbstractTextNode} from "../abstract-text-node";
import {EditService} from "../../services/edit.service";
import {Node} from "../../../model/node/node";

@Component({
  selector: '[sequence-control-flow-node-render]',
  templateUrl: './sequence-control-flow-node.component.html',
})
export class SequenceControlFlowNodeComponent extends AbstractTextNode {
  @Input() node!: Node;

  constructor(editService: EditService) {
    super(editService);
  }

  get path(): string {
    return `M ${this.node.position.x} ${this.node.position.y + 25} L ${this.node.position.x + 50} ${this.node.position.y + 25} L ${this.node.position.x + 75} ${this.node.position.y} L ${this.node.position.x} ${this.node.position.y}`
  }

  get textPos(): Position {
    return new Position(this.node.position.x + 25, this.node.position.y + 12.5);
  }

  get name(): string {
    return (<SequenceControlFlowNode> this.node).name;
  }
}
