import { TestBed } from '@angular/core/testing';

import { LensOffsetService } from './lens-offset.service';

describe('LensOffsetService', () => {
  let service: LensOffsetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LensOffsetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
