import {Component, AfterContentInit, ViewChild, ElementRef} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ExportService} from "../services/export.service";
import {Diagram} from "../../model/diagram";
import {SelectionService} from "../services/selection.service";
import {HttpClient} from "@angular/common/http";
import {ErrorLauncherService} from "../services/error-launcher.service";
import {AuthenticatedService} from "../services/authenticated.service";


@Component({
  selector: 'app-save-modal',
  templateUrl: './save-modal.component.html',
  styleUrls: ['./save-modal.component.scss']
})
export class SaveModalComponent implements AfterContentInit {
  isAuthenticated: boolean = true;
  @ViewChild('overwriteModal') overwriteModalRef!: ElementRef;

  constructor(public modal: NgbActiveModal,
              private modalService: NgbModal,
              public exportService: ExportService,
              private selectionService: SelectionService,
              private http: HttpClient,
              private errorLauncherService: ErrorLauncherService,
              public authenticatedService: AuthenticatedService) { }

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

  saveToDBOrLaunchOverwriteModal() {
    if (this.existsDiagramWithName()) {
      this.modalService.open(this.overwriteModalRef);
    } else {
      this.saveToDB();
    }
  }

  saveToDB() {
    this.http.post('/api/diagram/', this.exportService.getDiagramJSON(this.exportService.filename)).subscribe(
        (data: any) => {
          this.modal.close()
        },error => {
          console.error(error);
          this.errorLauncherService.launch('Something went wrong when saving your diagram to the database.');
      }
    );
  }

  private existsDiagramWithName() {
    // Todo: @Andrew implement this.
    return true;
  }
}

