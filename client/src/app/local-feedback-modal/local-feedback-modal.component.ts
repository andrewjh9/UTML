import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LocalFeedbackService} from '../services/local-feedback/local-feedback.service';
import {FeedbackMessage} from '../services/local-feedback/feedback-message';

@Component({
  selector: 'app-local-feedback-modal',
  templateUrl: './local-feedback-modal.component.html',
  styleUrls: ['./local-feedback-modal.component.scss']
})
export class LocalFeedbackModalComponent {
  constructor(public modal: NgbActiveModal,
              private localFeedbackService: LocalFeedbackService) {
  }

  deactivate() {
    this.localFeedbackService.deactivate();
  }

  tempActivate() {
    this.localFeedbackService.tempStart();
  }
}
