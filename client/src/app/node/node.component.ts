import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Node, NodeFormatter, Shape} from '../../assets/serialisation/node';
import {Position} from "../../assets/serialisation/position";
import {RepositionService} from "../reposition.service";

@Component({
  selector: '[node-component]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent {
  @Input() node?: Node;
  @Output() nodeChange = new EventEmitter<Node>();
  private positionAtMouseDown?: Position;

  constructor(private repositionService: RepositionService) { }

  handleMouseDown(event: any): void {
    if (this.node?.formatter) {
      this.repositionService.activate(this.node.formatter, new Position(event.clientX, event.clientY))

    }
  }

  handleMouseUp(event: any): void {
    if (this.node?.formatter && this.positionAtMouseDown !== undefined) {
      let formatter = this.node.formatter;
      let current = new Position(event.clientX, event.clientY);
      let difference = Position.subtract(current, this.positionAtMouseDown);
      formatter.position = Position.add(formatter.position, difference);
    }
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
