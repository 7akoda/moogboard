import React, { useState } from "react";

interface lineProps {
  animate: boolean;

  bpm: number;
}

export const Line: React.FC<lineProps> = ({ bpm, animate }) => {
  return (
    <div className=" flex flex-col justify-start items-center  z-0 ">
      <svg
        viewBox="0 0 242.5 1.2"
        className={
          animate && bpm == 10
            ? "lineMoving10"
            : animate && bpm == 7
            ? "lineMoving7"
            : animate && bpm == 4
            ? "lineMoving4"
            : "absolute h-auto invisible "
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <rect
            fill="#d97706"
            className="w-[80dvw] h-[0.5px] flex flex-row justify-self-center"
          />
        </g>
      </svg>
    </div>
  );
};
