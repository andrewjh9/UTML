import {EventEmitter} from "@angular/core";

class SharedValue<T> {
  private value: T;
  private valueChange: EventEmitter<T> = new EventEmitter<T>();

  private emit(): void {
    this.valueChange.emit(this.value);
  }

  constructor(value: T) {
    this.value = value;
    this.emit();
  }

  public get(): T {
    return this.value;
  }

  public set(value: T): void {
    this.value = value;
    this.emit();
  }

  public getEmitter(): EventEmitter<T> {
    return this.valueChange;
  }
}
