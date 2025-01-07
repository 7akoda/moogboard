import React, { useState } from "react";
import * as Tone from "tone";
import useCollision from "./collision";
import wav from "../mp3/supersaw1.wav";
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
    const compressor = new Tone.Compressor({
      threshold: -18,
      ratio: 4,
      attack: 0.01,
      release: 0.1,
    });

    if (SynthProp == Tone.Synth) {
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth
        .triggerAttackRelease(note, "10n")
        .connect(reverb)
        .connect(compressor);
      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.AMSynth) {
      const synth = new Tone.PolySynth(Tone.AMSynth).toDestination();
      synth
        .triggerAttackRelease(note, "10n")
        .connect(reverb)
        .connect(compressor);

      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.FMSynth) {
      const synth = new Tone.PolySynth(Tone.FMSynth).toDestination();
      synth
        .triggerAttackRelease(note, "10n")
        .connect(reverb)
        .connect(compressor);

      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.MonoSynth) {
      const buffer = new Tone.ToneAudioBuffer(wav, () => {
        console.log("Buffer loaded");

        const sampler = new Tone.Sampler({
          c3: buffer,
        }).toDestination();

        const reverb = new Tone.Reverb().toDestination();
        const compressor = new Tone.Compressor().toDestination();
        sampler.connect(reverb).connect(compressor);

        sampler.triggerAttackRelease(note, "10n");

        setTimeout(() => sampler.dispose(), 1200);
      });
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
