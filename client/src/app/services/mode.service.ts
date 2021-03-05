import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {EdgeRepositionService} from "./edge-reposition/edge-reposition.service";
import {RepositionService} from "./reposition.service";
import {Deactivatable} from "./deactivatable";
import {EdgeCreationService} from "./edge-creation.service";

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


  constructor(edgeRepositionService: EdgeRepositionService,
              repositionService: RepositionService,
              edgeCreationService: EdgeCreationService) {
    this.deactivatables = [edgeRepositionService, repositionService, edgeCreationService];
    this.mode = new BehaviorSubject<Mode>(Mode.Select);
    this.modeObservable = this.mode.asObservable();
  }

  /**
   * Sets the mode and multi-casts this update to all subscribed.
   * In addition to this all deactivatables are deactivated.
   * @param mode New mode value
   */
  public setMode(mode: Mode): void {
    if (this.getLatestMode() !== mode) {
      this.mode.next(mode);
      this.deactivatables.forEach(d => d.deactivate());
    }
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
