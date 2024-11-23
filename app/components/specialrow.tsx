interface rowProps {
  children: any;
}

const Row: React.FC<rowProps> = ({ children }) => {
  return (
    <>
      <svg>{children}</svg>
    </>
  );
};

export default Row;
