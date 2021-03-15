import { Injectable } from '@angular/core';
import {SelectionService} from "./selection.service";
import {Diagram} from "../../model/diagram";
import {Position} from "../../model/position";

@Injectable({
  providedIn: 'root'
})
/**
 * The drag selection service allow for click and drag selection of nodes and edges.
 * Nodes are selected if they are fully inside the selection area.
 * Edges are selected if both their end and start point lie in the selected area.
 */
export class DragSelectionService {
  private _start?: Position;
  private _end?: Position;
  private _diagram?: Diagram;

  constructor(private selectionService: SelectionService) {
  }

  public isActive(): boolean {
    return this._start !== undefined && this._end !== undefined;
  }

  public activate(position: Position): void {
    if (this._diagram === undefined) {
      throw new Error('Diagram should be defined before you activate this service.');
    }

    this._start = position;
    this._end = position;
    this.selectionService.deselect();
  }

  public update(position: Position): void {
    if (!this.isActive()) {
      throw new Error('Service should be activated before it\'s updated.');
    }

    this.selectionService.deselect();
    this._end = position;

    this._diagram?.nodes.forEach(node => {
      let nodeStart = node.position.getDeepCopy();
      let nodeEnd = Position.add(node.position, new Position(node.width, node.height));
      if (Position.liesBetween(this._start!, nodeStart, this._end!) &&
        Position.liesBetween(this._start!, nodeEnd, this._end!)) {
        this.selectionService.add(node);
      }
    });

    this._diagram?.edges.forEach(edge => {
      if (Position.liesBetween(this._start!, edge.getStartPosition(), this._end!) &&
        Position.liesBetween(this._start!, edge.getEndPosition(), this._end!)) {
        this.selectionService.add(edge);
      }
    });
  }

  public deactivate(): void {
    this._start = undefined;
    this._end = undefined;
  }

  set diagram(value: Diagram) {
    this._diagram = value;
  }

  get start(): Position | undefined {
    return this._start;
  }

  get end(): Position | undefined {
    return this._end;
  }
}
