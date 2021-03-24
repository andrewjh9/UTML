import {TestBed} from '@angular/core/testing';

import {DragSelectionService} from './drag-selection.service';
import {Position} from "../../model/position";
import {RectangleNode} from "../../model/node/rectangle-node";
import {Edge} from "../../model/edge";
import {Diagram} from "../../model/diagram";
import {SelectionService} from "./selection.service";
import {DiagramContainerService} from "./diagram-container.service";

describe('DragSelectionService', () => {
  let service: DragSelectionService;
  let selectionService: SelectionService;
  const ALWAYS_CONTAINED_NODE = new RectangleNode(100, 100, new Position(10, 10));
  const PARTIALLY_CONTAINED = new RectangleNode(100, 100, new Position(200, 100));
  const EDGE = new Edge(2, 6, ALWAYS_CONTAINED_NODE, PARTIALLY_CONTAINED);
  let diagramContainer: DiagramContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    diagramContainer = TestBed.inject(DiagramContainerService);
    service = TestBed.inject(DragSelectionService);
    selectionService = TestBed.inject(SelectionService);
    spyOn(selectionService, 'add');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start inactive', function () {
    expect(service.isActive()).toBeFalse();
  });

  it('should throw an error if updated before being activated', function () {
    try {
      service.update(new Position(0, 0));
      fail();
    } catch (e) {
      expect(true).toBeTrue();
    }
  });

  it('should contain nodes within selection', function () {
    diagramContainer.set(new Diagram([ALWAYS_CONTAINED_NODE, PARTIALLY_CONTAINED], [EDGE]));

    service.activate(new Position(0, 0));
    service.update(new Position(110, 110));
    expect(selectionService.add).toHaveBeenCalledOnceWith(ALWAYS_CONTAINED_NODE)
  });
  // Todo: fix this test
  // it('should not contain partially contained nodes', function () {
  //   diagramContainer.set(new Diagram([ALWAYS_CONTAINED_NODE, PARTIALLY_CONTAINED], [EDGE]));
  //
  //   service.activate(new Position(0, 0));
  //   service.update(new Position(220, 120));
  //   // expect(selectionService.add).toHaveBeenCalledWith(ALWAYS_CONTAINED_NODE);
  //   // expect(selectionService.add).toHaveBeenCalledWith(EDGE)
  //   expect(selectionService.add).toHaveBeenCalledTimes(2);
  // });
});
