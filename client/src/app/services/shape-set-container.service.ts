import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CourseSet, ShapeSet} from "../shapeset-management-modal/shapeset-management-modal.component";
import {courseSets, flattenActive} from "../shapeset-management-modal/course-sets";

@Injectable({
  providedIn: 'root'
})
export class ShapeSetContainerService {
  public readonly shapeSets: BehaviorSubject<CourseSet>;
  public readonly observable;

  constructor() {
    this.shapeSets = new BehaviorSubject<CourseSet>(flattenActive(courseSets));
    this.observable = this.shapeSets.asObservable();
  }
}
