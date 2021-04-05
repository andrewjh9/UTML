import { Component, OnInit } from '@angular/core';
import {BackgroundOverlayComponent} from "../background-overlay-component";
import {ZoomService} from "../services/zoom.service";

@Component({
  selector: '[white-background]',
  templateUrl: './white-background.component.html',
  styleUrls: ['./white-background.component.scss']
})
export class WhiteBackgroundComponent extends BackgroundOverlayComponent {
  constructor(zoomService: ZoomService) {
    super(zoomService);
  }
}
