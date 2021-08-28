import { Component, OnInit } from '@angular/core';
import {SelectionService} from "../../services/selection.service";
import {Node} from "../../../model/node/node";
import {Edge} from "../../../model/edge/edge";

@Component({
  selector: '[selected-node-highlight]',
  templateUrl: './selected-node-highlight.component.html',
  styleUrls: ['./selected-node-highlight.component.scss']
})
export class SelectedNodeHighlightComponent {
  selectedNodes: Array<Node> = [];

  constructor(private selectionService: SelectionService) {
    selectionService.selectedObservable.subscribe(newList => {
      this.selectedNodes = newList.filter(elem => elem instanceof Node).map(node => <Node> node);
    });
  }
}
