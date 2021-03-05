import {SequenceEdge} from "./sequenceEdge";
import {Lifeline} from "./lifeline";

export class SequenceDiagram {
  public edges: SequenceEdge[];
  public lifelines: Lifeline[];

  constructor() {
    let actor1 = new Lifeline(0, "Actor 1");
    let actor2 = new Lifeline(1, "Actor 2");
    let actor3 = new Lifeline(2, "Actor 3");

    let e0 = new SequenceEdge(actor1, actor2, 0, 'msg0');
    let e1 = new SequenceEdge(actor2, actor3, 1, 'msg1', false, false, true);
    let e2 = new SequenceEdge(actor3, actor2, 2, 'msg2', false, false, true);
    let e3 = new SequenceEdge(actor2, actor1, 3, 'msg3', false, false, true);


    this.edges = [e0, e1, e2, e3];
    this.lifelines = [actor1, actor2, actor3];
    this.setConnections();
  }

  setConnections() {
    for (let lifeline of this.lifelines) {
      let connections = [95];
      for (let edge of this.edges) {
        if (edge.start === lifeline || edge.end === lifeline) {
          connections.push(150 + edge.sequenceNumber * 25);
        }
      }
      connections.push(500);
      lifeline.connections = connections;
      console.log(lifeline.connections);
    }
  }
}
