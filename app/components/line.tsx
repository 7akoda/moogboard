import React, { useState } from "react";

interface lineProps {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const Line: React.FC<lineProps> = ({ playing, setPlaying }) => {
  const [animate, setAnimate] = useState(false);
  const [bpm, setBpm] = useState(7);

  const handleClick = () => {
    setTimeout(() => setAnimate(true), 0);
    setTimeout(
      () => setAnimate(false),
      bpm === 10 ? 10000 : bpm === 7 ? 7000 : bpm === 4 ? 4000 : 10000
    );
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
        className={
          animate && bpm == 10
            ? "lineMoving10"
            : animate && bpm == 7
            ? "lineMoving7"
            : animate && bpm == 4
            ? "lineMoving4"
            : "absolute h-auto opacity-0 "
        }
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
