import React, { useState } from "react";
import * as Tone from "tone";
import useCollision from "./collision";
import mp3 from "../mp3/supersaw1.wav";

interface HoldProps {
  fill: string;
  d: string;
  note: Tone.Unit.Frequency[];
  SynthProp:
    | typeof Tone.Synth
    | typeof Tone.FMSynth
    | typeof Tone.AMSynth
    | typeof Tone.MonoSynth;
  reverbValue: number;
  viewBox: string;
  id: string;
}

const Hold: React.FC<HoldProps> = ({
  fill,
  d,
  note,
  SynthProp,
  reverbValue,
  id,
  viewBox,
}) => {
  const [selected, setSelected] = useState<boolean>(false);
  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    setSelected(!selected);
  };

  const playTone = () => {
    const reverb = new Tone.Reverb(reverbValue).toDestination();
    if (SynthProp == Tone.Synth) {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.triggerAttackRelease(note, "10n").connect(reverb);
    }
    if (SynthProp == Tone.AMSynth) {
      const synth = new Tone.PolySynth(Tone.AMSynth).toDestination();
      synth.triggerAttackRelease(note, "10n").connect(reverb);
    }
    if (SynthProp == Tone.FMSynth) {
      const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();
      synth.triggerAttackRelease(note, "10n").connect(reverb);
    }
    if (SynthProp == Tone.MonoSynth) {
      const synth = new Tone.PolySynth(Tone.MonoSynth).toDestination();
      synth.triggerAttackRelease(note, "10n").connect(reverb);
    }
  };
  useCollision(playTone, id);

  return (
    <>
      <svg
        viewBox={viewBox}
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
