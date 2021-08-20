import { TestBed } from '@angular/core/testing';

import { ExternalFeedbackService } from './external-feedback.service';

describe('ExternalFeedbackService', () => {
  let service: ExternalFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExternalFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
