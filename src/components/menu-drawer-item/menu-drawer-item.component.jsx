import React from "react";
import "./menu-drawer-item.styles.scss";

export function MenuDrawerItem({ action, name }) {
  return (
    <li className="menu-item">
      <div className="menu-item-text" onClick={action}>
        {name}
      </div>
    </li>
  );
}
