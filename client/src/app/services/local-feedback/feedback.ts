import {FeedbackMessage} from './feedback-message';
import {FeedbackHighlight} from './feedback-highlight';

export interface Feedback {
  messages: Array<FeedbackMessage>,
  nodeHighlights: Array<FeedbackHighlight>,
  edgeHighlights: Array<FeedbackHighlight>,
}

export function getEmptyFeedback(): Feedback {
  return {
    messages: [],
    nodeHighlights: [],
    edgeHighlights: [],
  };
}
