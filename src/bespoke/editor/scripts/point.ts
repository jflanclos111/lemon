export class Point {
  /**
   * A point on a cartesian coordinate plane
   * @param _x the x coordinate
   * @param _y the y coordinate
   * @class
   */
  constructor(private _x: number, private _y: number) {}

  public get x(): number {
    return this._x;
  }

  public get y(): number {
    return this._y;
  }

  public set x(newX: number) {
    this._x = newX;
  }

  public set y(newY: number) {
    this._y = newY;
  }
}

/**
 * Returns the difference in the x coordinate between point a and point b
 * @param {Point} a point a
 * @param {Point} b point b
 * @returns {number} the difference between the x coordinate of point a and point b
 * @example
 * // demonstrates deltaX
 * const somePointA = new Point(0,0);
 * const somePointB = new Point (3,2);
 * deltaX(somePointA, somePointB); // returns -3
 */
export function deltaX(a: Point, b: Point): number {
  const dx = a.x - b.x;
  return dx;
}

/**
 * Returns the difference in the y coordinate between point a and point b
 * @param {Point} a point a
 * @param {Point} b point b
 * @returns {number} the difference between the y coordinate of point a and point b'
 * @example
 * // demonstrates deltaY
 * const somePointA = new Point(0,0);
 * const somePointB = new Point (3,2);
 * deltaY(somePointA, somePointB); // returns -2
 */
export function deltaY(a: Point, b: Point): number {
  const dy = a.y - b.y;
  return dy;
}

/**
 * Returns the magnitude of the distance between point a and point b
 * @param {Point} a point a
 * @param {Point} b point b
 * @returns {number} magnitude of the distance between point a and point b
 * @example
 * // demonstrates distance
 * const somePointA = new Point(0,0);
 * const somePointB = new Point (3,2);
 * distance(somePointA, somePointB); // returns 3.605551275
 */
export function distance(a: Point, b: Point): number {
  const dx = deltaX(a, b);
  const dy = deltaY(a, b);
  return Math.hypot(dx, dy);
}

/**
 * Returns the angle in radians that a line between points a and b make measured countered-clockwise from the positive x cartesian axis
 * @param {Point} a point a
 * @param {Point} b point b
 * @returns {number} angle in radians
 * @example
 * // demonstates angleRad
 * const somePointA = new Point(0,0);
 * const somePointB = new Point(3,2);
 * angleRad(somePointA, somePointB); // returns 3.729595257
 */
export function angleRad(a: Point, b: Point): number {
  const dx = deltaX(a, b);
  const dy = deltaY(a, b);
  const hyp = distance(a, b);
  const acos = Math.acos(dx / hyp);
  return dy >= 0 ? acos : 2 * Math.PI - acos;
}

/**
 * Returns the angle in degrees that a line between points a and b make measured countered-clockwise from the positive x cartesian axis
 * @param {Point} a point a
 * @param {Point} b point b
 * @returns {number} angle in degrees
 * @example
 * // demonstates angleDeg
 * const somePointA = new Point(0,0);
 * const somePointB = new Point(3,2);
 * angleDeg(somePointA, somePointB); // returns 213.6900675
 */
export function angleDeg(a: Point, b: Point): number {
  const radAng = angleRad(a, b);
  return radAng * (180 / Math.PI);
}

/**
 * Returns the point that is at the proportion along the shortest line between point a and point b with all points between a and b existing at proportions 0 through 1.
 * @param {Point} a point a
 * @param {Point} b point b
 * @param {number} proportion proportion of point between point a and b; points along continuous line between points a and b outside of the shortest distance line exist at proportions < 0 and > 1.
 * @returns {Point} point at the proportion specified between points a and b
 * @example
 * // demonstrates proportionPoint
 * const somePointA = new Point(0,0);
 * const somePointB = new Point(3,2);
 * proportionPoint(somePointA, somePointB, 0.75); // returns (2.25, 1.5)
 */
export function proportionPoint(a: Point, b: Point, proportion: number): Point {
  const propDx = a.x + deltaX(b, a) * proportion;
  const propDy = a.y + deltaY(b, a) * proportion;
  return new Point(propDx, propDy);
}

/**
 * Returns the point that is at the midpoint along the shortest line between point a and point b.
 * @param {Point} a point a
 * @param {Point} b point b
 * @returns {Point} point at the midpoint between points a and b
 * @example
 * // demonstrates midPoint
 * const somePointA = new Point(0,0);
 * const somePointB = new Point(3,2);
 * midPoint(somePointA, somePointB); // returns (1.5, 1)
 */
export function midPoint(a: Point, b: Point): Point {
  return proportionPoint(a, b, 0.5);
}

/**
 * Retuns the point that is the result of multiplying the x and y coordinates of point a by the specified factor.
 * @param {Point} a point a
 * @param {number} factor multiplication factor
 * @returns {Point} point resulting of multiplying the x and y coordinates of point a by the factor
 * @example
 * // demonstrates multiplyPoint
 * const somePointA = new Point(3, 2);
 * multiplyPoint(somePointA, 2); // returns (6, 4)
 */
export function multiplyPoint(a: Point, factor: number): Point {
  const newX = a.x * factor;
  const newY = a.y * factor;
  return new Point(newX, newY);
}

/**
 * Retuns the point that is the result of dividing the x and y coordinates of point a by the specified divisor.
 * @param {Point} a point a
 * @param {number} divisor divisor; if the divisor is 0, it is coalesced such that it doesn not equal 0
 * @returns {Point} point resulting of dividing the x and y coordinates of point a by the divisor
 * @example
 * // demonstrates dividePoint
 * const somePointA = new Point(3, 2);
 * dividePoint(somePointA, 2); // returns (1.5, 1)
 */
export function dividePoint(a: Point, divisor: number): Point {
  const divideBy = divisor === 0 ? divisor + Number.EPSILON : divisor;
  const newX = a.x / divideBy;
  const newY = a.y / divideBy;
  return new Point(newX, newY);
}
