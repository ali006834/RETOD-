import React from "react";

interface SearchProps {
  width?: string;
  height?: string;
  color?: string;
}

const svg = ({ width, height, color = "#000" }: SearchProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
      fill="transparent"
      fill-opacity=".16"
      stroke={color}
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <path
      d="m21 21-4-4"
      stroke={color}
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
  </svg>
);

export default svg;
