import {RepositionService} from "../services/reposition.service";
import {Mode, ModeService} from "../services/mode.service";
import {SelectionService} from "../services/selection.service";
import {Node} from "../../model/node/node";
import {Position} from "../../model/position";
import {ModeAwareComponent} from "../mode-aware-component";
import {DiagramComponent} from "../diagram/diagram.component";
import {Component, Input} from "@angular/core";

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
              private selectionService: SelectionService) {
    super(modeService);
    selectionService.selectedObservable.subscribe(value => {
      this.isSelected = (this.node === undefined) ? false : value === this.node
    });
  }

  public handleMouseDown(event: MouseEvent) {
    this.selectionService.setNode(this.node);
    this.repositionService.activate(this.node, new Position(event.clientX, event.clientY - DiagramComponent.NAV_HEIGHT));
  }

  public handleMouseEnter() {
    this.hoveringNearby = true;
  }

  public handleMouseLeave() {
    this.hoveringNearby = false;
  }
}