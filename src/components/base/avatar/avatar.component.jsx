import React from "react";
import "./avatar.styles.scss";

export function Avatar({ image, altText = "image", height = 100 }) {
  return (
    <img className="avatar-image" src={image} alt={altText} height={height} />
  );
}
