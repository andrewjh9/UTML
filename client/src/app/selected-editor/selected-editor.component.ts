import {Component} from '@angular/core';
import {Edge, LineStyle} from "../../model/edge";
import {Node} from "../../model/node/node";
import {SelectionService} from "../services/selection.service";
import {DeletionService} from "../services/deletion.service";
import {ModeService} from "../services/mode.service";

@Component({
  selector: 'app-selected-editor',
  templateUrl: './selected-editor.component.html',
  styleUrls: ['./selected-editor.component.scss']
})
export class SelectedEditorComponent {
  currentNode?: Node;
  currentEdge?: Edge;

  constructor(private selectionService: SelectionService, private deletionService: DeletionService) {
    selectionService.edgeEmitter.subscribe((edge: Edge) => {
      this.setAllUndefined();
      this.currentEdge = edge;
    });
    selectionService.nodeEmitter.subscribe((node: Node) => {
      this.setAllUndefined();
      this.currentNode = node;
    });
  }

  private setAllUndefined(): void {
    this.currentEdge = undefined;
    this.currentNode = undefined;
  }

  deleteNode() {
    if (this.currentNode) {
      this.deletionService.deleteNode(this.currentNode);
      this.currentNode = undefined;
    } else {
      throw new Error("Trying to delete a node whilst no node is selected.");
    }
  }

  deleteEdge() {
    if (this.currentEdge) {
      this.deletionService.deleteEdge(this.currentEdge);
      this.currentEdge = undefined;
    } else {
      throw new Error("Trying to delete an edge whilst no edge is selected.");

    }
  }
}
