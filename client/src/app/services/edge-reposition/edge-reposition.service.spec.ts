import {EdgeRepositionService} from "./edge-reposition.service";
import {RectangleNode} from "../../../model/node/rectangle-node";
import {Position} from "../../../model/position";
import {Node} from "../../../model/node/node";
import {Edge, LineType} from "../../../model/edge";
import {CachingService} from "../caching/caching.service";
import {Diagram} from "../../../model/diagram";
import {TestBed} from "@angular/core/testing";
import {DragDropCreationService} from "../drag-drop-creation.service";

describe('EdgeRepositionService ', () => {
  let edgeRepositionService: EdgeRepositionService;
  let n1: Node;
  let n2: Node;
  let simpleLine: Edge;
  let middleLine: Edge;
  let arc: Edge;
  let middlePosition: Position;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    edgeRepositionService = TestBed.inject(EdgeRepositionService)
    let cachingService = TestBed.inject(CachingService);
    n1 = new RectangleNode(100, 100, new Position(0, 0));
    n2 = new RectangleNode(100, 100, new Position(200, 0));

    simpleLine = new Edge(1, 7, n1, n2);

    middleLine = new Edge(1, 7, n1, n2);
    middlePosition = new Position(500, 500);
    middleLine.middlePositions.push(middlePosition);

    arc = new Edge(1,7, n1, n2);
    arc.lineType = LineType.Arc;
    arc.setDefaultMiddlePointOnArc();
  });

  it('should start inactive', function () {
    expect(edgeRepositionService.isActive()).toBeFalse();
  });

  describe('when activate is called ', () => {
    it(' should call StartEndRepositioner on start', function () {
      spyOn(edgeRepositionService.startEndRepositioner, 'activate');
      edgeRepositionService.activate(simpleLine, Position.add(new Position(4, 2), simpleLine.getStartPosition()));
      expect(edgeRepositionService.startEndRepositioner.activate).toHaveBeenCalledWith(simpleLine, true);
    });

    it(' should call StartEndRepositioner on end', function () {
      spyOn(edgeRepositionService.startEndRepositioner, 'activate');
      edgeRepositionService.activate(simpleLine, Position.add(new Position(4, 2), simpleLine.getEndPosition()));
      expect(edgeRepositionService.startEndRepositioner.activate).toHaveBeenCalledWith(simpleLine, false);
    });

    it('should call FixedPointRepositioner and add a point', function () {
      spyOn(edgeRepositionService.fixedPointRepositioner, 'activate');
      let pos = new Position(150, 0);
      edgeRepositionService.activate(simpleLine, pos);
      expect(edgeRepositionService.fixedPointRepositioner.activate).toHaveBeenCalledWith(simpleLine, pos);
      expect(simpleLine.middlePositions.length).toEqual(1);
    });

    it('should correctly select an existing middle position', function () {
      spyOn(edgeRepositionService.fixedPointRepositioner, 'activate');
      let pos = Position.subtract(middlePosition, new Position(1, 2));
      edgeRepositionService.activate(middleLine, pos);
      expect(edgeRepositionService.fixedPointRepositioner.activate).toHaveBeenCalledWith(middleLine, middlePosition);
    });

    it('should correctly call ArcMiddleRepositioner', function () {
      spyOn(edgeRepositionService.arcMiddleRepositioner, 'activate');
      let pos = new Position(100, 200);
      edgeRepositionService.activate(arc, pos);
      expect(edgeRepositionService.arcMiddleRepositioner.activate).toHaveBeenCalledWith(arc);
    });
  });

});


// describe("EdgeRepositionService", () => {
//   let edgeRepositionService: EdgeRepositionService;
//   let node1: Node;
//   let node2: Node;
//   const node1Attachment: number = 2;
//   const node2Attachment: number = 6
//   let edge: Edge;
//
//   beforeEach(() => {
//     edgeRepositionService = new EdgeRepositionService();
//     node1 = new RectangleNode(100, 200, new Position(100, 200));
//     node2 = new RectangleNode(100, 200, new Position(500, 200));
//     edgeRepositionService.setNodes([node1, node2]);
//     edge = new Edge(node1Attachment, node2Attachment, node1, node2);
//   });
//
//   describe("Activate", () => {
//     it("Should find start position", () => {
//       edgeRepositionService.activate(node1.getPositionOfAttachment(node1Attachment), edge);
//       expect(edgeRepositionService.getRepositionMode()).toEqual(RepositionMode.StartPosition);
//     });
//
//     it("Should find end position", () => {
//       edgeRepositionService.activate(node2.getPositionOfAttachment(node2Attachment), edge);
//       expect(edgeRepositionService.getRepositionMode()).toEqual(RepositionMode.EndPosition);
//     });
//   });
//
//   describe("Update", () => {
//     it("Snaps to different start position", () => {
//       edgeRepositionService.activate(node1.getPositionOfAttachment(node1Attachment), edge);
//       const newAttachment = 0;
//       edgeRepositionService.update(node1.getPositionOfAttachment(newAttachment));
//       expect(edge.startPosition).toEqual(newAttachment);
//       expect(edge.startNode).toEqual(node1);
//     });
//   });
//
//   it("Starts inactive", () => {
//     expect(edgeRepositionService.isActive()).toBeFalse();
//     expect(edgeRepositionService.getRepositionMode()).toEqual(RepositionMode.Inactive);
//   });
//
//   it("Throws error on unactivated update", () => {
//     try {
//       edgeRepositionService.update(new Position(500, 500));
//       fail();
//     } catch (e) {
//       expect(edgeRepositionService.isActive()).toBeFalse();
//     }
//   });
// });
