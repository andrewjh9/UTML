import { TestBed } from '@angular/core/testing';

import { CopyPasteService } from './copy-paste.service';
import {SelectionService} from "./selection.service";
import {RectangleNode} from "../../model/node/rectangle-node";
import {Position} from "../../model/position";
import {Edge} from "../../model/edge/edge";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {DeletionService} from "./deletion.service";
import {CachingService} from "./caching/caching.service";

describe('CopyPasteService', () => {
  let selectionService: SelectionService;
  let service: CopyPasteService;
  const NODE = new RectangleNode(100, 100, new Position(100, 100));
  const EDGE = new Edge(new Position(100, 100), new Position(200, 200));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        KeyboardEventCallerService,
        SelectionService
      ],
    });
    service = TestBed.inject(CopyPasteService);
    selectionService = TestBed.inject(SelectionService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with copy and paste unavailable.', function () {
    expect(service.pasteIsAvailable()).toBeFalse();
    expect(service.copyIsAvailable()).toBeFalse();
  });

  it('should have copy become available after selection', function () {
    selectionService.set(NODE);
    expect(service.copyIsAvailable()).toBeTrue();
    expect(service.pasteIsAvailable()).toBeFalse();
  });

  it('should have paste come available after selection and doCopy', function () {
    selectionService.set(NODE);
    expect(service.copyIsAvailable()).toBeTrue();
    service.doCopy();
    expect(service.pasteIsAvailable()).toBeTrue();
  });

  it('should emit a node after selection, doCopy, doPaste', function () {
    spyOn(service.pasteEmitter, 'emit');
    selectionService.set(NODE);
    service.doCopy();
    service.doPaste();
    expect(service.pasteEmitter.emit).toHaveBeenCalled();
  });

  it('should emit a edge after selection, doCopy, doPaste', function () {
    spyOn(service.pasteEmitter, 'emit');
    selectionService.set(EDGE);
    service.doCopy();
    service.doPaste();
    expect(service.pasteEmitter.emit).toHaveBeenCalled();
  });
});
