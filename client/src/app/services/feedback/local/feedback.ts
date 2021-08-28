import {FeedbackMessage} from './feedback-message';

export interface Feedback {
  messages: Array<FeedbackMessage>,
}

export function getEmptyFeedback(): Feedback {
  return {
    messages: [],
  };
}
