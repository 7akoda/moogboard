import React, { useState } from "react";

const Line = () => {
  const [animate, setAnimate] = useState(false);
  const handleClick = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 0);
  };
  return (
    <>
      <button className="absolute cursor-pointer left-40" onClick={handleClick}>
        move up
      </button>
      <svg
        className={animate ? "move-up" : "absolute max-w-[30vw]"}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -65.6 240 20"
      >
        <g>
          <g>
            <rect
              y="139.474"
              fill="#d97706"
              opacity={0.5}
              width="800"
              height="3.5"
            />
          </g>
        </g>
      </svg>
    </>
  );
};

export default Line;
