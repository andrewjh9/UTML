import {Injectable} from '@angular/core';
import {Edge} from "../../model/edge";
import {Node} from "../../model/node/node";
import {BehaviorSubject} from "rxjs";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {DeletionService} from "./deletion.service";
import {DiagramContainerService} from "./diagram-container.service";
import {Label} from "../../model/label";

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private readonly selected: BehaviorSubject<Array<Node | Edge | Label>> = new BehaviorSubject<Array<Node | Edge | Label>>([]);
  public readonly selectedObservable = this.selected.asObservable();

  constructor(keyboardEventCallerService: KeyboardEventCallerService,
              diagramContainerService: DiagramContainerService) {
    keyboardEventCallerService.addCallback(['Escape', 'keydown', 'any'], (event => {
      this.deselect();
    }));

    // When the diagram reference is updated, the references to nodes and edges are too.
    // Therefore our selected objects may be de-synced. To prevent de-sync bugs,  we simply deselect.
    diagramContainerService.diagramObservable.subscribe(ignored => {
      this.deselect();
    });
  }

  public add(value: Node | Edge | Label): void {
    this.selected.getValue().push(value);
    this.selected.next(this.selected.getValue().map(x => x));
  }

  public setNode(value: Node): void {
    this.selected.next([value]);
  }

  public setEdge(value: Edge): void {
    this.selected.next([value]);
  }

  public deselect(): void {
    this.selected.next([]);
  }

  public isNode(): boolean {
    let selected = this.selected.getValue();
    return (selected.length === 1) && (selected[0] instanceof Node);
  }

  public isEdge(): boolean {
    let selected = this.selected.getValue();
    return (selected.length === 1) && (selected[0] instanceof Edge);
  }

  public getNode(): Node {
    if (!this.isNode()) {
      throw new Error("Requires a single node to be selected.");
    }
    return <Node> this.selected.getValue()[0];
  }

  public getEdge(): Edge {
    if (!this.isNode()) {
      throw new Error("Requires a single edge to be selected.");
    }
    return <Edge> this.selected.getValue()[0];
  }

  public setLabel(label: Label) {
    this.selected.next([label]);
  }
}
