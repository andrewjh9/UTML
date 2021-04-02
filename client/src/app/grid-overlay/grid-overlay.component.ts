import { Component, OnInit } from '@angular/core';
import {ZoomService} from "../services/zoom.service";
import {SettingsContainerService} from "../services/settings-container.service";
import {BackgroundOverlayComponent} from "../background-overlay-component";
import {SelectionService} from "../services/selection.service";
import {MousePositionTransformService} from "../services/mouse-position-transform.service";
import {Position} from "../../model/position";
import {LensOffsetService} from "../services/lens-offset.service";

@Component({
  selector: '[grid-overlay]',
  templateUrl: './grid-overlay.component.html',
  styleUrls: ['./grid-overlay.component.scss']
})
export class GridOverlayComponent extends BackgroundOverlayComponent {
  active: boolean;

  constructor(zoomService: ZoomService,
              settingsContainerService: SettingsContainerService,
              private selectionService: SelectionService,
              private mousePositionTransformService: MousePositionTransformService,
              private lensOffsetService: LensOffsetService) {
    super(zoomService);
    this.active = settingsContainerService.grid.getValue();
    settingsContainerService.grid.asObservable().subscribe(grid => this.active = grid);
  }

  handleMouseDown(event: MouseEvent) {
    // The shift key is reserved for group selection through click and drag.
    if (!event.shiftKey) {
      this.selectionService.deselect();
      this.lensOffsetService.activate(this.mousePositionTransformService.transFormZoomAndMenubar(new Position(event.x, event.y)));
    }
  }
}
