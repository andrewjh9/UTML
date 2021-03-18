import {Component, EventEmitter, Inject, OnInit, Output, AfterContentInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Diagram} from "../../model/diagram";
import {deserialiseDiagram} from "../../serialisation/deserialise/deserialise-diagram";
import {SerialisedDiagram} from "../../serialisation/serialised-data-structures/serialised-diagram";
import {UploadService} from "../services/upload.service";
import { DOCUMENT } from '@angular/common'
import {DiagramContainerService} from "../services/diagram-container.service";
import {fsm} from "../../model/examples/fsm";

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent {
  private file?: File;
  selectedDiagram?: Diagram = fsm;
  active: number = 1;

  constructor(public modal: NgbActiveModal,
              private diagramContainer: DiagramContainerService) { }

  onChange(event: any) {
    this.file = event!.target!.files[0];
  }

  onClick() {
    if (this.file === undefined) {
      alert("You have to upload a file first.");
    }

    this.file?.text()
      .then((diagramString: string) => {
        let diagramJSON = JSON.parse(diagramString);
        let diagram = deserialiseDiagram(diagramJSON as SerialisedDiagram);
        this.diagramContainer.set(diagram);
      })
      .catch(() => {
        alert('The file you are trying to upload can not be converted to a diagram.');
      });
  }
}
