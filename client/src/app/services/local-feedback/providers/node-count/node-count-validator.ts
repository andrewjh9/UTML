import {LocalFeedbackProvider} from '../local-feedback-provider';
import {Diagram} from '../../../../../model/diagram';
import {FeedbackMessage} from '../../feedback-message';
import {ProviderSetupField} from '../local-feedback-provider-factory';

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

  getFeedback(diagram: Diagram): Array<FeedbackMessage> {
    if (diagram.nodes.length === 0) {
      return [{
        'type': 'warning',
        'message': 'You should probably add some nodes.'
      }];
    }

    if (diagram.nodes.length > this.maxAmount) {
      return [{
        'type': 'error',
        'message': 'You should probably remove some nodes.'
      }];
    }

    return [{
      'type': 'success',
      'message': 'That looks like a sensible amount of nodes.'
    }];
  }

  getName(): string {
    return "Node Counter";
  }

}
