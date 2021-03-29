import {Position} from "../../model/position";
import {PositionInFile} from "tslint/lib/verify/lintError";
import {deserialisePosition} from "../deserialise/deserialise-position";

describe('Position serialisation ', () => {
  let p1: Position;
  let p2: Position;
  let p3: Position;
  let all: Array<Position>;

  beforeEach(() => {
    p1 = new Position(123, 456);
    p2 = new Position(-200, -300);
    p3 = Position.zero();
    all = [p1, p2, p3];
  });

  it('serialised Position should contain the correct x, y values', function () {
    all.forEach(p => {
      expect(p.serialise().x).toEqual(p.x);
      expect(p.serialise().y).toEqual(p.y);
    });
  });

  it('should hold the same values after serialising and then deserialising', function () {
    all.forEach(p => {
      expect(deserialisePosition(p.serialise()).x).toEqual(p.x);
      expect(deserialisePosition(p.serialise()).y).toEqual(p.y);
    });
  });
})
