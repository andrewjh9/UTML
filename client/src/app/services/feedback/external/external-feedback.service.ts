import { Injectable } from '@angular/core';
import {Feedback, getEmptyFeedback} from '../local/feedback';
import {FeedbackManagementService} from '../feedback-management.service';
import {HttpClient} from '@angular/common/http';
import {DiagramContainerService} from '../../diagram-container.service';
import {SerialisedDiagram} from '../../../../serialisation/serialised-data-structures/serialised-diagram';
import {BehaviorSubject} from "rxjs";
import {catchError} from "rxjs/operators";
import {ErrorLauncherService} from "../../error-launcher.service";
import {deserialiseDiagram} from "../../../../serialisation/deserialise/deserialise-diagram";
import {ChangeDetectionService} from "../../caching/change-detection.service";

@Injectable({
  providedIn: 'root'
})
export class ExternalFeedbackService {
  public readonly isActive: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private selectedAPI: ExternalFeedbackAPI | null = null;

  constructor(private feedbackManagementService: FeedbackManagementService,
              private diagramContainerService: DiagramContainerService,
              private errorLauncherService: ErrorLauncherService,
              private http: HttpClient,
              private changeDetectionService: ChangeDetectionService) {

  }

  public activate(api: ExternalFeedbackAPI): void {
    this.selectedAPI = api;
    this.isActive.next(true);
  }

  public deactivate(): void {
    this.selectedAPI = null;
    this.isActive.next(false);
    this.feedbackManagementService.setExternalFeedback(getEmptyFeedback());
  }

  public trigger(): void {
    if (this.selectedAPI === null) {
      return;
    }

    this.http.post<APIResponse>(this.selectedAPI!.url, { diagram: this.diagramContainerService.get().serialise() })
      .subscribe({
        next: feedback => this.handleFeedback(feedback),
        error: error => {
          if (error.message) {
            this.errorLauncherService.launch(error.message);
          } else {
            this.errorLauncherService.launch();
          }
        }
      });
  }

  private handleFeedback(response: APIResponse): void {
    if (response.status === 'success') {
      if (response.feedback) {
        this.feedbackManagementService.setExternalFeedback(response.feedback);
      } else {
        this.errorLauncherService.launch("The external feedback API returned a 'success' status but did " +
          "not send feedback. This is illegal according to the protocol.");
      }
    } else {
      let message = response.errorMessage || 'Something went wrong with the external feedback request.'
      let type: 'error' | 'warning' = response.status === 'error' ? 'error' : 'warning'
      this.errorLauncherService.launch(message, type);
    }

    if (response.diagram) {
      try {
        this.diagramContainerService.set(deserialiseDiagram(response.diagram));
        this.changeDetectionService.trigger();
      } catch {
        this.errorLauncherService.launch('The external API returned a diagram that could not be serialised.');
      }
    }
  }
}

type APIResponse = {
  status: 'success' | 'warning' | 'error',
  errorMessage?: string,
  feedback?: Feedback,
  diagram?: SerialisedDiagram
}

export type ExternalFeedbackAPI = {
  url: string,
  parameters?: object
}
