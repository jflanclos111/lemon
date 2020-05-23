import * as point from "./point.ts";
import * as basic from "./basic.ts";

export class Portal {
  canvas;

  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.scaleTarget = 1;
    this.scaleDeltaCoarse = 0.01;
    this.scaleDeltaFine = 0.01;
    this.scaleMin = 0.1;
    this.scaleMax = 2.0;
    this.MouseLocation = point.createPoint(0, 0);
  }

  //Canvas Initialization

  create(reference) {
    //set reference element and context
    this.canvas = reference;
    this.ctx = this.canvas.getContext("2d");
    //image smoothing
    this.ctx.mozImageSmoothingEnabled = true; // firefox
    this.ctx.imageSmoothingEnabled = true;
    //event listeners
    this.canvas.addEventListener("wheel", this.handleZoom.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  //Rendering

  newFrame() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.ctx.resetTransform();
    this.ctx.translate(0, 0);
  }

  drawNonScalables() {
    this.ctx.resetTransform();
    this.ctx.translate(0, 0);
    this.ctx.fillText(
      `(x:${this.MouseLocation.x}, y:${this.MouseLocation.y}, scale:${this.scaleTarget})`,
      this.MouseLocation.x + 10,
      this.MouseLocation.y + 30
    );
  }

  drawScalables() {
    this.ctx.scale(this.scaleTarget, this.scaleTarget);
    this.ctx.fillStyle = "#FF0000";
    this.ctx.fillRect(0, 0, 50, 50);
    this.ctx.fillStyle = "#000000";
    this.ctx.fillRect(100, 34, 50, 50);
  }

  render() {
    this.newFrame();
    this.drawScalables();
    this.drawNonScalables();
  }

  //Events

  handleZoom(event) {
    const delta = event.wheelDelta;
    const increment = Math.sign(delta) * this.scaleDeltaCoarse;

    this.scaleTarget = basic.setPrecision(
      basic.clamp(this.scaleTarget, increment, this.scaleMin, this.scaleMax),
      2
    );

    this.render();
  }

  handleMouseMove(event) {
    this.MouseLocation.setXY(
      event.x - this.ctx.canvas.offsetLeft,
      event.y - this.ctx.canvas.offsetTop
    );

    this.render();
  }
}
