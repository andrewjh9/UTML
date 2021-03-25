import {Component, AfterContentInit} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ExportService} from "../services/export.service";
import {Diagram} from "../../model/diagram";
import {SelectionService} from "../services/selection.service";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss']
})
export class SaveModalComponent implements AfterContentInit {
  filename: string = 'diagram-filename';
  isAuthenticated: boolean = true;

  constructor(public modal: NgbActiveModal,
              private exportService: ExportService,
              private selectionService: SelectionService,
              private http: HttpClient) { }

  ngAfterContentInit(): void {
    this.selectionService.deselect();
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
    this.http.post('/api/diagram/',this.exportService.getDiagramJSON(this.filename)).subscribe(
        (data:any) => {
          this.modal.close()
        },error =>  {
          //TODO Open error modal or something
          this.handleError(error);
    });
  }
  handleError(error: any) {
    console.log("FIX ME")
    console.log(error)
  }

}

