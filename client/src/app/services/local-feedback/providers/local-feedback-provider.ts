import {Diagram} from "../../../../model/diagram";
import {FeedbackMessage} from "../feedback-message";

export abstract class LocalFeedbackProvider {
  public abstract getName(): string;
  public abstract getFeedback(diagram: Diagram): Array<FeedbackMessage>;
}

export type LocalFeedbackProviderConstructor = {
  (): LocalFeedbackProvider;
}
