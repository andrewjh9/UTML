import { Injectable } from '@angular/core';
import {SerialisedDiagram} from "../../../serialisation/serialised-data-structures/serialised-diagram";
import {Diagram} from "../../../model/diagram";

@Injectable({
  providedIn: 'root'
})
export class CachingService {
  private stack: SerialisedDiagram[] = [];

  constructor() { }

  public add(diagram: Diagram): void {
    console.log("Adding to cache.");
    this.stack.push(diagram.serialise());
    console.log(this.stack);
  }

  public pop(): SerialisedDiagram | undefined {
    if (this.stack.length === 1) {
      return undefined;
    } else {
      this.stack.pop();
      return this.stack[this.stack.length - 1];
    }
  }
}
