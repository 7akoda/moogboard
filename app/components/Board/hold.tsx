import React, { useState, useEffect } from "react";
import * as Tone from "tone";
import useCollision from "../collision";

interface HoldProps {
  fill: string;
  d: string;
  note: Tone.Unit.Frequency[];
  SynthProp:
    | typeof Tone.Synth
    | typeof Tone.FMSynth
    | typeof Tone.AMSynth
    | typeof Tone.MonoSynth;
  active: boolean | undefined;
  id: string;
  viewBox: string;
}

const Hold: React.FC<HoldProps> = ({
  fill,
  viewBox,
  d,
  note,
  SynthProp,
  active,
  id,
}) => {
  const [selected, setSelected] = useState<boolean>(false);

  const handleClick: React.MouseEventHandler<SVGSVGElement> = async () => {
    setSelected(!selected);
  };
  useEffect(() => {
    if (active) {
      setSelected(true);
    }
  }, []);

  const playTone = () => {
    const reverb = new Tone.Reverb(12).toDestination();
    const compressor = new Tone.Compressor({
      threshold: -18,
      ratio: 4,
      attack: 0.01,
      release: 0.1,
    });
    const fadeOutDuration = 1.5;

    if (SynthProp == Tone.Synth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "square",
        },
        envelope: {
          attack: 0.3,
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
      synth.volume.value = -11;
      synth.triggerAttackRelease(note, "12n");
      synth.volume.rampTo(-Infinity, fadeOutDuration);
      setTimeout(() => synth.dispose(), fadeOutDuration * 1000);
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
      synth.volume.value = +11;
      synth.triggerAttackRelease(note, "12n");
      synth.volume.rampTo(-Infinity, fadeOutDuration);
      setTimeout(() => synth.dispose(), fadeOutDuration * 1000);
    }
    if (SynthProp == Tone.FMSynth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: { type: "sine" },
        envelope: {
          attack: 1,
          decay: 0.5,
          sustain: 0.8,
          release: 2,
        },
      }).toDestination();

      const filter = new Tone.Filter({
        type: "lowpass",
        frequency: 1200,
        rolloff: -24,
        Q: 1.5,
      }).toDestination();

      synth.chain(filter, reverb, compressor);
      synth.volume.value = +2;
      synth.triggerAttackRelease(note, "12n");
      synth.volume.rampTo(-Infinity, fadeOutDuration);
      setTimeout(() => synth.dispose(), fadeOutDuration * 1000);
    }
    if (SynthProp == Tone.MonoSynth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "sawtooth",
        },
        envelope: {
          attack: 0.2,
          decay: 0.2,
          sustain: 0.2,
          release: 0.5,
        },
      }).toDestination();

      const filter = new Tone.Filter({
        type: "lowpass",
        frequency: 600,
        rolloff: -12,
        Q: 1,
      }).toDestination();

      synth.chain(filter, reverb, compressor);
      synth.volume.value = -9;
      synth.triggerAttackRelease(note, "12n");
      synth.volume.rampTo(-Infinity, fadeOutDuration);
      setTimeout(() => synth.dispose(), fadeOutDuration * 1000);
    }
  };

  useCollision(playTone, id);
  return (
    <svg
      viewBox={viewBox}
      id={`hold-${id}`}
      onClick={handleClick}
      className={`${selected ? "svgHoldSelected" : "svgHoldNotSelected"}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill={fill} d={d} />
    </svg>
  );
};
export default Hold;
