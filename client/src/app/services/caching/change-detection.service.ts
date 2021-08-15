import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// Todo: Fix bug where change detection does not trigger upon undo redo.
/**
 * The ChangeDetectionService allows other services and components to subscribe to changes to the diagram.
 *
 * A change here is anything that changes the formatting, structure, or contents of the diagram.
 * Examples would be moving a node, deleting an edge, and altering the text inside a node.
 * Actions such as zooming and panning are not considered changes and should not trigger change detection.
 *
 * Services that make the aforementioned changes to the diagram are themselves responsible for triggering
 * the change detection service. This is done by calling the trigger method of this service.
 * This means that if you create a service that makes changes to the diagram you are responsible for triggering
 * this service. This will not automagically happen.
 *
 * Services or components can provide a callback to be executed upon a detected change.
 * This is done by adding a callback using the addCallback method. Each callback has a unique ID.
 * This ID can be used to remove the callback using the removeCallback method.
 */
export class ChangeDetectionService {
  private nextId: number = 0;
  private callbackMap: {[key: number]: Callback} = {};

  /**
   * Add a callback to be executed upon a detected change.
   * @param callback The callback to be executed upon a detected change.
   * @returns Unique ID to the added callback. Can be used to remove the callback.
   */
  public addCallback(callback: Callback): number {
    let id = this.nextId;
    this.callbackMap[id] = callback;
    this.nextId++;
    return id;
  }

  /**
   * Remove a callback from change detection using its unique ID.
   * @param id The ID of the callback to be removed.
   * @throws Error An error is thrown if there is no callback with the provided id.
   */
  public removeCallback(id: number): void {
    if (!this.callbackMap.hasOwnProperty(id)) {
      throw new Error(`There is no callback with id=${id} and therefore the callback can not be removed.`);
    }

    delete this.callbackMap[id];
  }

  /**
   * Trigger the ChangeDetectionService.
   * This executes all callbacks that were added and not removed to this service.
   */
  public trigger(): void {
    Object.entries(this.callbackMap).forEach(([id, callback]) => callback());
  }
}

type Callback = {
  (): void
};
