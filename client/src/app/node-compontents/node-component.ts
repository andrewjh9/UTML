import {RepositionService} from "../services/reposition.service";
import {SelectionService} from "../services/selection.service";
import {Node} from "../../model/node/node";
import {Position} from "../../model/position";
import {Component, Input} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeletionService} from "../services/deletion.service";
import {ChangeDetectionService} from "../services/caching/change-detection.service";
import {FormattingModalComponent} from "../formatting-modal/formatting-modal.component";
import {MousePositionTransformService} from "../services/mouse-position-transform.service";
import {EditService} from "../services/edit.service";
import {EdgeCreationService} from "../services/edge-creation.service";
import {StartEndRepositioner} from "../services/edge-reposition/start-end-repositioner";

@Component({
  templateUrl: './node.component.html',
  selector: '[node-component]'
})
export class NodeComponent {
  @Input() node!: Node;
  hoveringNearby: boolean = false;
  isSelected: boolean = false;
  isInEditMode: boolean = false;
  edgeCreationIsActive: boolean = false;

  constructor(private repositionService: RepositionService,
              private selectionService: SelectionService,
              private modalService: NgbModal,
              private deletionService: DeletionService,
              private cachingService: ChangeDetectionService,
              private mousePositionTransformService: MousePositionTransformService,
              private editService: EditService,
              edgeCreationService: EdgeCreationService,
              public startEndRepositioner: StartEndRepositioner) {
    selectionService.selectedObservable.subscribe(selectedList => {
      this.isSelected = selectedList.includes(this.node);
    });

    edgeCreationService.activityObservable.subscribe(b => this.edgeCreationIsActive = b);
  }

  public handleMouseDown(event: MouseEvent) {
    if (this.edgeCreationIsActive) {
      return;
    }

    // If the node is already selected, we do not want to select it again.
    // This is because there are multiple selected nodes sometimes
    // and this allows you to move multiple at the same time.
    if (!this.isSelected) {
      if (event.ctrlKey) {
        this.selectionService.add(this.node);
      } else {
        this.selectionService.set(this.node);
      }
    } else {
      this.repositionService.activate(this.mousePositionTransformService.transformPosition(new Position(event.clientX, event.clientY)));
    }
  }

  public handleDoubleClick(event: MouseEvent) {
    if (this.repositionService.isActive()) {
      this.repositionService.deactivate();
    }

    if (event.ctrlKey) {
      this.editService.deactivate();
      if (this.selectionService.isNode()) {
        this.modalService.open(FormattingModalComponent);
      }
    } else {
      this.isInEditMode = true;
      this.editService.deactivate();
      this.editService.activate(this.node);
    }
  }

  delete(): void {
    this.modalService.dismissAll();
    this.deletionService.deleteNode(this.node);
  }
}
