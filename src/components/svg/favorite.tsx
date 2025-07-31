import React from "react";

interface FavoriteProps {
  width?: string;
  height?: string;
  color?: string;
  fill?: boolean;
}

const svg = ({
  width,
  height,
  color = "#000",
  fill = false,
}: FavoriteProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={fill ? "currentColor" : "none"}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.55 3.084a5.452 5.452 0 0 1 3.852 9.307l-.648.654-.86.854-6.852 6.852L5.19 13.9l-.86-.854-.648-.654a5.453 5.453 0 1 1 7.706-7.712l.654.654.655-.654a5.452 5.452 0 0 1 3.852-1.595Z"
      fill="transparent"
      fill-opacity=".16"
      stroke={color}
      stroke-width="1.5"
      stroke-miterlimit="10"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export default svg;
