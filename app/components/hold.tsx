import React, { useState, useEffect } from "react";
import * as Tone from "tone";

interface HoldProps {
  fill: string;
  d: string;
  note: Tone.Unit.Frequency;
  SynthProp:
    | typeof Tone.Synth
    | typeof Tone.FMSynth
    | typeof Tone.AMSynth
    | typeof Tone.PluckSynth;
  reverbValue: number;
}

const Hold: React.FC<HoldProps> = ({
  fill,
  d,
  note,
  SynthProp,
  reverbValue,
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick: React.MouseEventHandler<SVGSVGElement> = async () => {
    setSelected(!selected);
  };

  return (
    <>
      <svg
        onClick={handleClick}
        className={`${selected ? "svgHoldSelected" : "svgHoldNotSelected"}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={fill} d={d} />
      </svg>
    </>
  );
};

export default Hold;
