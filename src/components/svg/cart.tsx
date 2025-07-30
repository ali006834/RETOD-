import React from "react";

interface CartProps {
  width?: string;
  height?: string;
  color?: string;
}

const svg = ({ width, height, color = "#000" }: CartProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M4.6 11h14.8c.88 0 1.6.72 1.6 1.6v6c0 1.32-1.08 2.4-2.4 2.4H5.4C4.08 21 3 19.92 3 18.6v-6c0-.88.72-1.6 1.6-1.6Z"
      fill="transparent"
      fill-opacity=".16"
      stroke={color}
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <path
      d="M12 17a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      fill="transparent"
      stroke={color}
      stroke-width="1.5"
      stroke-miterlimit="10"
    />
    <path
      d="M8 11V7c0-2.21 1.79-4 4-4s4 1.79 4 4v4"
      stroke={color}
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
    />
  </svg>
);

export default svg;
