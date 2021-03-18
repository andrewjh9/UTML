import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {RepositionService} from "../services/reposition.service";

import {EdgeRepositionService} from "../services/edge-reposition/edge-reposition.service";
import {Mode, ModeService} from "../services/mode.service";
import {EdgeCreationService} from "../services/edge-creation.service";
import {DeletionService} from "../services/deletion.service";
import {CreationTypeSelectionService} from "../services/creation-type-selection.service";
import {ad} from "../../model/examples/ad";
import {Node} from "../../model/node/node";
import {ResizeService} from "../services/resize.service";
import {deserialiseDiagram} from "../../serialisation/deserialise/deserialise-diagram";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {cd} from "../../model/examples/cd";
import {CachingService} from "../services/caching/caching.service";
import {SerialisedDiagram} from "../../serialisation/serialised-data-structures/serialised-diagram";
import {SelectionService} from "../services/selection.service";
import {Lifeline} from "../../model/sequence-diagram/lifeline";
import {SequenceDiagram} from "../../model/sequence-diagram/sequence-diagram";
import {Diagram} from "../../model/diagram";
import {Edge} from "../../model/edge";
import {Position} from "../../model/position";
import {CopyPasteService} from "../services/copy-paste.service";
import {DragDropCreationService} from "../services/drag-drop-creation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UploadModalComponent} from "../upload-modal/upload-modal.component";
import {UploadService} from "../services/upload.service";
import {SaveModalComponent} from "../save-modal/save-modal.component";
import {Expression} from "@angular/compiler";
import {DragSelectionService} from "../services/drag-selection.service";
import {ZoomService} from "../services/zoom.service";
import {MousePositionTransformService} from "../services/mouse-position-transform.service";
import {DiagramManagementModalComponent} from "../diagram-management-modal/diagram-management-modal.component";
import {DiagramContainerService} from "../services/diagram-container.service";
import {LocalStorageService} from "../services/caching/local-storage.service";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterViewInit {
  public static readonly NAV_HEIGHT = 50;
  get NAV_HEIGHT() { return DiagramComponent.NAV_HEIGHT; }
  public diagram: Diagram;
  seq = new SequenceDiagram();

  mode: Mode;
  Mode = Mode;

  constructor(private diagramContainer: DiagramContainerService,
              private repositionService: RepositionService,
              private edgeRepositionService: EdgeRepositionService,
              private modeService: ModeService,
              private edgeCreationService: EdgeCreationService,
              private deletionService: DeletionService,
              private creationTypeSelectionService: CreationTypeSelectionService,
              private resizeService: ResizeService,
              private cachingService: CachingService,
              private selectionService: SelectionService,
              private copyPasteService: CopyPasteService,
              private dragDropCreationService: DragDropCreationService,
              private modalService: NgbModal,
              private uploadService: UploadService,
              private dragSelectionService: DragSelectionService,
              public zoomSerivce: ZoomService,
              private localStorageService: LocalStorageService,
              private mousePositionTransformService: MousePositionTransformService) {
    this.diagram = diagramContainer.get();
    diagramContainer.diagramObservable.subscribe(diagram => this.diagram = diagram);

    this.modeService.modeObservable.subscribe((mode: Mode) => this.mode = mode);
    this.mode = modeService.getLatestMode();

    edgeCreationService.newEdgeEmitter.subscribe((newEdge: Edge) => {
      this.diagram.edges.push(newEdge);
      this.cachingService.save();
    });

    copyPasteService.pasteEmitter.subscribe((nodeOrEdge: Node | Edge) => {
      if (nodeOrEdge instanceof Node) {
        this.diagram.nodes.push(nodeOrEdge as Node);
      } else {
        this.diagram.edges.push(nodeOrEdge as Edge);
      }
      this.cachingService.save();
    });

    dragDropCreationService.createdEmitter.subscribe((edgeOrNode: Edge | Node) => {
      if (edgeOrNode instanceof Edge) {
        this.diagram.edges.push(edgeOrNode);
      } else {
        this.diagram.nodes.push(edgeOrNode);
      }

      this.cachingService.save();
    });
  }

  ngAfterViewInit() {
    if (this.diagram) {
      // @ts-ignore
      this.edgeRepositionService.setNodes(this.diagram.nodes);

      this.localStorageService.setup();
    }
  }

  handleMouseUp(event: MouseEvent): void {
    if (this.repositionService.isActive()) {
      this.repositionService.deactivate();
    } else if (this.edgeRepositionService.isActive()) {
      this.edgeRepositionService.deactivate()
    } else if (this.resizeService.isActive()) {
      this.resizeService.deactivate()
    } else if (this.dragDropCreationService.isActive()) {
      this.dragDropCreationService.create();
    } else if (this.edgeCreationService.isActive()) {
      this.edgeCreationService.deactivate();
    } else if (this.dragSelectionService.isActive()) {
      this.dragSelectionService.deactivate();
    }
  }

  handleMouseMove(event: MouseEvent) {
    let position = this.mousePositionTransformService.transformPosition(new Position(event.pageX, event.pageY));
    if (this.repositionService.isActive()) {
      this.repositionService.update(position);
    } else if (this.edgeRepositionService.isActive()) {
      this.edgeRepositionService.update(position);
    } else if (this.edgeCreationService.isActive()) {
      this.edgeCreationService.endPreview = position;
    } else if (this.resizeService.isActive()) {
      this.resizeService.update(position);
    } else if (this.dragDropCreationService.isActive()) {
      this.dragDropCreationService.update(position);
    } else if (this.dragSelectionService.isActive()) {
      this.dragSelectionService.update(position);
    }
  }

  handleDoubleClick(event: MouseEvent) {
  }

  handleKeyPressed(event: KeyboardEvent): void {
    const SELECT_KEY = "1";
    const CREATE_KEY = "2";
    const MOVE_KEY = "3";

    if (event.ctrlKey) {
      switch (event.key) {
        case SELECT_KEY :
          this.modeService.setMode(Mode.Select);
          break;
        case CREATE_KEY:
          this.modeService.setMode(Mode.Create);
          break;
        case MOVE_KEY:
          this.modeService.setMode(Mode.Move);
          break;
      }
    }
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

  do() {
    this.cachingService.save();
  }

  restore() {
    let result: null | string = localStorage.getItem(CachingService.LOCAL_STORAGE_KEY);
    if (result === null) {
      alert('No diagram stored in local storage');
    } else {
      try {
        let diagram: Diagram = deserialiseDiagram(JSON.parse(result as string) as SerialisedDiagram);
        this.diagramContainer.set(diagram);
      } catch (e) {
        alert('Could not restore diagram from local storage');
      }
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

  handleMouseDown(event: MouseEvent) {
    if (event.shiftKey) {
      this.dragSelectionService.activate(new Position(event.x, event.y - DiagramComponent.NAV_HEIGHT));
    }

  }


  //TODO Why does the typing not work????? Should be wheelevent
  zoom(event: any): void {
    if (event.deltaY > 0) {
      this.zoomSerivce.updateZoomFactor(true)
    } else {
      this.zoomSerivce.updateZoomFactor(false)
    }
  }
//TODO Why does the typing not work????? Should be Dommousescroll
  zoomFirefox(event: any): void {
    if (event.detail > 0) {
      this.zoomSerivce.updateZoomFactor(true)
    } else {
      this.zoomSerivce.updateZoomFactor(false)
    }
  }

  openDiagramManagementModal() {
    this.modalService.open(DiagramManagementModalComponent, {size: 'xl'});
  }
}
