import { Injectable } from '@angular/core';
import {SerialisedDiagram} from "../../../serialisation/serialised-data-structures/serialised-diagram";
import {Diagram} from "../../../model/diagram";
import {SizeBoundDoublyLinkedList} from "./SizeBoundDoublyLinkedList";
import {deserialiseDiagram} from "../../../serialisation/deserialise/deserialise-diagram";

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private readonly MAX_SIZE: number = 25;
  private list?: SizeBoundDoublyLinkedList<SerialisedDiagram>;
  private diagram?: Diagram;

  constructor() {
    this.list = new SizeBoundDoublyLinkedList<SerialisedDiagram>(this.MAX_SIZE, (new Diagram()).serialise());
  }

  /**
   * Sets the diagram for future use and saves the state of the diagram at the moment of setting.
   * @param diagram Reference to the diagram to be cached when save() is called.
   */
  public setDiagram(diagram: Diagram) {
    this.diagram = diagram;
  }

  public save(): void {
    console.log('Caching');
    if (this.diagram === undefined || this.list === undefined) {
      throw new Error('You can not save whilst the diagram is not set!');
    }

    this.list.add(this.diagram.serialise());
    // Todo: Make it so similar changes are merged. I.e., typing a word into a node counts as one undo/redo action.
  }

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
