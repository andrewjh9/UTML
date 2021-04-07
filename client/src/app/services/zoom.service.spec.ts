import { TestBed } from '@angular/core/testing';

import { ZoomService } from './zoom.service';

describe('ZoomService', () => {
  let service: ZoomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start unzoomed', function () {
    expect(service.getCurrentZoomFactor()).toEqual(1);
  });

  describe('x, y coordinates ', () => {
    it('should start at 0, 0', function () {
      expect(service.getXY().x).toEqual(0);
      expect(service.getXY().y).toEqual(0);
    });

    it('should increment when calling setXY', function () {
      const DX1 = 50;
      const DX2 = 75;
      const DY1 = 11;
      const DY2 = 22;
      service.setXY(DX1, DY1);
      service.setXY(DX2, DY2);
      expect(service.getXY().x).toEqual(DX1 + DX2);
      expect(service.getXY().y).toEqual(DY1 + DY2);
    });

    it('should not go lower than 0', function () {
      service.setXY(-100, -100);
      expect(service.getXY().x).toEqual(0);
      expect(service.getXY().y).toEqual(0);
    });
  });

  describe('change emitting ', () => {
    beforeEach(() => {
      spyOn(service.updateEmitter, 'emit');
    });

    it ('should emit changes when setting XY', function () {
      service.setXY(100, 200);
      expect(service.updateEmitter.emit).toHaveBeenCalledTimes(1);
    });

    it ('should emit changes when setting XY', function () {
      service.updateZoomFactor(true);
      expect(service.updateEmitter.emit).toHaveBeenCalledTimes(1);
    });

    it ('should emit changes when setting XY', function () {
      service.reset();
      expect(service.updateEmitter.emit).toHaveBeenCalledTimes(1);
    });
  })
});
