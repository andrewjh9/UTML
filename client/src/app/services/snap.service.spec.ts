import { TestBed } from '@angular/core/testing';

import { SnapService } from './snap.service';
import {Position} from "../../model/position";

describe('SnapService', () => {
  let service: SnapService;

  function checkSnap(initX: number, initY: number, snapDistance: number, expectedX: number, expectedY: number) {
    let pos = new Position(initX, initY);
    let snapped = service.snapIfApplicable(pos, snapDistance);
    expect(snapped.x).toEqual(expectedX);
    expect(snapped.y).toEqual(expectedY);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should snap appropriately', function () {
    checkSnap(9, 9, 10, 10 ,10);
    checkSnap(9, 1, 10, 10 ,0);
    checkSnap(0, 0, 10, 0 ,0);
  });
});

