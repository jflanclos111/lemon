import React from "react";
import "./footer.styles.scss";

export function Footer() {
  const date = new Date();

  return (
    <div className="footer">
      <h1 className="footer-text">
        © Copyright Ideaworks {date.getFullYear()}
      </h1>
    </div>
  );
}
