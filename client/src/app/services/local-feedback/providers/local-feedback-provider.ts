import {Diagram} from "../../../../model/diagram";
import {Feedback} from '../feedback';

/**
 * An abstract class acting as an interface for LocalFeedbackProviders.
 *
 * This is an abstract class and not an interface as you might see in Java
 * because TypeScript does not natively support such interfaces.
 *
 * Any localFeedbackProvider should extend this class.
 *
 * Every LocalFeedBackProvider should be accompanied by a LocalFeedbackProviderFactory
 */
export abstract class LocalFeedbackProvider {
  public abstract getFeedback(diagram: Diagram): Feedback;
}
