import {LocalFeedbackProvider} from "./local-feedback-provider";
import {FeedbackMessage} from "./feedback-message";
import {Diagram} from "../../../model/diagram";

export class TempProvider extends LocalFeedbackProvider {
  public getFeedback(diagram: Diagram): Array<FeedbackMessage> {
    if (diagram.edges.length > 2) {
      return [{
        type: "success",
        message: "That's a lot of edges!"
      }];
    } else {
      return [{
        type: "warning",
        message: "That's NOT a lot of edges!"
      }];
    }
  }

  public getName(): string {
    return "Edge Counter";
  }
}
