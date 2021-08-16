import {EventEmitter, Injectable} from '@angular/core';
import {LocalFeedbackProvider, LocalFeedbackProviderConstructor} from './providers/local-feedback-provider';
import {BasicProvider} from './providers/basic-provider';
import {ChangeDetectionService} from '../caching/change-detection.service';
import {DiagramContainerService} from '../diagram-container.service';
import {FeedbackMessage} from './feedback-message';
import {TempProvider} from './providers/temp-provider';
import {LocalFeedbackProviderFactory} from './providers/local-feedback-provider-factory';
import {FsmAlphabetValidatorFactory} from './providers/fsm-alphabet/fsm-alphabet-validator-factory';

@Injectable({
  providedIn: 'root'
})
export class LocalFeedbackService {
  private readonly factories: Array<LocalFeedbackProviderFactory> = [
    new FsmAlphabetValidatorFactory()
  ];
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

  public tempStart() {
    this.currentProvider = this.factories[0].build([{
      name: "alphabet",
      value: "a, b, c",
      description: "Alphabet of the FSM in the form of 'a, b, c'"
    }]);
  }

  public deactivate() {
    this.currentProvider = null;
  }
}

