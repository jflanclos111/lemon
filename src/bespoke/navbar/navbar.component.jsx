import React, { Fragment } from "react";
import "./navbar.styles.scss";
import { StyledBar } from "../../components/page/styled-bar/styled-bar.component";
import { SVGWrap } from "../../components/base/svg-wrap/svg-wrap.component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTh } from "@fortawesome/free-solid-svg-icons";

export function Navbar() {
  const RightGroup = () => (
    <Fragment>
      <SVGWrap svg={<FontAwesomeIcon icon={faTh} />}></SVGWrap>
      <SVGWrap svg={<FontAwesomeIcon icon={faTh} />}></SVGWrap>
      <SVGWrap svg={<FontAwesomeIcon icon={faTh} />}></SVGWrap>
      <SVGWrap svg={<FontAwesomeIcon icon={faTh} />}></SVGWrap>
      <SVGWrap svg={<FontAwesomeIcon icon={faTh} />}></SVGWrap>
    </Fragment>
  );

  const LeftGroup = () => (
    <Fragment>
      <SVGWrap svg={<FontAwesomeIcon icon={faTh} />}></SVGWrap>
      <SVGWrap svg={<FontAwesomeIcon icon={faTh} />}></SVGWrap>
      <SVGWrap svg={<FontAwesomeIcon icon={faTh} />}></SVGWrap>
      <SVGWrap svg={<FontAwesomeIcon icon={faTh} />}></SVGWrap>
      <SVGWrap svg={<FontAwesomeIcon icon={faTh} />}></SVGWrap>
    </Fragment>
  );

  const CenterGroup = () => <Fragment></Fragment>;

  return (
    <StyledBar
      leftGroup={<LeftGroup />}
      centerGroup={<CenterGroup />}
      rightGroup={<RightGroup />}
    />
  );
}
