interface rowProps {
  children: any;
  viewBox: string;
}

const Row: React.FC<rowProps> = ({ viewBox, children }) => {
  return <svg viewBox={viewBox}>{children}</svg>;
};

export default Row;
