import React, { useState } from "react";
import * as Tone from "tone";

const BlackButton = () => {
  const [synth, setSynth] = useState<Tone.AMSynth | null>(null);

  const handleClick = async () => {
    if (!synth) {
      await Tone.start();
      const synth1 = new Tone.AMSynth().toDestination();
      setSynth(synth1);
    }
    synth?.triggerAttackRelease("a2", "1n");
  };

  return (
    <button
      className="z-10 h-3 w-5 bg-emerald-600"
      onClick={handleClick}
    ></button>
  );
};

export default BlackButton;
