import {FixedPointRepositioner} from "./fixed-point-repositioner";
import {Position} from "../../../assets/serialisation/position";
import {Edge} from "../../../assets/serialisation/edge";
import {Node} from "../../../assets/serialisation/node/node";
import {RectangleNode} from "../../../assets/serialisation/node/rectangle-node";
import {before} from "selenium-webdriver/testing";

describe('FixedPointRepositioner ', () => {
  let repositioner: FixedPointRepositioner;
  let n1: Node;
  let n2: Node;
  let edge: Edge;
  let middle: Position;

  beforeEach(() => {
    repositioner = new FixedPointRepositioner();
    n1 = new RectangleNode(100, 100, new Position(0, 0));
    n2 = new RectangleNode(100, 100, new Position(200, 0));
    edge = new Edge(1, 7, n1, n2);
    middle = new Position(150, 150);
    edge.middlePositions.push(middle);
  });

  it('should start inactive', function () {
    expect(repositioner.isActive()).toBeFalse();
  });

  describe('after activation ', () => {
    beforeEach(() => {
      repositioner.activate(edge, middle);
    });

    it('should be active', function () {
      expect(repositioner.isActive()).toBeTrue();
    });

    it('should reflect updates on the original object', function () {
      repositioner.update(new Position(200, 300));
      expect(middle.x).toEqual(200);
      expect(middle.y).toEqual(300);
    });
  });

  describe('after deactivation', () => {
    it('should be inactive', function () {
      repositioner.activate(edge, middle);
      repositioner.deactivate();
      expect(repositioner.isActive()).toBeFalse();
    });

    it('should remove the middle position if on segment', function () {
      repositioner.activate(edge, middle);
      repositioner.update(new Position(120, 1));
      repositioner.deactivate();
      expect(edge.middlePositions.length).toEqual(0);
    });

    it('should not remove if not on segment', function () {
      repositioner.activate(edge, middle);
      repositioner.update(new Position(500, 500));
      repositioner.deactivate();
      expect(edge.middlePositions.length).toEqual(1);
    });
  })
});
