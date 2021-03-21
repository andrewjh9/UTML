import { TestBed } from '@angular/core/testing';

import { LabelRepositionService } from './label-reposition.service';

describe('LabelRepositionService', () => {
  let service: LabelRepositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabelRepositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
