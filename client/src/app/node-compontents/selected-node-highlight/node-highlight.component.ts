import { Component, OnInit } from '@angular/core';
import {SelectionService} from "../../services/selection.service";
import {Node} from '../../../model/node/node';
import {Edge} from "../../../model/edge";
import {LocalFeedbackService} from '../../services/feedback/local/local-feedback.service';
import {FeedbackHighlight} from '../../services/feedback/local/feedback-highlight';
import {DiagramContainerService} from '../../services/diagram-container.service';

@Component({
  selector: '[node-highlight]',
  templateUrl: './node-highlight.component.html',
  styleUrls: ['./node-highlight.component.scss']
})
/**
 * The NodeHighlightComponent is responsible for rendering the highlights of nodes.
 *
 * These highlights are:
 * 1) SelectionService highlighting
 * 2) LocalFeedbackService highlighting
 */
export class NodeHighlightComponent {
  selectedNodes: Array<Node> = [];
  highlightedNodes: Array<Node> = [];

  constructor(selectionService: SelectionService,
              localFeedbackService: LocalFeedbackService,
              private diagramContainerService: DiagramContainerService) {
    selectionService.selectedObservable.subscribe(newList => {
      this.selectedNodes = newList.filter(elem => elem instanceof Node).map(node => <Node> node);
    });

    localFeedbackService.nodeHighlightEmitter.subscribe((highlights: Array<FeedbackHighlight>) => {
      let nodes = this.diagramContainerService.get().nodes;
      this.highlightedNodes = nodes.filter(node => node.highlight !== 'none');
    });
  }

  highlightStyle(node: Node) {
    let fill: string;
    switch (node.highlight) {
      case 'warning':
        fill = 'orange';
        break;
      case 'error':
        fill = 'red';
        break;
      case 'success':
        fill = 'green';
        break;
      default:
        fill = 'none';
        break;
    }

    return {
      fill: fill,
      stroke: 'none',
      opacity: '0.1'
    }
  }
}
