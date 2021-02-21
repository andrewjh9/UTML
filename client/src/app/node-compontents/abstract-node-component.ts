import {RepositionService} from "../services/reposition.service";
import {Mode, ModeService} from "../services/mode.service";
import {SelectionService} from "../services/selection.service";
import {Node} from "../../assets/serialisation/node/node";
import {Position} from "../../assets/serialisation/position";

export abstract class AbstractNodeComponent {
  protected mode: Mode;

  protected constructor(private repositionService: RepositionService,
                        modeService: ModeService,
                        private selectionService: SelectionService) {
    this.mode = modeService.getLatestMode();
    modeService.modeObservable.subscribe(mode => this.mode = mode);
  }

  protected abstract getNode(): Node;


  public handleMouseDown(event: MouseEvent) {
    switch(this.mode) {
      case Mode.Move:
        this.repositionService.activate(this.getNode(), new Position(event.clientX, event.clientY));
        break;
      case Mode.Select:
        this.selectionService.setNode(this.getNode());
        break;
    }
  }
}
