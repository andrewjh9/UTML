import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {Position} from "../../model/position";
import {Edge, EndStyle, LineStyle, LineType} from "../../model/edge";
import {Label} from "../../model/label";
import {EdgeRepositionService} from "../services/edge-reposition/edge-reposition.service";
import {EdgeCreationService} from "../services/edge-creation.service";
import {Mode, ModeService} from "../services/mode.service";
import {SelectionService} from "../services/selection.service";
import {ModeAwareComponent} from "../mode-aware-component";

@Component({
  selector: '[edge-component]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss'],
})
export class EdgeComponent extends ModeAwareComponent implements OnDestroy {
  @Input() edge?: Edge;
  @Output() edgeChange = new EventEmitter<Edge>();
  isSelected: boolean = false;
  styleObject: {[key: string]: string | number} = {
    'stroke': 'black',
    'stroke-width': 2
  }

  constructor(private edgeRepositionService: EdgeRepositionService,
              modeService: ModeService,
              private selectionService: SelectionService) {
    super(modeService);
    selectionService.selectedObservable.subscribe(value => {
      // this.edge can be undefined here because this update may be called before the component is fully set up.
      if (this.edge === undefined) {
        this.isSelected = false;
      } else {
        this.isSelected = value === this.edge;
      }

      if (this.isSelected) {
        this.styleObject.stroke = 'red';
      } else {
        this.styleObject.stroke = 'black';
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

  public isLine(): boolean {
    return this.edge?.lineType === LineType.Line || false;
  }

  public isArc(): boolean {
    return this.edge?.lineType === LineType.Arc || false;
  }

  ngOnDestroy(): void {
    console.log("Edge component is being destroyed.")
  }
}
