import {Component, AfterContentInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ExportService} from "../services/export.service";
import {Diagram} from "../../model/diagram";


@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss']
})
export class SaveModalComponent implements AfterContentInit {
  constructor(public modal: NgbActiveModal,
              public exportService: ExportService) { }

  ngAfterContentInit(): void {
  }

  exportAsPNG() {
    this.exportService.exportAsPNG();
  }

  exportAsJSON() {
    this.exportService.exportAsJSON()
  }

}

