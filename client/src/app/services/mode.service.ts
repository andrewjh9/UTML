import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {EdgeRepositionService} from "./edge-reposition.service";
import {RepositionService} from "./reposition.service";
import {Deactivatable} from "./deactivatable";
import {EdgeCreationService} from "./edge-creation-service.service";

@Injectable({
  providedIn: 'root'
})
/**
 * Service responsible for determining in which mode the drawing tool resides.
 * If using the service, the mode should be read by subscribing to the modeObservable.
 * When a mode is switch any Deactivatable service is deactivated.
 */
export class ModeService {
  private deactivatables: Deactivatable[];
  public modeObservable: Observable<Mode> = new Observable<Mode>();
  private mode: Subject<Mode>;

  constructor(edgeRepositionService: EdgeRepositionService, repositionService: RepositionService,
              edgeCreationService: EdgeCreationService) {
    this.deactivatables = [edgeRepositionService, repositionService, edgeCreationService];
    this.mode = new Subject<Mode>();
    this.modeObservable = this.mode.asObservable();
    this.mode.next(Mode.Select);
  }

  /**
   * Set the mode based upon
   * @param keyCode
   */
  public toggleMode(keyCode: string){
    switch (keyCode) {
      case "Digit1" :
        this.setMode(Mode.Select);
        break;
      case "Digit2":
        this.setMode(Mode.Create);
        break;
      case "Digit3":
        this.setMode(Mode.Move);
        break;
    }
  }

  /**
   * Sets the mode and multi-casts this update to all subscribed.
   * In addition to this all deactivatables are deactivated.
   * @param mode New mode value
   */
  public setMode(mode: Mode): void {
    this.mode.next(mode);
    this.deactivatables.forEach(d => d.deactivate());
  }
}

export enum Mode {
  Select = 1,
  Create = 2,
  Move = 3
}
