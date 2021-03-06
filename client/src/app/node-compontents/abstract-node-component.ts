import {RepositionService} from "../services/reposition.service";
import {Mode, ModeService} from "../services/mode.service";
import {SelectionService} from "../services/selection.service";
import {Node} from "../../model/node/node";
import {Position} from "../../model/position";
import {ModeAwareComponent} from "../mode-aware-component";
import {DiagramComponent} from "../diagram/diagram.component";

export abstract class AbstractNodeComponent extends ModeAwareComponent {
  protected constructor(private repositionService: RepositionService,
                        modeService: ModeService,
                        private selectionService: SelectionService) {
    super(modeService);
  }

  public abstract getNode(): Node;

  public handleMouseDown(event: MouseEvent) {
    switch(this.mode) {
      case Mode.Move:
        this.repositionService.activate(this.getNode(), new Position(event.clientX, event.clientY - DiagramComponent.NAV_HEIGHT));
        break;
      case Mode.Select:
        this.selectionService.setNode(this.getNode());
        break;
    }
  }

}
