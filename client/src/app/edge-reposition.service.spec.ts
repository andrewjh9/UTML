import { TestBed } from '@angular/core/testing';

import { EdgeRepositionService } from './edge-reposition.service';

describe('EdgeRepositionService', () => {
  let service: EdgeRepositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EdgeRepositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
