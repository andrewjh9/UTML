import {RectangleNode} from "../model/node/rectangle-node";
import {Position} from "../model/position";
import {deserialiseGeneric, deserialiseNode} from "./deserialise-node";
import {EllipseNode} from "../model/node/ellipse-node";
import {DiamondNode} from "../model/node/diamond-node";

describe('deserialiseNode ', () => {
  describe('Rectangle ', () => {
    let rectangleNode: RectangleNode;
    const HEIGHT = 100;
    const WIDTH = 50;
    const X = 125;
    const Y = 135;
    const TEXT = "whatever you want \\n";
    const HAS_DOUBLE_BORDER = true;

    beforeEach(() => {
      rectangleNode = new RectangleNode(WIDTH, HEIGHT, new Position(X, Y));
      rectangleNode.text = TEXT;
      rectangleNode.hasDoubleBorder = HAS_DOUBLE_BORDER;
    });

    it('should fully restore the RectangleNode', function () {
      let deserialised = deserialiseNode(rectangleNode.serialise());
      expect(deserialised.height).toEqual(rectangleNode.height);
      expect(deserialised.width).toEqual(rectangleNode.width);
      expect(deserialised.text).toEqual(rectangleNode.text);
      expect(deserialised.hasDoubleBorder).toEqual(rectangleNode.hasDoubleBorder);
      expect(deserialised.position.y).toEqual(rectangleNode.position.y);
      expect(deserialised.position.x).toEqual(rectangleNode.position.x);
      expect(deserialised instanceof RectangleNode).toBeTrue();
    });
  });

  describe('Ellipse ', () => {
    let ellipseNode: EllipseNode;
    const HEIGHT = 100;
    const WIDTH = 50;
    const X = 125;
    const Y = 135;
    const TEXT = "whatever you want \\n whatever you need";
    const HAS_DOUBLE_BORDER = true;

    beforeEach(() => {
      ellipseNode = new EllipseNode(WIDTH, HEIGHT, new Position(X, Y));
      ellipseNode.text = TEXT;
      ellipseNode.hasDoubleBorder = HAS_DOUBLE_BORDER;
    });

    it('should fully restore the EllipseNode', function () {
      let deserialised = deserialiseNode(ellipseNode.serialise());
      expect(deserialised.height).toEqual(ellipseNode.height);
      expect(deserialised.width).toEqual(ellipseNode.width);
      expect(deserialised.text).toEqual(ellipseNode.text);
      expect(deserialised.hasDoubleBorder).toEqual(ellipseNode.hasDoubleBorder);
      expect(deserialised.position.y).toEqual(ellipseNode.position.y);
      expect(deserialised.position.x).toEqual(ellipseNode.position.x);
      expect(deserialised instanceof EllipseNode).toBeTrue();
    });
  });

  describe('Diamond ', () => {
    let diamondNode: DiamondNode;
    const HEIGHT = 100;
    const WIDTH = 50;
    const X = 125;
    const Y = 135;
    const TEXT = "whatever you want \\n whatever you need";
    const HAS_DOUBLE_BORDER = true;

    beforeEach(() => {
      diamondNode = new DiamondNode(WIDTH, HEIGHT, new Position(X, Y));
      diamondNode.text = TEXT;
      diamondNode.hasDoubleBorder = HAS_DOUBLE_BORDER;
    });

    it('should fully restore the DiamondNode', function () {
      let deserialised = deserialiseNode(diamondNode.serialise());
      expect(deserialised.height).toEqual(diamondNode.height);
      expect(deserialised.width).toEqual(diamondNode.width);
      expect(deserialised.text).toEqual(diamondNode.text);
      expect(deserialised.hasDoubleBorder).toEqual(diamondNode.hasDoubleBorder);
      expect(deserialised.position.y).toEqual(diamondNode.position.y);
      expect(deserialised.position.x).toEqual(diamondNode.position.x);
      expect(deserialised instanceof DiamondNode).toBeTrue();
    });
  });
});
