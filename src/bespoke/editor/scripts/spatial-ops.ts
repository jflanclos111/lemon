import { Point } from "./point";
import * as point from "./point";
import { WorkspaceState } from "./workspace";
import { Mouse } from "./mouse";
import * as basic from "./basic";

export function screenToWorld(scale: number, itemPositionOnScreen: Point, canvasWorldPosition: Point): Point {
  const transformedX = point.deltaX(point.dividePoint(itemPositionOnScreen, scale), canvasWorldPosition);
  const transformedY = point.deltaY(point.dividePoint(itemPositionOnScreen, scale), canvasWorldPosition);
  return new Point(transformedX, transformedY);
}

export function worldToScreen(scale: number, worldPositionInWorld: Point, canvasWorldPosition: Point): Point {
  const transformedX = basic.setPrecision((worldPositionInWorld.x + canvasWorldPosition.x) * scale);
  const transformedY = basic.setPrecision((worldPositionInWorld.y + canvasWorldPosition.y) * scale);
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
  return basic.setPrecision(basic.clamp(currentScale, increment, scaleMin, scaleMax), 2);
}

export function getNewWorldPosition(canvasState: WorkspaceState, mouseState: Mouse): Point {
  const scale = canvasState.scale;
  let newWorldX = canvasState.worldPosition.x;
  let newWorldY = canvasState.worldPosition.y;
  const panning = mouseState.drag.currentState && mouseState.auxiliaryButtonClick.currentState ? true : false;
  const zooming = mouseState.scrollIn.currentState || mouseState.scrollOut.currentState ? true : false;
  if (panning || zooming) {
    const dxPan = point.deltaX(mouseState.positionScreenCurrent, mouseState.positionScreenLast);
    const dyPan = point.deltaY(mouseState.positionScreenCurrent, mouseState.positionScreenLast);
    const mouseWorldPositionNext = screenToWorld(scale, mouseState.positionScreenCurrent, canvasState.worldPosition);
    const dxZoom = point.deltaX(mouseState.positionWorldCurrent, mouseWorldPositionNext);
    const dyZoom = point.deltaY(mouseState.positionWorldCurrent, mouseWorldPositionNext);
    newWorldX = canvasState.worldPosition.x + dxPan / scale - dxZoom;
    newWorldY = canvasState.worldPosition.y + dyPan / scale - dyZoom;
  }
  return new Point(newWorldX, newWorldY);
}
