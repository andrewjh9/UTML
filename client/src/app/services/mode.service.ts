import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModeService {

  public modeOb: Observable<Mode> = new Observable<Mode>();
  private mode: Subject<Mode>;
  constructor() {
    this.mode = new Subject<Mode>();
    this.modeOb = this.mode.asObservable();
    this.mode.next(1);
  }
  toggleMode(mode: string){
    switch (mode) {
      case "Digit1" :
        this.mode.next(Mode.Move);
        break;
      case "Digit2":
        this.mode.next(Mode.Create);
        break;
      case "Digit3":
        this.mode.next(Mode.Select);
        break;
    }
  }
}

export enum Mode {
  Select = 1,
  Create = 2,
  Move = 3
}
