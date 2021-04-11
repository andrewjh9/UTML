import {Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';
import {Position} from "../../model/position";
import {Edge, EndStyle, LineStyle, LineType} from "../../model/edge";
import {SelectionService} from "../services/selection.service";
import {DeletionService} from "../services/deletion.service";
import {CachingService} from "../services/caching/caching.service";
import {EdgeFormattingModalComponent} from "../edge-formatting-modal/edge-formatting-modal.component";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MousePositionTransformService} from "../services/mouse-position-transform.service";
import {EditService} from "../services/edit.service";
import {Label} from "../../model/label";

@Component({
  selector: '[edge-component]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss'],
})
export class EdgeComponent implements OnDestroy {
  @Input() edge!: Edge;
  @Output() edgeChange = new EventEmitter<Edge>();
  isSelected: boolean = false;
  styleObject: {[key: string]: string | number} = {
    'stroke': 'black',
    'stroke-width': 2
  }
  cursor: 'pointer' | 'move' = 'pointer';

  constructor(private selectionService: SelectionService,
              private deletionService: DeletionService,
              private cachingService: CachingService,
              private modalService: NgbModal,
              private mousePositionTransformService: MousePositionTransformService,
              private editService: EditService) {
    selectionService.selectedObservable.subscribe(selectedList => {
      this.isSelected = selectedList.includes(this.edge);
      if (this.isSelected) {
        this.styleObject['stroke'] = 'red';
        this.cursor = 'move';
      } else {
        this.styleObject['stroke'] = 'black';
        this.cursor = 'pointer';
      }
    });
  }

  public handleMouseDown(event: MouseEvent): void {
    // On clicking an edge, the edge will be selected.
    // If the edge is already selected, there is no need to select it again.
    if (!this.isSelected) {
      if (event.ctrlKey) {
        this.selectionService.add(this.edge);
      } else {
        this.selectionService.set(this.edge);
      }
    }
  }

  public handleDoubleClick(event: MouseEvent) {
    // If you double click with ctrl pressed a formatting popup should open.
    // Otherwise it should create a label.
    // Depending on the mouse position either a start, middle or end label is added.
    this.selectionService.set(this.edge);
    if (event.ctrlKey) {
      if (this.selectionService.isEdge()) {
        this.modalService.open(EdgeFormattingModalComponent);
      }
    } else {
      let mousePosition = this.mousePositionTransformService.transformPosition(new Position(event.x, event.y));
      const DISTANCE_THRESHOLD = 25;

      if (Position.getDistance(mousePosition, this.edge.getStartPosition()) <= DISTANCE_THRESHOLD
        && this.edge.startLabel === undefined) {
        this.edge.addStartLabel('s');
        this.activateEditService(this.edge.startLabel!);
      } else if (Position.getDistance(mousePosition, this.edge.getEndPosition()) <= DISTANCE_THRESHOLD
        && this.edge.endLabel === undefined) {
        this.edge.addEndLabel('e');
        this.activateEditService(this.edge.endLabel!);
      } else if (this.edge.middleLabel === undefined) {
        this.edge.addMiddleLabel('specialCharMap');
        this.activateEditService(this.edge.middleLabel!);
      }
    }
  }

  private activateEditService(label: Label, delay: number = 75) {
    setTimeout(() => {
      this.selectionService.deselect();
      this.editService.activate(label);
    }, delay);
  }

  public isLine(): boolean {
    return this.edge?.lineType === LineType.Line || false;
  }

  public isArc(): boolean {
    return this.edge?.lineType === LineType.Arc || false;
  }

  ngOnDestroy(): void {
    console.log("Edge component is being destroyed.");
  }

  delete() {
    this.modalService.dismissAll();
    this.deletionService.deleteEdge(this.edge);
  }
}
