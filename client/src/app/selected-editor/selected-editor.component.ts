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

  constructor(selectionService: SelectionService, private deletionService: DeletionService) {
    selectionService.selectedObservable.subscribe((selected: Node | Edge | undefined) => {
      if (selected === undefined) {
        this.currentNode = undefined;
        this.currentEdge = undefined;
      } else if (selected instanceof Node) {
        this.currentNode = <Node> selected;
        this.currentEdge = undefined;
      } else if (selected instanceof Edge) {
        this.currentEdge = <Edge> selected;
        this.currentNode = undefined;
      } else {
        throw new Error('Somehow you broke the type system. Congratulations.');
      }
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
