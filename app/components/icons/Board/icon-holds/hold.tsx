interface HoldProps {
  fill: string;
  d: string;
}

const Hold: React.FC<HoldProps> = ({ fill, d }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2.67425 -11.8885 242.5 24.57"
      >
        <path fill={fill} d={d} />
      </svg>
    </>
  );
};

export default Hold;
