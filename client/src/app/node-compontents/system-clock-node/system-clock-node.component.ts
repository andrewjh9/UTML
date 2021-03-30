import {Component, Input, OnInit} from '@angular/core';
import {SystemClockNode} from "../../../model/node/system-clock-node";

@Component({
  selector: '[system-clock-node-render]',
  templateUrl: './system-clock-node.component.html',
  styleUrls: ['./system-clock-node.component.scss']
})
export class SystemClockNodeComponent {
  @Input() node!: SystemClockNode;
}
