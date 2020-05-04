import React from "react";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./header.styles.scss";
import { MenuDrawer } from "../menu-drawer/menu-drawer.component";

export function Header() {
  return (
    <div className="header">
      <Logo className="logo" />

      <MenuDrawer />
    </div>
  );
}
