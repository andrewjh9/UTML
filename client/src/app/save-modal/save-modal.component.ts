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
  filename: string = 'diagram-filename';
  isAuthenticated: boolean = true;

  constructor(public modal: NgbActiveModal,
              private exportService: ExportService) { }

  ngAfterContentInit(): void {
  }

  exportAsPNG() {
    this.exportService.exportAsPNG();
  }

  exportAsJSON() {
    this.exportService.exportAsJSON()
  }

  saveToDB() {
    // Todo: call db here.
  }
}

