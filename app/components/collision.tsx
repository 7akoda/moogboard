import { useState, useEffect } from "react";
import * as Tone from "tone";

const useCollision = () => {
  const [playing, setPlaying] = useState<boolean>(false);
  const triggeredSvgs = new Set<Element>();

  useEffect(() => {
    const checkForElements = setInterval(() => {
      const holds = document.querySelectorAll(".svgHoldSelected");
      const line = document.querySelector(".lineMoving");

      if (holds.length > 0 && line) {
        clearInterval(checkForElements);
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
        if (triggeredSvgs.has(svg)) continue;
        const svgRect = svg.getBoundingClientRect();

        if (
          lineRect.y + lineRect.height >= svgRect.y &&
          lineRect.y <= svgRect.y + svgRect.height
        ) {
          triggeredSvgs.add(svg);
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

    triggeredSvgs.clear();

    return () => {
      clearInterval(checkForElements);
      cancelAnimationFrame(animationFrameId);
    };
  }, [playing]);

  return { playing, setPlaying };
};

export default useCollision;
