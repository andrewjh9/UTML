import { TestBed } from '@angular/core/testing';

import {RepositionService} from "./reposition.service";

describe('RepositionService', () => {
  let service: RepositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
