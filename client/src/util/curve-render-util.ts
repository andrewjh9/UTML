import {Position} from '../model/position';

export function computeSVGArcString(start: Position, middle: Position, end: Position): string {
  let A: number = Position.getDistance(end, middle);
  let B: number = Position.getDistance(middle, start);
  let C: number = Position.getDistance(start, end);

  let angle: number = Math.acos((A * A + B * B - C * C) / (2 * A * B));

  //calc radius of circle
  let K: number = .5 * A * B * Math.sin(angle);
  let r: number = A * B * C / 4 / K;
  r = Math.round(r * 1000) / 1000;

  //large arc flag
  let laf: number = +(Math.PI / 2 > angle);

  //sweep flag
  let saf: number = +((end.x - start.x) * (middle.y - start.y) - (end.y - start.y) * (middle.x - start.x) < 0);

  return ['M', start.x, start.y, 'A', r, r, 0, laf, saf, end.x, end.y].join(' ');
}

export function computeCubicCurve(start: Position, control: Position, end: Position) {
  return `C ${start.x} ${start.y}, ${control.x} ${control.y}, ${end.x} ${end.y}`
}
