import { Point, ChronologicalPoint } from "./point";
import { WorkspaceState } from "./workspace";
import * as spatialOps from "./spatial-ops";
import { Moment, ChronologicalBoolean } from "./basic";

enum MouseButton {
  None = 0,
  Primary = 1,
  Auxiliary = 4,
  Secondary = 2,
}

enum ScrollDirection {
  None,
  In,
  Out,
}

interface Scroll {
  direction: ScrollDirection;
}

class MouseAction {
  private state: ChronologicalBoolean;
  constructor() {
    this.state = { current: false, last: false };
  }

  public getState(which: Moment = Moment.Current): boolean {
    const state = this.state;
    return which === Moment.Current ? state.current : state.last;
  }

  public setState(stateTarget: boolean): void {
    this.state.last = this.state.current;
    this.state.current = stateTarget;
    return;
  }
}

export class Mouse {
  private positionScreen: ChronologicalPoint;
  private positionWorld: ChronologicalPoint;
  private primaryButton: MouseAction;
  private auxiliaryButton: MouseAction;
  private secondaryButton: MouseAction;
  private drag: MouseAction;
  private scrollIn: MouseAction;
  private scrollOut: MouseAction;
  constructor(elementState: WorkspaceState) {
    this.positionScreen = {
      current: new Point(0, 0),
      last: new Point(0, 0),
    };
    this.positionWorld = {
      current: new Point(0, 0),
      last: new Point(0, 0),
    };
    this.primaryButton = new MouseAction();
    this.auxiliaryButton = new MouseAction();
    this.secondaryButton = new MouseAction();
    this.drag = new MouseAction();
    this.scrollIn = new MouseAction();
    this.scrollOut = new MouseAction();
    console.log("Made a new Mouse");
  }

  //returns both the "x" and the "y" coordinates of the screen position of the mouse at the moment (which) specified. by default returns the current state
  public getScreenPosition(which: Moment = Moment.Current): Point {
    const positionScreen = this.positionScreen;
    return new Point(
      which === Moment.Current ? positionScreen.current.x : positionScreen.last.x,
      which === Moment.Current ? positionScreen.current.y : positionScreen.last.y
    );
  }

  private setScreenPosition(workspaceState: WorkspaceState, mouseEvent: MouseEvent): void {
    const canvas = workspaceState.ctx.canvas;
    const positionScreen = this.positionScreen;
    if (positionScreen.last !== positionScreen.current) {
      positionScreen.last.setXY(positionScreen.current.x, positionScreen.current.y);
      positionScreen.current.setXY(mouseEvent.x - canvas.offsetLeft, mouseEvent.y - canvas.offsetTop);
    }
    return;
  }

  //returns both the "x" and "y" coordinates of the world position of the mouse at the moment (which) specified. by default returns the current state
  public getWorldPosition(which: Moment = Moment.Current): Point {
    const positionWorld = this.positionWorld;
    return new Point(
      which === Moment.Current ? positionWorld.current.x : positionWorld.last.x,
      which === Moment.Current ? positionWorld.current.y : positionWorld.last.y
    );
  }

  private setWorldPosition(workspaceState: WorkspaceState, mouseEvent: MouseEvent): void {
    const canvas = workspaceState.ctx.canvas;
    const scale = workspaceState.scale;
    const positionScreen = this.positionScreen;
    const positionWorld = this.positionWorld;
    const transformedWorldPosition = spatialOps.screenToWorld(
      workspaceState.scale,
      positionScreen.current,
      workspaceState.worldPosition
    );
    if (positionWorld.last !== positionWorld.current) {
      positionWorld.last.setXY(positionWorld.current.x, positionWorld.current.y);
      positionWorld.current.setXY(transformedWorldPosition.x, transformedWorldPosition.y);
    }
    return;
  }

  //returns the state of the primary button of the mouse at the moment (which) specified. by default returns the current state
  public getButtonStatePrimary(which: Moment = Moment.Current): boolean {
    const primaryButton = this.primaryButton;
    return which === Moment.Current ? primaryButton.getState(Moment.Current) : primaryButton.getState(Moment.Last);
  }

