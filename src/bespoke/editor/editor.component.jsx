import React, { useRef, useEffect } from "react";
import { Resizable } from "../../components/page/resizable/resizable.component";
import "./editor.styles.scss";
import { initCanvas } from "./editor.js";

export function Editor() {
  const firstUpdate = useRef(true);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (firstUpdate.current) {
      initCanvas(canvasRef);
      firstUpdate.current = false;
      return;
    }
  });

  return (
    <div className="editor">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
}
