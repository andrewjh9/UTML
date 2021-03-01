import {StartEndRepositioner} from "./start-end-repositioner";
import {Node} from "../../../model/node/node";
import {RectangleNode} from "../../../model/node/rectangle-node";
import {Position} from "../../../model/position";
import {Edge} from "../../../model/edge";
import {EdgeRepositionService} from "./edge-reposition.service";

describe('StartEndRepositioner ', function () {
  let repositioner: StartEndRepositioner;
  let nodes: Node[];
  const SNAP_DISTANCE = 25;
  let origStart: Node;
  let origEnd: Node;
  let newNode: Node;
  let edge: Edge;

  beforeEach(() => {
    origStart = new RectangleNode(100, 100, new Position(0, 0));
    origEnd = new RectangleNode(100, 100, new Position(200, 0));
    newNode = new RectangleNode(100, 100, new Position(50, 100));
    edge = new Edge(1, 6, origStart, origEnd);

    nodes = [origStart, origEnd, newNode];
    repositioner = new StartEndRepositioner(SNAP_DISTANCE);
    repositioner.setNodes(nodes);
  });

  it('should start inactive', function () {
    expect(repositioner.isActive()).toBeFalse();
  });

  it('should be active after activation', function () {
    repositioner.activate(edge, true);
    expect(repositioner.isActive()).toBeTrue();
  });

  describe('during activation ', () => {
    beforeEach(() => {
      repositioner.activate(edge, false);
    });

    it('should update endNode and endPosition after update', function () {
      let pos = new Position(500, 500);
      repositioner.update(pos);
      expect(edge.endNode).toBeUndefined();
      expect((edge.endPosition as Position).x).toEqual(pos.x);
      expect((edge.endPosition as Position).y).toEqual(pos.y);
    });

    it('should snap to new attachment point on same node', function () {
      const ATTACHMENT = 4;
      let pos = Position.add(origEnd.getPositionOfAttachment(ATTACHMENT), new Position(1, 1));
      repositioner.update(pos);
      expect(edge.endNode).toEqual(origEnd);
      expect(edge.endPosition).toEqual(ATTACHMENT);
    });

    it('should snap to new attachment point on different node', function () {
      const ATTACHMENT = 4;
      let pos = Position.add(newNode.getPositionOfAttachment(ATTACHMENT), new Position(1, 1));
      repositioner.update(pos);
      expect(edge.endNode).toEqual(newNode);
      expect(edge.endPosition).toEqual(ATTACHMENT);
    });

    it('should be inactive after deactivation', function () {
      repositioner.deactivate();
      expect(repositioner.isActive()).toBeFalse();
    });
  });

  describe("getPositionOfAttachment", ()=> {
    it("Attachment points lie on themselves", () => {
      let attachmentPoints = origStart.getAllAttachmentPoints();
      for (let i = 0; i < attachmentPoints.length; i++) {
        expect(StartEndRepositioner.getAttachmentPoint(origStart, origStart.getPositionOfAttachment(i), 0)).toEqual(i);
      }
    });

    it("getPositionOfAttachment returns -1 if not on node", () => {
      expect(StartEndRepositioner.getAttachmentPoint(origStart, new Position(2000, 2000), 25)).toEqual(-1);
    });

    it("getPositionOfAttachment returned index is within error", () => {
      for (let x = 0; x < 500; x += 10) {
        for (let y = 0; y < 500; y += 10) {
          let position = new Position(x, y);
          let result = StartEndRepositioner.getAttachmentPoint(origStart, position, SNAP_DISTANCE);

          if (result !== -1) {
            expect(Position.getDistance(position, origStart.getPositionOfAttachment(result))).toBeLessThanOrEqual(SNAP_DISTANCE);
          }
        }
      }
    });
  });
});
