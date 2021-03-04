import {EventEmitter, Injectable} from '@angular/core';
import {Edge} from "../../model/edge";
import {Node} from "../../model/node/node";

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private current?: Node | Edge;
  public nodeEmitter: EventEmitter<Node> = new EventEmitter<Node>();
  public edgeEmitter: EventEmitter<Edge> = new EventEmitter<Edge>();


  public setNode(value: Node): void {
    this.current = value;
    this.nodeEmitter.emit(value);
  }

  public setEdge(value: Edge): void {
    this.current = value;
    this.edgeEmitter.emit(value);
  }

  public deselect(): void {
    this.current = undefined;
    this.nodeEmitter.emit(undefined);
    this.edgeEmitter.emit(undefined);
  }
}
