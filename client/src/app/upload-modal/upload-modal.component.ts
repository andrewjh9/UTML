import {Component, EventEmitter, Inject, OnInit, Output, AfterContentInit, ViewChild, ElementRef} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Diagram} from "../../model/diagram";
import {deserialiseDiagram} from "../../serialisation/deserialise/deserialise-diagram";
import {SerialisedDiagram} from "../../serialisation/serialised-data-structures/serialised-diagram";
import {UploadService} from "../services/upload.service";
import { DOCUMENT } from '@angular/common'
import {DiagramContainerService} from "../services/diagram-container.service";
import {fsm} from "../../model/examples/fsm";
import {LocalStorageService} from "../services/caching/local-storage.service";
import {DiagramManagementModalComponent} from "../diagram-management-modal/diagram-management-modal.component";
import {ErrorLauncherService} from "../error-launcher.service";

@Component({
  selector: 'app-upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.scss']
})
export class UploadModalComponent {
  @ViewChild('clearHistoryModal') private clearHistoryModal!: ElementRef;
  private file?: File;
  selectedDiagram?: Diagram;
  active: number = 1;

  constructor(public modal: NgbActiveModal,
              private diagramContainer: DiagramContainerService,
              private localStorageService: LocalStorageService,
              private modalService: NgbModal,
              private errorLauncherService: ErrorLauncherService){}

  onChange(event: any) {
    this.file = event!.target!.files[0];

    this.file!.text()
      .then((diagramString: string) => {
        let diagramJSON = JSON.parse(diagramString);
        this.selectedDiagram = deserialiseDiagram(diagramJSON as SerialisedDiagram);
      })
      .catch((err) => {
        console.log(err);
        this.errorLauncherService.launch('The file you are trying to upload can not be converted to a diagram.');
      });
  }

  onClick() {
    if (this.selectedDiagram !== undefined) {
      this.diagramContainer.set(this.selectedDiagram);
    }
  }

  get keyDiagramPairs() {
    return this.localStorageService.getKeyDiagramPairs();
  }

  setLocalStorageDiagram(index: number) {
    this.selectedDiagram = this.keyDiagramPairs[index][1];
  }

  removeLocalStorage(index: number) {
    this.localStorageService.removeKey(this.keyDiagramPairs[index][0])
  }

  openClearHistory() {
    this.modalService.open(this.clearHistoryModal);
  }

  clearHistory() {
    this.localStorageService.clear();
  }
}
