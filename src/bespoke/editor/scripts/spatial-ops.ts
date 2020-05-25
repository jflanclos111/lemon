import { Point } from "./point";
import * as point from "./point";
import { WorkspaceState, WorkspaceConfigParameters } from "./workspace";
import { Mouse, Moment, ScrollDirection } from "./mouse";
import * as basic from "./basic";

export function screenToWorld(scale: number, itemPositionOnScreen: Point, canvasWorldPosition: Point): Point {
  const transformedX = point.deltaX(point.dividePoint(itemPositionOnScreen, scale), canvasWorldPosition);
  const transformedY = point.deltaY(point.dividePoint(itemPositionOnScreen, scale), canvasWorldPosition);
  return new Point(transformedX, transformedY);
}

export function worldToScreen(scale: number, worldPositionInWorld: Point, canvasWorldPosition: Point): Point {
  const transformedX = basic.setPrecision((worldPositionInWorld.getX() + canvasWorldPosition.getX()) * scale);
  const transformedY = basic.setPrecision((worldPositionInWorld.getY() + canvasWorldPosition.getY()) * scale);
  return new Point(transformedX, transformedY);
}

export function getNewScale(
  canvasState: WorkspaceState,
  canvasConfig: WorkspaceConfigParameters,
  mouseState: Mouse
): number {
  const currentScale = canvasState.scale;
  const scaleMin = canvasConfig.scaleMin;
  const scaleMax = canvasConfig.scaleMax;
  const scaleIncrement = canvasConfig.scaleDeltaCoarse;
  let increment = 0;
  let newScale = currentScale;
  if (mouseState.getStateScrollIn(Moment.Current) === true) {
    increment = scaleIncrement;
  } else if (mouseState.getStateScrollOut(Moment.Current) === true) {
    increment = -scaleIncrement;
  }
  newScale = basic.setPrecision(basic.clamp(newScale, increment, scaleMin, scaleMax), 2);
  return newScale;
}

export function getNewWorldPosition(canvasState: WorkspaceState, mouseState: Mouse): Point {
  const scale = canvasState.scale;
  let newWorldX = canvasState.worldPosition.getX();
  let newWorldY = canvasState.worldPosition.getY();
  const mouseScreenPositionCurrent = mouseState.getScreenPosition(Moment.Current);
  const mouseScreenPositionLast = mouseState.getScreenPosition(Moment.Last);
  const mouseWorldPositionCurrent = mouseState.getWorldPosition(Moment.Current);

  if (
    (mouseState.getStateDragging(Moment.Current) === true &&
      mouseState.getButtonStateAuxiliary(Moment.Current) === true) ||
    mouseState.getStateScrollIn(Moment.Current) === true ||
    mouseState.getStateScrollOut(Moment.Current) === true
  ) {
    const dxPan = point.deltaX(mouseScreenPositionCurrent, mouseScreenPositionLast);
    const dyPan = point.deltaY(mouseScreenPositionCurrent, mouseScreenPositionLast);
    const mouseWorldPositionNext = screenToWorld(
      scale,
      mouseState.getScreenPosition(Moment.Current),
      canvasState.worldPosition
    );
    const dxZoom = point.deltaX(mouseWorldPositionCurrent, mouseWorldPositionNext);
    const dyZoom = point.deltaY(mouseWorldPositionCurrent, mouseWorldPositionNext);
    newWorldX = canvasState.worldPosition.getX() + dxPan / scale - dxZoom;
    newWorldY = canvasState.worldPosition.getY() + dyPan / scale - dyZoom;
  }
  return new Point(newWorldX, newWorldY);
}
