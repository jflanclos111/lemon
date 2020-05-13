import React from "react";
import uuid from "react-uuid";
import "./App.scss";
import { Navbar } from "./bespoke/navbar/navbar.component";
import { Content } from "./bespoke/content/content.component";

export function App() {
  return (
    <div className="grid-container">
      <Navbar key={uuid()} />
      <Content key={uuid()} />
    </div>
  );
}
