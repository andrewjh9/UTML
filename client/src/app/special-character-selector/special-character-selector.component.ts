import {Component, ElementRef, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-special-character-selector',
  templateUrl: './special-character-selector.component.html',
  styleUrls: ['./special-character-selector.component.scss']
})
export class SpecialCharacterSelectorComponent {
  @Input() characters!: string;
  @Input() target!: ElementRef;

  get charArray() {
    let result = [];
    for (let i = 0; i < this.characters.length; i++) {
      result.push(this.characters.charAt(i));
    }
    return result;
  }

  constructor() { }

  handleClick(char: string) {
    this.target.nativeElement.value += char;
  }
}
