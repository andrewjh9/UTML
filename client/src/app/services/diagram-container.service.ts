import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Diagram} from "../../model/diagram";
import {AppComponent} from "../app.component";

@Injectable({
  providedIn: 'root'
})
export class DiagramContainerService {
  private readonly diagramSubject: BehaviorSubject<Diagram> = new BehaviorSubject<Diagram>(new Diagram());
  public readonly diagramObservable = this.diagramSubject.asObservable();

  constructor() {
  }


  public set(diagram: Diagram) {
    this.diagramSubject.next(diagram);
  }

  public get() {
    return this.diagramSubject.getValue();
  }

}
