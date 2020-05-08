import React from "react";
import "./App.scss";
import { StyledBar } from "./components/page/styled-bar/styled-bar.component";
import { ReactComponent as IdeaWorks } from "./assets/ideaworks.svg";
import { Button } from "./components/base/button/button.component";
import { ReactComponent as Lemon } from "./assets/vector.svg";

export function App() {
  const LeftGroup = () => (
    <div>
      <p className="text">Left Container</p>
    </div>
  );

  const RightGroup = () => (
    <div>
      <p className="text">Right Container</p>
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
