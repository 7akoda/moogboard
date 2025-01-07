import React, { useEffect, useRef } from "react";
import playing from "./board";
const useCollision = (callback: () => void, id: string) => {
  const triggeredHolds = useRef(new Set<string>());

  useEffect(() => {
    const checkForElements = setInterval(() => {
      const holds = document.querySelectorAll(".svgHoldSelected");
      const line = document.querySelector(
        ".lineMoving4, .lineMoving7, .lineMoving10"
      );

      if (holds.length > 0 && line) {
        clearInterval(checkForElements);
        startCollisionDetection();
      }
    }, 10);

    let animationFrameId: number;

    const checkCollision = () => {
      const holds = document.querySelectorAll(".svgHoldSelected");
      const line = document.querySelector(
        ".lineMoving4, .lineMoving7, .lineMoving10"
      );

      if (!line || holds.length === 0) {
        cancelAnimationFrame(animationFrameId);
        return;
      }

      const lineRect = line.getBoundingClientRect();

      for (const svg of holds) {
        const svgId = svg.id.replace("hold-", "");
        if (triggeredHolds.current.has(svgId)) continue;
        const svgRect = svg.getBoundingClientRect();

        if (
          lineRect.y + lineRect.height >= svgRect.y &&
          lineRect.y <= svgRect.y + svgRect.height
        ) {
          triggeredHolds.current.add(svgId);

          if (svgId === id) {
            callback();
            cancelAnimationFrame(animationFrameId);
            return;
          }
        }
      }
    };

    const startCollisionDetection = () => {
      checkCollision();
      animationFrameId = requestAnimationFrame(startCollisionDetection);
    };

    return () => {
      clearInterval(checkForElements);
      cancelAnimationFrame(animationFrameId);
      triggeredHolds.current.clear();
    };
  }, [callback, id, playing]);
};

export default useCollision;
