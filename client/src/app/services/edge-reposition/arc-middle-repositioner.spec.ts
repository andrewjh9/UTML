import {ArcMiddleRepositioner} from "./arc-middle-repositioner";
import {Edge, LineType} from "../../../assets/serialisation/edge";
import {Position} from "../../../assets/serialisation/position";

describe('ArcMiddleRepositioner ', () => {
  let repositioner: ArcMiddleRepositioner;

  beforeEach(() => {
    repositioner = new ArcMiddleRepositioner();
  });

  it('should start inactive', function () {
    expect(repositioner.isActive()).toBeFalse();
  });

  it('should throw an error if the edge is not an arc', function () {
    try {
      repositioner.activate(new Edge(new Position(0, 0), new Position(200, 200), undefined, undefined));
      fail();
    } catch (e) {
      expect(true).toBeTrue();
    }
  });

  it('should should throw an error if an edge does not have exactly one middle point.', function () {
    let edge = new Edge(new Position(0, 0), new Position(200, 200), undefined, undefined);
    edge.lineType = LineType.Arc;
    try {
      repositioner.activate(edge);
      fail();
    } catch (e) {
      expect(true).toBeTrue();
    }


  });

  it('should throw an error if is updated when it was not activated', function () {
    try {
      repositioner.update(new Position(200, 300));
      fail();
    } catch (e) {
      expect(true).toBeTrue();
    }
  });

  it('should throw an error if is deactivated when it was not activated', function () {
    try {
      repositioner.deactivate();
      fail();
    } catch (e) {
      expect(true).toBeTrue();
    }
  });

  it('should reflect changes', function () {
    let edge = new Edge(new Position(0, 0), new Position(100, 0), undefined, undefined);
    edge.lineType = LineType.Arc;
    edge.middlePositions.push(new Position(300, 50));

    repositioner.activate(edge);
    const P1 = new Position(75, 150);
    repositioner.update(P1);
    expect(edge.middlePositions[0].x).toEqual(P1.x);
    expect(edge.middlePositions[0].y).toEqual(P1.y);

    const P2 = new Position(10, 50);
    repositioner.update(P2);
    expect(edge.middlePositions[0].x).toEqual(P2.x);
    expect(edge.middlePositions[0].y).toEqual(P2.y);

    repositioner.deactivate();

    expect(edge.middlePositions[0].x).toEqual(P2.x);
    expect(edge.middlePositions[0].y).toEqual(P2.y);
    });
});
