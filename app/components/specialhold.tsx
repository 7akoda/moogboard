import React, { useState } from "react";
import * as Tone from "tone";
import useCollision from "./collision";

interface HoldProps {
  fill: string;
  d: string;
  note: Tone.Unit.Frequency[];
  SynthProp:
    | typeof Tone.Synth
    | typeof Tone.FMSynth
    | typeof Tone.AMSynth
    | typeof Tone.MonoSynth;

  viewBox: string;
  id: string;
}

const Hold: React.FC<HoldProps> = ({
  fill,
  d,
  note,
  SynthProp,
  id,
  viewBox,
}) => {
  const [selected, setSelected] = useState<boolean>(false);
  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    setSelected(!selected);
  };

  const playTone = () => {
    const reverb = new Tone.Reverb(6).toDestination();
    const compressor = new Tone.Compressor({
      threshold: -18,
      ratio: 4,
      attack: 0.01,
      release: 0.1,
    });

    if (SynthProp == Tone.Synth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "pulse",
          width: 0.4,
        },
        envelope: {
          attack: 0.02,
          decay: 0.15,
          sustain: 0.3,
          release: 1.2,
        },
      }).toDestination();

      const pulseFilter = new Tone.Filter({
        type: "bandpass",
        frequency: 1000,
        Q: 2,
      }).toDestination();
      synth.chain(pulseFilter, reverb, compressor);
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.AMSynth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "triangle",
        },
        envelope: {
          attack: 1,
          decay: 2,
          sustain: 0.7,
          release: 3,
        },
      }).toDestination();

      const filter = new Tone.Filter({
        type: "highpass",
        frequency: 400,
        rolloff: -12,
        Q: 2,
      }).toDestination();

      synth.chain(filter, reverb, compressor);
      synth.volume.value = +14;
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.FMSynth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "sawtooth",
        },
        envelope: {
          attack: 0.05,
          decay: 0.3,
          sustain: 0.4,
          release: 2,
        },
      }).toDestination();

      const filter = new Tone.Filter({
        type: "bandpass",
        frequency: 800,
        rolloff: -24,
        Q: 8,
      }).toDestination();

      synth.chain(filter, reverb, compressor);
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.MonoSynth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "square",
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.1,
          release: 1.5,
        },
      }).toDestination();

      const filter = new Tone.Filter({
        type: "lowpass",
        frequency: 1200,
        rolloff: -12,
        Q: 1,
      }).toDestination();

      synth.chain(filter, reverb, compressor);
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
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
