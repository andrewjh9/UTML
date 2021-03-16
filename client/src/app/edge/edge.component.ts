import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {Position} from "../../model/position";
import {Edge, EndStyle, LineStyle, LineType} from "../../model/edge";
import {Label} from "../../model/label";
import {EdgeRepositionService} from "../services/edge-reposition/edge-reposition.service";
import {EdgeCreationService} from "../services/edge-creation.service";
import {Mode, ModeService} from "../services/mode.service";
import {SelectionService} from "../services/selection.service";
import {ModeAwareComponent} from "../mode-aware-component";
import {DeletionService} from "../services/deletion.service";
import {CachingService} from "../services/caching/caching.service";
import {EdgeFormattingModalComponent} from "../edge-formatting-modal/edge-formatting-modal.component";
import {FormattingModalComponent} from "../formatting-modal/formatting-modal.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ZoomService} from "../services/zoom.service";
import {DiagramComponent} from "../diagram/diagram.component";

@Component({
  selector: '[edge-component]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss'],
})
export class EdgeComponent extends ModeAwareComponent implements OnDestroy {
  @Input() edge!: Edge;
  @Output() edgeChange = new EventEmitter<Edge>();
  isSelected: boolean = false;
  styleObject: {[key: string]: string | number} = {
    'stroke': 'black',
    'stroke-width': 2
  }

  constructor(private edgeRepositionService: EdgeRepositionService,
              modeService: ModeService,
              private selectionService: SelectionService,
              private deletionService: DeletionService,
              private cachingService: CachingService,
              private modalService: NgbModal,
              private zoomService: ZoomService) {
    super(modeService);
    selectionService.selectedObservable.subscribe(selectedList => {
      this.isSelected = selectedList.includes(this.edge);

      if (this.isSelected) {
        this.styleObject['stroke'] = 'red';
      } else {
        this.styleObject['stroke'] = 'black';
      }
    });
  }

  public handleMouseDown(event: MouseEvent): void {
    if (!this.isSelected) {
      this.selectionService.setEdge(this.edge);
    }
    // Todo: Change this to work with zooming.
    this.edgeRepositionService.activate(this.edge, new Position(event.x, event.y - DiagramComponent.NAV_HEIGHT));
  }

  public handleDoubleClick(event: MouseEvent) {
    this.selectionService.setEdge(this.edge);
    if (event.ctrlKey) {
      if (this.selectionService.isEdge()) {
        this.modalService.open(EdgeFormattingModalComponent);
      }
    }
  }

  public isLine(): boolean {
    return this.edge?.lineType === LineType.Line || false;
  }

  public isArc(): boolean {
    return this.edge?.lineType === LineType.Arc || false;
  }

  ngOnDestroy(): void {
    console.log("Edge component is being destroyed.")
  }

  delete() {
    this.modalService.dismissAll();
    this.deletionService.deleteEdge(this.edge);
  }

  save() {
    this.cachingService.save();
  }
}
