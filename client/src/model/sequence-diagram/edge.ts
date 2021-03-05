import {Lifeline} from "./lifeline";

export class Edge {
  public start: Lifeline;
  public end: Lifeline;

  public sequenceNumber: number;
  public text: string;

  public isCreate: boolean;
  public isDestroy: boolean;
  public isResponse: boolean;

  constructor(start: Lifeline, end: Lifeline, sequenceNumber: number, text: string, isCreate: boolean = false,
              isDestroy: boolean = false, isResponse: boolean = false) {
    this.start = start;
    this.end = end;
    this.sequenceNumber = sequenceNumber;
    this.text = text;
    this.isCreate = isCreate;
    this.isDestroy = isDestroy;
    this.isResponse = isResponse;
  }
}
