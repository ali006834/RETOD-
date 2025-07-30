const svg = ({ fill }: { fill?: boolean }) => (
  <svg
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    fill={fill ? "currentColor" : "none"}
    stroke="currentColor"
    height="1.7em"
    width="1.7em"
  >
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        d="M35.54 15.44 32 19l-3.54-3.53A11.67 11.67 0 0 0 12 31.94l3.54 3.54 8.25 8.25L32 52l8.25-8.25 8.25-8.25 3.5-3.56a11.67 11.67 0 0 0-16.5-16.5z"
        strokeWidth="2"
      ></path>
    </g>
  </svg>
);

export default svg;
