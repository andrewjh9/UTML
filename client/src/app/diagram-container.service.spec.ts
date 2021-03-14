import { TestBed } from '@angular/core/testing';

import { DiagramContainerService } from './diagram-container.service';

describe('DiagramContainerService', () => {
  let service: DiagramContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagramContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
