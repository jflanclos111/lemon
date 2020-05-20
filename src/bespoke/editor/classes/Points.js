export class Points {
  constructor(x, y) {
    //x coordinate
    this.x = x;
    //y coordinate
    this.y = y;
  }

  //TODO: error handling on all functions

  //takes two Points and returns the difference in their "x" coordinates
  static deltaX(a, b) {
    const dx = a.x - b.x;
    return dx;
  }

  //takes two Points and returns the difference in their "y" coordinates
  static deltaY(a, b) {
    const dy = a.y - b.y;
    return dy;
  }

  //takes two Points and returns the magnitude distance between them
  static distance(a, b) {
    const dx = this.deltaX(a, b);
    const dy = this.deltaY(a, b);
    return Math.hypot(dx, dy);
  }

  //takes two Points and returns the angle in radians that they make measured counter-clockwise from the positive "x" cartesian axis
  static angleRad(a, b) {
    const dx = this.deltaX(a, b);
    const dy = this.deltaY(a, b);
    const hyp = this.distance(a, b);
    const acos = Math.acos(dx / hyp);
    return dy >= 0 ? acos : 2 * Math.PI - acos;
  }

  //takes two Points and returns the angle in degrees that they make measured counter-clockwise from the positive "x" cartesian axis
  static angleDeg(a, b) {
    const radAng = this.angleRad(a, b);
    return radAng * (180 / Math.PI);
  }

  //creates a Point at the "x" and "y" coordinates passed as parameters
  static createPoint(x, y) {
    return new Points(x, y);
  }

  //takes two Points and returns the Point where a projection would meet if Point "b" was extended along the "x" axis and Point "a" was extended to meet the extension of Point "b"
  static projectH(a, b) {
    const projX = b.x + this.deltaX(a, b);
    const projY = b.y;
    return new Points(projX, projY);
  }

  //takes two Points and returns the Point where a projection would meet if Point "b" was extended along the "y" axis and Point "a" was extended to meet the extension of Point "b"
  static projectV(a, b) {
    const projX = b.x;
    const projY = b.y + this.deltaY(a, b);
    return new Points(projX, projY);
  }

  //returns the Point that exists along the shortest path from Point "b" to Point "a" at the proportion specified from 0 to 1.
  static proportionPoint(a, b, proportion) {
    const propDx = this.deltaX * proportion;
    const propDy = this.deltaY * proportion;
    return new Points(propDx, propDy);
  }

  //returns the Point that exists at the midpoint of Point "a" and Point "b"
  static midPoint(a, b) {
    return this.proportionPoint(a, b, 0.5);
  }

  //returns the Point that is Point "a" offset on the x axis by "offsetX" and on the y axis by "offsetY"
  static offsetPoint(a, offsetX, offsetY) {
    const newX = a.x + offsetX;
    const newY = a.y + offsetY;
    return new Points(newX, newY);
  }
}
