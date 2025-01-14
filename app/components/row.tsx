interface rowProps {
  children: any;
  viewBox: string;
}

const Row: React.FC<rowProps> = ({ children, viewBox }) => {
  return (
    <>
      <svg
        className="max-w-[80%] max-h-[5.55555555555555555555555555555555555%]"
        viewBox={viewBox}
      >
        {children}
      </svg>
    </>
  );
};

export default Row;
