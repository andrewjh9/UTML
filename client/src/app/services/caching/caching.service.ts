import { Injectable } from '@angular/core';
import {SerialisedDiagram} from "../../../serialisation/serialised-data-structures/serialised-diagram";
import {Diagram} from "../../../model/diagram";
import {SizeBoundDoublyLinkedList} from "./SizeBoundDoublyLinkedList";
import {deserialiseDiagram} from "../../../serialisation/deserialise/deserialise-diagram";
import {DiagramContainerService} from "../diagram-container.service";
import {LocalStorageService} from "./local-storage.service";
import {KeyboardEventCallerService} from "../keyboard-event-caller.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Service responsible for caching changes to the diagram object to localStorage and the redo/undo data structure.
 */
export class CachingService {
  /** Key of the serialised version of the diagram that is stored in local storage. */
  public static readonly LOCAL_STORAGE_KEY = 'diagram-cache';
  private readonly MAX_SIZE: number = 25;
  private readonly list: SizeBoundDoublyLinkedList<SerialisedDiagram>;
  private diagram: Diagram;

  constructor(diagramContainerService: DiagramContainerService,
              private localStorageService: LocalStorageService,
              keyboardEventCallerService: KeyboardEventCallerService) {
    this.diagram = diagramContainerService.get();
    diagramContainerService.diagramObservable.subscribe(diagram => this.diagram = diagram);
    this.list = new SizeBoundDoublyLinkedList<SerialisedDiagram>(this.MAX_SIZE, this.diagram.serialise());

    keyboardEventCallerService.addCallback(['z', 'keydown', 'ctrl'], (ignored) => {
      let result = this.undo();
      if (result !== null) {
        diagramContainerService.set(result!);
      }
    });

    keyboardEventCallerService.addCallback(['y', 'keydown', 'ctrl'], (ignored) => {
      let result = this.redo();
      if (result !== null) {
        diagramContainerService.set(result!);
      }
    });
  }

  /**
   * Save the current version of the diagram to localStorage and the redo/undo structure.
   * @throws Error if diagram is not set.
   */
  public save(): void {
    console.log('Caching')
    if (this.diagram === undefined) {
      throw new Error('You can not save whilst the diagram is not set!');
    }

    let serialisedDiagram = this.diagram.serialise();
    this.localStorageService.save();
    this.list.add(serialisedDiagram);
    // Todo: Make it so similar changes are merged. I.e., typing a word into a node counts as one undo/redo action.
  }

  /**
   * Return the previous diagram from the redo/undo data structure if possible.
   * @returns the previous version of the diagram, null if not available.
   */
  public undo(): Diagram | null {
    if (this.diagram === undefined || this.list === undefined) {
      throw new Error('You can not undo whilst the diagram is not set!');
    }

    let result = this.list.undo();
    if (result === null) {
      return null;
    } else {
      return deserialiseDiagram(result as SerialisedDiagram);
    }
  }

  /**
   * Return the diagram version after the current version from the redo/undo data structure if possible.
   * @returns the next version if possible, null if not.
   */
  public redo(): Diagram | null {
    if (this.diagram === undefined || this.list === undefined) {
      throw new Error('You can not redo whilst the diagram is not set!');
    }

    let result = this.list.redo();
    if (result === null) {
      return null;
    } else {
      return deserialiseDiagram(result as SerialisedDiagram);
    }
  }
}
