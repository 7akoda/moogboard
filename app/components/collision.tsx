import React, { useState, useEffect, useRef } from "react";
import Hold, { HoldRef } from "./hold";

const useCollision = () => {
  const [playing, setPlaying] = useState<boolean>(false);

  const triggeredSvgs = new Set<Element>();

  const holdRefs = useRef<Map<Element, React.RefObject<HoldRef>>>(new Map());

  useEffect(() => {
    const checkForElements = setInterval(() => {
      const holds = document.querySelectorAll(".svgHoldSelected");
      const line = document.querySelector(".lineMoving");

      if (holds.length > 0 && line) {
        holds.forEach((hold) => {
          if (!holdRefs.current.has(hold)) {
            holdRefs.current.set(hold, React.createRef());
          }
        });
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

          const holdRef = holdRefs.current.get(svg);
          if (holdRef?.current) {
            holdRef.current.playTone();
            return;
          }
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

  return { playing, setPlaying, holdRefs };
};
export default useCollision;
