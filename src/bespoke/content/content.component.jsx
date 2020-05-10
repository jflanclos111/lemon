import React from "react";
import "./content.styles.scss";
import { SVGWrap } from "../../components/base/svg-wrap/svg-wrap.component";
import { ReactComponent as IdeaWorks } from "../../assets/ideaworks.svg";

export function Content() {
  return (
    <div className="content">
      <SVGWrap svg={<IdeaWorks />} />
    </div>
  );
}
