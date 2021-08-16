import {Component, AfterContentInit, ViewChild, ElementRef} from '@angular/core';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ExportService} from "../services/export.service";
import {Diagram} from "../../model/diagram";
import {SelectionService} from "../services/selection.service";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../services/user.service";
import {ErrorLauncherService} from "../services/error-launcher.service";


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
              public userService: UserService) { }

  ngAfterContentInit(): void {
    this.selectionService.deselect();
  }

  exportAsPNG() {
    this.exportService.exportAsPNG(this.userService.openDiagramName);
    this.modal.close();
  }

  exportAsJSON() {
    this.exportService.exportAsJSON(this.userService.openDiagramName);
    this.modal.close();
  }

  exportAsSVG() {
    this.exportService.exportAsSVG(this.userService.openDiagramName);
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
    this.http.post('/api/diagram/', this.exportService.getDiagramJSON(this.userService.openDiagramName)).subscribe(
        (data: any) => {
          this.userService.addDiagramNames([this.userService.openDiagramName])
          this.modal.close()
        },error => {
          console.error(error);
          this.errorLauncherService.launch('Something went wrong when saving your diagram to the database.');
      }
    );
  }

  private existsDiagramWithName() {
    return this.userService.diagramNameExists(this.userService.openDiagramName);
  }
}

