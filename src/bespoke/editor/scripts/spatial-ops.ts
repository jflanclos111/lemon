import { Point } from "./point";
import * as point from "./point";
import { WorkspaceState, WorkspaceConfigParameters } from "./workspace";
import { Mouse } from "./mouse";
import { Moment } from "./basic";
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
  if (mouseState.getStateScrollIn(Moment.Current)) {
    increment = scaleIncrement;
  } else if (mouseState.getStateScrollOut(Moment.Current)) {
    increment = -scaleIncrement;
  }
  newScale = basic.setPrecision(basic.clamp(newScale, increment, scaleMin, scaleMax), 2);
  return newScale;
}

export function getNewWorldPosition(canvasState: WorkspaceState, mouseState: Mouse): Point {
  const scale = canvasState.scale;
  let newWorldX = canvasState.worldPosition.x;
  let newWorldY = canvasState.worldPosition.y;
  const mouseScreenPositionCurrent = mouseState.getScreenPosition(Moment.Current);
  const mouseScreenPositionLast = mouseState.getScreenPosition(Moment.Last);
  const mouseWorldPositionCurrent = mouseState.getWorldPosition(Moment.Current);

  if (
    (mouseState.getStateDragging(Moment.Current) && mouseState.getButtonStateAuxiliary(Moment.Current)) ||
    mouseState.getStateScrollIn(Moment.Current) ||
    mouseState.getStateScrollOut(Moment.Current)
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
    newWorldX = canvasState.worldPosition.x + dxPan / scale - dxZoom;
    newWorldY = canvasState.worldPosition.y + dyPan / scale - dyZoom;
  }
  return new Point(newWorldX, newWorldY);
}
