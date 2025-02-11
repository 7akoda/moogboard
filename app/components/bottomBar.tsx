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
        className="fixed bottom-[-7px] w-full z-20 opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="9 15.2 4 0.7"
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
        className="fixed bottom-[-11px] w-full z-20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="9 15.2 4 0.7"
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
