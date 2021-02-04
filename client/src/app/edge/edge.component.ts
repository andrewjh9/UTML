import {Component, Input, NgModule, NO_ERRORS_SCHEMA, OnInit} from '@angular/core';
import {ArrowStyle, Edge, EdgeStyle} from "../model/diagram";

@Component({
  selector: '[edge-component]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.scss'],
})
export class EdgeComponent {
  @Input() edge?: Edge;
  constructor() {

  }
}
