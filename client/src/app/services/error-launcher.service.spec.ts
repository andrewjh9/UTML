import { TestBed } from '@angular/core/testing';

import { ErrorLauncherService } from './error-launcher.service';

describe('ErrorLauncherService', () => {
  let service: ErrorLauncherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorLauncherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
