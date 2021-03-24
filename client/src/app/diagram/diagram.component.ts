import {AfterViewInit, Component} from '@angular/core';
import {RepositionService} from "../services/reposition.service";
import {Mode, ModeService} from "../services/mode.service";
import {EdgeCreationService} from "../services/edge-creation.service";
import {DeletionService} from "../services/deletion.service";
import {CreationTypeSelectionService} from "../services/creation-type-selection.service";
import {Node} from "../../model/node/node";
import {ResizeService} from "../services/resize.service";
import {deserialiseDiagram} from "../../serialisation/deserialise/deserialise-diagram";
import {DomSanitizer} from "@angular/platform-browser";
import {CachingService} from "../services/caching/caching.service";
import {SerialisedDiagram} from "../../serialisation/serialised-data-structures/serialised-diagram";
import {SelectionService} from "../services/selection.service";
import {Diagram} from "../../model/diagram";
import {Edge} from "../../model/edge";
import {Position} from "../../model/position";
import {CopyPasteService} from "../services/copy-paste.service";
import {DragDropCreationService} from "../services/drag-drop-creation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UploadService} from "../services/upload.service";
import {DragSelectionService} from "../services/drag-selection.service";
import {ZoomService} from "../services/zoom.service";
import {MousePositionTransformService} from "../services/mouse-position-transform.service";
import {DiagramContainerService} from "../services/diagram-container.service";
import {LocalStorageService} from "../services/caching/local-storage.service";
import {LensOffsetService} from "../services/lens-offset.service";
import {LabelRepositionService} from "../services/label-reposition.service";
import {AppComponent} from "../app.component";
import {FixedPointRepositioner} from "../services/edge-reposition/fixed-point-repositioner";
import {StartEndRepositioner} from "../services/edge-reposition/start-end-repositioner";
import {liesOnSegment} from "../services/edge-reposition/lies-on-segment";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterViewInit {
  public static readonly NAV_HEIGHT = 50;
  public diagram: Diagram;

  mode: Mode;

  constructor(private sanitizer: DomSanitizer,
              private diagramContainer: DiagramContainerService,
              private repositionService: RepositionService,
              private fixedPointRepositioner: FixedPointRepositioner,
              private startEndRepositioner: StartEndRepositioner,
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
              public zoomService: ZoomService,
              private localStorageService: LocalStorageService,
              private mousePositionTransformService: MousePositionTransformService,
              private lensOffsetService: LensOffsetService,
              private labelRepositionService: LabelRepositionService,
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
      this.localStorageService.setup();
    }
  }

  handleMouseUp(event: MouseEvent): void {
    if (this.repositionService.isActive()) {
      this.repositionService.deactivate();
    } else if (this.fixedPointRepositioner.isActive()) {
      this.fixedPointRepositioner.deactivate()
    } else if (this.resizeService.isActive()) {
      this.resizeService.deactivate()
    } else if (this.dragDropCreationService.isActive()) {
      this.dragDropCreationService.create();
    } else if (this.edgeCreationService.isActive()) {
      this.edgeCreationService.cancel();
    } else if (this.dragSelectionService.isActive()) {
      this.dragSelectionService.deactivate();
    } else if (this.lensOffsetService.isActive()) {
      this.lensOffsetService.deactivate();
    } else if (this.labelRepositionService.isActive()) {
      this.labelRepositionService.deactivate();
    } else if (this.startEndRepositioner.isActive()) {
      this.startEndRepositioner.deactivate();
    }
  }

  handleMouseMove(event: MouseEvent) {
    let fullyTransformed = this.mousePositionTransformService.transformPosition(new Position(event.x, event.y));
    let zoomedPos = this.mousePositionTransformService.transFormZoomAndMenubar(new Position(event.x, event.y))

    if (this.repositionService.isActive()) {
      this.repositionService.update(fullyTransformed); //works
    } else if (this.fixedPointRepositioner.isActive()) {
      this.fixedPointRepositioner.update(fullyTransformed); //works
    } else if (this.edgeCreationService.isActive()) {
      this.edgeCreationService.endPreview = fullyTransformed; //works
    } else if (this.resizeService.isActive()) {
      this.resizeService.update(fullyTransformed); //works
    } else if (this.dragDropCreationService.isActive()) {
      this.dragDropCreationService.update(fullyTransformed); //works
    } else if (this.dragSelectionService.isActive()) {
      this.dragSelectionService.update(fullyTransformed); //idk
    } else if (this.lensOffsetService.isActive()) {
      this.lensOffsetService.update(zoomedPos); //works
    } else if (this.labelRepositionService.isActive()) {
      this.labelRepositionService.update(fullyTransformed);
    } else if (this.startEndRepositioner.isActive()) {
      this.startEndRepositioner.update(fullyTransformed);
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
    let pos = this.mousePositionTransformService.transformPosition(new Position(event.x, event.y));
    //TODO is this the correct position?, call the correct function.
    if (event.shiftKey) {
      this.dragSelectionService.activate(pos);
    } else if (event.ctrlKey) {
      // Check that no node or edge was double clicked.
      for (let node of this.diagram.nodes) {
        let nodeStart = node.position.getDeepCopy();
        let nodeEnd = Position.add(node.position, new Position(node.width, node.height));
        if (Position.liesBetween(nodeStart, pos, nodeEnd)) {
          return;
        }
      }

      for (let edge of this.diagram.edges) {
        let allPoints = edge.getAllPoints();
        for (let i = 0; i < allPoints.length - 1; i++) {
          if (liesOnSegment(pos, allPoints[i], allPoints[i + 1])) {
            return;
          }
        }
      }

      this.lensOffsetService.activate(this.mousePositionTransformService.transFormZoomAndMenubar(new Position(event.x, event.y)));
    }
  }
}
