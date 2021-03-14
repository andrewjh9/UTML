import {Component, EventEmitter, Inject, OnInit, Output, AfterContentInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Diagram} from "../../model/diagram";
import {deserialiseDiagram} from "../../serialisation/deserialise/deserialise-diagram";
import {SerialisedDiagram} from "../../serialisation/serialised-data-structures/serialised-diagram";
import {UploadService} from "../services/upload.service";
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent implements AfterContentInit {
  private file?: File;

  constructor(public modal: NgbActiveModal,
              private uploadService: UploadService,
              @Inject(DOCUMENT) document: Document) { }

  ngAfterContentInit(): void {
    document.getElementById("upload-button")!.click()
  }

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
        this.uploadService.diagramEmitter.emit(diagram);
      })
      .catch(() => {
        alert('The file you are trying to upload can not be converted to a diagram.');
      });
  }


}
