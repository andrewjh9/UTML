import {EdgeRepositionService, RepositionMode} from "./edge-reposition.service";
import {RectangleNode} from "../../assets/serialisation/node/rectangle-node";
import {Position} from "../../assets/serialisation/position";
import {Node} from "../../assets/serialisation/node/node";
import {Edge} from "../../assets/serialisation/edge";

describe("EdgeRepositionService", () => {
  let edgeRepositionService: EdgeRepositionService;
  let node1: Node;
  let node2: Node;
  const node1Attachment: number = 2;
  const node2Attachment: number = 6
  let edge: Edge;

  beforeEach(() => {
    edgeRepositionService = new EdgeRepositionService();
    node1 = new RectangleNode(100, 200, new Position(100, 200));
    node2 = new RectangleNode(100, 200, new Position(500, 200));
    edgeRepositionService.setNodes([node1, node2]);
    edge = new Edge(node1Attachment, node2Attachment, node1, node2);
  });

  describe("Activate", () => {
    it("Should find start position", () => {
      edgeRepositionService.activate(node1.getPositionOfAttachment(node1Attachment), edge);
      expect(edgeRepositionService.getRepositionMode()).toEqual(RepositionMode.StartPosition);
    });

    it("Should find end position", () => {
      edgeRepositionService.activate(node2.getPositionOfAttachment(node2Attachment), edge);
      expect(edgeRepositionService.getRepositionMode()).toEqual(RepositionMode.EndPosition);
    });
  });

  describe("Update", () => {
    it("Snaps to different start position", () => {
      edgeRepositionService.activate(node1.getPositionOfAttachment(node1Attachment), edge);
      const newAttachment = 0;
      edgeRepositionService.update(node1.getPositionOfAttachment(newAttachment));
      expect(edge.startPosition).toEqual(newAttachment);
      expect(edge.startNode).toEqual(node1);
    });
  });

  it("Starts inactive", () => {
    expect(edgeRepositionService.isActive()).toBeFalse();
    expect(edgeRepositionService.getRepositionMode()).toEqual(RepositionMode.Inactive);
  });

  it("Throws error on unactivated update", () => {
    try {
      edgeRepositionService.update(new Position(500, 500));
      fail();
    } catch (e) {
      expect(edgeRepositionService.isActive()).toBeFalse();
    }
  });

  describe("getPositionOfAttachment", ()=> {
    it("Attachment points lie on themselves", () => {
      let attachmentPoints = node1.getAllAttachmentPoints();
      for (let i = 0; i < attachmentPoints.length; i++) {
        expect(EdgeRepositionService.getAttachmentPoint(node1, node1.getPositionOfAttachment(i), 0)).toEqual(i);
      }
    });

    it("getPositionOfAttachment returns -1 if not on node", () => {
      expect(EdgeRepositionService.getAttachmentPoint(node1, new Position(0, 0), 25)).toEqual(-1);
    });

    it("getPositionOfAttachment returned index is within error", () => {
      const ALLOWED_ERROR = 25;

      for (let x = 0; x < 500; x += 10) {
        for (let y = 0; y < 500; y += 10) {
          let position = new Position(x, y);
          let result = EdgeRepositionService.getAttachmentPoint(node1, position, ALLOWED_ERROR);

          if (result !== -1) {
            expect(Position.getDistance(position, node1.getPositionOfAttachment(result))).toBeLessThanOrEqual(ALLOWED_ERROR);
          }
        }
      }

      expect(EdgeRepositionService.getAttachmentPoint(node1, new Position(0, 0), 25)).toEqual(-1);
    });
  });
});
