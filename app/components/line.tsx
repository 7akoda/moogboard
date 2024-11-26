import React, { useState } from "react";

interface lineProps {
  style: React.CSSProperties;
}

const Line: React.FC<lineProps> = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 290.658 290.658">
      <g>
        <g>
          <rect
            y="139.474"
            fill="#d97706"
            opacity={0.5}
            width="800"
            height="3.5"
          />
        </g>
      </g>
    </svg>
  );
};

export default Line;
