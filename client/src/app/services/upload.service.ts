import {EventEmitter, Injectable} from '@angular/core';
import {Diagram} from "../../model/diagram";
import {Edge} from "../../model/edge";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  public diagramEmitter: EventEmitter<Diagram> = new EventEmitter<Diagram>();
  constructor() { }

  public emit(diagram: Diagram) {
    this.diagramEmitter.emit(diagram)
  }
}
