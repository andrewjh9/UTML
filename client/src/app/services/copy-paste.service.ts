import {EventEmitter, Injectable} from '@angular/core';
import {SelectionService} from "./selection.service";
import {Edge} from "../../model/edge";
import {Node} from "../../model/node/node";
import {KnownDeclaration} from "@angular/compiler-cli/src/ngtsc/reflection";
import {Position} from "../../model/position";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";

@Injectable({
  providedIn: 'root'
})
export class CopyPasteService {
  private clipboard: Array<Node | Edge> = [];
  private selected: Array<Node | Edge> = [];
  public readonly pasteEmitter: EventEmitter<Node | Edge> = new EventEmitter<Node|Edge>();

  constructor(selectionService: SelectionService, keyboardEventCaller: KeyboardEventCallerService) {
    selectionService.selectedObservable.subscribe(selected => {
      this.selected = selected;
    });

    keyboardEventCaller.addCallback(['c', 'keydown', 'ctrl'], (ignored: KeyboardEvent) => {
      if (this.copyIsAvailable()) {
        this.doCopy();
      }
    });

    keyboardEventCaller.addCallback(['v', 'keydown', 'ctrl'], (ignored: KeyboardEvent) => {
      if (this.pasteIsAvailable()) {
        this.doPaste();
      }
    });
  }

  public doCopy(): void {
    if (!this.copyIsAvailable()) {
      throw new Error('Trying to copy whilst copy is not available.');
    }

    this.clipboard = this.selected;
  }

  public copyIsAvailable(): boolean {
    return this.selected.length > 0;
  }

  public doPaste(): void {
    const OFFSET = 25;
    if (!this.pasteIsAvailable()) {
      throw new Error('Trying to paste whilst copy is not available.');
    }

    this.clipboard.forEach(clipboardElem => {
      if (clipboardElem instanceof Node) {
        let copy = (<Node> clipboardElem).getDeepCopy();
        copy.position.x += OFFSET;
        copy.position.y += OFFSET;
        this.pasteEmitter.emit(copy);
      } else {
        let copy = (<Edge> clipboardElem).getDeepCopy();
        let startPos = copy.getStartPosition();
        let endPos = copy.getEndPosition();
        copy.startNode = undefined;
        copy.endNode = undefined;
        copy.startPosition = Position.add(new Position(OFFSET, OFFSET), startPos);
        copy.endPosition = Position.add(new Position(OFFSET, OFFSET), endPos);
        copy.middlePositions = copy.middlePositions.map(pos => Position.add(new Position(OFFSET, OFFSET), pos));
        this.pasteEmitter.emit(copy);
      }
    });

  }

  public pasteIsAvailable(): boolean {
    return this.clipboard.length > 0;
  }
}
