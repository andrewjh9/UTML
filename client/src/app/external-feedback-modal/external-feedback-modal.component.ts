import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {ExternalFeedbackAPI, ExternalFeedbackService} from "../services/feedback/external/external-feedback.service";

@Component({
  selector: 'app-external-feedback-modal',
  templateUrl: './external-feedback-modal.component.html',
  styleUrls: ['./external-feedback-modal.component.scss']
})
export class ExternalFeedbackModalComponent {
  customURL: string = 'https://example.com';

  private readonly APIs: ExternalFeedbackAPI[] = [
    {
      "url": "http://localhost:5000"
    },
    {
      "url": "http://localhost:5000/error/"
    },
    {
      "url": "http://localhost:5000/warning/"
    },
    {
      "url": "http://localhost:5000/diagram/"
    },
    {
      "url": "http://thisdoes.notwork"
    }
  ];

  constructor(public modal: NgbActiveModal,
              private externalFeedbackService: ExternalFeedbackService) {

  }

  get names(): string[] {
   return this.APIs.map(api => api.url);
  }

  deactivate(): void {
    this.externalFeedbackService.deactivate();
  }

  setAPI(apiIndex: number): void {
    this.externalFeedbackService.activate(this.APIs[apiIndex]);
  }

  setCustomURL() {
    this.externalFeedbackService.activate({url: this.customURL});
  }
}
