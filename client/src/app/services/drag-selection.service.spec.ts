import { TestBed } from '@angular/core/testing';

import { DragSelectionService } from './drag-selection.service';

describe('DragSelectionService', () => {
  let service: DragSelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragSelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
