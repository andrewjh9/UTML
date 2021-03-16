import {Injectable} from '@angular/core';
import {Edge} from "../../model/edge";
import {Node} from "../../model/node/node";
import {BehaviorSubject} from "rxjs";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {DeletionService} from "./deletion.service";

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private readonly selected: BehaviorSubject<Array<Node | Edge>> = new BehaviorSubject<Array<Node | Edge>>([]);
  public readonly selectedObservable = this.selected.asObservable();

  constructor(keyboardEventCallerService: KeyboardEventCallerService) {
    keyboardEventCallerService.addCallback(['Escape', 'keydown', 'any'], (event => {
      this.deselect();
    }));
  }

  public add(value: Node | Edge): void {
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
}
