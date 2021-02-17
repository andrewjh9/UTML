import {Component} from '@angular/core';
import {Edge, LineStyle} from "../../assets/serialisation/edge";
import {Node} from "../../assets/serialisation/node";
import {SelectionService} from "../services/selection.service";

@Component({
  selector: 'app-selected-editor',
  templateUrl: './selected-editor.component.html',
  styleUrls: ['./selected-editor.component.scss']
})
export class SelectedEditorComponent {
  currentNode?: Node;
  currentEdge?: Edge;

  constructor(private selectionService: SelectionService) {
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
}
