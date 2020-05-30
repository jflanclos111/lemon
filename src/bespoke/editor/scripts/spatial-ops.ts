import { Point, deltaX, deltaY, dividePoint } from "./point";
import { Mouse } from "./mouse";
import { setPrecision, clamp } from "./basic";

export function screenToWorld(scale: number, itemPositionOnScreen: Point, canvasWorldPosition: Point): Point {
  const transformedX = deltaX(dividePoint(itemPositionOnScreen, scale), canvasWorldPosition);
  const transformedY = deltaY(dividePoint(itemPositionOnScreen, scale), canvasWorldPosition);
  return new Point(transformedX, transformedY);
}

export function worldToScreen(scale: number, worldPositionInWorld: Point, canvasWorldPosition: Point): Point {
  const transformedX = setPrecision((worldPositionInWorld.x + canvasWorldPosition.x) * scale);
  const transformedY = setPrecision((worldPositionInWorld.y + canvasWorldPosition.y) * scale);
  return new Point(transformedX, transformedY);
}

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
