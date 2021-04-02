import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {RepositionService} from "./reposition.service";
import {Deactivatable} from "./deactivatable";
import {EdgeCreationService} from "./edge-creation.service";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Service responsible for determining in which mode the drawing tool resides.
 * If using the service, the mode should be read by subscribing to the modeObservable.
 * When a mode is switch any Deactivatable service is deactivated.
 * Note that you have to manually add your Deactivatable to the constructor.
 */
export class ModeService {
  private deactivatables: Deactivatable[];
  private mode: BehaviorSubject<Mode>;

  /**
   * Observable wrapper around the mode. You can use this to subscribe to mode updates.
   */
  public readonly modeObservable: Observable<Mode> = new Observable<Mode>();


  constructor(repositionService: RepositionService,
              edgeCreationService: EdgeCreationService,
              keyboardEventCallerService: KeyboardEventCallerService) {
    this.deactivatables = [repositionService, edgeCreationService];
    this.mode = new BehaviorSubject<Mode>(Mode.Select);
    this.modeObservable = this.mode.asObservable();
      }

  /**
   * Sets the mode and multi-casts this update to all subscribed.
   * In addition to this all deactivatables are deactivated.
   * @param mode New mode value
   */
  public setMode(mode: Mode): void {

  }

  /**
   * Returns what the mode was set to in the last update.
   * This should be used to initialise objects when they are creation.
   * After creation they should rely on subscription to the observable for updates.
   */
  public getLatestMode(): Mode {
    return this.mode.getValue();
  }
}

export enum Mode {
  Select = 1,
  Create = 2,
  Move = 3
}
