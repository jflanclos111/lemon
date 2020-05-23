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
  const dx: number = a.getX() - b.getX();
  return dx;
}

//takes two Points and returns the difference in their "y" coordinates
export function deltaY(a: Point, b: Point): number {
  const dy: number = a.getY() - b.getY();
  return dy;
}

//takes two Points and returns the magnitude distance between them
export function distance(a: Point, b: Point): number {
  const dx: number = deltaX(a, b);
  const dy: number = deltaY(a, b);
  return Math.hypot(dx, dy);
}

//takes two Points and returns the angle in radians that they make measured counter-clockwise from the positive "x" cartesian axis
export function angleRad(a: Point, b: Point): number {
  const dx: number = deltaX(a, b);
  const dy: number = deltaY(a, b);
  const hyp: number = distance(a, b);
  const acos: number = Math.acos(dx / hyp);
  return dy >= 0 ? acos : 2 * Math.PI - acos;
}

//takes two Points and returns the angle in degrees that they make measured counter-clockwise from the positive "x" cartesian axis
export function angleDeg(a: Point, b: Point): number {
  const radAng: number = angleRad(a, b);
  return radAng * (180 / Math.PI);
}

//creates a Point at the "x" and "y" coordinates passed as parameters
export function createPoint(x: number, y: number): Point {
  return new Point(x, y);
}

//takes two Points and returns the Point where a projection would meet if Point "b" was extended along the "x" axis and Point "a" was extended to meet the extension of Point "b"
export function projectH(a: Point, b: Point) {
  const projX: number = b.getX() + deltaX(a, b);
  const projY: number = b.getY();
  return new Point(projX, projY);
}

//takes two Points and returns the Point where a projection would meet if Point "b" was extended along the "y" axis and Point "a" was extended to meet the extension of Point "b"
export function projectV(a: Point, b: Point) {
  const projX: number = b.getX();
  const projY: number = b.getY() + deltaY(a, b);
  return new Point(projX, projY);
}

//returns the Point that exists along the shortest path from Point "b" to Point "a" at the proportion specified from 0 to 1.
export function proportionPoint(a: Point, b: Point, proportion: number) {
  const propDx: number = deltaX(a, b) * proportion;
  const propDy: number = deltaY(a, b) * proportion;
  return new Point(propDx, propDy);
}

//returns the Point that exists at the midpoint of Point "a" and Point "b"
export function midPoint(a: Point, b: Point) {
  return proportionPoint(a, b, 0.5);
}

//returns the Point that is Point "a" offset on the x axis by "offsetX" and on the y axis by "offsetY"
export function offsetPoint(a: Point, offsetX: number, offsetY: number) {
  const newX = a.getX() + offsetX;
  const newY = a.getY() + offsetY;
  return new Point(newX, newY);
}
