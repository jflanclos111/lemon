import React from "react";
import "./content.styles.scss";
import { ReactComponent as IdeaWorks } from "../../assets/ideaworks.svg";

export function Content() {
  return (
    <div className="content">
      <IdeaWorks fill="#14c288" />
    </div>
  );
}
