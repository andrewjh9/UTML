import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * Class that is responsible for using keyboard event to specific callbacks.
 * The keyboard events supplied by app.components.ts.
 * The callbacks are added by other services or components who want to trigger certain actions based on keyboard events.
 */
export class KeyboardEventCallerService {
  private keys: Array<KeyTuple> = [];
  private callbacks: Array<Array<KeyboardCallback>> = [];

  constructor() {
  }

  public addCallback(key: KeyTuple, callback: KeyboardCallback) {
    let index = this.keys.findIndex(elem => key[0] === elem[0] && key[1] === elem[1] && key[2] === elem[2]);

    if (index === -1) {
      this.keys.push(key);
      this.callbacks.push([callback]);
    } else {
      this.callbacks[index].push(callback);
    }
  }

  public executeCallbacks(key: KeyTuple, event: KeyboardEvent) {
    for (let i = 0; i < this.keys.length; i++) {
      if ((this.keys[i][0] == key[0]) &&
        (this.keys[i][1] == key[1]) &&
        (this.keys[i][2] === key[2] || this.keys[i][2] === 'any')) {
        this.callbacks[i].forEach(f => f(event));
      }
    }
  }
}

type KeyTuple = [string, KeyboardEventType, DownButton]
type KeyboardCallback = (event: KeyboardEvent) => void;
type KeyboardEventType = 'keydown' | 'keyup';
export type DownButton = 'none' | 'ctrl' | 'shift' | 'alt' | 'any';
