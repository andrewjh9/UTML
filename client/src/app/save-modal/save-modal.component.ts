import {Component, AfterContentInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ExportService} from "../services/export.service";
import {Diagram} from "../../model/diagram";
import axios from "axios";


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
    this.modal.close();
  }

  exportAsJSON() {
    this.exportService.exportAsJSON()
    this.modal.close();
  }

  saveToDB() {
      axios.post("/api/diagram",this.exportService.getDiagramJSON(this.filename)).then(res => this.modal.close())
  }
}

