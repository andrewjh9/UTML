import {LocalFeedbackProvider} from './local-feedback-provider';

export abstract class LocalFeedbackProviderFactory {
  // todo: should this return a copy?
  public abstract getFields(): Array<ProviderSetupField>;

  public abstract build(fields: Array<ProviderSetupField>): LocalFeedbackProvider;

  public abstract get name(): string;
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
