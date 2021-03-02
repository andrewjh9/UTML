import {ClassNode} from "../node/class-node";
import {Position} from "../position";
import {Diagram} from "../diagram";

const person = new ClassNode(250, 100, new Position(30 ,30));
person.text = 'Person \\n age: number \\n name: string';
person.firstLine = 0;

const pet = new ClassNode(250, 100, new Position(500, 30));
pet.text = 'Pet \\n age: number \\n type: string';
pet.firstLine = 0;

export const cd: Diagram = {nodes: [person, pet], edges: []};
