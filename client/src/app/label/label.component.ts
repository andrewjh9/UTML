import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LabelFormatter} from "../../assets/serialisation/label";
import {Position} from "../../assets/serialisation/position";

@Component({
  selector: '[label-component]',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent {
  @Input() formatter?: LabelFormatter;
  @Input() label?: string;
  @Output() labelChange: EventEmitter<string> = new EventEmitter<string>()

  constructor() {
  }

  handleClick($event: MouseEvent): void {
    if (this.formatter) {
      this.formatter.position.y -= 10;
    }
  }

  handleDoubleClick($event: MouseEvent): void {
    this.label = window.prompt("New label?") || this.label;
    this.labelChange.emit(this.label);
  }
}
