import React from "react";

interface SvgIconProps {
  width?: string;
  height?: string;
  color?: string;
  strokeWidth?: string;
}

const SvgIcon = ({
  width = "16px",
  height = "16px",
  color = "#000",
  strokeWidth = "1.1",
}: SvgIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      fill="transparent"
      stroke={color}
      strokeWidth={strokeWidth}
      stroke-miterlimit="10"
    />
    <path
      d="M5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      fill="transparent"
      fillOpacity=".16"
      stroke={color}
      strokeWidth={strokeWidth}
      stroke-miterlimit="10"
    />
    <path
      d="M19 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      fill="transparent"
      stroke={color}
      strokeWidth={strokeWidth}
      stroke-miterlimit="10"
    />
    <path
      d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      fill="transparent"
      fillOpacity=".16"
      stroke={color}
      strokeWidth={strokeWidth}
      stroke-miterlimit="10"
    />
    <path
      d="M5 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM19 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM5 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      fill="transparent"
      stroke={color}
      strokeWidth={strokeWidth}
      stroke-miterlimit="10"
    />
    <path
      d="M19 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
      fill="transparent"
      fillOpacity=".16"
      stroke={color}
      strokeWidth={strokeWidth}
      stroke-miterlimit="10"
    />
  </svg>
);

export default SvgIcon;
