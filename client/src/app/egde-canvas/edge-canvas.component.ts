import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Edge, ArrowStyle, EdgeStyle } from '../model/diagram';

@Component({
  selector: 'app-edge-canvas',
  templateUrl: './edge-canvas.component.html',
  styleUrls: ['./edge-canvas.component.scss']
})
export class EdgeCanvasComponent {
  @Input() public edges?: Edge[];
}
