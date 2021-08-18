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

    diagram.edges.forEach((edge, index) => {
      if (edge.middleLabel === undefined) {
        result.messages.push({
          type: "warning",
          message: "An edge is missing a middle label"
        });
        result.edgeHighlights.push({id: index, type: 'warning'});
      } else {
          let chars = edge.middleLabel!.value.split(",").map(char => char.trim());
          if (chars.some(char => !this.alphabet.includes(char))) {
            result.messages.push({
              type: "error",
              message: "There is at least one edge with an invalid character."
            });

            result.edgeHighlights.push({id: index, type: 'error'});
          }
      }
    });

    diagram.nodes.forEach((node, index) => {
      if (diagram.nodes.filter(innerNode => innerNode.text === node.text).length !== 1) {
        result.messages.push({
          type: "error",
          message: "There is at least one other node with this name."
        });

        result.nodeHighlights.push({id: index, type: 'error'});
      }
    });

    return result;
  }
}
