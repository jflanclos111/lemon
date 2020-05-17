import React from "react";
import "./App.scss";
import { Navbar } from "./bespoke/navbar/navbar.component";
import { Content } from "./bespoke/content/content.component";

export function App() {
  return (
    <div className="grid-container">
      <Navbar />
      <Content />
    </div>
  );
}
