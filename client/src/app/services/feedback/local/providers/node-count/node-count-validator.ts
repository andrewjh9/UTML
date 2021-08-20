import {LocalFeedbackProvider} from '../local-feedback-provider';
import {Diagram} from '../../../../../../model/diagram';
import {FeedbackMessage} from '../../feedback-message';
import {ProviderSetupField} from '../local-feedback-provider-factory';
import {getEmptyFeedback, Feedback} from '../../feedback';

export class NodeCountValidator extends LocalFeedbackProvider {
  public static readonly MAX_AMOUNT_FIELD_NAME = 'Max Node Amount'
  private maxAmount: number;

  constructor(fields: Array<ProviderSetupField>) {
    super();

     let field = fields.find(field => field.name === NodeCountValidator.MAX_AMOUNT_FIELD_NAME);

     if (field === undefined) {
       throw new Error();
     }

     this.maxAmount = parseInt(field.value);
  }

  getFeedback(diagram: Diagram): Feedback {
    let result = getEmptyFeedback();

    if (diagram.nodes.length === 0) {
      result.messages = [{
        'type': 'warning',
        'message': 'You should probably add some nodes.'
      }];
      return result;
    }

    if (diagram.nodes.length > this.maxAmount) {
      result.messages = [{
        'type': 'error',
        'message': 'You should probably remove some nodes.'
      }];

      result.nodeHighlights.push({id: 0, type: 'error'});
      return result;
    }

    result.messages = [{
      'type': 'success',
      'message': 'That looks like a sensible amount of nodes.'
    }];


    return result;
  }
}
