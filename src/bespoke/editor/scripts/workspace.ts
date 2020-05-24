import * as point from "./point";
import { Point } from "./point";
import * as basic from "./basic";
import * as mouse from "./mouse";
import { Mouse, Moment } from "./mouse";

export interface WorkspaceState {
  ctx: CanvasRenderingContext2D;
  screenPosition: Point;
  worldPosition: Point;
  scale: number;
}

interface WorkspaceConfigParameters {
  scaleDeltaCoarse: number;
  scaleMin: number;
  scaleMax: number;
}

export class Workspace {
  private canvas: HTMLCanvasElement;
  private state: WorkspaceState;
  private configParameters: WorkspaceConfigParameters;

  private mouseState: mouse.Mouse;
  private updateTime: number;

  constructor(reference: HTMLCanvasElement) {
    this.canvas = reference;
    this.state = {
      ctx: this.canvas.getContext("2d")!,
      screenPosition: new Point(0, 0),
      worldPosition: new Point(0, 0),
      scale: 1,
    };
    this.configParameters = {
      scaleDeltaCoarse: 0.01,
      scaleMin: 0.1,
      scaleMax: 2.0,
    };
    this.mouseState = new Mouse(this.state);
    this.updateTime = 0;

    this.configCanvas();
    this.createEvents();
    this.render();

    console.log("Created a new Workspace");
  }

  private configCanvas(): void {
    let ctx = this.state.ctx;
    //image smoothing
    ctx.imageSmoothingEnabled = true;
  }

  private createEvents(): void {
    let canvas = this.canvas;
    //event listeners
    canvas.addEventListener("wheel", this.handleMouseEvent.bind(this));
    canvas.addEventListener("mousemove", this.handleMouseEvent.bind(this));
    canvas.addEventListener("mousedown", this.handleMouseEvent.bind(this));
    canvas.addEventListener("mouseup", this.handleMouseEvent.bind(this));
  }

  private clear(): void {
    const ctx = this.state.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    this.state.ctx.resetTransform();
  }

  public render(): void {
    const timeStart = performance.now();
    //render code here
    this.clear();
    this.drawPage();
    this.drawInterface();
    //end render code
    const timeFinish = performance.now();
    this.updateTime = basic.setPrecision(timeFinish - timeStart, 2);
  }

  //Events
  // private handleZoom(event: WheelEvent) {
  //   const scale = this.scale;
  //   const scaleMin = this.scaleMin;
  //   const scaleMax = this.scaleMax;
  //   const scaleDeltaCoarse = this.scaleDeltaCoarse;
  //   const delta = -event.deltaY;
  //   const increment = Math.sign(delta) * scaleDeltaCoarse;
  //   this.scale = basic.setPrecision(
  //     basic.clamp(scale, increment, scaleMin, scaleMax),
  //     2
  //   );
  //   this.render();
  // }

  private handleMouseEvent = (event: MouseEvent) => {
    const state = this.state;
    this.mouseState.update(state, event);
    this.render();
  };

  drawInterface() {
    const ctx = this.state.ctx;
    const mouseState = this.mouseState;
    const viewMouseX: number = mouseState.getScreenPosition(Moment.Current).getX();
    const viewMouseY: number = mouseState.getScreenPosition(Moment.Current).getY();
    const viewMouseLastX: number = mouseState.getScreenPosition(Moment.Last).getX();
    const viewMouseLastY: number = mouseState.getScreenPosition(Moment.Last).getY();
    const primaryClicked: boolean = mouseState.getButtonStatePrimary(Moment.Current);
    const auxiliaryClicked: boolean = mouseState.getButtonStateAuxiliary(Moment.Current);
    const secondaryClicked: boolean = mouseState.getButtonStateSecondary(Moment.Current);
    const primaryClickedLast: boolean = mouseState.getButtonStatePrimary(Moment.Last);
    const auxiliaryClickedLast: boolean = mouseState.getButtonStateAuxiliary(Moment.Last);
    const secondaryClickedLast: boolean = mouseState.getButtonStateSecondary(Moment.Last);
    const scale: number = this.state.scale;
    const updateTime = this.updateTime;
    ctx.resetTransform();
    ctx.fillText(`(x: ${viewMouseLastX} (Last) / ${viewMouseX} (Current))`, viewMouseX + 10, viewMouseY + 30);
    ctx.fillText(`(y: ${viewMouseLastY} (Last) / ${viewMouseY} (Current))`, viewMouseX + 10, viewMouseY + 40);
    ctx.fillText(`(scale:${scale}, dt:${updateTime}ms)`, viewMouseX + 10, viewMouseY + 50);
    ctx.fillText(
      `(Left: ${primaryClickedLast} (Last) / ${primaryClicked} (Current))`,
      viewMouseX + 10,
      viewMouseY + 60
    );
    ctx.fillText(
      `(Middle: ${auxiliaryClickedLast} (Last) / ${auxiliaryClicked} (Current))`,
      viewMouseX + 10,
      viewMouseY + 70
    );
    ctx.fillText(
      `(Right: ${secondaryClickedLast} (Last) / ${secondaryClicked} (Current))`,
      viewMouseX + 10,
      viewMouseY + 80
    );
    ctx.fillText(`(Drag: ${scale} (Last) / ${scale} (Current))`, viewMouseX + 10, viewMouseY + 90);
  }

  drawPage() {
    const ctx = this.state.ctx;
    ctx.scale(this.state.scale, this.state.scale);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 50, 50);
    ctx.fillStyle = "#000000";
    ctx.fillRect(100, 34, 50, 50);
  }
}
