import { Point } from "./point";
import { drawRectangle, drawLine } from "./primatives";

export class Sheet {
  constructor(readonly canvasContext: CanvasRenderingContext2D) {}

  public drawSheet(scale: number, worldPosition: Point) {
    this.canvasContext.scale(scale, scale);
    drawRectangle(this.canvasContext, worldPosition, 0, 0, 500, 500, "232357");
    drawRectangle(this.canvasContext, worldPosition, 600, 400, 50, 30, "e534e5", 4, "FFF321");
    drawRectangle(this.canvasContext, worldPosition, 40, 800, 90, 30, "32e5e5", 10, "e5e5e5");
    drawLine(this.canvasContext, worldPosition, 500, 500, 630, 876, "e534e5", 5);
  }
}
