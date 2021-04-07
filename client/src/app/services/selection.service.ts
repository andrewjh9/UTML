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
/**
 * Service which stores which elements are selected. Selection starts off empty.
 * Pressing 'Escape' will deselect all currently selected elements.
 * If the diagram stored in the diagramContainerService is updated, all elements are deselected to prevent desync.
 */
export class SelectionService {
  private readonly selected: BehaviorSubject<Array<Node | Edge | Label>> = new BehaviorSubject<Array<Node | Edge | Label>>([]);
  /**
   * Observable for the selected elements.
   * Subscribe to this to get all updates to the selected elements.
   */
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

  /**
   * Add an element to the current selection. This leaves currently selected elements selected.
   * This does set a new list to be the selectedList and causes an update to the observable.
   * @param value The element to be added.
   */
  public add(value: Node | Edge | Label): void {
    this.selected.getValue().push(value);
    this.selected.next(this.selected.getValue().map(x => x));
  }

  /**
   * Set a single element to be deselected. This deselects any elements selected before.
   * @param value Element to be selected.
   */
  public set(value: Node | Edge | Label): void {
    this.selected.next([value]);
  }

  /**
   * Deselect all currently selected elements.
   */
  public deselect(): void {
    this.selected.next([]);
  }

  /**
   * Check whether the currently selected element is a single node.
   * @returns true if a single node is selected, false otherwise.
   */
  public isNode(): boolean {
    let selected = this.selected.getValue();
    return (selected.length === 1) && (selected[0] instanceof Node);
  }

  /**
   * Check whether the currently selected element is a single edge.
   * @returns true if a single edge is selected, false otherwise.
   */
  public isEdge(): boolean {
    let selected = this.selected.getValue();
    return (selected.length === 1) && (selected[0] instanceof Edge);
  }

  /**
   * Get the currently selected single node as a node.
   * @throws Error this.!isNode()
   */
  public getNode(): Node {
    if (!this.isNode()) {
      throw new Error("Requires a single node to be selected.");
    }
    return <Node> this.selected.getValue()[0];
  }

  /**
   * Get the currently selected single edge as a node.
   * @throws Error this.!isEdge()
   */
  public getEdge(): Edge {
    if (!this.isNode()) {
      throw new Error("Requires a single edge to be selected.");
    }
    return <Edge> this.selected.getValue()[0];
  }
}
