import { Point } from "./point";
import * as basic from "./basic";
import * as mouse from "./mouse";
import * as spatialOps from "./spatial-ops";
import { Mouse, Moment } from "./mouse";

export interface WorkspaceState {
  ctx: CanvasRenderingContext2D;
  worldPosition: Point;
  scale: number;
}

export interface WorkspaceConfigParameters {
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
      worldPosition: new Point(0, 0),
      scale: 1,
    };
    this.configParameters = {
      scaleDeltaCoarse: 0.05,
      scaleMin: 0.01,
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

  private handleMouseEvent = (event: MouseEvent | WheelEvent) => {
    const state = this.state;
    const configParameters = this.configParameters;
    const mouseState = this.mouseState;
    mouseState.update(state, event);
    state.scale = spatialOps.getNewScale(state, configParameters, mouseState);
    state.worldPosition = spatialOps.getNewWorldPosition(state, mouseState);
    this.render();
  };

  drawInterface() {
    const ctx = this.state.ctx;
    const mouseState = this.mouseState;
    const viewMouseX: number = mouseState.getScreenPosition(Moment.Current).getX();
    const viewMouseY: number = mouseState.getScreenPosition(Moment.Current).getY();
    const worldMouseX: number = mouseState.getWorldPosition(Moment.Current).getX();
    const worldMouseY: number = mouseState.getWorldPosition(Moment.Current).getY();
    const viewMouseLastX: number = mouseState.getScreenPosition(Moment.Last).getX();
    const viewMouseLastY: number = mouseState.getScreenPosition(Moment.Last).getY();
    const worldMouseLastX: number = mouseState.getWorldPosition(Moment.Last).getX();
    const worldMouseLastY: number = mouseState.getWorldPosition(Moment.Last).getY();
    const primaryClicked: boolean = mouseState.getButtonStatePrimary(Moment.Current);
    const auxiliaryClicked: boolean = mouseState.getButtonStateAuxiliary(Moment.Current);
    const secondaryClicked: boolean = mouseState.getButtonStateSecondary(Moment.Current);
    const dragging: boolean = mouseState.getStateDragging(Moment.Current);
    const scrollIn: boolean = mouseState.getStateScrollIn(Moment.Current);
    const scrollOut: boolean = mouseState.getStateScrollOut(Moment.Current);
    const primaryClickedLast: boolean = mouseState.getButtonStatePrimary(Moment.Last);
    const auxiliaryClickedLast: boolean = mouseState.getButtonStateAuxiliary(Moment.Last);
    const secondaryClickedLast: boolean = mouseState.getButtonStateSecondary(Moment.Last);
    const draggingLast: boolean = mouseState.getStateDragging(Moment.Last);
    const scrollInLast: boolean = mouseState.getStateScrollIn(Moment.Last);
    const scrollOutLast: boolean = mouseState.getStateScrollOut(Moment.Last);
    const scale: number = this.state.scale;
    const updateTime = this.updateTime;
    ctx.resetTransform();
    ctx.fillStyle = "#000000";
    ctx.fillText(
      `World Position (${this.state.worldPosition.getX()}, ${this.state.worldPosition.getY()})`,
      viewMouseX + 50,
      viewMouseY + 10
    );
    ctx.fillText(`Screen x: ${viewMouseLastX} (Last) / ${viewMouseX} (Current)`, viewMouseX + 10, viewMouseY + 30);
    ctx.fillText(`Screen y: ${viewMouseLastY} (Last) / ${viewMouseY} (Current)`, viewMouseX + 10, viewMouseY + 40);
    ctx.fillText(`World x: ${worldMouseLastX} (Last) / ${worldMouseX} (Current)`, viewMouseX + 10, viewMouseY + 50);
    ctx.fillText(`World y: ${worldMouseLastY} (Last) / ${worldMouseY} (Current)`, viewMouseX + 10, viewMouseY + 60);
    ctx.fillText(`scale:${scale}, dt:${updateTime}ms)`, viewMouseX + 10, viewMouseY + 70);
    ctx.fillText(`Left: ${primaryClickedLast} (Last) / ${primaryClicked} (Current)`, viewMouseX + 10, viewMouseY + 80);
    ctx.fillText(
      `Middle: ${auxiliaryClickedLast} (Last) / ${auxiliaryClicked} (Current)`,
      viewMouseX + 10,
      viewMouseY + 90
    );
    ctx.fillText(
      `Right: ${secondaryClickedLast} (Last) / ${secondaryClicked} (Current)`,
      viewMouseX + 10,
      viewMouseY + 100
    );
    ctx.fillText(`Drag: ${draggingLast} (Last) / ${dragging} (Current)`, viewMouseX + 10, viewMouseY + 110);
    ctx.fillText(`Scroll In: ${scrollInLast} (Last) / ${scrollIn} (Current)`, viewMouseX + 10, viewMouseY + 120);
    ctx.fillText(`Scroll Out: ${scrollOutLast} (Last) / ${scrollOut} (Current)`, viewMouseX + 10, viewMouseY + 130);
  }

  drawPage() {
    const ctx = this.state.ctx;
    ctx.scale(this.state.scale, this.state.scale);
    ctx.fillStyle = "#e5e5e5";
    ctx.fillRect(this.state.worldPosition.getX(), this.state.worldPosition.getY(), 800, 800);
    ctx.fillStyle = "#000000";
    ctx.fillText("World (0,0)", this.state.worldPosition.getX(), this.state.worldPosition.getY());
  }
}
