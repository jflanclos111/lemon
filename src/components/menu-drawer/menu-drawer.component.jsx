import React, { useState } from "react";
import "./menu-drawer.styles.scss";
import { MenuDrawerItem } from "../menu-drawer-item/menu-drawer-item.component";
import { MENU_OPTIONS } from "./menu-drawer.data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export function MenuDrawer() {
  const [opened, setOpened] = useState(false);
  const [menuItems] = useState(MENU_OPTIONS);

  function handleClick() {
    setOpened(() => {
      return !opened;
    });
  }

  return (
    <ul className="drawer">
      {opened &&
        menuItems.map(({ id, ...otherProps }) => {
          return <MenuDrawerItem {...otherProps} />;
        })}
      <MenuDrawerItem
        action={handleClick}
        name={
          opened ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )
        }
      />
    </ul>
  );
}
