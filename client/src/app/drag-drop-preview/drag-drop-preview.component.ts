import { Component, OnInit } from '@angular/core';
import {Edge} from "../../model/edge";
import {DragDropCreationService} from "../services/drag-drop-creation.service";
import {Node} from "../../model/node/node";

@Component({
  selector: '[drag-drop-preview]',
  templateUrl: './drag-drop-preview.component.html',
  styleUrls: ['./drag-drop-preview.component.scss']
})
export class DragDropPreviewComponent {
  current: Node | Edge | undefined = undefined;

  constructor(dragDropCreationService: DragDropCreationService) {
    dragDropCreationService.selectedObservable.subscribe(value => this.current = value);
  }

  get x(): number {
    if (this.current === undefined) {
      return -1;
    } else if (this.current instanceof Node) {
      return (this.current as Node).position.x;
    } else {
      return (this.current as Edge).getStartPosition().x;
    }
  }

  get y(): number {
    if (this.current === undefined) {
      return -1;
    } else if (this.current instanceof Node) {
      return (this.current as Node).position.y;
    } else {
      return (this.current as Edge).getStartPosition().y;
    }
  }

  get width(): number {
    if (this.current === undefined) {
      return -1;
    } else if (this.current instanceof Node) {
      return (this.current as Node).width;
    } else {
      let edge = this.current as Edge;
      return edge.getEndPosition().x - edge.getStartPosition().x;
    }
  }

  get height(): number {
    if (this.current === undefined) {
      return -1;
    } else if (this.current instanceof Node) {
      return (this.current as Node).height;
    } else {
      let edge = this.current as Edge;
      return edge.getEndPosition().y - edge.getStartPosition().y;
    }
  }
}
