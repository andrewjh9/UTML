import {TestBed} from "@angular/core/testing";
import {SelectionService} from "./selection.service";
import {RectangleNode} from "../../model/node/rectangle-node";
import {Node} from "../../model/node/node";
import {Edge} from "../../model/edge/edge";
import {Label} from "../../model/edge/label";
import {Position} from "../../model/position";

describe('SelectionService ', () => {
  let service: SelectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  let node: Node;
  let edge: Edge;
  let label: Label;
  let selectedList: Array<Node | Edge | Label>;

  beforeEach(() => {
    node = new RectangleNode(100, 100, Position.zero());
    edge = new Edge(Position.zero(), new Position(100, 100));
    edge.addMiddleLabel();
    label = edge.middleLabel!;
    selectedList = [];
    service.selectedObservable.subscribe(l => {
      selectedList = l;
    });
  })

  it('should allow you to select multiple elements by calling add and update each time', function () {
    service.add(node);
    service.add(edge);
    service.add(label);
    expect(selectedList.length).toEqual(3);
    [node, edge, label].forEach(x => expect(selectedList.includes(x)).toBeTrue())
  });

  it('should have nothing selected after deselect', function () {
    service.add(node);
    service.add(edge);
    service.add(label);
    service.deselect();
    expect(selectedList).toEqual([]);
  });

  it('should deselect existing selection when set is called', function () {
    service.add(node);
    service.add(edge);
    service.set(label);
    expect(selectedList).toEqual([label]);
  });

  describe('isNode and getNode ', () => {
    it('should return false if empty', function () {
      service.deselect();
      expect(service.isNode()).toBeFalse();

      try {
        service.getNode();
        fail();
      } catch (e) {
        expect(true).toBeTrue()
      }
    });

    it('should return false if two nodes', function () {
      service.deselect();
      service.add(node);
      service.add(new RectangleNode(200, 200, Position.zero()))
      expect(service.isNode()).toBeFalse();
      try {
        service.getNode();
        fail();
      } catch (e) {
        expect(true).toBeTrue()
      }
    });

    it('should return true if one node', function () {
      service.deselect();
      service.add(node);
      expect(service.isNode()).toBeTrue();
      try {
        expect(service.getNode()).toEqual(node);
        expect(true).toBeTrue()
      } catch (e) {
        fail();
      }
    });
  })
})
