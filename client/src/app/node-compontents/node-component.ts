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

@Component({
  templateUrl: './node.component.html',
  selector: '[node-component]'
})
export class NodeComponent extends ModeAwareComponent {
  @Input() node!: Node;
  hoveringNearby: boolean = false;
  isSelected: boolean = false;

  constructor(private repositionService: RepositionService,
              modeService: ModeService,
              private selectionService: SelectionService,
              private modalService: NgbModal,
              private deletionService: DeletionService,
              private cachingService: CachingService,
              private mousePositionTransformService: MousePositionTransformService) {
    super(modeService);
    selectionService.selectedObservable.subscribe(selectedList => {
      this.isSelected = selectedList.includes(this.node);
    });
  }

  public handleMouseDown(event: MouseEvent) {
    if (!this.isSelected) {
      this.selectionService.setNode(this.node);
    }
    this.repositionService.activate(new Position(event.x, event.y - DiagramComponent.NAV_HEIGHT));
    this.selectionService.setNode(this.node);
    this.repositionService.activate(this.node,
      this.mousePositionTransformService.transformPosition(new Position(event.clientX, event.clientY)));
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
