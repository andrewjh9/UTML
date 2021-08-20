import {LocalFeedbackProviderFactory, ProviderSetupField} from '../local-feedback-provider-factory';
import {LocalFeedbackProvider} from '../local-feedback-provider';
import {NodeCountValidator} from './node-count-validator';

export class NodeCountValidatorFactory extends LocalFeedbackProviderFactory {
  build(fields: Array<ProviderSetupField>): LocalFeedbackProvider {
    return new NodeCountValidator(fields);
  }

  getFields(): Array<ProviderSetupField> {
    return [{
      name: NodeCountValidator.MAX_AMOUNT_FIELD_NAME,
      value: '5',
      description: 'Maximum Recommended Amount of Nodes',
      validator: str => !isNaN(parseInt(str)) && parseFloat(str) === parseInt(str)
    }];
  }

  get name(): string {
    return "Node Counter";
  }

}
