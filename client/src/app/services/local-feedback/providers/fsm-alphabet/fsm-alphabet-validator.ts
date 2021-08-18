import {LocalFeedbackProvider} from '../local-feedback-provider';
import {Diagram} from '../../../../../model/diagram';
import {FeedbackMessage} from '../../feedback-message';
import {ProviderSetupField} from '../local-feedback-provider-factory';
import {Edge} from '../../../../../model/edge';
import {Feedback, getEmptyFeedback} from '../../feedback';

export class FsmAlphabetValidator extends LocalFeedbackProvider {
  private alphabet: Array<string>;

  public constructor(fields: Array<ProviderSetupField>) {
    super();

    let field = fields.find(field => field.name === "alphabet");

    if (field === undefined) {
      throw new Error();
    }

    this.alphabet = field.value.split(",").map(char => char.trim());
  }

  public getFeedback(diagram: Diagram): Feedback {
    let result = getEmptyFeedback();

    if (diagram.edges.some((edge, index) => edge.middleLabel === undefined)) {
      result.messages.push({
        type: "error",
        message: "There is at least one edge without a middle label."
      });
    }

    if (diagram.edges.some((edge: Edge) => {
      if (edge.middleLabel === undefined) {
        return false;
      }

      let chars = edge.middleLabel!.value.split(",").map(char => char.trim());

      return chars.some(char => !this.alphabet.includes(char));
    })) {
      result.messages.push({
        type: "error",
        message: "There is at least one edge with an invalid character."
      });
    }

    if (result.messages.length === 0) {
      result.messages.push({
        type: "success",
        message: "Looking Good!"
      });
    }

    return result;
  }
}
