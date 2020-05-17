import React from "react";
import "./content.styles.scss";
// import { ReactComponent as IdeaWorks } from "../../assets/ideaworks.svg";
import { Editor } from "../editor/editor.component";

export function Content() {
  return (
    <div className="content">
      <Editor />
    </div>
  );
}
