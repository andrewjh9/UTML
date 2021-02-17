import { TestBed } from '@angular/core/testing';

import { NonStructuralEdgeRepositionServiceService } from './non-structural-edge-reposition-service.service';

describe('NonStructuralEdgeRepositionServiceService', () => {
  let service: NonStructuralEdgeRepositionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonStructuralEdgeRepositionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
