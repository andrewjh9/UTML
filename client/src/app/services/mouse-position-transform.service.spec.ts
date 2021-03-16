import { TestBed } from '@angular/core/testing';

import { MousePositionTransformService } from './mouse-position-transform.service';

describe('MousePositionTransformService', () => {
  let service: MousePositionTransformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MousePositionTransformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
