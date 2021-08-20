/**
 * Interface specifying the format of a feedback message as is provided by a LocalFeedbackProvider.
 */
export interface FeedbackMessage {
  /**
   * The type of message. This is usually used to style the message displayed to the user.
   */
  type: 'warning' | 'error' | 'success' | 'neutral',

  /**
   * The actual message to be shown to the user.
   * The message should be human-readable and understandable to the user.
   */
  message: string
}
