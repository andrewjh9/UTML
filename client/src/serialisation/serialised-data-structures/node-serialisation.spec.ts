import {ActorNode} from "../../model/node/actor-node";
import {Position} from "../../model/position";
import {ClassNode} from "../../model/node/class-node";
import {DiamondNode} from "../../model/node/diamond-node";
import {EllipseNode} from "../../model/node/ellipse-node";
import {ForkRejoinNode} from "../../model/node/fork-rejoin-node";
import {HourglassNode} from "../../model/node/hourglass-node";
import {RectangleNode} from "../../model/node/rectangle-node";
import {Node} from "../../model/node/node";
import {deserialiseNode} from "../deserialise/deserialise-node";

describe('Node Serialisation ' , () => {
  let actor: ActorNode;
  let clazz: ClassNode;
  let diamond: DiamondNode;
  let ellipse: EllipseNode;
  let fork: ForkRejoinNode;
  let hourglass: HourglassNode;
  let rect: RectangleNode;
  let all: Array<Node>;

  beforeEach(() => {
    actor = new ActorNode(50, 200, Position.zero());
    clazz = new ClassNode(100, 200, Position.zero());
    diamond = new DiamondNode(100, 100, Position.zero());
    ellipse = new EllipseNode(100, 100, Position.zero());
    fork = new ForkRejoinNode(200, 10, Position.zero());
    hourglass = new HourglassNode(100, 100, Position.zero());
    rect = new RectangleNode(100, 100, new Position(123, 456));
    all = [actor, clazz, diamond, ellipse, fork, hourglass, rect];
  });

  describe('serialisation ', () => {
    it('serialising a node should give it the correct type string', () => {
      expect(actor.serialise().type).toEqual('ActorNode');
      expect(clazz.serialise().type).toEqual('ClassNode');
      expect(diamond.serialise().type).toEqual('DiamondNode');
      expect(ellipse.serialise().type).toEqual('EllipseNode');
      expect(fork.serialise().type).toEqual('ForkRejoinNode');
      expect(hourglass.serialise().type).toEqual('HourglassNode');
      expect(rect.serialise().type).toEqual('RectangleNode');
    });

    it('should correctly save the width', function () {
      all.forEach(node => expect(node.serialise().width).toEqual(node.width));
    });

    it('should correctly save the height', function () {
      all.forEach(node => expect(node.serialise().height).toEqual(node.height));
    });

    it('should correctly save the text', function () {
      all.forEach(node => expect(node.serialise().text).toEqual(node.text));
    });

    it('should correctly save the double border', function () {
      all.forEach(node => expect(node.serialise().width).toEqual(node.width));
    });

    it('should hold the correct position values', function () {
      all.forEach(node => {
        expect(node.serialise().position.x).toEqual(node.position.x);
        expect(node.serialise().position.y).toEqual(node.position.y);
      });
    });

    it('should create a deep copy of the style object', function () {
      let node = new RectangleNode(100, 100, Position.zero());
      const FILL = 'green';
      const STROKE = 'yellow';
      node.styleObject['fill'] = 'green';
      node.styleObject['stroke'] = 'yellow';
      let serialised = node.serialise();
      node.styleObject['fill'] = 'brown';
      node.styleObject['stroke'] = 'brown';

      expect(serialised.styleObject.fill).toEqual(FILL);
      expect(serialised.styleObject.stroke).toEqual(STROKE);
    });
  });

  describe('deserialisation ', () => {
    it('should desrialise to the correct class', function () {
      expect(deserialiseNode(actor.serialise()) instanceof ActorNode).toBeTrue();
      expect(deserialiseNode(clazz.serialise()) instanceof ClassNode).toBeTrue();
      expect(deserialiseNode(diamond.serialise()) instanceof DiamondNode).toBeTrue();
      expect(deserialiseNode(ellipse.serialise()) instanceof EllipseNode).toBeTrue();
      expect(deserialiseNode(fork.serialise()) instanceof ForkRejoinNode).toBeTrue();
      expect(deserialiseNode(hourglass.serialise()) instanceof HourglassNode).toBeTrue();
      expect(deserialiseNode(rect.serialise()) instanceof RectangleNode).toBeTrue();
    });
  });
});
