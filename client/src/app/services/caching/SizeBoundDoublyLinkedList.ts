/**
 * Doubly linked list designed to be used for undo/redo functionality.
 * The size is limited by a certain amount.
 * If adding another node would exceed this amount, the first node in the list is removed.
 */
export class SizeBoundDoublyLinkedList<T> {
  public readonly MAX_SIZE;
  private _size: number;

  private current: Node<T>;
  private first: Node<T>;
  private last: Node<T>

  public get size(): number {
    return this._size;
  }

  constructor(maxSize: number, initialElement: T) {
    this.MAX_SIZE = maxSize;
    this._size = 1;

    this.current = new Node<T>(initialElement);
    this.first = this.current;
    this.last = this.current;
  }

  /**
   * Undo a certain action.
   * This means to set the new current state to state before the old current state.
   * If you are at the first element of the list, this is not possible and null is returned.
   * @returns The value of the node before the current node at the time of calling.
   *          null if at the beginning of the list.
   */
  public undo(): T | null {
    if (this.current.prev === null) {
      return null;
    }

    this.current = this.current.prev;
    return this.current.value;
  }

  /**
   * Redo a certain action.
   * This means to set the new current state to state after the old current state.
   * If you are at the last element of the list, this is not possible and null is returned.
   * @returns The value of the node after the current node at the time of calling.
   *          null if at the end of the list.
   */
  public redo(): T | null {
    if (this.current.next === null) {
      return null;
    }

    this.current = this.current.next;
    return this.current.value;
  }

  public add(value: T) {
    // Update size.
    // If it exceeds the max_size the start of the tree must be pruned.
    // If not at the end of the tree, the end of the tree must be pruned.
    if (this.current === this.last) {
      this._size++;

      if (this._size > this.MAX_SIZE) {
        this.first = <Node<T>> this.first.next;
        this.first.prev = null;
        this._size--;
      }
    } else {
      // Start at 2 to count start and the new node yet to be added.
      let newSize = 2;
      let temp: Node<T> = this.first;
      while (temp !== this.current) {
        newSize++;
        temp = <Node<T>> temp.next;
      }
      this._size = newSize;
    }

    let newNode = new Node(value, this.current);
    this.current.next = newNode;
    newNode.prev = this.current;
    this.current = newNode;
    this.last = this.current;
  }

  public getCurrentValue(): T {
    return this.current.value;
  }

  // Todo: Implement an couple these to buttons
  // public canUndo(): boolean {
  //   return this.current.prev !== null;
  // }
  //
  // public canRedo(): boolean {
  //   return this.current.next !== null;
  // }
}

class Node<T> {
  public value: T;
  public prev: Node<T> | null = null;
  public next: Node<T> | null = null;

  constructor(value: T, prev: Node<T> | null = null) {
    this.value = value;
    this.prev = prev;
  }
}
