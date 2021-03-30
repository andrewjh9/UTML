import {EventEmitter, Injectable} from '@angular/core';
import {Diagram} from "../../model/diagram";
import {Edge} from "../../model/edge";
import {DiagramContainerService} from "./diagram-container.service";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private diagramContainer: DiagramContainerService) { }

  public set(diagram: Diagram) {
    this.diagramContainer.set(diagram);
  }
}
