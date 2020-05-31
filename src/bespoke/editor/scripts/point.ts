export class Point {
  constructor(private _x: number, private _y: number) {}

  //returns the "x" coordinate of the point
  public get x(): number {
    return this._x;
  }

  //returns the "y" coordinate of the point
  public get y(): number {
    return this._y;
  }

  //sets the "x" coordinate of the point
  public set x(newX: number) {
    this._x = newX;
  }

  //sets the "y" coordinate of the point
  public set y(newY: number) {
    this._y = newY;
  }
}

//takes two Points and returns the difference in their "x" coordinates
export function deltaX(a: Point, b: Point): number {
  const dx = a.x - b.x;
  return dx;
}

//takes two Points and returns the difference in their "y" coordinates
export function deltaY(a: Point, b: Point): number {
  const dy = a.y - b.y;
  return dy;
}

//takes two Points and returns the magnitude distance between them
export function distance(a: Point, b: Point): number {
  const dx = deltaX(a, b);
  const dy = deltaY(a, b);
  return Math.hypot(dx, dy);
}

//takes two Points and returns the angle in radians that they make measured counter-clockwise from the positive "x" cartesian axis
export function angleRad(a: Point, b: Point): number {
  const dx = deltaX(a, b);
  const dy = deltaY(a, b);
  const hyp = distance(a, b);
  const acos = Math.acos(dx / hyp);
  return dy >= 0 ? acos : 2 * Math.PI - acos;
}

//takes two Points and returns the angle in degrees that they make measured counter-clockwise from the positive "x" cartesian axis
export function angleDeg(a: Point, b: Point): number {
  const radAng = angleRad(a, b);
  return radAng * (180 / Math.PI);
}

//takes two Points and returns the Point where a projection would meet if Point "b" was extended along the "x" axis and Point "a" was extended to meet the extension of Point "b"
export function projectH(a: Point, b: Point): Point {
  const projX = b.x + deltaX(a, b);
  const projY = b.y;
  return new Point(projX, projY);
}

//takes two Points and returns the Point where a projection would meet if Point "b" was extended along the "y" axis and Point "a" was extended to meet the extension of Point "b"
export function projectV(a: Point, b: Point): Point {
  const projX = b.x;
  const projY = b.y + deltaY(a, b);
  return new Point(projX, projY);
}

//returns the Point that exists along the shortest path from Point "b" to Point "a" at the proportion specified from 0 to 1.
export function proportionPoint(a: Point, b: Point, proportion: number): Point {
  const propDx = deltaX(a, b) * proportion;
  const propDy = deltaY(a, b) * proportion;
  return new Point(propDx, propDy);
}

//returns the Point that exists at the midpoint of Point "a" and Point "b"
export function midPoint(a: Point, b: Point): Point {
  return proportionPoint(a, b, 0.5);
}

//returns the Point that is Point "a" offset on the x axis by "offsetX" and on the y axis by "offsetY"
export function offsetPoint(a: Point, offsetX: number, offsetY: number): Point {
  const newX = a.x + offsetX;
  const newY = a.y + offsetY;
  return new Point(newX, newY);
}

//returns a Point that is the result of multiplying the "x" and "y" coordinates of Point "a" by the specified "factor"
export function multiplyPoint(a: Point, factor: number): Point {
  const newX = a.x * factor;
  const newY = a.y * factor;
  return new Point(newX, newY);
}

//returns a Point that is the result of dividing the "x" and "y" coordinates of Point "a" by the specified "divisor"
export function dividePoint(a: Point, divisor: number): Point {
  if (divisor === 0) return new Point(Infinity, Infinity);
  const newX = a.x / divisor;
  const newY = a.y / divisor;
  return new Point(newX, newY);
}
