import React from "react";

interface SvgProps {
  width?: string; // Opsiyonel width parametresi
  height?: string; // Opsiyonel height parametresi
}

const Svg: React.FC<SvgProps> = ({ width = "1.6em", height = "1.6em" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    height={height}
    width={width}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {/* <rect width="24" height="24" fill="none"></rect> */}
      <path
        d="M12 6V18"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
      <path
        d="M6 12H18"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </g>
  </svg>
);

export default Svg;
