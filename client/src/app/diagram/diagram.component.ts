import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RepositionService} from "../services/reposition.service";
import {EdgeCreationService} from "../services/edge-creation.service";
import {DeletionService} from "../services/deletion.service";
import {Node} from "../../model/node/node";
import {ResizeService} from "../services/resize.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ChangeDetectionService} from "../services/caching/change-detection.service";
import {SelectionService} from "../services/selection.service";
import {Diagram} from "../../model/diagram";
import {Edge} from "../../model/edge";
import {Position} from "../../model/position";
import {CopyPasteService} from "../services/copy-paste.service";
import {DragDropCreationService} from "../services/drag-drop-creation.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DragSelectionService} from "../services/drag-selection.service";
import {ZoomService} from "../services/zoom.service";
import {MousePositionTransformService} from "../services/mouse-position-transform.service";
import {DiagramContainerService} from "../services/diagram-container.service";
import {LocalStorageService} from "../services/caching/local-storage.service";
import {LensOffsetService} from "../services/lens-offset.service";
import {LabelRepositionService} from "../services/label-reposition.service";
import {FixedPointRepositioner} from "../services/edge-reposition/fixed-point-repositioner";
import {StartEndRepositioner} from "../services/edge-reposition/start-end-repositioner";
import {LocalFeedbackService} from "../services/feedback/local/local-feedback.service";

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterViewInit, OnInit {
  @ViewChild('svg') svgElement!: ElementRef;
  public static readonly NAV_HEIGHT = 50;
  public diagram: Diagram;
  edgeCreationIsActive: boolean = false;

  constructor(private sanitizer: DomSanitizer,
              private diagramContainer: DiagramContainerService,
              private repositionService: RepositionService,
              private fixedPointRepositioner: FixedPointRepositioner,
              private startEndRepositioner: StartEndRepositioner,
              private edgeCreationService: EdgeCreationService,
              private deletionService: DeletionService,
              private resizeService: ResizeService,
              private cachingService: ChangeDetectionService,
              private selectionService: SelectionService,
              private copyPasteService: CopyPasteService,
              private dragDropCreationService: DragDropCreationService,
              private modalService: NgbModal,
              private dragSelectionService: DragSelectionService,
              public zoomService: ZoomService,
              private localStorageService: LocalStorageService,
              private mousePositionTransformService: MousePositionTransformService,
              private lensOffsetService: LensOffsetService,
              private labelRepositionService: LabelRepositionService,
              localFeedbackService: LocalFeedbackService) {
    edgeCreationService.activityObservable.subscribe(b => this.edgeCreationIsActive = b);
    zoomService.resizeEmitter.subscribe((ignored: any) => this.setSVGDimensions());

    document.documentElement.style.overflow = 'hidden';  // firefox, chrome
    // document.body.scroll = "no"; // ie only
    this.diagram = diagramContainer.get();
    diagramContainer.diagramObservable.subscribe(diagram => this.diagram = diagram);

    edgeCreationService.newEdgeEmitter.subscribe((newEdge: Edge) => {
      this.diagram.edges.push(newEdge);
      this.cachingService.trigger();
    });

    copyPasteService.pasteEmitter.subscribe((nodeOrEdge: Node | Edge) => {
      if (nodeOrEdge instanceof Node) {
        this.diagram.nodes.push(nodeOrEdge as Node);
      } else {
        this.diagram.edges.push(nodeOrEdge as Edge);
      }
      this.cachingService.trigger();
    });

    dragDropCreationService.createdEmitter.subscribe((edgeOrNode: Edge | Node) => {
      if (edgeOrNode instanceof Edge) {
        this.diagram.edges.push(edgeOrNode);
      } else {
        this.diagram.nodes.push(edgeOrNode);
      }

      this.cachingService.trigger();
    });
  }

  private setSVGDimensions(): void {
    this.svgElement.nativeElement.setAttribute('width', this.zoomService.baseWidth);
    this.svgElement.nativeElement.setAttribute('height', this.zoomService.baseHeight);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.setSVGDimensions();

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

  handleMouseDown(event: MouseEvent) {
    let pos = this.mousePositionTransformService.transformPosition(new Position(event.x, event.y));
    if (event.shiftKey) {
      this.dragSelectionService.activate(pos);
    }
  }
}
