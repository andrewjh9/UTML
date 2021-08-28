import {DeletionService} from "./deletion.service";
import {RectangleNode} from "../../model/node/rectangle-node";
import {Position} from "../../model/position";
import {Edge} from "../../model/edge/edge";
import {Node} from "../../model/node/node";
import {Diagram} from "../../model/diagram";
import {EllipseNode} from "../../model/node/ellipse-node";
import {typeIsOrHasBaseType} from "tslint/lib/language/typeUtils";
import {CachingService} from "./caching/caching.service";
import {KeyboardEventCallerService} from "./keyboard-event-caller.service";
import {SelectionService} from "./selection.service";
import {TestBed} from "@angular/core/testing";
import {DiagramContainerService} from "./diagram-container.service";

describe('DeletionService ', () => {
  let deletionService: DeletionService;
  let diagramContainer: DiagramContainerService;
  let n1: Node;
  let n2: Node;
  let unknownNode: Node;
  let e1: Edge;
  let unknownEdge: Edge;
  let diagram: Diagram;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    n1 = new RectangleNode(100, 100, new Position(0, 0));
    n2 = new RectangleNode(100, 100, new Position(200, 0));
    unknownNode = new EllipseNode(200, 200, new Position(500, 500));
    e1 = new Edge(0, 0, n1, n2);
    unknownEdge = new Edge(0, 0, n1, unknownNode);
    deletionService = TestBed.inject(DeletionService);
    diagramContainer = TestBed.inject(DiagramContainerService);
  });

  describe('without diagram set ', () => {
    it('should throw errors if deleteEdge is called', function () {
      try {
        deletionService.deleteEdge(e1);
        fail();
      } catch (e) {
        expect(true).toBeTrue();
      }
    });

    it('should throw errors if deleteNode is called', function () {
      try {
        deletionService.deleteNode(n1);
        fail();
      } catch (e) {
        expect(true).toBeTrue();
      }
    });
  });

  describe('with diagram set ', () => {
    beforeEach(() => {
      diagram = new Diagram([n1, n2], [e1]);
      diagramContainer.set(diagram);
    });

    it('should correctly remove a node', function () {
      deletionService.deleteNode(n1);
      expect(diagram.nodes).toEqual(jasmine.arrayWithExactContents([n2]));
    });

    it('should correctly remove an edge', function () {
      deletionService.deleteEdge(e1);
      expect(diagram.edges).toEqual(jasmine.arrayWithExactContents([]));
    });

    it('should error if an edge does not exist', function () {
      try {
        deletionService.deleteEdge(unknownEdge);
        fail();
      } catch (e) {
        expect(true).toBeTrue();
      }
    });

    it('should error if a node does not exist', function () {
      try {
        deletionService.deleteNode(unknownNode);
        fail();
      } catch (e) {
        expect(true).toBeTrue();
      }
    });
  });
});
