import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  Input,
  ViewChild
} from '@angular/core';
import {Node} from "../../../model/node/node";
import {RectangleNode} from "../../../model/node/rectangle-node";
import {ClassNode} from "../../../model/node/class-node";
import {EllipseNode} from "../../../model/node/ellipse-node";
import {DiamondNode} from "../../../model/node/diamond-node";
import {HourglassNode} from "../../../model/node/hourglass-node";
import {ActorNode} from "../../../model/node/actor-node";
import {SwimlaneNode} from "../../../model/node/swimlane-node";
import {SystemBoundaryNode} from "../../../model/node/system-boundary-node";
import {INSPECT_CUSTOM} from "ts-node";
import {SystemClockNode} from "../../../model/node/system-clock-node";
import {CrossNode} from "../../../model/node/cross-node";
import {SequenceControlFlowNode} from "../../../model/node/sequence-control-flow-node";
import {CommentNode} from "../../../model/node/comment-node";
import {RectangleNodeRenderComponent} from "../rectangle-node/rectangle-node-render.component";
import {TempComponent} from "../../temp/temp.component";

@Component({
  selector: '[node-render-dispatch]',
  templateUrl: './node-render-dispatch.component.html',
  styleUrls: ['./node-render-dispatch.component.scss']
})
export class NodeRenderDispatchComponent implements AfterViewInit {
  @Input() node!: Node
  @ViewChild('containerElement') containerElement!: ElementRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appRef: ApplicationRef,
              private injector: Injector) {
  }

  ngAfterViewInit(): void {
    // 1. Create a component reference from the component
    // const componentRef = this.componentFactoryResolver
    //   .resolveComponentFactory(RectangleNodeRenderComponent)
    //   .create(this.injector);

    // const factory = this.componentFactoryResolver.resolveComponentFactory(RectangleNodeRenderComponent);
    const factory = this.componentFactoryResolver.resolveComponentFactory(TempComponent);

    const componentRef = factory.create(this.injector);
    // componentRef.instance.node = <RectangleNode> this.node;
    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    // 4. Append DOM element to the body
    this.containerElement.nativeElement.appendChild(domElem);
    // document.body.appendChild(domElem);
    // 5. Wait some time and remove it from the component tree and from the DOM
    // setTimeout(() => {
    //   this.appRef.detachView(componentRef.hostView);
    //   componentRef.destroy();
    // }, 3000);
  }

  isRectangle(node: Node): boolean {
    return node instanceof RectangleNode && !(node instanceof ClassNode) && !(node instanceof HourglassNode)
      && !(node instanceof ActorNode) && !(node instanceof SwimlaneNode) && !(node instanceof SystemBoundaryNode)
      && !(node instanceof SystemClockNode) && !(node instanceof CrossNode) && !(node instanceof SequenceControlFlowNode)
      && !(node instanceof CommentNode);
  }

  castToRectangle(node: Node): RectangleNode {
    return <RectangleNode>node;
  }

  castToEllipse(node: Node): EllipseNode {
    return <EllipseNode>node;
  }

  isEllipse(node: Node): boolean {
    return node instanceof EllipseNode;
  }

  castToDiamond(node: Node): DiamondNode {
    return <DiamondNode>node;
  }

  isDiamond(node: Node): boolean {
    return node instanceof DiamondNode;
  }

  isClass(node: Node): boolean {
    return node instanceof ClassNode;
  }

  castToClass(node: Node): ClassNode {
    return <ClassNode>node;
  }

  isHourglass(node: Node): boolean {
    return node instanceof HourglassNode;
  }

  castToHourglass(node: Node): HourglassNode {
    return <HourglassNode>node;
  }

  isActor(node: Node): boolean {
    return node instanceof ActorNode;
  }


  castToActor(node: Node): ActorNode {
    return <ActorNode>node;
  }

  isSwimlane(node: Node) {
    return node instanceof SwimlaneNode;
  }

  castToSwimlane(node: Node) {
    return <SwimlaneNode>node;
  }

  isSystemBoundary(node: Node) {
    return node instanceof SystemBoundaryNode
  }

  castToSystemBoundary(node: Node) {
    return <SystemBoundaryNode>node;
  }

  isSystemClock(node: Node) {
    return node instanceof SystemClockNode;
  }

  castToSystemClockNode(node: Node) {
    return <SystemClockNode>node;
  }

  isCross(node: Node) {
    return node instanceof CrossNode;
  }

  castToCrossNode(node: Node) {
    return <CrossNode> node;
  }

  isSequenceControlFlowNode(node: Node) {
    return node instanceof SequenceControlFlowNode;
  }

  castToSequenceControlFlowNode(node: Node) {
    return <SequenceControlFlowNode> node;
  }

  isComment(node: Node) {
    return node instanceof CommentNode;
  }

  castToCommentNode(node: Node) {
    return <CommentNode> node;
  }
}
