import {EventEmitter, Injectable} from '@angular/core';
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {Edge, LineType} from "../../model/edge";
import {Node} from "../../model/node/node";
import {Position} from "../../model/position";
import {BehaviorSubject, Observable} from "rxjs";
import {SnapService} from "./snap.service";
import {SelectionService} from "./selection.service";


@Injectable({
  providedIn: 'root'
})
export class DragDropCreationService {
  private selected: BehaviorSubject<Node | Edge | undefined> = new BehaviorSubject<Node|Edge|undefined>(undefined);
  public readonly selectedObservable: Observable<Node | Edge | undefined> = this.selected.asObservable();
  public readonly createdEmitter: EventEmitter<Node | Edge> = new EventEmitter<Node|Edge>();

  constructor(keyboardEventCaller: KeyboardEventCallerService,
              private snapService: SnapService,
              private selectionService: SelectionService) {
    keyboardEventCaller.addCallback(['Escape', 'keydown', 'any'], (ignored) => this.cancel());
  }

  public isActive(): boolean {
    return this.selected.getValue() !== undefined;
  }

  public activate(prototype: Edge | Node): void {
    if (this.isActive()) {
      throw new Error('Trying to activate the DragDropCreationService but it already is active.');
    }
    let copy = prototype.getDeepCopy();
    if (copy instanceof Node) {
      let node = copy as Node;
      node.position = new Position(-node.width, -node.height);
    } else {
      let edge = copy as Edge;
      edge.startPosition = new Position(-100, -100);
      edge.endPosition = Position.zero();
    }
    this.selected.next(copy.getDeepCopy());
  }

  public update(position: Position): void {
    if(!this.isActive()) {
      throw new Error('Trying to update the DragDropService while it is not active');
    }

    if (this.selected.getValue() instanceof Node) {
      let node = this.selected.getValue() as Node;
      // Calculations to make the mouse the center of the object, in stead of the top-right.
      node.position = this.snapService.snapIfApplicable(Position.subtract(position, new Position(node.width / 2, node.height / 2)));
    } else {
      let edge = this.selected.getValue() as Edge;
      edge.startPosition = position;
      const OFFSET = 100;
      edge.endPosition = Position.add(new Position(OFFSET, 0), position);

      if (edge.lineType === LineType.Arc) {
        edge.middlePositions = [];
        edge.setDefaultMiddlePointOnArc();
      }
    }
  }

  public cancel() {
    this.selected.next(undefined);
  }

  public create() {
    let value = this.selected.getValue();
    if (value instanceof Edge && (value as Edge).lineType === LineType.Arc) {
      (value as Edge).middlePositions = [];
      (value as Edge).setDefaultMiddlePointOnArc();
    } else if (value instanceof Node) {
      value.width = Math.ceil(value.width / 10) * 10;
      value.height = Math.ceil(value.height / 10) * 10;
    }
    this.createdEmitter.emit(value);
    this.selected.next(undefined);
    setTimeout(() => this.selectionService.set(value!), 50);
  }

  public getSelected() {
    return this.selected.getValue();
  }
}

