import React, { Fragment } from "react";
import "./navbar.styles.scss";
import { StyledBar } from "../../components/page/styled-bar/styled-bar.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCog,
  faSearch,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const LeftGroup = () => (
    <Fragment>
      <FontAwesomeIcon icon={faBars} />
    </Fragment>
  );
  const CenterGroup = () => (
    <Fragment>
      <p>Lemon</p>
    </Fragment>
  );
  const RightGroup = () => (
    <Fragment>
      <FontAwesomeIcon icon={faCog} />
      <FontAwesomeIcon icon={faSearch} />
      <FontAwesomeIcon icon={faQuestion} />
    </Fragment>
  );

  return (
    <StyledBar
      leftGroup={<LeftGroup />}
      centerGroup={<CenterGroup />}
      rightGroup={<RightGroup />}
    />
  );
}
