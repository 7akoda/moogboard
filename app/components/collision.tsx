import { useState, useEffect } from "react";
import * as Tone from "tone";

const useCollision = () => {
  const [playing, setPlaying] = useState<boolean>(false);

  const playTone = () => {
    console.log("Tone Played");
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("c2", "8n");
  };

  useEffect(() => {
    let resetState: NodeJS.Timeout;
    const checkForElements = setInterval(() => {
      const holds = document.querySelectorAll(".svgHoldSelected");
      const line = document.querySelector(".lineMoving");

      if (holds.length > 0 && line) {
        clearInterval(checkForElements);
        console.log("initial if - collision detection started");
        startCollisionDetection();
      }
    }, 10);

    let animationFrameId: number;

    const checkCollision = () => {
      const holds = document.querySelectorAll(".svgHoldSelected");
      const line = document.querySelector(".lineMoving");

      if (!line || holds.length === 0) {
        return;
      }

      const lineRect = line.getBoundingClientRect();

      for (const svg of holds) {
        const svgRect = svg.getBoundingClientRect();

        if (
          lineRect.y + lineRect.height >= svgRect.y &&
          lineRect.y <= svgRect.y + svgRect.height &&
          !playing
        ) {
          setPlaying(true);
          cancelAnimationFrame(animationFrameId);
          playTone();

          return;
        }
      }
    };

    const startCollisionDetection = () => {
      checkCollision();
      animationFrameId = requestAnimationFrame(startCollisionDetection);
    };

    resetState = setTimeout(() => {
      setPlaying(false);
      console.log("ready to play again");
    }, 5000);

    return () => {
      clearInterval(checkForElements);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resetState);
    };
  }, [playing]);

  return { playing, setPlaying };
};

export default useCollision;
