export class Point {
  private x: number;
  private y: number;

  constructor(x: number, y: number) {
    //x coordinate
    this.x = x;
    //y coordinate
    this.y = y;
  }

  //returns the "x" coordinate of the point
  public getX(): number {
    return this.x;
  }

  //returns the "y" coordinate of the point
  public getY(): number {
    return this.y;
  }

  //sets the "x" coordinate of the point
  public setX(x: number): void {
    if (x !== this.x) this.x = x;
    return;
  }

  //sets the "y" coordinate of the point
  public setY(y: number): void {
    if (y !== this.y) this.y = y;
    return;
  }

  //sets both the "x" and the "y" coordinates of the point
  public setXY(x: number, y: number): void {
    this.setX(x);
    this.setY(y);
    return;
  }
}

//takes two Points and returns the difference in their "x" coordinates
export function deltaX(a: Point, b: Point): number {
  const dx = a.getX() - b.getX();
  return dx;
}

//takes two Points and returns the difference in their "y" coordinates
export function deltaY(a: Point, b: Point): number {
  const dy = a.getY() - b.getY();
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
  const projX = b.getX() + deltaX(a, b);
  const projY = b.getY();
  return new Point(projX, projY);
}

//takes two Points and returns the Point where a projection would meet if Point "b" was extended along the "y" axis and Point "a" was extended to meet the extension of Point "b"
export function projectV(a: Point, b: Point): Point {
  const projX = b.getX();
  const projY = b.getY() + deltaY(a, b);
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
  const newX = a.getX() + offsetX;
  const newY = a.getY() + offsetY;
  return new Point(newX, newY);
}

//returns a Point that is the result of multiplying the "x" and "y" coordinates of Point "a" by the specified "factor"
export function multiplyPoint(a: Point, factor: number): Point {
  const newX = a.getX() * factor;
  const newY = a.getY() * factor;
  return new Point(newX, newY);
}

//returns a Point that is the result of dividing the "x" and "y" coordinates of Point "a" by the specified "divisor"
export function dividePoint(a: Point, divisor: number): Point {
  if (divisor === 0) return new Point(Infinity, Infinity);
  const newX = a.getX() / divisor;
  const newY = a.getY() / divisor;
  return new Point(newX, newY);
}
