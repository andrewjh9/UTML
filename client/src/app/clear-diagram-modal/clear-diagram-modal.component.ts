import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {DiagramContainerService} from "../services/diagram-container.service";
import {Diagram} from "../../model/diagram";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-clear-diagram-modal',
  templateUrl: './clear-diagram-modal.component.html',
  styleUrls: ['./clear-diagram-modal.component.scss']
})
export class ClearDiagramModalComponent {

  constructor(public modal: NgbActiveModal,
              private diagramContainer: DiagramContainerService,
              private userService: UserService) { }

  clearDiagram(): void {
    this.diagramContainer.set(new Diagram());
    // @ts-ignore
    //TS ignore is required as we don't wish to have title, but it won't compile with null.
    window.history.pushState({}, null, '/');
    this.userService.setOpenDiagramNameDefault()


  }
}
