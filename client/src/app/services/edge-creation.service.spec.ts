import {EdgeCreationService} from "./edge-creation.service";
import {CreationTypeSelectionService} from "./creation-type-selection.service";
import {RectangleNode} from "../../assets/serialisation/node/rectangle-node";
import {Position} from "../../assets/serialisation/position";
import {Node} from "../../assets/serialisation/node/node";
import {Edge, LineType} from "../../assets/serialisation/edge";

describe("EdgeCreationService", () => {
  let edgeCreationService: EdgeCreationService;
  let creationFormatterSelectionService: CreationTypeSelectionService;
  let n1: Node;
  let n2: Node;
  const attachment1 = 0;
  const attachment2 = 2;

  beforeEach(() => {
    creationFormatterSelectionService = new CreationTypeSelectionService();
    edgeCreationService = new EdgeCreationService(creationFormatterSelectionService);

    n1 = new RectangleNode(100, 100, new Position(0, 0));
    n2 = new RectangleNode(100, 100, new Position(100, 100));
  });

  it('starts inactive', function () {
    expect(edgeCreationService.isActive()).toBeFalse();
  });

  it('throws error if set end before set start', function () {
    try {
      edgeCreationService.setEnd(n1, attachment1);
      fail();
    } catch (e) {
      expect(edgeCreationService.isActive()).toBeFalse();
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

  it('is not active after setting end', function () {
    edgeCreationService.setStart(n1, attachment1);
    edgeCreationService.setEnd(n2, attachment2);
    expect(edgeCreationService.isActive()).toBeFalse();
  });

  it('adds middle point to arc', function () {
    spyOn(creationFormatterSelectionService, 'getSelectedProperty').and.returnValue({
      'lineType': LineType.Arc
    });
    spyOn(edgeCreationService.newEdgeEmitter, 'emit');

    edgeCreationService.setStart(n1, attachment1);
    edgeCreationService.setEnd(n2, attachment2);

    let edge = new Edge(attachment1, attachment2, n1, n2);
    edge.lineType = LineType.Arc;
    edge.setDefaultMiddlePointOnArc();

    expect(edgeCreationService.newEdgeEmitter.emit).toHaveBeenCalledWith(edge);
  });
});
