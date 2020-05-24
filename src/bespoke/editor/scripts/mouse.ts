import { Point } from "./point";
import { WorkspaceState } from "./workspace";

export enum Moment {
  Current,
  Last,
}

interface ChronologicalPoint {
  current: Point;
  last: Point;
}

interface ChronologicalBoolean {
  current: boolean;
  last: boolean;
}

class Button {
  private clicked: ChronologicalBoolean;
  constructor() {
    this.clicked = { current: false, last: false };
  }

  public getState(which: Moment = Moment.Current): boolean {
    const clicked = this.clicked;
    return which === Moment.Current ? clicked.current : clicked.last;
  }

  public setState(state: boolean): void {
    if (state !== this.clicked.current) {
      this.clicked.last = this.clicked.current;
      this.clicked.current = state;
    }
    return;
  }
}

export class Mouse {
  private positionScreen: ChronologicalPoint;
  private positionWorld: ChronologicalPoint;
  private primaryButton: Button;
  private auxiliaryButton: Button;
  private secondaryButton: Button;
  constructor(elementState: WorkspaceState) {
    this.positionScreen = {
      current: new Point(0, 0),
      last: new Point(0, 0),
    };
    this.positionWorld = {
      current: new Point(0, 0),
      last: new Point(0, 0),
    };
    this.primaryButton = new Button();
    this.auxiliaryButton = new Button();
    this.secondaryButton = new Button();

    console.log("Made a new Mouse");
  }

  //returns both the "x" and the "y" coordinates of the screen position of the mouse at the moment (which) specified. by default returns the current state
  public getScreenPosition(which: Moment = Moment.Current): Point {
    const positionScreen = this.positionScreen;
    return new Point(
      which === Moment.Current ? positionScreen.current.getX() : positionScreen.last.getX(),
      which === Moment.Current ? positionScreen.current.getY() : positionScreen.last.getY()
    );
  }

  private setScreenPosition(workspaceState: WorkspaceState, mouseEvent: MouseEvent): void {
    const canvas = workspaceState.ctx.canvas;
    const positionScreen = this.positionScreen;
    if (positionScreen.last !== positionScreen.current) {
      positionScreen.last.setXY(positionScreen.current.getX(), positionScreen.current.getY());
      positionScreen.current.setXY(mouseEvent.x - canvas.offsetLeft, mouseEvent.y - canvas.offsetTop);
    }
    return;
  }

  //returns both the "x" and "y" coordinates of the world position of the mouse at the moment (which) specified. by default returns the current state
  public getWorldPosition(which: Moment = Moment.Current): Point {
    const positionWorld = this.positionWorld;
    return new Point(
      which === Moment.Current ? positionWorld.current.getX() : positionWorld.last.getX(),
      which === Moment.Current ? positionWorld.current.getY() : positionWorld.last.getY()
    );
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

  //runs a comprehensive update of all of the properties of the Mouse object based on the workspaceState and and mouseEvent specified
  public update(workspaceState: WorkspaceState, mouseEvent: MouseEvent): void {
    const primaryButton = this.primaryButton;
    const auxiliaryButton = this.auxiliaryButton;
    const secondaryButton = this.secondaryButton;

    this.setScreenPosition(workspaceState, mouseEvent);

    if (mouseEvent.type === "mousedown") {
      primaryButton.setState(mouseEvent.buttons === 1 ? true : false);
      auxiliaryButton.setState(mouseEvent.buttons === 4 ? true : false);
      secondaryButton.setState(mouseEvent.buttons === 2 ? true : false);
    } else if (mouseEvent.type !== "mousedown" && mouseEvent.buttons === 0) {
      primaryButton.setState(false);
      auxiliaryButton.setState(false);
      secondaryButton.setState(false);
    }
  }
}
