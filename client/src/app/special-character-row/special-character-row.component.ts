import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'special-character-row',
  templateUrl: './special-character-row.component.html',
  styleUrls: ['./special-character-row.component.scss']
})
export class SpecialCharacterRowComponent {
  @Input() characters!: string;
  @Input() charEmitter!: EventEmitter<string>;

  get charArray() {
    let result = [];
    for (let i = 0; i < this.characters.length; i++) {
      result.push(this.characters.charAt(i));
    }
    return result;
  }

  callback(char: string) {
    this.charEmitter.emit(char);
  }
}
