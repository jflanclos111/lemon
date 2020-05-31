import { Point } from "./point";
import { drawRectangle } from "./primatives";

export class Sheet {
  constructor(readonly canvasContext: CanvasRenderingContext2D) {}

  public drawSheet(scale: number, worldPosition: Point) {
    this.canvasContext.scale(scale, scale);
    drawRectangle(this.canvasContext, worldPosition, 0, 0, 500, 500, "#e5e5e5");
    drawRectangle(this.canvasContext, worldPosition, 600, 400, 50, 30, "#e534e5");
    drawRectangle(this.canvasContext, worldPosition, 40, 800, 90, 30, "#32e5e5");
  }
}
