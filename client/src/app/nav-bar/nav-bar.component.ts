import {AfterViewInit, Component, OnInit} from '@angular/core';
import {UploadModalComponent} from "../upload-modal/upload-modal.component";
import {SaveModalComponent} from "../save-modal/save-modal.component";
import {Diagram} from "../../model/diagram";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CopyPasteService} from "../services/copy-paste.service";
import {CachingService} from "../services/caching/caching.service";
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

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements AfterViewInit {
  private readonly EXAM_MODE_SUBDOMAIN: string = "exam";
  get NAV_HEIGHT() { return DiagramComponent.NAV_HEIGHT; }

  constructor(private modalService: NgbModal,
              private copyPasteService: CopyPasteService,
              private cachingService: CachingService,
              private diagramContainer: DiagramContainerService,
              private zoomService: ZoomService,
              public userService: UserService,
              private deletionService: DeletionService,
              private exportService: ExportService) { }

  ngAfterViewInit() {
    let showHelpOnStart = localStorage.getItem(HelpModalComponent.LOCAL_STORAGE_KEY);
    if (showHelpOnStart !== 'false') {
      this.help();
    }
  }

  examMode(){
    console.log(window.location.hostname)
    console.log(window.location.hostname.startsWith(this.EXAM_MODE_SUBDOMAIN))
    return window.location.hostname.startsWith(this.EXAM_MODE_SUBDOMAIN)
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
    let result = this.cachingService.undo();
    if (result !== null) {
      this.diagramContainer.set(result as Diagram);
    }
  }

  redo() {
    let result = this.cachingService.redo();
    if (result !== null) {
      this.diagramContainer.set(result as Diagram);
    }
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

  dfa() {
    this.exportService.exportDFA();
  }
}
