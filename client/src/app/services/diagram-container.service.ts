import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Diagram} from "../../model/diagram";
import {fsm} from "../../model/examples/fsm";

@Injectable({
  providedIn: 'root'
})
export class DiagramContainerService {
  // private readonly diagramSubject: BehaviorSubject<Diagram> = new BehaviorSubject<Diagram>(new Diagram());
  private readonly diagramSubject: BehaviorSubject<Diagram> = new BehaviorSubject<Diagram>(fsm);

  public readonly diagramObservable = this.diagramSubject.asObservable();

  public set(diagram: Diagram) {
    this.diagramSubject.next(diagram);
  }

  public get() {
    return this.diagramSubject.getValue();
  }

  constructor() { }
}
