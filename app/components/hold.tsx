interface HoldProps {
    holdId: string;
  }
  
  const Hold: React.FC<HoldProps> = ({ holdId }) => {
   return(
    
    <img className="" src = {holdId} alt="hold"></img>
    
   )
  };
  
  export default Hold