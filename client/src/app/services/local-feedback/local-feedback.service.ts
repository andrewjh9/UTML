import {EventEmitter, Injectable} from '@angular/core';
import {LocalFeedbackProvider, LocalFeedbackProviderConstructor} from "./local-feedback-provider";
import {BasicProvider} from "./basic-provider";
import {ChangeDetectionService} from "../caching/change-detection.service";
import {DiagramContainerService} from "../diagram-container.service";
import {FeedbackMessage} from "./feedback-message";
import {TempProvider} from "./temp-provider";

@Injectable({
  providedIn: 'root'
})
export class LocalFeedbackService {
  private readonly constructors: Array<LocalFeedbackProviderConstructor> = [
    () => { return new BasicProvider(); },
    () => { return new TempProvider(); },
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
}

