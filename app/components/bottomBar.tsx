import React from "react";
import PopUp from "./popUp";
import PopUpSearch from "./popUpSearch";
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
        className="absolute -bottom-full w-full z-10"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="9.083 15.229 3.834 0.48"
      >
        <path
          d="
M 9 15.229 
L 9 15.815 
L 11 15.815 
L 11 15.634 
C 10.681 15.631 10.698 15.229 10.488 15.229 
L 10.001 15.229 
L 9 15.229 
L 9 15.815

M 13 15.229 
L 13 15.815 
L 11 15.815 
L 11 15.634 
C 11.319 15.631 11.302 15.229 11.512 15.229 
L 11.999 15.229 
L 13 15.229
"
          fill="#e8e9eb"
        />
      </svg>
      <PopUp
        animate={animate}
        handleClick={handleClick}
        bpm={bpm}
        setBpm={setBpm}
      />
    </>
  );
};
