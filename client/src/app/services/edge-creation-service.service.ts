import {EventEmitter, Injectable} from '@angular/core';
import {Deactivatable} from "./deactivatable";
import {AttachmentDirection, Node} from "../../assets/serialisation/node";
import {Position} from "../../assets/serialisation/position";
import {Edge, EdgeFormatter} from "../../assets/serialisation/edge";


@Injectable({
  providedIn: 'root'
})
export class EdgeCreationService implements Deactivatable {
  private startNode?: Node;
  private startAttachment?: AttachmentDirection;
  public endPreview?: Position;
  public newEdgeEmitter: EventEmitter<Edge> = new EventEmitter<Edge>();

  constructor() { }

  public activate(node: Node, attachment: AttachmentDirection) {
    console.log("Activating");
    this.startNode = node;
    this.startAttachment = attachment;
    this.endPreview = node.formatter!.getAttachmentPointPosition(attachment);
    console.log(this.startNode);
    console.log(this.startAttachment);
  }

  public isActive() {
    return this.startNode !== undefined && this.startAttachment !== undefined && this.endPreview !== undefined;
  }

  public setEnd(endNode: Node, endAttachment: AttachmentDirection) {
    console.log("setting end")
    console.log(this.startNode);
    console.log(this.startAttachment);

    if ((this.startNode === undefined)|| (this.startAttachment === undefined)) {
      throw new Error("Trying to set end of to be created edge while start is unset!");
    }
    let edge: Edge = {startNode: this.startNode, endNode: endNode}
    edge.formatter = new EdgeFormatter(this.startAttachment, endAttachment, this.startNode, endNode);
    this.newEdgeEmitter.emit(edge);

    this.deactivate();
  }

  public deactivate(): void {
    this.startNode = undefined;
    this.startAttachment = undefined;
    this.endPreview !== undefined;
  }

  get startPosition(): Position | undefined {
    if (this.startNode?.formatter && this.startAttachment) {
      return this.startNode.formatter.getAttachmentPointPosition(this.startAttachment);
    } else {
      return undefined;
    }
  }
}
