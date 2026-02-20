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
    <g
      clipPath="url(#a)"
      stroke={color}
      strokeWidth="1.5"
      stroke-miterlimit="10"
    >
      <path
        d="m3.798 8.889-1.98 1.98a1.6 1.6 0 0 0 0 2.262l1.98 1.98a1.6 1.6 0 0 0 2.262 0l1.98-1.98a1.6 1.6 0 0 0 0-2.262l-1.98-1.98a1.6 1.6 0 0 0-2.262 0Z"
        fill="transparent"
        fillOpacity=".16"
      />

      <path
        d="m10.869 1.818-1.98 1.98a1.6 1.6 0 0 0 0 2.262l1.98 1.98a1.6 1.6 0 0 0 2.262 0l1.98-1.98a1.6 1.6 0 0 0 0-2.262l-1.98-1.98a1.6 1.6 0 0 0-2.262 0ZM10.869 15.96l-1.98 1.98a1.6 1.6 0 0 0 0 2.262l1.98 1.98a1.6 1.6 0 0 0 2.262 0l1.98-1.98a1.6 1.6 0 0 0 0-2.262l-1.98-1.98a1.6 1.6 0 0 0-2.262 0Z"
        fill="transparent"
      />

      <path
        d="m17.94 8.889-1.98 1.98a1.6 1.6 0 0 0 0 2.262l1.98 1.98a1.6 1.6 0 0 0 2.262 0l1.98-1.98a1.6 1.6 0 0 0 0-2.262l-1.98-1.98a1.6 1.6 0 0 0-2.262 0Z"
        fill="transparent"
        fillOpacity=".16"
      />
    </g>

    <defs>
      <clipPath id="a">
        <path fill="transparent" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default svg;
