import {LocalFeedbackProvider} from "./local-feedback-provider";
import {FeedbackMessage} from "../feedback-message";
import {Diagram} from "../../../../model/diagram";

export class BasicProvider extends LocalFeedbackProvider {
  public getFeedback(diagram: Diagram): Array<FeedbackMessage> {
    if (diagram.nodes.length > 2) {
      return [{
        type: "success",
        message: "That's a lot of nodes!"
      }];
    } else {
      return [{
        type: "warning",
        message: "That's NOT a lot of nodes!"
      }];
    }
  }

  public getName(): string {
    return "Node Counter";
  }
}
