import {EventEmitter, Injectable} from '@angular/core';
import {Feedback, FeedbackMessage, getEmptyFeedback} from './local/feedback';
import {Node} from '../../../model/node/node';
import {Edge} from '../../../model/edge';
import {DiagramContainerService} from '../diagram-container.service';

@Injectable({
  providedIn: 'root'
})
export class FeedbackManagementService {
  private localFeedback: Feedback = getEmptyFeedback();
  private externalFeedback: Feedback = getEmptyFeedback();

  public readonly feedbackEmitter: EventEmitter<Feedback> = new EventEmitter<Feedback>();

  constructor(private diagramContainerService: DiagramContainerService) { }


  public setLocalFeedback(feedback: Feedback): void {
    this.localFeedback = feedback;
    this.mergeAndEmit();
  }

  public setExternalFeedback(feedback: Feedback): void {
    this.externalFeedback = feedback;
    this.mergeAndEmit();
  }

  private mergeAndEmit(): void {
    // Todo: Deal with nodes and edges being highlighting differently by external and local feedback.
    let feedback = getEmptyFeedback();

    feedback.messages.push(...this.localFeedback.messages);
    feedback.messages.push(...this.externalFeedback.messages);

    let diagram = this.diagramContainerService.get();

    diagram.nodes.forEach((node: Node, index: number) => {
      let message = feedback.messages.find(msg =>
        msg.nodeHighlights !== undefined && msg.nodeHighlights!.includes(index));

      node.highlight = message === undefined ? 'none' : message.type;
    });

    diagram.edges.forEach((edge: Edge, index: number) => {
      let message = feedback.messages.find(msg =>
        msg.edgeHighlights !== undefined && (index in msg.edgeHighlights!));

      edge.highlight = message === undefined ? 'none' : message.type;
    });

    this.feedbackEmitter.emit(feedback);
  }
}
