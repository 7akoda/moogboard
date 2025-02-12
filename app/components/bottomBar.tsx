import React from "react";
import PopUpPlay from "./popUpPlay";
import PopUpSearch from "./popUpSearch";
import { PopUpInfo } from "./popUpInfo";

interface Climb {
  id: number;
  name: string;
  description: string;
  grade: string;
  hold_ids: string[];
}

interface bottomBarProps {
  animate: boolean;
  handleClick: () => void;
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
  setClimb: React.Dispatch<React.SetStateAction<Climb | null>>;
  climb: Climb | null;
}

export const BottomBar: React.FC<bottomBarProps> = ({
  animate,
  handleClick,
  bpm,
  setBpm,
  climb,
  setClimb,
}) => {
  return (
    <>
      <svg
        className=" fixed w-[100dvw] max-h-[100px] opacity-50 bottom-[-7px] z-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="9 15.2 4 0.64"
      >
        <path
          d="
          M 9 15.229
L 9 15.815
L 11 15.815
L 11 15.634
C 10.667 15.634 10.667 15.229 10.5 15.229
H 11.5
C 11.333 15.229 11.333 15.634 11 15.634
L 11 15.815
L 13 15.815
L 13 15.229
H 9
"
          fill="#e8e9eb"
        />
      </svg>
      <svg
        className="fixed w-[100dvw] bottom-[-11px] max-h-[100px] z-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="9 15.2 4 0.64"
      >
        <path
          d="
      M 9 15.229
L 9 15.815
L 11 15.815
L 11 15.634
C 10.667 15.634 10.667 15.229 10.5 15.229
H 11.5
C 11.333 15.229 11.333 15.634 11 15.634
L 11 15.815
L 13 15.815
L 13 15.229
H 9
    "
          fill="#e8e9eb"
        />
      </svg>
      <PopUpPlay
        animate={animate}
        handleClick={handleClick}
        bpm={bpm}
        setBpm={setBpm}
      />
      <PopUpSearch climb={climb} setClimb={setClimb} />
      <PopUpInfo />
    </>
  );
};
