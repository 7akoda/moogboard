import React, { useState } from "react";

const Line = () => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(false);
    setTimeout(() => setAnimate(true), 0);
    setTimeout(() => setAnimate(false), 5000);
  };

  return (
    <div className=" flex flex-col justify-end items-center ">
      <button
        className=" cursor-pointer z-10 absolute h-auto"
        onClick={handleClick}
      >
        move up
      </button>
      <svg
        viewBox="0 0 242.5 1.2"
        className={
          animate ? "lineMoving" : "absolute h-auto w-[20%] opacity-0 "
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect fill="#d97706" width="900" height="0.5" y="1" />
        </g>
      </svg>
    </div>
  );
};

export default Line;
