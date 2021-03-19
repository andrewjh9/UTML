import {RepositionService} from "../services/reposition.service";
import {Mode, ModeService} from "../services/mode.service";
import {SelectionService} from "../services/selection.service";
import {Node} from "../../model/node/node";
import {Position} from "../../model/position";
import {ModeAwareComponent} from "../mode-aware-component";
import {DiagramComponent} from "../diagram/diagram.component";
import {Component, ElementRef, Input, ViewChild} from "@angular/core";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DeletionService} from "../services/deletion.service";
import {CachingService} from "../services/caching/caching.service";
import {FormattingModalComponent} from "../formatting-modal/formatting-modal.component";
import {MousePositionTransformService} from "../services/mouse-position-transform.service";
import {EditService} from "../services/edit.service";

@Component({
  templateUrl: './node.component.html',
  selector: '[node-component]'
})
export class NodeComponent extends ModeAwareComponent {
  @Input() node!: Node;
  hoveringNearby: boolean = false;
  isSelected: boolean = false;
  isInEditMode: boolean = false;

  constructor(private repositionService: RepositionService,
              modeService: ModeService,
              private selectionService: SelectionService,
              private modalService: NgbModal,
              private deletionService: DeletionService,
              private cachingService: CachingService,
              private mousePositionTransformService: MousePositionTransformService,
              private editService: EditService) {
    super(modeService);
    selectionService.selectedObservable.subscribe(selectedList => {
      this.isSelected = selectedList.includes(this.node);
    });
  }

  public handleMouseDown(event: MouseEvent) {
    // If the node is already selected, we do not want to select it again.
    // This is because there are multiple selected nodes sometimes
    // and this allows you to move multiple at the same time.
    if (!this.isSelected) {
      this.selectionService.setNode(this.node);
    }
    this.repositionService.activate(this.mousePositionTransformService.transformPosition(new Position(event.clientX, event.clientY)));
  }

  public handleMouseEnter() {
    this.hoveringNearby = true;
  }

  public handleMouseLeave() {
    this.hoveringNearby = false;
  }

  public handleDoubleClick(event: MouseEvent) {
    if (event.ctrlKey) {
      if (this.selectionService.isNode()) {
        this.modalService.open(FormattingModalComponent);
      }
    } else if (this.node && this.editService.getNode() != this.node) {
      this.isInEditMode = true;
      this.editService.deactivate();
      this.editService.activate(this.node);
    } else if (this.node == this.editService.getNode()) {
      this.editService.addField();
    }
  }

  delete(): void {
    this.modalService.dismissAll();
    this.deletionService.deleteNode(this.node);
  }

  save(): void {
    this.cachingService.save();
  }
}
