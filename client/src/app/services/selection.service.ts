import {EventEmitter, Injectable} from '@angular/core';
import {Edge, EdgeFormatter} from "../../assets/serialisation/edge";
import {Node} from "../../assets/serialisation/node";

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private current?: Node | Edge | EdgeFormatter;
  public nodeEmitter: EventEmitter<Node> = new EventEmitter<Node>();
  public edgeEmitter: EventEmitter<Edge> = new EventEmitter<Edge>();
  public edgeFormatterEmitter: EventEmitter<EdgeFormatter> = new EventEmitter<EdgeFormatter>();


  public setNode(value: Node): void {
    this.current = value;
    this.nodeEmitter.emit(value);
  }

  public setEdge(value: Edge): void {
    this.current = value;
    this.edgeEmitter.emit(value);
  }

  public setEdgeFormatter(value: EdgeFormatter) {
    this.current = value;
    this.edgeFormatterEmitter.emit(value);
  }
}
