import {EventEmitter, Injectable} from '@angular/core';
import {Deactivatable} from "./deactivatable";
import {AttachmentDirection, Node} from "../../model/node/node";
import {Position} from "../../model/position";
import {Edge, LineType} from "../../model/edge";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {BehaviorSubject} from "rxjs";
import {SelectionService} from "./selection.service";


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
  private active: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public activityObservable = this.active.asObservable();

  factory: Edge | undefined = undefined;

  private startNode?: Node;
  private startAttachment?: number;

  public endPreview?: Position;
  public startPreview?: Position;

  public newEdgeEmitter: EventEmitter<Edge> = new EventEmitter<Edge>();

  constructor(private selectionService: SelectionService,
              keyboardEventCallerService: KeyboardEventCallerService) {
    this.selectionService.selectedObservable.subscribe(ignored => this.deactivate());
    keyboardEventCallerService.addCallback(['Escape', 'keydown', 'any'], (ignored) => this.deactivate())
  }

  public activate(factory: Edge): void {
    this.selectionService.deselect();
    this.factory = factory;
    this.active.next(true);
  }

  public setStart(node: Node, attachment: number) {
    this.startNode = node;
    this.startAttachment = attachment;
    this.endPreview = node.getPositionOfAttachment(attachment);
    this.startPreview = node.getPositionOfAttachment(attachment);
  }

  public isActive(): boolean {
    return this.active.getValue();
  }

  public startHasBeenSelected() {
    return this.isActive() && this.startNode !== undefined;
  }

  public setEnd(endNode: Node, endAttachment: number) {
    if (this.startNode === undefined || this.startAttachment === undefined) {
      throw new Error('Trying to set the end before start is set.')
    }

    if (endNode === this.startNode && endAttachment === this.startAttachment) {
      return this.cancel();
    }

    if (!this.isActive()) {
      throw new Error("Trying to set end whilst it is inactive!");
    }

    let edge = this.factory!.getDeepCopy();
    edge.startNode = this.startNode;
    edge.startPosition = this.startAttachment!;
    edge.endNode = endNode;
    edge.endPosition = endAttachment;

    // Arcs must have 1 middle point, so we add it if needed.
    if (edge.lineType === LineType.Arc) {
      edge.setDefaultMiddlePointOnArc();
    }

    this.newEdgeEmitter.emit(edge);
  }

  public deactivate(): void {
    this.cancel();
    this.active.next(false);
  }

  cancel() {
    this.startNode = undefined;
    this.startAttachment = undefined;
    this.endPreview = undefined;
  }
}
