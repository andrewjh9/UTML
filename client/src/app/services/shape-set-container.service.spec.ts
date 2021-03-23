import { TestBed } from '@angular/core/testing';

import { ShapeSetContainerService } from './shape-set-container.service';

describe('ShapeSetContainerService', () => {
  let service: ShapeSetContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShapeSetContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
