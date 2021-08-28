import {EventEmitter, Injectable} from '@angular/core';
import {LocalFeedbackProvider} from './providers/local-feedback-provider';
import {ChangeDetectionService} from '../../caching/change-detection.service';
import {DiagramContainerService} from '../../diagram-container.service';
import {Feedback, getEmptyFeedback} from './feedback';
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

