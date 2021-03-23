import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {CourseSet, ShapeSet} from "../shapeset-management-modal/shapeset-management-modal.component";
import {courseSets} from "../shapeset-management-modal/course-sets";

@Injectable({
  providedIn: 'root'
})
export class ShapeSetContainerService {
  public readonly shapeSets: BehaviorSubject<CourseSet>;
  public readonly observable;

  constructor() {
    let init: CourseSet = {};
    for (let [_, courseSet] of Object.entries(courseSets)) {
      for (let [name, shapeSet] of Object.entries(courseSet)) {
        if (shapeSet.active) {
          init[name] = shapeSet
        }
      }
    }

    this.shapeSets = new BehaviorSubject<CourseSet>(init);
    this.observable = this.shapeSets.asObservable();
  }
}
