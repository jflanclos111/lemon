import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./header.styles.scss";
import { GenericButton } from "../generic-button/generic-button.component";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";

export function Header() {
  return (
    <div className="header">
      <Logo className="logo" />
      <GenericButton text={<KeyboardArrowDownOutlinedIcon />} />
    </div>
  );
}
