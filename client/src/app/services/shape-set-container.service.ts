import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CourseSet} from "../shapeset-management-modal/shapeset-management-modal.component";
import {courseSets, flattenActive} from "../shapeset-management-modal/course-sets";

@Injectable({
  providedIn: 'root'
})
/**
 * Contains the shape sets to be used in diagram creation.
 */
export class ShapeSetContainerService {
  /** The currently selected shapeSets. */
  public readonly shapeSets: BehaviorSubject<CourseSet>;
  /** Observable of the shapeSets attribute. Subscribe to it to receive the updates to the shapeSets. */
  public readonly observable;

  constructor() {
    this.shapeSets = new BehaviorSubject<CourseSet>(flattenActive(courseSets));
    this.observable = this.shapeSets.asObservable();
  }
}
