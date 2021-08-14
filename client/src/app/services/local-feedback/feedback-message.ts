export interface FeedbackMessage {
  type: 'warning' | 'error' | 'success' | 'neutral',
  message: string
}
