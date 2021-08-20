import { Injectable } from '@angular/core';
import {Feedback, getEmptyFeedback} from '../local/feedback';
import {FeedbackManagementService} from '../feedback-management.service';

@Injectable({
  providedIn: 'root'
})
export class ExternalFeedbackService {
  private selectedAPI: ExternalFeedbackAPI | null = null;

  constructor(private feedbackManagementService: FeedbackManagementService) {

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

    this.feedbackManagementService.setExternalFeedback(await this.requestFeedback());
  }

  private async requestFeedback(): Promise<Feedback> {
    return getEmptyFeedback();
  }
}

type ExternalFeedbackAPI = {
  url: string,
  parameters?: object
}
