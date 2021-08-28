import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UploadModalComponent} from "../upload-modal/upload-modal.component";
import {SaveModalComponent} from "../save-modal/save-modal.component";
import {Diagram} from "../../model/diagram";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CopyPasteService} from "../services/copy-paste.service";
import {DiagramContainerService} from "../services/diagram-container.service";
import {DiagramManagementModalComponent} from "../diagram-management-modal/diagram-management-modal.component";
import {DiagramComponent} from "../diagram/diagram.component";
import {ZoomService} from "../services/zoom.service";
import {ClearDiagramModalComponent} from "../clear-diagram-modal/clear-diagram-modal.component";
import {ShapesetManagementModalComponent} from "../shapeset-management-modal/shapeset-management-modal.component";
import {HelpModalComponent} from "../help-modal/help-modal.component";
import {DeletionService} from "../services/deletion.service";
import {UserService} from "../services/user.service";
import {ExportService} from "../services/export.service";
import {UndoRedoService} from "../services/caching/undo-redo.service";
import {LocalFeedbackModalComponent} from '../local-feedback-modal/local-feedback-modal.component';
import {ExternalFeedbackService} from '../services/feedback/external/external-feedback.service';
import {ExternalFeedbackModalComponent} from "../external-feedback-modal/external-feedback-modal.component";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements AfterViewInit {
  externalFeedbackIsActive: boolean = false;
  get NAV_HEIGHT() { return DiagramComponent.NAV_HEIGHT; }

  constructor(private modalService: NgbModal,
              private copyPasteService: CopyPasteService,
              private undoRedoService: UndoRedoService,
              private diagramContainer: DiagramContainerService,
              private zoomService: ZoomService,
              public userService: UserService,
              private deletionService: DeletionService,
              private exportService: ExportService,
              private externalFeedbackService: ExternalFeedbackService) {
    this.externalFeedbackService.isActive.subscribe(b => this.externalFeedbackIsActive = b);
  }

  ngAfterViewInit() {
    let showHelpOnStart = localStorage.getItem(HelpModalComponent.LOCAL_STORAGE_KEY);
    if (showHelpOnStart !== 'false') {
      this.help();
    }
  }

  copy() {
    this.copyPasteService.doCopy();
  }

  paste() {
    this.copyPasteService.doPaste();
  }

  upload() {
    this.modalService.open(UploadModalComponent, {size: 'xl'});
  }

  save() {
    this.modalService.open(SaveModalComponent);
  }

  undo() {
    this.undoRedoService.undo();
  }

  redo() {
    this.undoRedoService.redo();
  }

  openDiagramManagementModal() {
    this.modalService.open(DiagramManagementModalComponent, {size: 'xl'});
  }

  zoomIn() {
    this.zoomService.updateZoomFactor(true);
  }

  resetZoom() {
    this.zoomService.reset();
  }

  zoomOut() {
    this.zoomService.updateZoomFactor(false);

  }

  help() {
    this.modalService.open(HelpModalComponent, {size: ' xl'});
  }


  openClearDiagramPopUp() {
    this.modalService.open(ClearDiagramModalComponent);
  }

  openShapeSetSelector() {
    this.modalService.open(ShapesetManagementModalComponent);
  }

  delete() {
    this.deletionService.deleteSelected();
  }

  openLocalFeedback() {
    this.modalService.open(LocalFeedbackModalComponent);
  }

  triggerExternalFeedback() {
    this.externalFeedbackService.trigger();
  }

  openExternalFeedback() {
    this.modalService.open(ExternalFeedbackModalComponent);
  }
}
