import { TestBed } from '@angular/core/testing';

import { KeyboardEventCallerService } from './keyboard-event-caller.service';

describe('KeyboardEventCallerService', () => {
  let service: KeyboardEventCallerService;
  const CALLBACKS = {
    f: (event: KeyboardEvent) => {},
    g: (event: KeyboardEvent) => {},
    h: (event: KeyboardEvent) => {},
    i: (event: KeyboardEvent) => {},
    j: (event: KeyboardEvent) => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyboardEventCallerService);
    spyOn(CALLBACKS, 'f');
    spyOn(CALLBACKS, 'g');
    spyOn(CALLBACKS, 'h');
    spyOn(CALLBACKS, 'i');
    spyOn(CALLBACKS, 'j');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to register a single callback', function () {
    service.addCallback(['p', 'keydown', 'any'], CALLBACKS.f);

    // @ts-ignore
    service.executeCallbacks(['p', 'keydown', 'none'], null);

    expect(CALLBACKS.f).toHaveBeenCalled();
  });

  it('should call multiple callbacks on different', function () {
    service.addCallback(['p', 'keydown', 'any'], CALLBACKS.f);
    service.addCallback(['p', 'keydown', 'ctrl'], CALLBACKS.g);
    service.addCallback(['p', 'keydown', 'alt'], CALLBACKS.h);
    service.addCallback(['p', 'keyup', 'alt'], CALLBACKS.i);
    service.addCallback(['P', 'keydown', 'any'], CALLBACKS.j);



    // @ts-ignore
    service.executeCallbacks(['p', 'keydown', 'ctrl'], null);
    expect(CALLBACKS.f).toHaveBeenCalled();
    expect(CALLBACKS.g).toHaveBeenCalled();
    expect(CALLBACKS.h).toHaveBeenCalledTimes(0);
    expect(CALLBACKS.i).toHaveBeenCalledTimes(0);
    expect(CALLBACKS.j).toHaveBeenCalledTimes(0);
  });
});
