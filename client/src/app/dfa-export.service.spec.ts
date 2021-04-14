import { TestBed } from '@angular/core/testing';

import { DfaExportService } from './dfa-export.service';

describe('DfaExportService', () => {
  let service: DfaExportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DfaExportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
