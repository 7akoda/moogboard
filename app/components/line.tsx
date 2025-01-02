import React, { useState } from "react";
import useCollision from "./collision";

interface lineProps {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const Line: React.FC<lineProps> = ({ playing, setPlaying }) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setTimeout(() => setAnimate(true), 0);
    setTimeout(() => setAnimate(false), 5000);
    setPlaying(!playing);
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
        className={animate ? "lineMoving" : "absolute h-auto opacity-0 "}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect fill="#d97706" width="800" height="0.5" />
        </g>
      </svg>
    </div>
  );
};

export default Line;
