import {EdgeCreationService} from "./edge-creation.service";
import {RectangleNode} from "../../model/node/rectangle-node";
import {Position} from "../../model/position";
import {Node} from "../../model/node/node";
import {Edge, LineType} from "../../model/edge/edge";
import {TestBed} from "@angular/core/testing";
import {DragSelectionService} from "./drag-selection.service";

describe("EdgeCreationService", () => {
  let edgeCreationService: EdgeCreationService;
  let n1: Node;
  let n2: Node;
  let edge: Edge;
  const attachment1 = 0;
  const attachment2 = 2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    edgeCreationService = TestBed.inject(EdgeCreationService);

    n1 = new RectangleNode(100, 100, new Position(0, 0));
    n2 = new RectangleNode(100, 100, new Position(100, 100));
    edge = new Edge(Position.zero(), Position.zero());
    edgeCreationService.activate(edge);
  });

  it('throws error if set end before set start', function () {
    try {
      edgeCreationService.setEnd(n1, attachment1);
      fail();
    } catch (e) {
      expect(false).toBeFalse();
    }
  });

  it('is active after set start', function () {
    edgeCreationService.setStart(n1, attachment1);
    expect(edgeCreationService.isActive()).toBeTrue();
  });

  it('emits correct edge after creation', function () {
    spyOn(edgeCreationService.newEdgeEmitter, 'emit');

    edgeCreationService.setStart(n1, attachment1);
    edgeCreationService.setEnd(n2, attachment2);

    expect(edgeCreationService.newEdgeEmitter.emit).toHaveBeenCalledWith(jasmine.objectContaining({
      "startNode": n1,
      "endNode": n2,
      "startPosition": attachment1,
      "endPosition": attachment2
    }));
  });
});
