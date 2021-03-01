import {LineType} from "../model/edge";
import {Label} from "../model/label";
import {SelectionService} from "./services/selection.service";
import {Mode, ModeService} from "./services/mode.service";
import {OnDestroy} from "@angular/core";

export abstract class AbstractEdgeComponent {
  protected mode: Mode;

  protected constructor(protected selectionService: SelectionService,
              modeService: ModeService) {
    modeService.modeObservable.subscribe((mode: Mode) => this.mode = mode);
    this.mode = modeService.getLatestMode();
  }
}
