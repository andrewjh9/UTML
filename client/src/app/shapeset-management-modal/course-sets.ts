import {CourseSet, ShapeSet} from "./shapeset-management-modal.component";
import {ClassNode} from "../../model/node/class-node";
import {Position} from "../../model/position";
import {Edge, EndStyle, LineStyle, LineType} from "../../model/edge";
import {RectangleNode} from "../../model/node/rectangle-node";
import {HourglassNode} from "../../model/node/hourglass-node";
import {ActorNode} from "../../model/node/actor-node";
import {ForkRejoinNode} from "../../model/node/fork-rejoin-node";
import {EllipseNode} from "../../model/node/ellipse-node";
import {DiamondNode} from "../../model/node/diamond-node";
import {SwimlaneNode} from "../../model/node/swimlane-node";
import {SystemBoundaryNode} from "../../model/node/system-boundary-node";
import {SystemClockNode} from "../../model/node/system-clock-node";
import {CrossNode} from "../../model/node/cross-node";
import {ExecutionNode} from "../../model/node/execution-node";
import {SequenceControlFlowNode} from "../../model/node/sequence-control-flow-node";

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

let dashed = new Edge(new Position(10, 5), new Position( 196, 5));
dashed.lineStyle = LineStyle.Dashed;

let cd: ShapeSet = {nodes: {}, edges: {}, active: true};
let classNode = new ClassNode(186, 75, new Position(10, 2));
let association = new Edge(new Position(10, 20), new Position(196, 20));
let generalisation = new Edge(new Position(10, 20), new Position(196, 20));
generalisation.endStyle = EndStyle.LargeUnfilledArrow;
let associationClassEdge = new Edge(new Position(10, 20), new Position(196, 20));
associationClassEdge.lineStyle = LineStyle.Dotted;
classNode.text = 'ClassName  \\n fieldName: type';
classNode.text = 'ClassName  \\n fieldName: type';
let aggregation = new Edge(new Position(10, 20), new Position(196, 20));
aggregation.endStyle = EndStyle.UnfilledDiamond;
let composition = new Edge(new Position(10, 20), new Position(196, 20));
composition.endStyle = EndStyle.FilledDiamond;

cd.nodes['Class'] = classNode;
cd.edges['Association'] = association;
cd.edges['Generalisation'] = generalisation;
cd.edges['Dotted Assocation'] = associationClassEdge;
cd.edges['Aggregation'] = aggregation;
cd.edges['Composition'] = composition;


let ad: ShapeSet = {nodes: {}, edges: {}, active: true};
let activityNode = new RectangleNode(186, 50, new Position(10, 2));
activityNode.text = "Do Something";
let arrow = new Edge(new Position(10, 20), new Position(196, 20));
arrow.endStyle = EndStyle.SmallFilledArrow;
let endStateActivity = new EllipseNode(40, 40, new Position(84,30));
endStateActivity.styleObject = {
  'fill': 'black',
  'stroke': 'black',
  'stroke-width': 2,
  'fill-opacity': 1,
  'stroke-opacity': 0.75,
};
endStateActivity.hasDoubleBorder = true;
let startState = new EllipseNode(40, 40, new Position(84,30));
startState.styleObject = {
  'fill': 'black',
  'stroke': 'black',
  'stroke-width': 2,
  'fill-opacity': 1,
  'stroke-opacity': 0.75,
};
let swimlane = new SwimlaneNode(60, 120, new Position(64,4));
swimlane.text = "Actor";

ad.edges['Arrow'] = arrow;
ad.nodes['Activity'] = activityNode;
ad.nodes['Hourglass'] = new HourglassNode(40, 80, new Position(84, 10));
ad.nodes['Fork/Rejoin'] = new ForkRejoinNode(200, 20, new Position(8, 0));
ad.nodes['Merge'] = new DiamondNode(40, 40, new Position(84, 30));
ad.nodes['Start'] = startState;
ad.nodes['End'] = endStateActivity;
ad.nodes['Swimlane'] = swimlane;

let smd: ShapeSet = {nodes: {}, edges: {}, active: true};
smd.nodes['State'] = activityNode;
smd.edges['Arrow'] = arrow;
smd.nodes['Fork/Rejoin'] = new ForkRejoinNode(200, 20, new Position(8, 0));
smd.nodes['Start'] = startState;
smd.nodes['End'] = endStateActivity;
smd.nodes['Compound State'] = new SystemBoundaryNode(186, 110, new Position(4,4));;
smd.edges['Dashed'] = dashed;

let ucd: ShapeSet = {nodes: {}, edges: {}, active: true};
let include = arrow.getDeepCopy();
include.lineStyle = LineStyle.Dashed;
include.addMiddleLabel('<<include>>')
let extend = include.getDeepCopy();
extend.middleLabel!.value = ' <<extend>>'

