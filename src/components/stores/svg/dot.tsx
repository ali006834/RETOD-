import React from "react";

const SvgComponent = ({ fill = "#222" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle cx="12" cy="12" r="2" fill={fill} />
  </svg>
);

export default SvgComponent;
