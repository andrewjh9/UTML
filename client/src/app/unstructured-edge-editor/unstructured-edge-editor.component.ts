import {Component, Input, OnInit} from '@angular/core';
import {EdgeFormatter} from "../../assets/serialisation/edge";
import {DeletionService} from "../services/deletion.service";

@Component({
  selector: 'app-unstructured-edge-editor',
  templateUrl: './unstructured-edge-editor.component.html',
  styleUrls: ['./unstructured-edge-editor.component.scss']
})
export class UnstructuredEdgeEditorComponent {
  @Input() formatter?: EdgeFormatter;

  constructor(private deletionService: DeletionService) {
  }

  delete(): void {
    if (this.formatter) {
      this.deletionService.deleteEdgeFormatter(this.formatter);
      this.formatter = undefined;
    } else {
      throw new Error("Trying to delete an unstructured edge from the unstructured edge edit menu whilst no undstructured edge is selected.");
    }
  }
}
