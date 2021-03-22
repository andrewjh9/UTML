import { Component, OnInit } from '@angular/core';

@Component({
  selector: '[grid-overlay]',
  templateUrl: './grid-overlay.component.html',
  styleUrls: ['./grid-overlay.component.scss']
})
export class GridOverlayComponent {
  width = 1200;
  height = 600;
  active = true;

  constructor() { }
}
