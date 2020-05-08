import React from "react";
import "./App.scss";
import { StyledBar } from "./components/page/styled-bar/styled-bar.component";
import { ReactComponent as IdeaWorks } from "./assets/ideaworks.svg";
import { Button } from "./components/base/button/button.component";
import { ReactComponent as Lemon } from "./assets/vector.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh } from "@fortawesome/free-solid-svg-icons";

export function App() {
  const LeftGroup = () => (
    <div className="svg-wrapper">
      <FontAwesomeIcon className="svg text" icon={faTh} />
    </div>
  );

  const RightGroup = () => (
    <div className="svg-wrapper">
      <FontAwesomeIcon className="svg text" icon={faTh} />
    </div>
  );

  return (
    <div className="grid-container">
      <StyledBar leftGroup={<LeftGroup />} rightGroup={<RightGroup />} />
      <div className="grid-body">
        <IdeaWorks />
      </div>
      <StyledBar />
    </div>
  );
}
