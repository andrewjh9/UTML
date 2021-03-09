import { Component, OnInit } from '@angular/core';
import {SelectionService} from "../../services/selection.service";
import {Node} from "../../../model/node/node";

@Component({
  selector: '[selected-node-highlight]',
  templateUrl: './selected-node-highlight.component.html',
  styleUrls: ['./selected-node-highlight.component.scss']
})
export class SelectedNodeHighlightComponent {
  selectedNode?: Node = undefined;

  constructor(private selectionService: SelectionService) {
    selectionService.selectedObservable.subscribe(newValue => {
      if (newValue instanceof Node) {
        this.selectedNode = newValue as Node;
      } else {
        this.selectedNode = undefined;
      }
    });
  }
}
