import { Injectable } from '@angular/core';
import {Error} from "tslint/lib/error";

@Injectable({
  providedIn: 'root'
})
// Todo: Fix bug where change detection does not trigger upon undo redo.
export class ChangeDetectionService {
  private nextId: number = 0;
  private callbackMap: {[key: number]: Callback} = {};

  constructor() { }

  public addCallback(callback: Callback): number {
    let id = this.nextId;
    this.callbackMap[id] = callback;
    this.nextId++;
    return id;
  }

  public removeCallback(id: number): void {
    if (!this.callbackMap.hasOwnProperty(id)) {
      throw new Error(`There is no callback with id=${id} and therefore the callback can not be removed.`);
    }

    delete this.callbackMap[id];
  }

  public trigger(): void {
    Object.entries(this.callbackMap).forEach(([id, callback]) => callback());
  }
}

type Callback = {
  (): void
};