ucd.edges['Include'] = include;
ucd.edges['Extend'] = extend;
ucd.edges['Link'] = association;
ucd.nodes['Actor'] = new ActorNode(40, 80, new Position(84, 10));
ucd.edges['Generalisation'] = generalisation;
let uc = new EllipseNode(186, 75, new Position(10, 2));
uc.text = 'Use Case';
ucd.nodes['Use case'] = uc;
let systemboundary = new SystemBoundaryNode(186, 110, new Position(4,4));
systemboundary.text = "Your system";
ucd.nodes['System Boundary'] = systemboundary;
ucd.nodes['System Clock'] = new SystemClockNode(100, 100, new Position(52, 2));

let state = new EllipseNode(100, 100, new Position(58, 2));
state.text = "s_0";
let endState = new EllipseNode(100, 100, new Position(58, 2));
endState.text = "s_end";
endState.hasDoubleBorder = true;
let arc = new Edge( new Position(10, 5), new Position( 196, 5));
arc.lineType = LineType.Arc;
arc.endStyle = EndStyle.SmallFilledArrow;
arc.middlePositions.push(new Position(103, 35));

let sequence: ShapeSet = {nodes: {}, edges: {}, active: true};
let msg = new Edge(new Position(10, 5), new Position( 196, 5));
msg.endStyle = EndStyle.SmallFilledArrow;
let resp = msg.getDeepCopy();
resp.lineStyle = LineStyle.Dashed;

sequence.edges['Message'] = msg;
sequence.edges['Response'] = resp;
sequence.edges['Dashed'] = dashed;
let lifeline = new RectangleNode(140, 40, new Position(38, 2));
let cross = new CrossNode(60, 60, new Position(78, 2));
lifeline.text = 'Classifier'
let execution = new ExecutionNode(40, 100, new Position(78, 2));
sequence.nodes['Actor'] = new ActorNode(40, 80, new Position(98, 5));
sequence.nodes['Lifeline'] = lifeline;
sequence.nodes['Execution'] = execution;
sequence.nodes['Destruction'] = cross;
sequence.nodes['Opt'] = new SequenceControlFlowNode(100, 100, new Position(56, 2), 'Opt');
sequence.nodes['Loop'] = new SequenceControlFlowNode(100, 100, new Position(56, 2), 'Loop');
sequence.nodes['Alt'] = new SequenceControlFlowNode(100, 100, new Position(56, 2), 'Alt');

let fsm: ShapeSet = {nodes: {}, edges: {}, active: true};
fsm.nodes['State'] = state;
fsm.nodes['End State'] = endState;
fsm.edges['Arrow'] = arrow;
fsm.edges['Arc'] = arc;

let dt: ShapeSet = {nodes: {}, edges: {}, active: true};
dt.edges['Edge'] = association;
dt.nodes['Node'] = new RectangleNode(186, 75, new Position(10, 2));

let stack: ShapeSet = {nodes: {}, edges: {}, active: true};
stack.nodes['Stack layer'] = new RectangleNode(200, 50, new Position(8, 2));

let graphs: ShapeSet = {nodes: {}, edges: {}, active: true};
let undirectedEdge = new Edge(new Position(10, 20), new Position(196, 20));
let directedEdge = undirectedEdge .getDeepCopy();
directedEdge.endStyle = EndStyle.SmallFilledArrow;


graphs.edges['Undirected edge'] = undirectedEdge;
graphs.edges['Directed Edge'] = directedEdge;
graphs.edges['Arc'] = arc;
graphs.nodes['Square Node'] = new RectangleNode(186, 50, new Position(10, 2));
graphs.nodes['Ellipse Node'] = new EllipseNode(186, 50, new Position(10, 2));

let splitoff = new EllipseNode(20, 20, new Position(94, 30));
splitoff.styleObject = {
  'fill': 'black',
  'stroke': 'black',
  'stroke-width': 2,
  'fill-opacity': 1,
  'stroke-opacity': 0.75,
};
let embedded: ShapeSet = {nodes: {}, edges: {}, active: true};
embedded.edges['Arrow'] = arrow;
embedded.edges['Arc'] = arc;
embedded.nodes['Edge split off node'] = splitoff
embedded.nodes['Node'] = new RectangleNode(100, 120, new Position(54, 2));
embedded.nodes['Circular Node'] = new EllipseNode(100, 100, new Position(58, 2));

export let courseSets: {[key: string]: CourseSet};
let design: CourseSet = {
  'Activity Diagram': ad,
  'Class Diagram': cd,
  'Use Case Diagram': ucd,
  'Sequence Diagram': sequence,
  'State Machine Diagram': smd
};
let lm: CourseSet = {
  'Automata': fsm,
  'Derivation tree': dt
};
let es: CourseSet = {
  'Automata Extended': embedded
};
let cao: CourseSet = {
  'Stack': stack
};
let g: CourseSet = {
  'Graphs': graphs
};

courseSets = {
  'Design': design,
  'Languages & Machines': lm,
  'Embedded Systems': es,
  'Computer architecture and Organization': cao,
  'General Graphs': g
};
