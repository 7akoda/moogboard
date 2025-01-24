interface rowProps {
  children: any;
  viewBox: string;
}

const Row: React.FC<rowProps> = ({ viewBox, children }) => {
  return (
    <svg className="max-w-[80dvw] max-h-[5dvh]" viewBox={viewBox}>
      {children}
    </svg>
  );
};

export default Row;
