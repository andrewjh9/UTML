import { Component, OnInit } from '@angular/core';
import {Edge} from "../../model/edge";
import {Node} from "../../model/node/node";
import {SelectionService} from "../services/selection.service";

@Component({
  selector: 'app-selection-sidebar',
  templateUrl: './selection-sidebar.component.html',
  styleUrls: ['./selection-sidebar.component.scss']
})
export class SelectionSidebarComponent {
  currentlySelected: Node | Edge | undefined = undefined;

  constructor(selectionService: SelectionService) {
    selectionService.selectedObservable.subscribe(selectedList => {
      if (selectedList.length !== 1) {
        this.currentlySelected = undefined;
      } else {
        this.currentlySelected = selectedList[0];
      }
    });
  }

  toEdge(): Edge | undefined {
    return this.currentlySelected instanceof Edge ? <Edge> this.currentlySelected : undefined;
  }

  toNode(): Node | undefined {
    return this.currentlySelected instanceof Node ? <Node> this.currentlySelected : undefined;
  }
}
