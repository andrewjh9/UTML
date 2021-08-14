import { TestBed } from '@angular/core/testing';

import { LocalFeedbackService } from './local-feedback.service';

describe('LocalFeedbackService', () => {
  let service: LocalFeedbackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalFeedbackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
