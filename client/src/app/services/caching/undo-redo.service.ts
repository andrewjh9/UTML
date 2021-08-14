import { Injectable } from '@angular/core';
import {SizeBoundDoublyLinkedList} from "./SizeBoundDoublyLinkedList";
import {SerialisedDiagram} from "../../../serialisation/serialised-data-structures/serialised-diagram";
import {ChangeDetectionService} from "./change-detection.service";
import {DiagramContainerService} from "../diagram-container.service";
import {deserialiseDiagram} from "../../../serialisation/deserialise/deserialise-diagram";
import {KeyboardEventCallerService} from "../keyboard-event-caller.service";

@Injectable({
  providedIn: 'root'
})
export class UndoRedoService {
  private readonly MAX_SIZE: number = 25;
  private readonly list: SizeBoundDoublyLinkedList<SerialisedDiagram>;

  constructor(changeDetectionService: ChangeDetectionService,
              private diagramContainerService: DiagramContainerService,
              private keyboardEventCallerService: KeyboardEventCallerService) {
    this.list = new SizeBoundDoublyLinkedList<SerialisedDiagram>(this.MAX_SIZE, diagramContainerService.get().serialise());

    changeDetectionService.addCallback(() => {
      this.list.add(diagramContainerService.get().serialise());
    });

    keyboardEventCallerService.addCallback(['z', 'keydown', 'ctrl'], (ignored) => this.undo());
    keyboardEventCallerService.addCallback(['y', 'keydown', 'ctrl'], (ignored) => this.redo());
  }

  public undo(): void {
    let result = this.list.undo();
    if (result !== null) {
      this.diagramContainerService.set(deserialiseDiagram(result as SerialisedDiagram));
    }
  }

  public redo(): void {
    let result = this.list.redo();
    if (result !== null) {
      this.diagramContainerService.set(deserialiseDiagram(result as SerialisedDiagram));
    }
  }
}
