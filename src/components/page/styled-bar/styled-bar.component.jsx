import React from "react";
import "./styled-bar.styles.scss";

export function StyledBar({ leftGroup, centerGroup, rightGroup }) {
  return (
    <div className="styled-bar">
      <div className="left-layout-container">{leftGroup}</div>
      <div className="center-layout-container">{centerGroup}</div>
      <div className="right-layout-container">{rightGroup}</div>
    </div>
  );
}
