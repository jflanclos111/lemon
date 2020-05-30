import { Point } from "./point";
import { setPrecision } from "./basic";
import { screenToWorld } from "./spatial-ops";

enum MouseButton {
  None = 0,
  Primary = 1,
  Auxiliary = 4,
  Secondary = 2,
}

class MouseAction {
  constructor(private _currentState: boolean = false, private _lastState: boolean = false) {}

  public get currentState(): boolean {
    return this._currentState;
  }

  public get lastState(): boolean {
    return this._lastState;
  }

  public set currentState(target: boolean) {
    if (this._lastState !== this._currentState) this._lastState = this._currentState;
    this._currentState = target;
  }
}

export class Mouse {
  constructor(
    readonly canvasContext: CanvasRenderingContext2D,
    readonly feedbackMode: boolean = false,
    private _positionScreenCurrent = new Point(0, 0),
    private _positionScreenLast = new Point(0, 0),
    private _positionWorldCurrent = new Point(0, 0),
    private _positionWorldLast = new Point(0, 0),
    private _primaryButtonClick: MouseAction = new MouseAction(),
    private _auxiliaryButtonClick: MouseAction = new MouseAction(),
    private _secondaryButtonClick: MouseAction = new MouseAction(),
    private _drag: MouseAction = new MouseAction(),
    private _scrollIn: MouseAction = new MouseAction(),
    private _scrollOut: MouseAction = new MouseAction()
  ) {}

  public get positionScreenCurrent(): Point {
    return this._positionScreenCurrent;
  }

  public get positionScreenLast(): Point {
    return this._positionScreenLast;
  }

  public get positionWorldCurrent(): Point {
    return this._positionWorldCurrent;
  }

  public get positionWorldLast(): Point {
    return this._positionWorldLast;
  }

  public get primaryButtonClick(): MouseAction {
    return this._primaryButtonClick;
  }

  public get auxiliaryButtonClick(): MouseAction {
    return this._auxiliaryButtonClick;
  }

  public get secondaryButtonClick(): MouseAction {
    return this._secondaryButtonClick;
  }

  public get drag(): MouseAction {
    return this._drag;
  }

  public get scrollIn(): MouseAction {
    return this._scrollIn;
  }

  public get scrollOut(): MouseAction {
    return this._scrollOut;
  }

  private setScreenPosition(mouseEvent: MouseEvent): void {
    this.positionScreenLast.x = this.positionScreenCurrent.x;
    this.positionScreenLast.y = this.positionScreenCurrent.y;
    this.positionScreenCurrent.x = mouseEvent.x - this.canvasContext.canvas.offsetLeft;
    this.positionScreenCurrent.y = mouseEvent.y - this.canvasContext.canvas.offsetTop;
    return;
  }

  private setWorldPosition(scale: number, workspaceWorldPosition: Point): void {
    const transformedWorldPosition = screenToWorld(scale, this.positionScreenCurrent, workspaceWorldPosition);
    this.positionWorldLast.x = this.positionWorldCurrent.x;
    this.positionWorldLast.y = this.positionWorldCurrent.y;
    this.positionWorldCurrent.x = transformedWorldPosition.x;
    this.positionWorldCurrent.y = transformedWorldPosition.y;
    return;
  }

  private setMouseScroll(mouseEvent: WheelEvent): void {
    if (mouseEvent.type === "wheel") {
      this.scrollIn.currentState = mouseEvent.deltaY < 0 ? true : false;
      this.scrollOut.currentState = mouseEvent.deltaY > 0 ? true : false;
    } else {
      this.scrollIn.currentState = false;
      this.scrollOut.currentState = false;
    }
    return;
  }

  private setMouseButtons(mouseEvent: MouseEvent): void {
    this.primaryButtonClick.currentState = mouseEvent.buttons === MouseButton.Primary ? true : false;
    this.auxiliaryButtonClick.currentState = mouseEvent.buttons === MouseButton.Auxiliary ? true : false;
    this.secondaryButtonClick.currentState = mouseEvent.buttons === MouseButton.Secondary ? true : false;
    this.drag.currentState =
      mouseEvent.buttons === MouseButton.Primary ||
      mouseEvent.buttons === MouseButton.Auxiliary ||
      mouseEvent.buttons === MouseButton.Secondary
        ? true
        : false;
  }

  public update(scale: number, workspaceWorldPosition: Point, mouseEvent: any): void {
    this.setScreenPosition(mouseEvent);
    this.setWorldPosition(scale, workspaceWorldPosition);
    this.setMouseButtons(mouseEvent);
    this.setMouseScroll(mouseEvent);
    return;
  }

  public display() {
    if (this.feedbackMode === true) {
      const offsetXStart = this.positionScreenCurrent.x + 10;
      const offsetYStart = this.positionScreenCurrent.y + 20;
      const lineSpace = 15;
      this.canvasContext.resetTransform();
      this.canvasContext.fillStyle = "#000000";
      this.canvasContext.fillText(
        ` ${this.primaryButtonClick.currentState ? "P" : "_"} ${this.auxiliaryButtonClick.currentState ? "A" : "_"} ${
          this.secondaryButtonClick.currentState ? "S" : "_"
        }   ${this.drag.currentState ? "D" : "_"}   ${this.scrollIn.currentState ? "+" : "_"} ${
          this.scrollOut.currentState ? "-" : "_"
        }`,
        offsetXStart,
        offsetYStart + lineSpace * 1
      );
      this.canvasContext.fillText(
        `(${setPrecision(this.positionScreenCurrent.x, 2)}, ${setPrecision(this.positionScreenCurrent.y, 2)}): Screen`,
        offsetXStart,
        offsetYStart + lineSpace * 2
      );
      this.canvasContext.fillText(
        `(${setPrecision(this.positionWorldCurrent.x, 2)}, ${setPrecision(this.positionWorldCurrent.y, 2)}): World`,
        offsetXStart,
        offsetYStart + lineSpace * 3
      );
    }
  }
}
