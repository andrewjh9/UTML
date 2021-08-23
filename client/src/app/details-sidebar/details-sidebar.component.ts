import { Component } from '@angular/core';
import {FeedbackMessage} from '../services/feedback/local/feedback-message';
import {FeedbackManagementService} from '../services/feedback/feedback-management.service';

@Component({
  selector: 'details-sidebar',
  templateUrl: './details-sidebar.component.html',
  styleUrls: ['./details-sidebar.component.scss']
})
export class DetailsSidebarComponent {
  public static readonly WIDTH: number = 300;

  feedbackMessages: FeedbackMessage[] = [];

  constructor(feedbackManagementService: FeedbackManagementService) {
    feedbackManagementService.feedbackMessageEmitter.subscribe((messages: FeedbackMessage[]) => {
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
