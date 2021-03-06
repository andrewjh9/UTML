import { TestBed } from '@angular/core/testing';

import { KeyboardEventCallerService } from './keyboard-event-caller.service';

describe('KeyboardEventCallerService', () => {
  let service: KeyboardEventCallerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardEventCallerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