  //returns the state of the auxiliary button of the mouse at the moment (which) specified. by default returns the current state
  public getButtonStateAuxiliary(which: Moment = Moment.Current): boolean {
    const auxiliaryButton = this.auxiliaryButton;
    return which === Moment.Current ? auxiliaryButton.getState(Moment.Current) : auxiliaryButton.getState(Moment.Last);
  }

  //returns the state of the secondary button of the mouse at the moment (which) specified. by default returns the current state
  public getButtonStateSecondary(which: Moment = Moment.Current): boolean {
    const secondaryButton = this.secondaryButton;
    return which === Moment.Current ? secondaryButton.getState(Moment.Current) : secondaryButton.getState(Moment.Last);
  }

  //returns the state of dragging of the mouse at the moment (which) specified. by default returns the current state
  public getStateDragging(which: Moment = Moment.Current): boolean {
    const drag = this.drag;
    return which === Moment.Current ? drag.getState(Moment.Current) : drag.getState(Moment.Last);
  }

  //returns the state of dragging of the mouse at the moment (which) specified. by default returns the current state
  public getStateScrollIn(which: Moment = Moment.Current): boolean {
    const scrollIn = this.scrollIn;
    return which === Moment.Current ? scrollIn.getState(Moment.Current) : scrollIn.getState(Moment.Last);
  }

  public getStateScrollOut(which: Moment = Moment.Current): boolean {
    const scrollOut = this.scrollOut;
    return which === Moment.Current ? scrollOut.getState(Moment.Current) : scrollOut.getState(Moment.Last);
  }

  private handleWheelEvent(mouseEvent: WheelEvent): Scroll {
    const scrollIn = this.scrollIn;
    const scrollOut = this.scrollOut;
    let activity: ScrollDirection = ScrollDirection.None;
    if (mouseEvent.type === "wheel") {
      if (mouseEvent.deltaY < 0) {
        scrollIn.setState(true);
        activity = ScrollDirection.In;
      } else if (mouseEvent.deltaY > 0) {
        scrollOut.setState(true);
        activity = ScrollDirection.Out;
      }
    }
    return { direction: activity };
  }

  //runs a comprehensive update of all of the properties of the Mouse object based on the workspaceState and and mouseEvent specified
  public update(workspaceState: WorkspaceState, mouseEvent: any): void {
    const primaryButton = this.primaryButton;
    const auxiliaryButton = this.auxiliaryButton;
    const secondaryButton = this.secondaryButton;
    const drag = this.drag;
    const scrollIn = this.scrollIn;
    const scrollOut = this.scrollOut;
    const scroll =
      mouseEvent.type === "wheel" ? this.handleWheelEvent(mouseEvent) : { direction: ScrollDirection.None };
    this.setScreenPosition(workspaceState, mouseEvent);
    this.setWorldPosition(workspaceState, mouseEvent);
    if (mouseEvent.type === "mousedown") {
      primaryButton.setState(mouseEvent.buttons === MouseButton.Primary ? true : false);
      auxiliaryButton.setState(mouseEvent.buttons === MouseButton.Auxiliary ? true : false);
      secondaryButton.setState(mouseEvent.buttons === MouseButton.Secondary ? true : false);
      drag.setState(
        mouseEvent.buttons === MouseButton.Primary ||
          mouseEvent.buttons === MouseButton.Auxiliary ||
          mouseEvent.buttons === MouseButton.Secondary
          ? true
          : false
      );
    } else if (mouseEvent.type !== "mousedown" && mouseEvent.buttons === MouseButton.None) {
      primaryButton.setState(false);
      auxiliaryButton.setState(false);
      secondaryButton.setState(false);
      drag.setState(false);
    }
    if (scroll.direction !== ScrollDirection.In) scrollIn.setState(false);
    if (scroll.direction !== ScrollDirection.Out) scrollOut.setState(false);
    return;
  }
}
