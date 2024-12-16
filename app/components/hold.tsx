import React, { useState } from "react";
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

  const playTone = () => {
    // const dist = new Tone.Reverb(reverbValue).toDestination();
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("c2", "8n");
    // .connect(dist);
  };

  if (typeof document !== "undefined") {
    const checkForElements = setInterval(() => {
      const holds = document.querySelectorAll(".svgHoldSelected");
      const line = document.querySelector(".lineMoving");
      if (holds.length > 0 && line) {
        clearInterval(checkForElements);
        startCollisionDetection();
      }
    }, 100);

    let isColliding = false;

    const checkCollision = () => {
      const holds = document.querySelectorAll(".svgHoldSelected");
      const line = document.querySelector(".lineMoving");

      if (!line || holds.length === 0) {
        return;
      }

      const lineRect = line.getBoundingClientRect();

      holds.forEach((svg, index) => {
        const svgRect = svg.getBoundingClientRect();

        if (
          lineRect.y + lineRect.height >= svgRect.y &&
          lineRect.y <= svgRect.y + svgRect.height &&
          !isColliding
        ) {
          playTone();
          isColliding = true;
        }
      });
    };

    const startCollisionDetection = () => {
      requestAnimationFrame(startCollisionDetection);
      checkCollision();
    };
  }

  return (
    <>
      <svg
        onClick={handleClick}
        className={`baseSvgHold ${
          selected ? "svgHoldSelected" : "svgHoldNotSelected"
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={fill} d={d} />
      </svg>
    </>
  );
};

export default Hold;
