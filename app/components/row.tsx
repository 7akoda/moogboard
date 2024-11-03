import Hold from "./hold"


interface RowProps {
    holdArray: string[]
}

const Row: React.FC<RowProps> = ({holdArray}) => {
    return (
        <div className="flex flex-row justify-center items-center">
       {holdArray.map((holdId, index) => (
        <Hold holdId={holdId} key={index} />
       ))}
        </div>
    );
};

export default Row