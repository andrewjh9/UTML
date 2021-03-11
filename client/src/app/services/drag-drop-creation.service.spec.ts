import { TestBed } from '@angular/core/testing';

import { DragDropCreationService } from './drag-drop-creation.service';
import {Position} from "../../model/position";
import {RectangleNode} from "../../model/node/rectangle-node";

describe('DragDropCreationService', () => {
  let service: DragDropCreationService;
  const X = 100;
  const Y = 200;
  let prototype = new RectangleNode(100, 100, new Position(X, Y))

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DragDropCreationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start inactive', function () {
    expect(service.isActive()).toBeFalse();
  });

  it('should throw error if updating before activation', function () {
    try {
      service.update(new Position(0, 0));
      fail();
    } catch (e) {
      expect(true).toBeTrue();
    }
  });

  it('should be active after activation.', function () {
    service.activate(prototype);
    expect(service.isActive()).toBeTrue();
  });

  it('should leave prototype unaffected on update', function () {
    service.activate(prototype);
    service.update(new Position(500, 500));
    expect(prototype.position.x).toEqual(X);
    expect(prototype.position.y).toEqual(Y);
  });

  it('should not emit when cancelled', function () {
    spyOn(service.createdEmitter, 'emit');
    service.activate(prototype);
    service.update(new Position(500, 500));
    service.cancel();
    expect(service.createdEmitter.emit).toHaveBeenCalledTimes(0);
  });

  it('should call emit when create', function () {
    spyOn(service.createdEmitter, 'emit');
    service.activate(prototype);
    service.update(new Position(500, 500));
    service.create();
    expect(service.createdEmitter.emit).toHaveBeenCalled();
  });
});
