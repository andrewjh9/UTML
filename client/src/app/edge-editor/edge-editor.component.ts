import {Component, Input, OnInit} from '@angular/core';
import {Edge} from "../../assets/serialisation/edge";
import {DeletionService} from "../services/deletion.service";

@Component({
  selector: 'app-edge-editor',
  templateUrl: './edge-editor.component.html',
  styleUrls: ['./edge-editor.component.scss']
})
export class EdgeEditorComponent {
  @Input() edge?: Edge;

  constructor(private deletionService: DeletionService) {
  }

  delete(): void {
    if (this.edge) {
      this.deletionService.deleteEdge(this.edge);
      this.edge = undefined;
    } else {
      throw new Error("Trying to delete an edge from the edge edit menu whilst no edge is selected.");
    }
  }
}
