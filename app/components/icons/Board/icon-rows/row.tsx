interface rowProps {
  children: any;
}

const Row: React.FC<rowProps> = ({ children }) => {
  return (
    <>
      <svg viewBox="-2.67425 -11.8885 242.5 24.57">{children}</svg>
    </>
  );
};

export default Row;
