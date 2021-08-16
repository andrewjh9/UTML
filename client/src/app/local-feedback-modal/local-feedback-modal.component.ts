import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalFeedbackService} from '../services/local-feedback/local-feedback.service';
import {FeedbackMessage} from '../services/local-feedback/feedback-message';
import {LocalFeedbackProviderFactory, ProviderSetupField} from '../services/local-feedback/providers/local-feedback-provider-factory';
import {FsmAlphabetValidatorFactory} from '../services/local-feedback/providers/fsm-alphabet/fsm-alphabet-validator-factory';

@Component({
  selector: 'app-local-feedback-modal',
  templateUrl: './local-feedback-modal.component.html',
  styleUrls: ['./local-feedback-modal.component.scss']
})
export class LocalFeedbackModalComponent {
  selectedFactoryIndex: number = -1;
  fields?: Array<ProviderSetupField>;

  readonly factories: Array<LocalFeedbackProviderFactory> = [
    new FsmAlphabetValidatorFactory(),
    new FsmAlphabetValidatorFactory()
  ];

  get names(): string[] {
    return this.factories.map(f => f.name);
  }

  constructor(public modal: NgbActiveModal,
              private localFeedbackService: LocalFeedbackService) {

  }

  deactivate() {
    this.modal.close();
    this.selectedFactoryIndex = -1;
    this.localFeedbackService.deactivate();
  }

  buildProvider() {
    if (this.fields === undefined || this.selectedFactoryIndex === -1) {
      throw new Error();
    }

    this.localFeedbackService.set(this.factories[this.selectedFactoryIndex].build(this.fields));
    this.modal.close();
  }

  setSelectedFactory(factoryIndex: number) {
    this.selectedFactoryIndex = factoryIndex;
    this.fields = this.factories[this.selectedFactoryIndex].getFields();
  }

  getFieldClass(fieldIndex: number): string {
    let field = this.fields![fieldIndex]

    if (field.validator === undefined) {
      return "";
    }

    return field.validator(field.value) ? "valid" : "invalid";
  }
}
