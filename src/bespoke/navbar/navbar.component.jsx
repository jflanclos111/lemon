import React, { Fragment } from "react";
import uuid from "react-uuid";
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
      <FontAwesomeIcon key={uuid()} icon={faBars} />
    </Fragment>
  );
  const CenterGroup = () => (
    <Fragment>
      <p key={uuid()}>Lemon</p>
    </Fragment>
  );
  const RightGroup = () => (
    <Fragment>
      <FontAwesomeIcon key={uuid()} icon={faCog} />
      <FontAwesomeIcon key={uuid()} icon={faSearch} />
      <FontAwesomeIcon key={uuid()} icon={faQuestion} />
    </Fragment>
  );

  return (
    <StyledBar
      leftGroup={<LeftGroup key={uuid()} />}
      centerGroup={<CenterGroup key={uuid()} />}
      rightGroup={<RightGroup key={uuid()} />}
    />
  );
}
