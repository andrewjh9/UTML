import {Diagram} from "../../../../../model/diagram";
import {Feedback} from '../feedback';

/**
 * An abstract class acting as an interface for LocalFeedbackProviders.
 *
 * Any localFeedbackProvider should extend this class.
 *
 * Every LocalFeedBackProvider should be accompanied by a LocalFeedbackProviderFactory
 */
export abstract class LocalFeedbackProvider {
  public abstract getFeedback(diagram: Diagram): Feedback;
}
