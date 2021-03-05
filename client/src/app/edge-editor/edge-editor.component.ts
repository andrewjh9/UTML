import {Component, Input, OnInit} from '@angular/core';
import {Edge} from "../../model/edge";
import {DeletionService} from "../services/deletion.service";
import {CachingService} from "../services/caching/caching.service";

@Component({
  selector: 'app-edge-editor',
  templateUrl: './edge-editor.component.html',
  styleUrls: ['./edge-editor.component.scss']
})
export class EdgeEditorComponent {
  @Input() edge?: Edge;

  constructor(private deletionService: DeletionService,
              private cachingService: CachingService) {
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
}
