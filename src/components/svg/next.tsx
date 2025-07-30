import React from "react";

const SvgComponent = ({ width = "80px", height = "80px" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    width={width}
    height={height}
    viewBox="0 0 64 64"
    version="1.1"
    style={{
      fillRule: "evenodd",
      clipRule: "evenodd",
      strokeLinejoin: "round",
      strokeMiterlimit: 2,
    }}
  >
    <rect
      id="Icons"
      x="-192"
      y="-192"
      width="1280"
      height="800"
      style={{
        fill: "none",
      }}
    />

    <g id="Icons1">
      <path
        id="arrow-right"
        d="M48.337,29.881l-7.414,-7.414l2.832,-2.832l12.247,12.247l-0.001,0.001l0.001,0.001l-12.247,12.246l-2.832,-2.832l7.412,-7.412l-40.335,0l0,-4.005l40.337,0Z"
        style={{ fillRule: "nonzero" }}
      />
    </g>
  </svg>
);

export default SvgComponent;
