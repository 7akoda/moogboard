import React, { useState } from "react";
import * as Tone from "tone";
import useCollision from "./collision";
import mp3 from "../mp3/";

interface HoldProps {
  fill: string;
  d: string;
  viewBox: string;
  id: string;
}

const Hold: React.FC<HoldProps> = ({ fill, d, viewBox, reverbValue, id }) => {
  const [selected, setSelected] = useState<boolean>(false);
  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    setSelected(!selected);
  };

  const playTone = () => {
    const reverb = new Tone.Reverb(reverbValue).toDestination();
    const sampler = new Tone.Sampler({
      urls: {
        a1: "lalala.mp3",
      },
      baseUrl: "../mp3/",
    }).toDestination();
    sampler.triggerAttackRelease("", 12.5).connect(reverb);
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
