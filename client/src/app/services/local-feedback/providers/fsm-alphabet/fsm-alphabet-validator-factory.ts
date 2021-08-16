import {LocalFeedbackProviderFactory, ProviderSetupField} from '../local-feedback-provider-factory';
import {LocalFeedbackProvider} from '../local-feedback-provider';
import {FsmAlphabetValidator} from './fsm-alphabet-validator';

export class FsmAlphabetValidatorFactory extends LocalFeedbackProviderFactory {
  public build(fields: Array<ProviderSetupField>): LocalFeedbackProvider {
    return new FsmAlphabetValidator(fields);
  }

  public getFields(): Array<ProviderSetupField> {
    return [{
      name: "alphabet",
      value: "a, b, c",
      description: "Alphabet of the FSM in the form of 'a, b, c'"
    }];
  }
}
