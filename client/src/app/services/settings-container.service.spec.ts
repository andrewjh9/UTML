import { TestBed } from '@angular/core/testing';

import { SettingsContainerService } from './settings-container.service';

describe('SettingsContainerService', () => {
  let service: SettingsContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SettingsContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
