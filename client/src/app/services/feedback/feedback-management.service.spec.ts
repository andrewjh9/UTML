import { TestBed } from '@angular/core/testing';

import { FeedbackManagementService } from './feedback-management.service';

describe('FeedbackManagementService', () => {
  let service: FeedbackManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeedbackManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
