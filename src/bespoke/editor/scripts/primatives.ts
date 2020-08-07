import { Point } from "./point";
import { isValidHexColor } from "./basic";

export function drawLine(
  canvasContext: CanvasRenderingContext2D,
  worldPosition: Point,
  x0: number = 0,
  y0: number = 0,
  x1: number = 0,
  y1: number = 0,
  stroke: string = "",
  strokeWidth: number = 1
) {
  canvasContext.strokeStyle = isValidHexColor(stroke) ? `#${stroke}` : "#000000";
  canvasContext.lineWidth = strokeWidth;
  canvasContext.beginPath();
  canvasContext.moveTo(worldPosition.x + x0, worldPosition.y + y0);
  canvasContext.lineTo(worldPosition.x + x1, worldPosition.y + y1);
  canvasContext.stroke();
}

export function drawRectangle(
  canvasContext: CanvasRenderingContext2D,
  worldPosition: Point,
  x0: number = 0,
  y0: number = 0,
  w: number = 0,
  h: number = 0,
  stroke: string = "",
  strokeWidth: number = 1,
  fill: string = ""
) {
  canvasContext.strokeStyle = isValidHexColor(stroke) ? `#${stroke}` : "#000000";
  canvasContext.lineWidth = strokeWidth;
  canvasContext.fillStyle = isValidHexColor(fill) ? `#${fill}` : "#000000";
  canvasContext.beginPath();
  canvasContext.moveTo(worldPosition.x + x0, worldPosition.y + y0);
  canvasContext.lineTo(worldPosition.x + x0 + w, worldPosition.y + y0);
  canvasContext.lineTo(worldPosition.x + x0 + w, worldPosition.y + y0 + h);
  canvasContext.lineTo(worldPosition.x + x0, worldPosition.y + y0 + h);
  canvasContext.lineTo(worldPosition.x + x0, worldPosition.y + y0);
  if (isValidHexColor(stroke)) canvasContext.stroke();
  if (isValidHexColor(fill)) canvasContext.fill();
}

export function drawArc(
  canvasContext: CanvasRenderingContext2D,
  worldPosition: Point,
  x0: number = 0,
  y0: number = 0,
  w: number = 0,
  h: number = 0,
  stroke: string = "",
  strokeWidth: number = 1,
  fill: string = ""
) {
  canvasContext.strokeStyle = isValidHexColor(stroke) ? `#${stroke}` : "#000000";
  canvasContext.lineWidth = strokeWidth;
  canvasContext.fillStyle = isValidHexColor(fill) ? `#${fill}` : "#000000";
  canvasContext.beginPath();
  canvasContext.moveTo(worldPosition.x + x0, worldPosition.y + y0);
  canvasContext.lineTo(worldPosition.x + x0 + w, worldPosition.y + y0);
  canvasContext.lineTo(worldPosition.x + x0 + w, worldPosition.y + y0 + h);
  canvasContext.lineTo(worldPosition.x + x0, worldPosition.y + y0 + h);
  canvasContext.lineTo(worldPosition.x + x0, worldPosition.y + y0);
  if (isValidHexColor(stroke)) canvasContext.stroke();
  if (isValidHexColor(fill)) canvasContext.fill();
}
