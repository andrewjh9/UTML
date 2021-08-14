import {ChangeDetectionService} from "./change-detection.service";
import {TestBed} from "@angular/core/testing";

describe('ChangeDetectionService', () => {
  let service: ChangeDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not assign the same id twice', function () {
    const ADDED_AMOUNT = 100;
    let ids: Set<number> = new Set();
    for (let i = 0; i < ADDED_AMOUNT; i++) {
      ids.add(service.addCallback(() => {}));
    }

    expect(ids.size).toEqual(ADDED_AMOUNT);
  });

  it('should call the callbacks on trigger()', function () {
    let obj = {
      f1: () => {},
      f2: () => {},
      f3: () => {}
    };

    spyOn(obj, 'f1');
    spyOn(obj, 'f2');
    spyOn(obj, 'f3');


    service.addCallback(obj.f1);
    service.addCallback(obj.f2);
    service.addCallback(obj.f3);

    service.trigger();

    expect(obj.f1).toHaveBeenCalledTimes(1);
    expect(obj.f2).toHaveBeenCalledTimes(1);
    expect(obj.f3).toHaveBeenCalledTimes(1);
  });

  it('should not call deleted callbacks', function () {
    let obj = {
      f1: () => {},
      f2: () => {},
      f3: () => {}
    };

    spyOn(obj, 'f1');
    spyOn(obj, 'f2');
    spyOn(obj, 'f3');


    service.addCallback(obj.f1);
    service.addCallback(obj.f2);
    let id = service.addCallback(obj.f3);
    service.removeCallback(id)

    service.trigger();

    expect(obj.f1).toHaveBeenCalledTimes(1);
    expect(obj.f2).toHaveBeenCalledTimes(1);
    expect(obj.f3).toHaveBeenCalledTimes(0);
  });
});
