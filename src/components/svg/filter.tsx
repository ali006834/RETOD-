import React from "react";

interface SvgProps {
  fill?: string;
  width?: string;
  height?: string;
  className?: string;
}

const svg: React.FC<SvgProps> = ({
  fill = "#fff",
  width = "1.1em",
  height = "1.1em",
  className,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={fill}
    viewBox="0 0 24 24"
    stroke-width="1"
    stroke="currentColor"
    aria-hidden="true"
    width={width}
    height={height}
    className={className}
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
    ></path>
  </svg>
);

export default svg;
