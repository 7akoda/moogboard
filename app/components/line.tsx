import React, { useState } from "react";

const Line = () => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 0);
    setTimeout(() => setAnimate(false), 5000);
  };

  return (
    <div className="flex flex-col justify-end items-center absolute w-[50%] h-screen overflow-hidden">
      <button className=" cursor-pointer z-10 absolute" onClick={handleClick}>
        move up
      </button>
      <svg
        viewBox="0 0 900 10"
        className={animate ? "move-up" : "absolute h-auto w-[60%] opacity-0"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <g>
            <rect
              fill="#d97706"
              opacity={0.5}
              width="900"
              height="3.5"
              y="6.5"
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Line;
