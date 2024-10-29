interface HoldProps {
    holdId: string;
  }
  
  const Hold: React.FC<HoldProps> = ({ holdId }) => {
   return(
    <img className="w-[5%]" src = {holdId}></img>
   )
  };
  
  export default Hold