import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AttachmentDirection, Node, NodeFormatter, Shape} from '../../assets/serialisation/node';
import {Position} from "../../assets/serialisation/position";
import {FormattedElement, RepositionService} from "../services/reposition.service";
import {Movable} from "../moveable";
import {ModeService} from "../services/mode.service";

@Component({
  selector: '[node-component]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent extends Movable {
  @Input() node?: Node;
  @Output() nodeChange = new EventEmitter<Node>();

  constructor(repositionService: RepositionService, modeService: ModeService) {
    super(repositionService, modeService);
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

  getFormatter(): FormattedElement | undefined {
    return this.node?.formatter;
  }

  handleDoubleClick(event: MouseEvent): void {
    if(this.node){
      this.node.texts[0] = window.prompt("New label?") || this.node.texts[0];
    }
  }

  getAllAttachmentPoints(): Position[] {
    let result: Position[] = [];

    if (this.node?.formatter) {
      for (let i = 0; i < 8; i++) {
        result.push(this.node.formatter.getAttachmentPointPosition(i as AttachmentDirection))
      }
    }
    return result;
  }
}
