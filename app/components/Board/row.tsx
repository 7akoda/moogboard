interface rowProps {
  children: any;
  viewBox: string;
}

const Row: React.FC<rowProps> = ({ children, viewBox }) => {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  return (
    <>
      <svg
        className={
          isMobile ? " max-w-[80dvw] max-h-[5dvh]" : " w-[45dvw] max-h-[5dvh]"
        }
        viewBox={viewBox}
      >
        {children}
      </svg>
    </>
  );
};

export default Row;
