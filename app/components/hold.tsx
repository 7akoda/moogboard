import React, { useState } from "react";
import * as Tone from "tone";
import useCollision from "./collision";
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

  id: string;
}

const Hold: React.FC<HoldProps> = ({
  fill,
  d,
  note,
  SynthProp,
  reverbValue,
  id,
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick: React.MouseEventHandler<SVGSVGElement> = async () => {
    setSelected(!selected);
  };

  const playTone = () => {
    const reverb = new Tone.Reverb(reverbValue).toDestination();
    const synth = new SynthProp().toDestination();
    synth.triggerAttackRelease(note, "8n").connect(reverb);
  };
  useCollision(playTone, id);
  return (
    <>
      <svg
        id={`hold-${id}`}
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
