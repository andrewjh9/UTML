import {EventEmitter, Injectable} from '@angular/core';
import {Feedback, getEmptyFeedback} from './local/feedback';
import {Node} from '../../../model/node/node';
import {Edge} from '../../../model/edge';
import {DiagramContainerService} from '../diagram-container.service';
import {FeedbackMessage} from './local/feedback-message';

@Injectable({
  providedIn: 'root'
})
export class FeedbackManagementService {
  private localFeedback: Feedback = getEmptyFeedback();
  private externalFeedback: Feedback = getEmptyFeedback();
  private readonly nodeHighlightUpdateEmitter: EventEmitter<null> = new EventEmitter<null>();
  public readonly nodeHighlightUpdateObservable = this.nodeHighlightUpdateEmitter.asObservable();
  public readonly feedbackMessageEmitter: EventEmitter<FeedbackMessage[]> = new EventEmitter();

  constructor(private diagramContainerService: DiagramContainerService) {

  }

  public setLocalFeedback(feedback: Feedback): void {
    this.localFeedback = feedback;
    this.mergeAndEmit();
  }

  public setExternalFeedback(feedback: Feedback): void {
    this.externalFeedback = feedback;
    this.mergeAndEmit();
  }

  private mergeAndEmit() {
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

    this.nodeHighlightUpdateEmitter.emit(null);
    this.feedbackMessageEmitter.emit(feedback.messages);
  }
}
