import {Edge} from "../../model/edge";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditService} from "../services/edit.service";
import {SelectionService} from "../services/selection.service";
import {MousePositionTransformService} from "../services/mouse-position-transform.service";
import {Position} from "../../model/position";
import {Label} from "../../model/label";
import {EdgeFormattingModalComponent} from "../edge-formatting-modal/edge-formatting-modal.component";

export abstract class EdgeDependentComponent {
  protected constructor(protected editService: EditService,
              protected modalService: NgbModal,
              protected selectionService: SelectionService,
              protected mousePositionTransformService: MousePositionTransformService) {

  }

  protected openAdvancedFormatting() {
    this.modalService.open(EdgeFormattingModalComponent);
  }

  protected createAppropriateLabel(event: MouseEvent) {
    let mousePosition = this.mousePositionTransformService.transformPosition(new Position(event.x, event.y));
    const DISTANCE_THRESHOLD = 45;

    if (Position.getDistance(mousePosition, this.edge.getStartPosition()) <= DISTANCE_THRESHOLD
      && this.edge.startLabel === undefined) {
      this.edge.addStartLabel('s');
      this.delayedEditServiceActivate(this.edge.startLabel!);
    } else if (Position.getDistance(mousePosition, this.edge.getEndPosition()) <= DISTANCE_THRESHOLD
      && this.edge.endLabel === undefined) {
      this.edge.addEndLabel('e');
      this.delayedEditServiceActivate(this.edge.endLabel!);
    } else if (this.edge.middleLabel === undefined) {
      this.edge.addMiddleLabel('m');
      this.delayedEditServiceActivate(this.edge.middleLabel!);
    }
  }

  private delayedEditServiceActivate(label: Label, delay: number = 75) {
    setTimeout(() => {
      this.selectionService.deselect();
      this.editService.activate(label);
    }, delay);
  }

  protected abstract get edge(): Edge;
}
