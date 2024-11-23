import React, { useState } from "react";
interface HoldProps {
  fill: string;
  d: string;
  viewBox: string;
}

const Hold: React.FC<HoldProps> = ({ fill, d, viewBox }) => {
  const [selected, setSelected] = useState<boolean>(false);
  const handleClick: React.MouseEventHandler<SVGSVGElement> = () => {
    setSelected(!selected);
  };

  return (
    <>
      <svg
        viewBox={viewBox}
        onClick={handleClick}
        className={
          selected
            ? "cursor-pointer animate-pulse "
            : "cursor-pointer hover:opacity-40 transition-opacity duration-200 ease-in"
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={fill} d={d} />
      </svg>
    </>
  );
};

export default Hold;
