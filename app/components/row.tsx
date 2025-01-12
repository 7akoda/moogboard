interface rowProps {
  children: any;
  viewBox: string;
}

const Row: React.FC<rowProps> = ({ children, viewBox }) => {
  return (
    <>
      <svg className="w-[80%]" viewBox={viewBox}>
        {children}
      </svg>
    </>
  );
};

export default Row;
