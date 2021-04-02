import { Component, OnInit } from '@angular/core';
import {ZoomService} from "../services/zoom.service";
import {SettingsContainerService} from "../services/settings-container.service";
import {BackgroundOverlayComponent} from "../background-overlay-component";

@Component({
  selector: '[grid-overlay]',
  templateUrl: './grid-overlay.component.html',
  styleUrls: ['./grid-overlay.component.scss']
})
export class GridOverlayComponent extends BackgroundOverlayComponent {
  active: boolean;

  constructor(zoomService: ZoomService, settingsContainerService: SettingsContainerService) {
    super(zoomService);
    this.active = settingsContainerService.grid.getValue();
    settingsContainerService.grid.asObservable().subscribe(grid => this.active = grid);
  }
}
