import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-special-character-selector',
  templateUrl: './special-character-selector.component.html',
  styleUrls: ['./special-character-selector.component.scss']
})
export class SpecialCharacterSelectorComponent {
  @Output() clickChar: EventEmitter<string> = new EventEmitter<string>();
  active: number = 1;

  readonly LC_GREEK1 = 'αβγδεζηθικλμν';
  readonly LC_GREEK2 = 'ξοπρςστυφχψω';
  readonly UC_GREEK1 = 'ΑΒΓΔΕΖΗΘΙΚΛΜΝ';
  readonly UC_GREEK2 = 'ΞΟΠΡΣΤΥΦΧΨΩ';
  readonly MATH1 = '∀∁∂∃∄∅∆∇∈∉'
  readonly MATH2 = '∊∋∌∍∎∏∐∑−∓';

  constructor() { }

  handleClick(char: string) {
    this.clickChar.emit(char);
  }
}
