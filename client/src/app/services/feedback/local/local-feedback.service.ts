import {EventEmitter, Injectable} from '@angular/core';
import {LocalFeedbackProvider} from './providers/local-feedback-provider';
import {ChangeDetectionService} from '../../caching/change-detection.service';
import {DiagramContainerService} from '../../diagram-container.service';
import {FeedbackMessage} from './feedback-message';
import {Node} from '../../../../model/node/node';
import {Edge} from '../../../../model/edge';
import {Feedback, getEmptyFeedback} from './feedback';
import {Diagram} from '../../../../model/diagram';
import {FeedbackHighlight} from './feedback-highlight';

@Injectable({
  providedIn: 'root'
})
/**
 * The LocalFeedbackService is responsible for subscribing to UTML change detection and upon change
 * it must request feedback from the selected local feedback provider.
 */
export class LocalFeedbackService {
  /**
   * If a feedback provider is selected, this emitter emits its feedback messages after every change detection.
   * Components or services that use feedback messages should subscribe to it.
   */
  public readonly feedbackMessageEmitter: EventEmitter<Array<FeedbackMessage>> = new EventEmitter<Array<FeedbackMessage>>();
  public readonly nodeHighlightEmitter: EventEmitter<Array<FeedbackHighlight>> = new EventEmitter<Array<FeedbackHighlight>>();

  private currentProvider: LocalFeedbackProvider | null = null;

  constructor(changeDetectionService: ChangeDetectionService,
              private diagramContainerService: DiagramContainerService) {
    changeDetectionService.addCallback(() => this.handleChange());
  }

  private handleChange(): void {
    if (this.currentProvider !== null) {
      let diagram = this.diagramContainerService.get();

      let feedback = this.currentProvider.getFeedback(diagram);

      this.handleFeedback(feedback, diagram);
    }
  }

  private handleFeedback(feedback: Feedback, diagram: Diagram) {
    this.feedbackMessageEmitter.emit(feedback.messages);

    diagram.nodes.forEach((node: Node, index: number) => {
      let highlight = feedback.nodeHighlights.find(h => h.id === index);
      node.highlight = highlight === undefined ? 'none' : highlight.type;
    });

    diagram.edges.forEach((edge: Edge, index: number) => {
      let highlight = feedback.edgeHighlights.find(h => h.id === index);
      edge.highlight = highlight === undefined ? 'none' : highlight.type;
    });

    this.nodeHighlightEmitter.emit(feedback.nodeHighlights);
  }

  /**
   * Deactivate the current feedback provider.
   *
   * Additionally this clears all feedback messages and highlights.
   * There will no longer be any feedback messages emitted by the feedbackMessageEmitter upon a detected change.
   */
  public deactivate() {
    this.currentProvider = null;
    // Remove messages and highlights by handling empty feedback
    this.handleFeedback(getEmptyFeedback(), this.diagramContainerService.get());
  }

  /**
   * Set the provided localFeedbackProvider as the selected local feedback provider.
   *
   * If there is already another provider, this one will be replaced.
   * This method will also ask the new provider for feedback and emit this feedback through the feedbackMessageEmitter.
   * @param localFeedbackProvider The new local feedback provider
   */
  public set(localFeedbackProvider: LocalFeedbackProvider) {
    this.currentProvider = localFeedbackProvider;
    this.handleChange();
  }
}

