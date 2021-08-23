import { Injectable } from '@angular/core';
import {Feedback, getEmptyFeedback} from '../local/feedback';
import {FeedbackManagementService} from '../feedback-management.service';
import {HttpClient} from '@angular/common/http';
import {DiagramContainerService} from '../../diagram-container.service';
import {SerialisedDiagram} from '../../../../serialisation/serialised-data-structures/serialised-diagram';

@Injectable({
  providedIn: 'root'
})
export class ExternalFeedbackService {
  private selectedAPI: ExternalFeedbackAPI | null = {
    url: 'http://localhost:5000'
  };

  constructor(private feedbackManagementService: FeedbackManagementService,
              private diagramContainerService: DiagramContainerService,
              private http: HttpClient) {

  }

  public activate(api: ExternalFeedbackAPI): void {
    this.selectedAPI = api;
  }

  public deactivate(): void {
    this.selectedAPI = null;
    this.feedbackManagementService.setExternalFeedback(getEmptyFeedback());
  }

  public async trigger(): Promise<void> {
    if (this.selectedAPI === null) {
      return;
    }

    this.http.post<APIResponse>(this.selectedAPI!.url, { diagram: this.diagramContainerService.get().serialise() })
      .subscribe(response => {
        this.feedbackManagementService.setExternalFeedback(response.feedback!);
      });
  }
}

type APIResponse = {
  status: 'success' | 'warning' | 'error',
  errorMessage?: string,
  feedback?: Feedback,
  diagram?: SerialisedDiagram
}

type ExternalFeedbackAPI = {
  url: string,
  parameters?: object
}
