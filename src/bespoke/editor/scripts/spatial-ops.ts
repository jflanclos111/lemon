import { Point, deltaX, deltaY, dividePoint } from "./point";
import { Mouse } from "./mouse";
import { setPrecision, clamp } from "./basic";

/**
 * Converts a set of coordinates on screen to coordinates in the world
 * @param {number} scale the current world scale
 * @param {Point} itemPositionOnScreen point representing the coordinates of the item on the screen
 * @param {Point} canvasWorldPosition the current position of the origin of the workspace in the world
 * @returns {Point} the converted point in world coordinates
 * @example
 * // demonstrates screenToWorld
 * const someScale = 2;
 * const someItemPositionOnScreen = new Point(1, 1);
 * const someCanvasWorldPosition = new Point(1, 1);
 * screenToWorld(someScale, someItemPositionOnScreen, someCanvasWorldPosition); returns (-0.5, -0.5)
 */
export function screenToWorld(scale: number, itemPositionOnScreen: Point, canvasWorldPosition: Point): Point {
  const transformedX = deltaX(dividePoint(itemPositionOnScreen, scale), canvasWorldPosition);
  const transformedY = deltaY(dividePoint(itemPositionOnScreen, scale), canvasWorldPosition);
  return new Point(transformedX, transformedY);
}

/**
 * Converts a set of coordinates in the world to coordinates on the screen
 * @param {number} scale the current world scale
 * @param {Point} itemPositionInWorld point representing the coordinates of the item in the world
 * @param {Point} canvasWorldPosition the current position of the origin of the workspace in the world
 * @returns {Point} the converted point in screen coordinates
 * @example
 * // demonstrates worldToScreen
 * const someScale = 2;
 * const someItemPositionInWorld = new Point(-0.5, -0.5);
 * const someCanvasWorldPosition = new Point(1, 1);
 * screenToWorld(someScale, someItemPositionInWorld, someCanvasWorldPosition); returns (1, 1)
 */
export function worldToScreen(scale: number, itemPositionInWorld: Point, canvasWorldPosition: Point): Point {
  const transformedX = setPrecision((itemPositionInWorld.x + canvasWorldPosition.x) * scale);
  const transformedY = setPrecision((itemPositionInWorld.y + canvasWorldPosition.y) * scale);
  return new Point(transformedX, transformedY);
}

/**
 * Returns a new scale based on the current state of the mouse object within the limits of the minimum and maximum scales.
 * @param {number} currentScale the current world scale
 * @param {number} scaleMin the minimum allowable scale
 * @param {number} scaleMax the maximum allowable scale
 * @param {number} scaleIncrement the amount that the scale will be incremented by
 * @param {Mouse} mouseState the current state of the Mouse object
 * @returns {number} updated scale
 * @example
 * // demonstrates getNewScale
 * const someCurrentScale = 1;
 * const someScaleMin = 0.5;
 * const someScaleMax = 2;
 * const someScaleIncrement = 0.1;
 * const someMouseState = new Mouse(ctx); // Mouse object with canvas context 2d (ctx) and scrollIn state true (not shown)
 * getNewScale(someCurrentScale, someScaleMin, someScaleMax, someScaleIncrement, someMouseState); // returns 1.1
 */
export function getNewScale(
  currentScale: number,
  scaleMin: number,
  scaleMax: number,
  scaleIncrement: number,
  mouseState: Mouse
): number {
  let increment = 0;
  if (mouseState.scrollIn.currentState || mouseState.scrollOut.currentState) {
    increment = mouseState.scrollIn.currentState ? scaleIncrement : -scaleIncrement;
  }
  return setPrecision(clamp(currentScale, increment, scaleMin, scaleMax), 2);
}

/**
 * Returns the new position of the world origin based on the current scale and mouse object state
 * @param {number} currentScale the current world scale
 * @param {Point} currentWorldPosition the current position of the origin of the workspace in the world
 * @param {Mouse} mouseState the current state of the Mouse object
 * @returns {Point} new world position
 * @example
 * //demonstrates getNewWorldPosition
 * const someCurrentScale = 1;
 * const someCurrentWorldPosition = new Point(0, 0);
 * const someMouseState = new Mouse(ctx) // Mouse object with canvas context 2d (ctx) and auxiliary click/drag state true having moved one pixel over to the left (not shown)
 * getNewWorldPosition(someCurrentScale, someCurrentWorldPosition, someMouseState); // returns (-1, 0)
 */
export function getNewWorldPosition(currentScale: number, currentWorldPosition: Point, mouseState: Mouse): Point {
  let newWorldX = currentWorldPosition.x;
  let newWorldY = currentWorldPosition.y;
  const panning = mouseState.drag.currentState && mouseState.auxiliaryButtonClick.currentState ? true : false;
  const zooming = mouseState.scrollIn.currentState || mouseState.scrollOut.currentState ? true : false;
  if (panning || zooming) {
    const dxPan = deltaX(mouseState.positionScreenCurrent, mouseState.positionScreenLast);
    const dyPan = deltaY(mouseState.positionScreenCurrent, mouseState.positionScreenLast);
    const mouseWorldPositionNext = screenToWorld(currentScale, mouseState.positionScreenCurrent, currentWorldPosition);
    const dxZoom = deltaX(mouseState.positionWorldCurrent, mouseWorldPositionNext);
    const dyZoom = deltaY(mouseState.positionWorldCurrent, mouseWorldPositionNext);
    newWorldX = currentWorldPosition.x + dxPan / currentScale - dxZoom;
    newWorldY = currentWorldPosition.y + dyPan / currentScale - dyZoom;
  }
  return new Point(newWorldX, newWorldY);
}
