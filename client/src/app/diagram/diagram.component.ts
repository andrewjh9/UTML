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
import {LensOffsetService} from "../services/lens-offset.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterViewInit {
  public static readonly NAV_HEIGHT = 50;
  public diagram: Diagram;
  seq = new SequenceDiagram();

  mode: Mode;
  Mode = Mode;

  constructor(private sanitizer: DomSanitizer,
              private diagramContainer: DiagramContainerService,
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
              private mousePositionTransformService: MousePositionTransformService,
              private lensOffsetService: LensOffsetService,
              private appComponent: AppComponent
              ) {

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
    } else if (this.lensOffsetService.isActive()) {
      this.lensOffsetService.deactivate();
    }
  }

  handleMouseMove(event: MouseEvent) {
    let position = this.mousePositionTransformService.transformPosition(new Position(event.pageX, event.pageY));
    let pos = this.mousePositionTransformService.transFormZoomAndMenubar(new Position(event.pageX, event.pageY))
    if (this.repositionService.isActive()) {
      this.repositionService.update(position); //works
    } else if (this.edgeRepositionService.isActive()) {
      this.edgeRepositionService.update(position); //works
    } else if (this.edgeCreationService.isActive()) {
      this.edgeCreationService.endPreview = position; //works
    } else if (this.resizeService.isActive()) {
      this.resizeService.update(position); //works
    } else if (this.dragDropCreationService.isActive()) {
      this.dragDropCreationService.update(position); //works
    } else if (this.dragSelectionService.isActive()) {
      this.dragSelectionService.update(position); //idk
    } else if (this.lensOffsetService.isActive()) {
      this.lensOffsetService.update(pos); //works
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

  handleMouseDown(event: MouseEvent) {
    let thisPosition = this.mousePositionTransformService.simpleTransform(new Position(event.x, event.y));
    //TODO is this the correct position?, call the correct function.
    if (event.shiftKey) {
      this.dragSelectionService.activate(thisPosition);
    } else if (event.ctrlKey) {
      this.lensOffsetService.activate(this.mousePositionTransformService.transFormZoomAndMenubar(new Position(event.x, event.y)));
    }
  }


  //TODO Why does the typing not work????? Should be wheelevent
  zoom(zoomIn: boolean): void {
    this.zoomSerivce.updateZoomFactor(zoomIn);
  }

  greekNumbers() {
    let result = [];
    for (let x = 945; x <= 969; x++) {
      result.push(this.sanitizer.bypassSecurityTrustHtml('&#x0' + x.toString(16) + ';'));
    }
    return result;
  }
}
