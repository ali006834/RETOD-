import React from "react";

interface ArrowDownProps {
  strokeColor?: string;
  width?: string;
  height?: string;
  className?: string;
}

const ArrowDown: React.FC<ArrowDownProps> = ({
  strokeColor = "#fff",
  width = "1.2em",
  height = "1.2em",
  className,
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
    className={className}
  >
    <g id="SVGRepo_iconCarrier">
      <path
        d="M19 8.5L12 15.5L5 8.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
  </svg>
);

export default ArrowDown;
