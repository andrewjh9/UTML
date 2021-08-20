import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Feedback, getEmptyFeedback} from './local/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackManagementService {
  private localFeedback: Feedback = getEmptyFeedback();
  private externalFeedback: Feedback = getEmptyFeedback();

  public readonly feedbackEmitter: EventEmitter<Feedback> = new EventEmitter<Feedback>();

  constructor() {

  }

  public setLocalFeedback(feedback: Feedback): void {
    this.localFeedback = feedback;
  }

  public setExternalFeedback(feedback: Feedback): void {
    this.externalFeedback = feedback;
  }

  private mergeAndEmit() {
    let result = getEmptyFeedback();

    result.messages.push(...this.localFeedback.messages);
    result.messages.push(...this.externalFeedback.messages);

    // todo: Deal with nodes and edges being highlighting differently by external and local feedback.
    result.nodeHighlights.push(...this.localFeedback.nodeHighlights);
    result.nodeHighlights.push(...this.externalFeedback.nodeHighlights);

    result.edgeHighlights.push(...this.localFeedback.edgeHighlights);
    result.edgeHighlights.push(...this.externalFeedback.edgeHighlights);

    this.feedbackEmitter.emit(result);
  }
}
