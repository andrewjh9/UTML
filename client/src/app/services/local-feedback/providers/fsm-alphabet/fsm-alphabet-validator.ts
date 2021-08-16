import {LocalFeedbackProvider} from '../local-feedback-provider';
import {Diagram} from '../../../../../model/diagram';
import {FeedbackMessage} from '../../feedback-message';
import {ProviderSetupField} from '../local-feedback-provider-factory';
import {Edge} from '../../../../../model/edge';

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

  public getFeedback(diagram: Diagram): Array<FeedbackMessage> {
    let result: Array<FeedbackMessage> = [];

    if (diagram.edges.some(edge => edge.middleLabel === undefined)) {
      result.push({
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
      result.push({
        type: "error",
        message: "There is at least one edge with an invalid character."
      });
    }

    if (result.length === 0) {
      result.push({
        type: "success",
        message: "Looking Good!"
      });
    }

    return result;
  }

  public getName(): string {
    return "FSM Alphabet Validator";
  }
}
