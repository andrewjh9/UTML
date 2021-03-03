import { Injectable } from '@angular/core';
import {SerialisedDiagram} from "../../../serialisation/serialised-data-structures/serialised-diagram";
import {Diagram} from "../../../model/diagram";
import {SizeBoundDoublyLinkedList} from "./SizeBoundDoublyLinkedList";
import {deserialiseDiagram} from "../../../serialisation/deserialise/deserialise-diagram";

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private readonly MAX_SIZE: number = 10;
  private list: SizeBoundDoublyLinkedList<SerialisedDiagram>;


  constructor() {
    this.list = new SizeBoundDoublyLinkedList<SerialisedDiagram>(this.MAX_SIZE, (new Diagram()).serialise());
  }

  public do(diagram: Diagram): void {
    this.list.add(diagram.serialise());
  }

  public undo(): Diagram | null {
    let result = this.list.undo();
    if (result === null) {
      return null;
    } else {
      return deserialiseDiagram(result as SerialisedDiagram);
    }
  }

  public redo(): Diagram | null {
    let result = this.list.redo();
    if (result === null) {
      return null;
    } else {
      return deserialiseDiagram(result as SerialisedDiagram);
    }
  }
}
