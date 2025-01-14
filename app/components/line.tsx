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
      bpm === 10 ? 9999 : bpm === 7 ? 6999 : bpm === 4 ? 3999 : 9999
    );
  };

  return (
    <div className=" flex flex-col justify-start items-center ">
      {/* <button
        disabled={animate}
        className={animate ? "buttonPlaying" : "button"}
        onClick={handleClick}
      >
        play
      </button>
      <div className="flex flex-row ">
        <button
          disabled={animate}
          className={
            bpm == 10 && animate
              ? "buttonSMSelectedPlaying"
              : bpm != 10 && animate
              ? "buttonSMPlaying"
              : bpm == 10 && !animate
              ? "buttonSMSelected"
              : "buttonSM"
          }
          onClick={() => setBpm(10)}
        >
          slow
        </button>
        <button
          disabled={animate}
          className={
            bpm == 7 && animate
              ? "buttonSMSelectedPlaying"
              : bpm != 7 && animate
              ? "buttonSMPlaying"
              : bpm == 7 && !animate
              ? "buttonSMSelected"
              : "buttonSM"
          }
          onClick={() => setBpm(7)}
        >
          medium
        </button>
        <button
          disabled={animate}
          className={
            bpm == 4 && animate
              ? "buttonSMSelectedPlaying"
              : bpm != 4 && animate
              ? "buttonSMPlaying"
              : bpm == 4 && !animate
              ? "buttonSMSelected"
              : "buttonSM"
          }
          onClick={() => setBpm(4)}
        >
          fast
        </button>
      </div>
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
          <rect fill="#d97706" width="800" height="0.5" />
        </g>
      </svg> */}
    </div>
  );
};

export default Line;
