import {Injectable} from '@angular/core';
import {Edge} from "../../model/edge";
import {Node} from "../../model/node/node";
import {BehaviorSubject} from "rxjs";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {DeletionService} from "./deletion.service";

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private readonly selected: BehaviorSubject<Node | Edge | undefined> = new BehaviorSubject<Node | Edge | undefined>(undefined);
  public readonly selectedObservable = this.selected.asObservable();

  constructor(keyboardEventCallerService: KeyboardEventCallerService) {
    keyboardEventCallerService.addCallback(['Escape', 'keydown', 'any'], (event => {
      this.deselect();
    }));
  }

  public setNode(value: Node): void {
    this.selected.next(value);
  }

  public setEdge(value: Edge): void {
    this.selected.next(value);
  }

  public deselect(): void {
    this.selected.next(undefined);
  }
}
