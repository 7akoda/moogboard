import React, { useState } from "react";
import * as Tone from "tone";

interface HoldProps {
  fill: string;
  d: string;
  note: Tone.Unit.Frequency;
  SynthProp: typeof Tone.Synth;
}

const Hold: React.FC<HoldProps> = ({ fill, d, note, SynthProp }) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    const synth = new SynthProp().toDestination();

    !selected ? synth.triggerAttackRelease(note, "4n") : console.log("pfft");
    setSelected(!selected);
  };

  return (
    <>
      <svg
        onClick={handleClick}
        className={
          selected
            ? "cursor-pointer animate-pulse stroke-amber-600"
            : "cursor-pointer hover:opacity-40 transition-opacity duration-150 ease-in"
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={fill} d={d} />
      </svg>
    </>
  );
};

export default Hold;
