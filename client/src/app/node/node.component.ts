import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AttachmentDirection, Node, NodeFormatter, Shape} from '../../assets/serialisation/node';
import {Position} from "../../assets/serialisation/position";
import {FormattedElement, RepositionService} from "../services/reposition.service";
import {Movable} from "../moveable";
import {Mode, ModeService} from "../services/mode.service";
import {EdgeCreationService} from "../services/edge-creation-service.service";

@Component({
  selector: '[node-component]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss']
})
export class NodeComponent extends Movable {
  @Input() node?: Node;
  @Output() nodeChange = new EventEmitter<Node>();

  constructor(repositionService: RepositionService, modeService: ModeService,
              private edgeCreationService: EdgeCreationService) {
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

  getAllAttachmentPoints(): number[] {
    let result: number[] = [];

    for (let i = 0; i < 8; i++) {
      result.push(i);
    }

    return result;
  }

  public getPosition(attachmentNumber: number): Position {
    return this.node!.formatter!.getAttachmentPointPosition(attachmentNumber as AttachmentDirection);
  }

  handleEdgeCreationClick(event: MouseEvent, direction: number): void {
    console.log("Handling click");
    if (!this.node) {
      throw new Error("Node should be set!")
    }
    if (this.edgeCreationService.isActive()) {
      this.edgeCreationService.setEnd(this.node!, direction as AttachmentDirection);
    } else {
      this.edgeCreationService.activate(this.node!, direction as AttachmentDirection);
    }
  }

  isInCreateMode(): boolean {
    return this.mode === Mode.Create;
  }


}
