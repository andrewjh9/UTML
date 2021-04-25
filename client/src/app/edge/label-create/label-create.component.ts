import {Component, Input, OnInit} from '@angular/core';
import {Edge} from "../../../model/edge";
import {Position} from "../../../model/position";

@Component({
  selector: '[label-create]',
  templateUrl: './label-create.component.html',
  styleUrls: ['./label-create.component.scss']
})
export class LabelCreateComponent {
  @Input() edge!: Edge;
  @Input() location!: 'start' | 'middle' | 'end';

  constructor() { }

  get position(): Position {
    return Position.add(this.edge.getLabelPosition(this.location), new Position(0, 10));
  }

  handleClick() {
    switch (this.location) {
      case 'start':
        this.edge.addStartLabel('s');
        break;
      case 'middle':
        this.edge.addMiddleLabel('m');
        break;
      case 'end':
        this.edge.addEndLabel('e');
        break;
    }
  }
}
