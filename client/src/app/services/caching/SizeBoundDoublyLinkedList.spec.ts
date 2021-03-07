import {SizeBoundDoublyLinkedList} from "./SizeBoundDoublyLinkedList";

describe('SizeBoundDoublyLinkedList ', () => {
  let list: SizeBoundDoublyLinkedList<number>;
  const MAX_SIZE = 5;

  beforeEach(() => {
    list = new SizeBoundDoublyLinkedList<number>(MAX_SIZE, 0);
  });

  it('should start at size 1', function () {
    expect(list.size).toEqual(1);
  });

  describe('when adding more than MAX_SIZE ', () => {
    const LAST_ADDED = 100;

    beforeEach(() => {
      for (let i = 1; i <= LAST_ADDED; i++) {
        list.add(i);
      }
    });

    it('its size should never exceed the MAX_SIZE', function () {
      expect(list.size).toEqual(MAX_SIZE);
    });

    it('current should be the last value', function () {
      expect(list.getCurrentValue()).toEqual(LAST_ADDED);
    });

    it('should undo to the last MAX-1 values', function () {
      for (let expected = LAST_ADDED - 1; expected !== LAST_ADDED - MAX_SIZE; expected--) {
        expect(list.undo()).toEqual(expected);
      }

      expect(list.undo()).toBeNull();
    });

    it('should MAX-1 redo\'s', function () {
      for (let i = 0; i <= 4; i++) {
        list.undo();
      }
      expect(list.getCurrentValue()).toEqual((LAST_ADDED - MAX_SIZE) + 1)
      for (let expected = (LAST_ADDED - MAX_SIZE) + 2; expected !== LAST_ADDED; expected++) {
        expect(list.redo()).toEqual(expected);
      }
    });

    it('should correctly recompute the size if an action is added while not at the end of list', () => {
      list.undo();
      list.undo();
      list.undo();
      list.add(100);
      expect(list.size).toEqual(MAX_SIZE - 3 + 1)

    });
  });
});
