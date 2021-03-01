import {ClassNode} from "../node/class-node";
import {Position} from "../position";
import {Diagram} from "../diagram";

const person = new ClassNode(250, 100, new Position(25 ,25));
person.text = 'Person \\n age: number \\n name: string';
person.firstLine = 0;

const pet = new ClassNode(250, 100, new Position(500, 25));
pet.text = 'Pet \\n age: number \\n type: string';
pet.firstLine = 0;

export const cd: Diagram = new Diagram([person, pet], []);
