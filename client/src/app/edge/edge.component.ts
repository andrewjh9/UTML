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
              private modalService: NgbModal) {
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
    if (this.isInMoveMode()) {
      if (this.edge?.middlePositions) {
        // Todo: fix mouse Positioning
        let mousePosition = new Position(event.clientX, event.clientY - 50);
        this.edgeRepositionService.activate(this.edge, mousePosition);
      }
    } else if (this.isInSelectMode() && this.edge) {
      this.selectionService.setEdge(this.edge);
    }
  }
  //TODO Triggering does not work properly because of the mousedown
  public handleDoubleClick(event: MouseEvent) {
    if (event.ctrlKey) {
      if (this.selectionService.isEdge()) {
        this.modalService.open(EdgeFormattingModalComponent)
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
