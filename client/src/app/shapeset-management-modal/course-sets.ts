import {CourseSet, ShapeSet} from "./shapeset-management-modal.component";
import {ClassNode} from "../../model/node/class-node";
import {Position} from "../../model/position";
import {Edge, EndStyle, LineStyle, LineType} from "../../model/edge";
import {RectangleNode} from "../../model/node/rectangle-node";
import {HourglassNode} from "../../model/node/hourglass-node";
import {ActorNode} from "../../model/node/actor-node";
import {ForkRejoinNode} from "../../model/node/fork-rejoin-node";
import {EllipseNode} from "../../model/node/ellipse-node";

export function flattenActive(courseSets: {[key: string]: CourseSet}) {
  let result: CourseSet = {};

  for (let [_, courseSet] of Object.entries(courseSets)) {
    for (let [name, shapeSet] of Object.entries(courseSet)) {
      if (shapeSet.active) {
        result[name] = shapeSet
      }
    }
  }

  return result;
}

let cd: ShapeSet = {nodes: {}, edges: {}, active: true};
let classNode = new ClassNode(186, 75, new Position(10, 2));
let association = new Edge(new Position(10, 20), new Position(196, 20));
let generalisation = new Edge(new Position(10, 20), new Position(196, 20));
generalisation.endStyle = EndStyle.LargeUnfilledArrow;
let associationClassEdge = new Edge(new Position(10, 20), new Position(196, 20));
associationClassEdge.lineStyle = LineStyle.Dotted;
classNode.text = 'ClassName  \\n fieldName: type';
classNode.text = 'ClassName  \\n fieldName: type';

cd.nodes['Class'] = classNode;
cd.edges['Association'] = association;
cd.edges['Generalisation'] = generalisation;
cd.edges['Dotted Assocation'] = associationClassEdge;


let ad: ShapeSet = {nodes: {}, edges: {}, active: true};
let activityNode = new RectangleNode(186, 50, new Position(10, 2));
activityNode.text = "Do Something"
let arrow = new Edge(new Position(10, 20), new Position(196, 20));
arrow.endStyle = EndStyle.SmallFilledArrow;


ad.edges['Arrow'] = arrow;
ad.nodes['Activity'] = activityNode;
ad.nodes['Hourglass'] = new HourglassNode(40, 80, new Position(84, 10));
ad.nodes['Actor'] = new ActorNode(40, 80, new Position(84, 10));
ad.nodes['Fork/Rejoin'] = new ForkRejoinNode(200, 20, new Position(8, 0));

let state = new EllipseNode(100, 100, new Position(58, 2));
state.text = "s_0";
let endState = new EllipseNode(100, 100, new Position(58, 2));
endState.text = "s_end";
endState.hasDoubleBorder = true;
let arc = new Edge( new Position(10, 5), new Position( 196, 5));
arc.lineType = LineType.Arc;
arc.endStyle = EndStyle.SmallFilledArrow;
arc.middlePositions.push(new Position(103, 35));
let fsm: ShapeSet = {nodes: {}, edges: {}, active: true};
fsm.nodes['State'] = state;
fsm.nodes['End State'] = endState;
fsm.edges['Arrow'] = arrow;
fsm.edges['Arc'] = arc;

export let courseSets: {[key: string]: CourseSet};
let design: CourseSet = {
  'Activity Diagram': ad,
  'Class Diagram': cd
}
let lm: CourseSet = {
  'FSM': fsm
}
courseSets = {
  'Design': design,
  'Languages & Machines': lm
};
