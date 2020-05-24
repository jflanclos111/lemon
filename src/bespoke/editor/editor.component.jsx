import React, { useRef, useEffect } from "react";
import "./editor.styles.scss";
import * as workspace from "./scripts/workspace";
import { useState } from "react";

let canvasView = null;

export function Editor() {
  const firstUpdate = useRef(true);
  const editorRef = useRef(null);
  const canvasRef = useRef(null);

  const [state, setState] = useState({
    editorProps: {
      viewWidth: null,
      viewHeight: null,
    },
  });

  function windowResize() {
    setState((prevState) => ({
      editorProps: {
        ...prevState.editorProps,
        viewWidth: editorRef.current.offsetWidth - 30,
        viewHeight: editorRef.current.offsetHeight - 30,
      },
    }));
  }

  useEffect(() => {
    window.addEventListener("resize", windowResize);
    if (firstUpdate.current) {
      windowResize();
      canvasView = new workspace.Workspace(canvasRef.current);
      firstUpdate.current = false;
    } else {
      canvasView.render();
    }

    return () => {
      window.removeEventListener("resize", windowResize);
    };
  });

  return (
    <div ref={editorRef} className="editor">
      <canvas
        ref={canvasRef}
        width={state.editorProps.viewWidth}
        height={state.editorProps.viewHeight}
      ></canvas>
    </div>
  );
}
