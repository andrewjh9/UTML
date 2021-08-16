import {EventEmitter, Injectable} from '@angular/core';
import {LocalFeedbackProvider, LocalFeedbackProviderConstructor} from './providers/local-feedback-provider';
import {BasicProvider} from './providers/basic-provider';
import {ChangeDetectionService} from '../caching/change-detection.service';
import {DiagramContainerService} from '../diagram-container.service';
import {FeedbackMessage} from './feedback-message';
import {TempProvider} from './providers/temp-provider';
import {LocalFeedbackProviderFactory, ProviderSetupField} from './providers/local-feedback-provider-factory';
import {FsmAlphabetValidatorFactory} from './providers/fsm-alphabet/fsm-alphabet-validator-factory';

@Injectable({
  providedIn: 'root'
})
export class LocalFeedbackService {

  private currentProvider: LocalFeedbackProvider | null = new BasicProvider();
  public readonly feedbackMessageEmitter: EventEmitter<Array<FeedbackMessage>> =
    new EventEmitter<Array<FeedbackMessage>>();

  constructor(changeDetectionService: ChangeDetectionService,
              private diagramContainerService: DiagramContainerService) {
    changeDetectionService.addCallback(() => this.handleChange());
  }

  private handleChange(): void {
    if (this.currentProvider !== null) {
      this.feedbackMessageEmitter.emit(this.currentProvider.getFeedback(this.diagramContainerService.get()));
    }
  }

  public deactivate() {
    this.currentProvider = null;
  }

  public set(localFeedbackProvider: LocalFeedbackProvider) {
    this.currentProvider = localFeedbackProvider;
  }
}

