import {EventEmitter, Injectable} from '@angular/core';
import {Deactivatable} from "./deactivatable";
import {AttachmentDirection, Node} from "../../assets/serialisation/node/node";
import {Position} from "../../assets/serialisation/position";
import {Edge, LineType} from "../../assets/serialisation/edge";
import {CreationFormatterSelectionService} from "./creation-formatter-selection.service";


@Injectable({
  providedIn: 'root'
})
/**
 * Service for creating edges between nodes.
 * The start node of the edge is specified in activate and the end node is specified by setEnd.
 * The service also provides a start and end preview that can be used to provide a preview.
 * Lastly the newEdgeEmitter emits the newly created Edge upon its creation.
 */
export class EdgeCreationService implements Deactivatable {
  private startNode?: Node;
  private startAttachment?: AttachmentDirection;

  public endPreview?: Position;
  public startPreview?: Position;
  public newEdgeEmitter: EventEmitter<Edge> = new EventEmitter<Edge>();

  constructor(private creationFormatterSelectionService: CreationFormatterSelectionService) { }

  public activate(node: Node, attachment: number) {
    this.startNode = node;
    this.startAttachment = attachment;
    this.endPreview = node.getPositionOfAttachment(attachment);
    this.startPreview = node.getPositionOfAttachment(attachment);
  }

  public isActive() {
    return this.startNode !== undefined && this.startAttachment !== undefined && this.endPreview !== undefined;
  }

  public setEnd(endNode: Node, endAttachment: AttachmentDirection) {
    // if ((this.startNode === undefined)|| (this.startAttachment === undefined)) {
    //   throw new Error("Trying to set end of to be created edge while start is unset!");
    // }
    //
    // let edge: Edge = {startNode: this.startNode, endNode: endNode}
    // edge.formatter = new EdgeFormatter(this.startAttachment, endAttachment, this.startNode, endNode);
    // // for (let [key, value] of Object.entries(this.creationFormatterSelectionService.getSelectedProperty())) {
    // //   // @ts-ignore
    // //   edge.formatter[key] = value;
    // // }
    //
    // // Arcs must have 1 middle point, so we add it if needed.
    // if (edge.formatter.lineType === LineType.Arc) {
    //   edge.formatter.setDefaultMiddlePointOnArc();
    // }
    //
    // this.newEdgeEmitter.emit(edge);

    this.deactivate();
  }

  public deactivate(): void {
    this.startNode = undefined;
    this.startAttachment = undefined;
    this.endPreview !== undefined;
  }
}
