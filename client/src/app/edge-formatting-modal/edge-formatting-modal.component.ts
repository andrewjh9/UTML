import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {SelectionService} from "../services/selection.service";
import {Edge} from "../../model/edge";
import {DeletionService} from "../services/deletion.service";
import {CachingService} from "../services/caching/caching.service";

@Component({
  selector: 'app-edge-formatting-modal',
  templateUrl: './edge-formatting-modal.component.html',
  styleUrls: ['./edge-formatting-modal.component.scss']
})
export class EdgeFormattingModalComponent {
  public edge?: Edge;

  constructor(public modal: NgbActiveModal,
              selectionService: SelectionService,
              private deletionService: DeletionService,
              private cachingService: CachingService) {
    selectionService.selectedObservable.subscribe(selectedList => {
      if (selectedList.length === 1 && selectedList[0] instanceof Edge) {
        this.edge = <Edge> selectedList[0];
      }
    });
  }

  delete(): void {
    if (this.edge) {
      this.deletionService.deleteEdge(this.edge);
      this.edge = undefined;
    } else {
      throw new Error("Trying to delete an edge from the edge edit menu whilst no edge is selected.");
    }
  }

  cache() {
    this.cachingService.save();
  }

  removeLabel(middle: 'start' | 'middle' | 'end'): void {
    if (!this.edge) { return; }
    switch (middle) {
      case "start":
        this.edge.startLabel = undefined;
        break;
      case "middle":
        this.edge.middleLabel = undefined;
        break;
      case "end":
        this.edge.endLabel = undefined;
        break;
    }
  }
}
