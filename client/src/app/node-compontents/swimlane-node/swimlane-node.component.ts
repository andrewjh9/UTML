import {Component, Input, OnInit} from '@angular/core';
import {SwimlaneNode} from "../../../model/node/swimlane-node";

@Component({
  selector: '[swimlane-node-render]',
  templateUrl: './swimlane-node.component.html',
  styleUrls: ['./swimlane-node.component.scss']
})
export class SwimlaneNodeComponent {
  @Input() node!: SwimlaneNode;



}
