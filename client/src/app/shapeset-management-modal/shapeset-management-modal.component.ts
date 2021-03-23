import { Component, OnInit } from '@angular/core';
import {Node} from "../../model/node/node";
import {Edge} from "../../model/edge";
import {courseSets, flattenActive} from "./course-sets";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ShapeSetContainerService} from "../services/shape-set-container.service";

@Component({
  selector: 'app-shapeset-management-modal',
  templateUrl: './shapeset-management-modal.component.html',
  styleUrls: ['./shapeset-management-modal.component.scss']
})
export class ShapesetManagementModalComponent {
  readonly currentCourseSets = courseSets;

  constructor(public modal: NgbActiveModal,
              private shapeSetContainerService: ShapeSetContainerService) { }

  get allKeyValues(): Array<[string, CourseSet]> {
    return Object.entries(this.currentCourseSets);
  }

  getCourseTuple(key: string) {
    return Object.entries(this.currentCourseSets[key]);
  }

  update(): void {
    this.shapeSetContainerService.shapeSets.next(flattenActive(this.currentCourseSets));
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
