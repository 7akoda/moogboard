import React from "react";

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
    <svg
      className="absolute top-[193.2dvh] w-[99dvw]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="9.083 15.229 3.834 0.606"
    >
      <path
        d="
M 9.26 15.229
C 9.083 15.229 9.019 15.368 9.144 15.569
C 9.312 15.835 9.513 15.815 10 15.815
L 11 15.815
L 11 15.634
C 10.681 15.631 10.698 15.229 10.488 15.229
L 10.001 15.229

M 12.74 15.229
C 12.917 15.229 12.981 15.368 12.856 15.569
C 12.688 15.835 12.487 15.815 12 15.815
L 11 15.815
L 11 15.634
C 11.319 15.631 11.302 15.229 11.512 15.229
L 11.999 15.229
"
        fill="#e8e9eb"
      />
    </svg>
  );
};
