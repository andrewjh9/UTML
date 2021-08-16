import {LocalFeedbackProvider} from './local-feedback-provider';

export abstract class LocalFeedbackProviderFactory {
  public abstract getFields(): Array<ProviderSetupField>;

  public abstract build(fields: Array<ProviderSetupField>): LocalFeedbackProvider;
}

export type ProviderSetupField = {
  name: string,
  description: string,
  value: string,
  validator?: fieldValidator
}

export type fieldValidator = {
  (potentialValue: string): boolean
}
