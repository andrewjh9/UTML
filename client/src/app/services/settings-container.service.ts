import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SettingsContainerService {
  public readonly grid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() { }
}
