import React from "react";
import "./generic-button.styles.scss";

export function GenericButton({ action, text }) {
  return (
    <div className="button" onClick={action}>
      <h1 className="button-text">{text}</h1>
    </div>
  );
}
