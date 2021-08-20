import { Component, OnInit } from '@angular/core';
import {FeedbackMessage} from '../services/feedback/local/feedback-message';
import {LocalFeedbackService} from '../services/feedback/local/local-feedback.service';

@Component({
  selector: 'details-sidebar',
  templateUrl: './details-sidebar.component.html',
  styleUrls: ['./details-sidebar.component.scss']
})
export class DetailsSidebarComponent {
  public static readonly WIDTH: number = 300;

  feedbackMessages: FeedbackMessage[] = [];

  constructor(localFeedbackService: LocalFeedbackService) {
    localFeedbackService.feedbackMessageEmitter.subscribe((messages: FeedbackMessage[]) => {
      this.feedbackMessages = messages;
    });
  }

  typeToClass(messageType: 'warning' | 'error' | 'success' | 'neutral'): string {
    switch (messageType) {
      case 'warning':
        return 'alert-warning';
      case 'error':
        return 'alert-danger';
      case 'success':
        return 'alert-success';
    }

    return '';
  }
}
