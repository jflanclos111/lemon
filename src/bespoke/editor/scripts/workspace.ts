import { Point } from "./point";
import { getNewScale, getNewWorldPosition } from "./spatial-ops";
import { Mouse } from "./mouse";
import { Sheet } from "./sheet";

export class Workspace {
  constructor(
    private _canvas: HTMLCanvasElement,
    readonly ctx: CanvasRenderingContext2D = _canvas.getContext("2d")!,
    readonly scaleDeltaCoarse: number = 0.05,
    readonly scaleMin: number = 0.01,
    readonly scaleMax: number = 2.0,
    readonly mouseState: Mouse = new Mouse(ctx, true),
    readonly sheetState: Sheet = new Sheet(ctx),
    private _worldPosition: Point = new Point(0, 0),
    private _scale: number = 1
  ) {
    this.configCanvas();
    this.createEvents();
    this.render();
  }

  private get canvas(): HTMLCanvasElement {
    return this._canvas;
  }

  private get worldPosition(): Point {
    return this._worldPosition;
  }

  private get scale(): number {
    return this._scale;
  }

  private set worldPosition(newPosition: Point) {
    if (newPosition !== this._worldPosition) this._worldPosition = newPosition;
  }

  private set scale(newScale: number) {
    if (newScale !== this._scale) this._scale = newScale;
  }

  private configCanvas(): void {
    this.ctx.imageSmoothingEnabled = true;
  }

  private createEvents(): void {
    this.canvas.addEventListener("wheel", this.handleMouseEvent.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMouseEvent.bind(this));
    this.canvas.addEventListener("mousedown", this.handleMouseEvent.bind(this));
    this.canvas.addEventListener("mouseup", this.handleMouseEvent.bind(this));
  }

  private clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.resetTransform();
  }

  public render(): void {
    this.clear();
    this.sheetState.drawSheet(this.scale, this.worldPosition);
    this.mouseState.display();
  }

  private handleMouseEvent = (event: MouseEvent | WheelEvent) => {
    this.mouseState.update(this.scale, this.worldPosition, event);
    this.scale = getNewScale(this.scale, this.scaleMin, this.scaleMax, this.scaleDeltaCoarse, this.mouseState);
    this.worldPosition = getNewWorldPosition(this.scale, this.worldPosition, this.mouseState);
    this.render();
  };
}
