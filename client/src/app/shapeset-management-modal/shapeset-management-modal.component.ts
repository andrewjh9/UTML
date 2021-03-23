import { Component, OnInit } from '@angular/core';
import {Node} from "../../model/node/node";
import {Edge} from "../../model/edge";
import {courseSets} from "./course-sets";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShapeSetContainerService} from "../services/shape-set-container.service";

@Component({
  selector: 'app-shapeset-management-modal',
  templateUrl: './shapeset-management-modal.component.html',
  styleUrls: ['./shapeset-management-modal.component.scss']
})
export class ShapesetManagementModalComponent {
  readonly COURSE_SETS = courseSets;

  constructor(public modal: NgbActiveModal,
              private shapeSetContainerService: ShapeSetContainerService) { }

  get allKeyValues(): Array<[string, CourseSet]> {
    return Object.entries(this.COURSE_SETS);
  }

  getCourseTuple(key: string) {
    return Object.entries(this.COURSE_SETS[key]);
  }

  update(): void {
    let result: CourseSet = {};
    for (let [_, courseSet] of Object.entries(this.COURSE_SETS)) {
      for (let [name, shapeSet] of Object.entries(courseSet)) {
        if (shapeSet.active) {
          result[name] = shapeSet
        }
      }
    }
    this.shapeSetContainerService.shapeSets.next(result);
  }
}

export type CourseSet = {
  [key: string]: ShapeSet
}

export type ShapeSet = {
  nodes: { [key: string]: Node },
  edges: { [key: string]: Edge },
  active: boolean
}
