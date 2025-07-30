import React from "react";

function svg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="18"
      height="18"
    >
      <defs>
        <path
          id="a"
          d="M15.123 7.562C15.123 3.392 11.731 0 7.562 0 3.392 0 0 3.392 0 7.562s3.392 7.561 7.562 7.561c1.903 0 3.64-.712 4.97-1.878L17.288 18l.713-.713-4.755-4.754a7.522 7.522 0 001.878-4.971zm-7.561 6.553a6.56 6.56 0 01-6.554-6.553 6.56 6.56 0 016.554-6.554 6.56 6.56 0 016.553 6.554 6.56 6.56 0 01-6.553 6.553zm.504-7.058h4.032v1.009H8.066v4.032H7.057V8.066H3.025V7.057h4.032V3.025h1.009v4.032z"
        ></path>
      </defs>
      <use fill="#121314" fillRule="evenodd" xlinkHref="#a"></use>
    </svg>
  );
}

export default svg;
