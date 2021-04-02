import {Component, Input, OnInit} from '@angular/core';
import {SwimlaneNode} from "../../../model/node/swimlane-node";
import {SystemBoundaryNode} from "../../../model/node/system-boundary-node";

@Component({
  selector: '[system-boundary-node-render]',
  templateUrl: './system-boundary-node.component.html',
  styleUrls: ['./system-boundary-node.component.scss']
})
export class SystemBoundaryNodeComponent {
  @Input() node!: SystemBoundaryNode;

}
