import {EventEmitter, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Node} from "../../model/node/node";
import {Edge} from "../../model/edge/edge";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {Label} from "../../model/edge/label";
import {CachingService} from "./caching/caching.service";
import {SelectionService} from "./selection.service";
import {BehaviorSubject} from "rxjs";
import {logger} from "codelyzer/util/logger";
import {specialCharMap} from "../special-char-map";
import {DeletionService} from "./deletion.service";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private readonly editElement: BehaviorSubject<Node | Label | undefined> = new BehaviorSubject<Node|Label|undefined>(undefined);
  public readonly editElementObservable = this.editElement.asObservable();
  public readonly deleteLabelEmitter: EventEmitter<Label> = new EventEmitter<Label>();

  private rowIndex?: number;
  private charIndex?: number;

  constructor(private selectionService: SelectionService,
              private cachingService: CachingService) {
    selectionService.selectedObservable.subscribe(ignored => this.deactivate());
  }

  public isActive(): boolean {
    return this.editElement.getValue() !== undefined;
  }

  public activate(editElement: Label | Node) {
    this.editElement.next(editElement);
    this.rowIndex = 0;
    this.charIndex = this.rows[0].length;
  }

  public includeCursor(s: string) {
    let rows = s.split('\\n');
    rows = rows.map((row, index) => {
      if (index === this.rowIndex) {
        return row.slice(0, this.charIndex!) + '|' + row.slice(this.charIndex!)
      }
      return row;
    });
    return rows.join('\\n');
  }

  private setValue(str: string) {
    str = this.replaceSpecialChars(str);

    if (!this.isActive()) { throw new Error("Can not get when unactivated. ") }
    let element = this.editElement.getValue()
    if (element instanceof Node) {
      element.text = str;
    } else if (element instanceof Label) {
      element.value = str;
    }
  }

  private get value(): string {
    if (!this.isActive()) { throw new Error("Can not get when unactivated. ") }
    let value = this.editElement.getValue();
    return value instanceof Node ? value.text : value!.value;
  }

  public handleKeyPressed(key: string, controlPressed: boolean): void {
    if (!this.isActive()) {
      throw new Error();
    }

    if (key.length === 1) {
      this.addChar(key);
    } else if (key === 'Escape' || (key === 'Enter' && controlPressed)) {
      this.deactivate();
      this.selectionService.deselect();
    } else if (key === 'Backspace') {
      this.backspace();
    } else if (key === 'Enter') {
      this.addLine();
    } else if (key === 'ArrowUp') {
      this.previousRowIfPossible();
    } else if (key === 'ArrowDown') {
      this.nextRowIfPossible();
    } else if (key === 'ArrowRight') {
      this.nextCharIfPossible();
    } else if (key === 'ArrowLeft') {
      this.previousCharIfPossible();
    } else if (key === 'Delete') {
      if (this.charIndex! !== this.rows[this.rowIndex!].length) {
        this.nextCharIfPossible();
        this.backspace();
      }
    }
  }

  private get rows(): string[] {
    return this.value.split('\\n');
  }

  private get lineAmount(): number {
    return this.rows.length;
  }

  private nextRowIfPossible() {
    if (this.rowIndex! >= (this.lineAmount - 1)) {
      return;
    }

    this.rowIndex!++;
    this.charIndex = this.rows[this.rowIndex!].length;
  }

  private previousRowIfPossible() {
    if (this.rowIndex! <= 0) {
      return;
    }

    this.rowIndex!--;
    this.charIndex = this.rows[this.rowIndex!].length;
  }

  private previousCharIfPossible() {
    if (this.charIndex! !== 0) {
      this.charIndex!--;
    }
  }

  private nextCharIfPossible() {
    if (this.charIndex! !== this.rows[this.rowIndex!].length) {
      this.charIndex!++;
    }
  }

  private addLine() {
    let beforeRows = this.rows.slice(0, this.rowIndex!);
    if (beforeRows.length !== 0) {
      beforeRows.push('');
    }

    let current = this.rows[this.rowIndex!];
    let beforeChars = current.slice(0, this.charIndex!);
    let afterChars = current.slice(this.charIndex!);

    let afterRows = this.rows.slice(this.rowIndex! + 1);
    if (afterRows.length !== 0) {
      afterRows = ['', ...afterRows]
    }

    this.setValue(beforeRows.join('\\n') + beforeChars + '\\n' + afterChars + afterRows.join('\\n'));

    this.rowIndex!++;
    this.charIndex = 0;
  }

  private backspace() {
    // Remove row if it is empty, unless it is the last row.
    if (this.rowIndex! !== 0 && this.rows[this.rowIndex!].length === 0 && this.rows.length !== 1) {
      let newRows = this.rows.map(x => x);
      newRows.splice(this.rowIndex!, 1);
      this.rowIndex!--;
      this.setValue(newRows.join('\\n'));
      this.charIndex = this.rows[this.rowIndex!].length;
    } else if (this.charIndex! !== 0) {
      let newRows = this.rows.map((row, index) => {
        if (index === this.rowIndex!) {
          return row.substr(0, this.charIndex! - 1) + row.substr(this.charIndex!);
        }
        return row;
      });
      this.charIndex!--;

      this.setValue(newRows.join('\\n'));
    }
  }

  private addChar(char: string) {
    let newRows = this.rows.map((row, index) => {
      if (index === this.rowIndex!) {
        return row.substr(0, this.charIndex!) + char + row.substr(this.charIndex!);
      }
      return row;
    });
    this.charIndex!++;
    this.setValue(newRows.join('\\n'));
  }

  public deactivate() {
    if (this.isActive()) {
      // Delete labels that are just whitespace as these can not be selected again and would
      // have to be deleted or edited through the advanced formatting.
      if (this.editElement.getValue() instanceof Label && (this.editElement.getValue() as Label).value.trim() === '') {
        this.deleteLabelEmitter.emit(this.editElement.getValue() as Label);
      }

      this.cachingService.save();
    }
    this.charIndex = undefined;
    this.rowIndex = undefined;
    this.editElement.next(undefined);
  }

  private replaceSpecialChars(str: string): string {
    for (let [name, char] of Object.entries(specialCharMap)) {
      const MARKER_CHAR = 'ǚ';
      str = str.replace(`\\${name}`, `${MARKER_CHAR}${char}`);
      let index = str.split('\\n')[this.rowIndex!].indexOf(MARKER_CHAR);
      if (index !== -1) {
        this.charIndex = index + 1;
        str = str.replace(MARKER_CHAR, '');
      }
    }

    return str;
  }
}
