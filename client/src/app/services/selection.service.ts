import {EventEmitter, Injectable} from '@angular/core';
import {Edge} from "../../assets/serialisation/edge";
import {Node} from "../../assets/serialisation/node/node";

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
}
