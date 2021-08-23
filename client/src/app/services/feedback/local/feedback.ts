import {FeedbackMessage} from './feedback-message';
import {FeedbackHighlight} from './feedback-highlight';

export interface Feedback {
  messages: Array<FeedbackMessage>,
}

export function getEmptyFeedback(): Feedback {
  return {
    messages: [],
  };
}
