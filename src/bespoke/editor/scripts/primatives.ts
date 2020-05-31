import { Point } from "./point";

export function drawRectangle(
  canvasContext: CanvasRenderingContext2D,
  worldPosition: Point,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: string
) {
  canvasContext.fillStyle = fill;
  canvasContext.fillRect(worldPosition.x + x, worldPosition.y + y, w, h);
}

// export function drawLine(
//   canvasContext: CanvasRenderingContext2D,
//   worldPosition: Point,
//   x1: number,
//   y1: number,
//   x2: number,
//   y2: number,
//   color: string
// ) {
//   canvasContext.fillStyle = fill;
//   canvasContext.fillRect(worldPosition.x + x, worldPosition.y + y, w, h);
// }
