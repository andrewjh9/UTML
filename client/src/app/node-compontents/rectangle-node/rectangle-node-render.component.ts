import {Component, Input, OnInit} from '@angular/core';
import {RectangleNode} from "../../../model/node/rectangle-node";
import {Node, StyleObject} from '../../../model/node/node';

@Component({
  selector: '[rectangle-node-render]',
  templateUrl: './rectangle-node-render.component.html',
  styleUrls: ['./rectangle-node-render.component.scss']
})
export class RectangleNodeRenderComponent {
  @Input() node!: RectangleNode;

  get style(): StyleObject {
    let copy = Node.copyStyleObject(this.node.styleObject);

    switch (this.node.highlight) {
      case 'warning':
        copy['stroke'] = 'orange';
        break;
      case 'error':
        copy['stroke'] = 'red';
        break;
      case 'success':
        copy['stroke'] = 'green';
        break;
    }

    return copy;
  }
}
