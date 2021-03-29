import {Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {Node} from "../../model/node/node";
import {Edge} from "../../model/edge";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {Label} from "../../model/label";
import {CachingService} from "./caching/caching.service";
import {SelectionService} from "./selection.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditService {
  private readonly editElement: BehaviorSubject<Node | Label | undefined> = new BehaviorSubject<Node|Label|undefined>(undefined);
  public readonly editElementObservable = this.editElement.asObservable();

  private rowIndex?: number;
  private charIndex?: number;

  constructor(private selectionService: SelectionService, private cachingService: CachingService) {
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

  private setValue(s: string) {
    if (!this.isActive()) { throw new Error("Can not get when unactivated. ") }
    let element = this.editElement.getValue()
    if (element instanceof Node) {
      element.text = s;
    } else if (element instanceof Label) {
      element.value = s;
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
    console.log(key)
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
    if (this.rowIndex! === this.lineAmount - 1) {
      this.setValue(this.value + '\\n');
    } else {
      this.setValue([
        this.rows.slice(0, this.rowIndex! + 1),
        '',
        this.rows.slice(this.rowIndex! + 1)
      ].join('\\n'));
    }

    this.rowIndex!++;
    this.charIndex = 0;
  }

  private backspace() {
    // Remove row if it is empty, unless it is the last row.
    if (this.rowIndex! !== 0 && this.rows[this.rowIndex!].length === 0 && this.rows.length !== 1) {
      let newRows = this.rows.map(x => x);
      newRows.splice(this.rowIndex!, 1);
      this.setValue(newRows.join('\\n'));
      this.rowIndex!--;
      this.charIndex = this.rows[this.rowIndex!].length;
      console.log(newRows);
    } else if (this.charIndex! !== 0) {
      console.log('lower')
      let newRows = this.rows.map((row, index) => {
        if (index === this.rowIndex!) {
          return row.substr(0, this.charIndex! - 1) + row.substr(this.charIndex!);
        }
        return row;
      });
      console.log(newRows)
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
    console.log(newRows)
    this.charIndex!++;
    this.setValue(newRows.join('\\n'));
  }

  public deactivate() {
    this.charIndex = undefined;
    this.rowIndex = undefined;
    this.editElement.next(undefined);
    this.cachingService.save();
  }
}
