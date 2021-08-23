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
import {FeedbackManagementService} from '../feedback-management.service';

@Injectable({
  providedIn: 'root'
})
/**
 * The LocalFeedbackService is responsible for subscribing to UTML change detection and upon change
 * it must request feedback from the selected local feedback provider.
 */
export class LocalFeedbackService {
  private currentProvider: LocalFeedbackProvider | null = null;

  constructor(changeDetectionService: ChangeDetectionService,
              private diagramContainerService: DiagramContainerService,
              private feedbackManagementService: FeedbackManagementService) {
    changeDetectionService.addCallback(() => this.handleChange());
  }

  private handleChange(): void {
    if (this.currentProvider !== null) {
      let feedback = this.currentProvider.getFeedback(this.diagramContainerService.get());
      this.feedbackManagementService.setLocalFeedback(feedback);
    }
  }

  // private handleFeedback(feedback: Feedback, diagram: Diagram) {
  //   this.feedbackMessageEmitter.emit(feedback.messages);
  //
  //   diagram.nodes.forEach((node: Node, index: number) => {
  //     let message = feedback.messages.find(msg =>
  //       msg.nodeHighlights !== undefined && msg.nodeHighlights!.includes(index));
  //
  //     node.highlight = message === undefined ? 'none' : message.type;
  //   });
  //
  //   diagram.edges.forEach((edge: Edge, index: number) => {
  //     let message = feedback.messages.find(msg =>
  //       msg.edgeHighlights !== undefined && (index in msg.edgeHighlights!));
  //
  //
  //     edge.highlight = message === undefined ? 'none' : message.type;
  //   });
  //
  //   this.nodeHighlightEmitter.emit(null);
  // }

  /**
   * Deactivate the current feedback provider.
   *
   * Additionally this clears all feedback messages and highlights.
   * There will no longer be any feedback messages emitted by the feedbackMessageEmitter upon a detected change.
   */
  public deactivate() {
    this.currentProvider = null;
    // Remove messages and highlights by setting empty feedback
    this.feedbackManagementService.setLocalFeedback(getEmptyFeedback());
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

