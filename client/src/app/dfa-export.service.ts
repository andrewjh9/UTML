import { Injectable } from '@angular/core';
import {DiagramContainerService} from "./services/diagram-container.service";
import {ErrorLauncherService} from "./services/error-launcher.service";
import {Edge, EndStyle} from "../model/edge";
import {Node} from "../model/node/node";

@Injectable({
  providedIn: 'root'
})
export class DfaExportService {
  constructor(private diagramContainer: DiagramContainerService,
              private errorLauncher: ErrorLauncherService) {

  }



}
