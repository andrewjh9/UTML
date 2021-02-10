import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Node, NodeFormatter, Shape} from '../../assets/serialisation/node';
import {Position} from "../../assets/serialisation/position";

@Component({
  selector: '[node-component]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {
  @Input() node?: Node;
  @Output() nodeChange = new EventEmitter<Node>();
  constructor() {
    // this.node = {
    //   shape: Shape.Rectangle,
    //   width: 100,
    //   height: 100,
    //   position: {x: 10, y: 110},
    //   texts: ['something']
    // };
  }

  // This check is done here to easily handle undefined and as Shape is not defined in the .html
  isRectangle(): boolean {
    return this.node?.formatter?.shape == Shape.Rectangle;
  }

  isEllipse(): boolean {
    return this.node?.formatter?.shape == Shape.Ellipse;
  }

  isDiamond(): boolean {
    return this.node?.formatter?.shape == Shape.Diamond;
  }

  getDiamondPoints(): string {
    if (this.node?.formatter) {
      let formatter: NodeFormatter = this.node.formatter;
      let points: string[] = [
        new Position(formatter.position.x + formatter.width / 2, formatter.position.y),
        new Position(formatter.position.x + formatter.width, formatter.position.y + formatter.height / 2),
        new Position(formatter.position.x + formatter.width / 2, formatter.position.y + formatter.height),
        new Position(formatter.position.x, formatter.position.y + formatter.height / 2),
        new Position(formatter.position.x + formatter.width / 2, formatter.position.y)
      ].map((pos: Position) => pos.toString());
      return points.join();
    }
     else {
      return '';
    }
  }
}
