import { Position } from './position';

export enum Shape {
    Rectangle,
    Circle,
    Diamond
}

export enum EdgeStyle {
    Filled,
    Dotted,
    Dashed
}

export enum ArrowStyle {
    None,
    Start,
    End,
    StartEnd
}

export interface Node {
    texts: string[];
    width: number;
    height: number;
    position: Position;
    shape: Shape;
}

export interface Edge {
    startNode?: Node;
    endNode?: Node;
    startPosition: Position;
    endPosition: Position;
    points: Position[];
    label?: string;
    arrowStyle: ArrowStyle;
    edgeStyle: EdgeStyle;
}

export interface Diagram {
    nodes: Node[];
    edges: Edge[];
}
