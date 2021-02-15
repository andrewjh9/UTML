import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LabelFormatter} from "../../assets/serialisation/label";
import {Position} from "../../assets/serialisation/position";
import {Movable} from "../moveable";
import {FormattedElement, RepositionService} from "../reposition.service";

@Component({
  selector: '[label-component]',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent extends Movable {
  @Input() formatter?: LabelFormatter;
  @Input() label?: string;
  // @Output() labelChange: EventEmitter<string> = new EventEmitter<string>()

  constructor(repositionService: RepositionService) {
    super(repositionService);
  }

  handleDoubleClick($event: MouseEvent): void {
    this.label = window.prompt("New label?") || this.label;
    // this.labelChange.emit(this.label);
  }

  getFormatter(): FormattedElement | undefined {
    return this.formatter;
  }
}
