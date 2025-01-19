interface bpmProps {
  animate: boolean;
  handleClick: () => void;
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
}
export const BpmControl: React.FC<bpmProps> = ({
  animate,
  handleClick,
  bpm,
  setBpm,
}) => {
  return (
    <div className="flex flex-col justify-start items-center">
      <button
        disabled={animate}
        className={animate ? "buttonPlaying" : "button"}
        onClick={handleClick}
      >
        play
      </button>
      <div className="flex flex-row ">
        <button
          disabled={animate}
          className={
            bpm == 10 && animate
              ? "buttonSMSelectedPlaying"
              : bpm != 10 && animate
              ? "buttonSMPlaying"
              : bpm == 10 && !animate
              ? "buttonSMSelected"
              : "buttonSM"
          }
          onClick={() => setBpm(10)}
        >
          slow
        </button>
        <button
          disabled={animate}
          className={
            bpm == 7 && animate
              ? "buttonSMSelectedPlaying"
              : bpm != 7 && animate
              ? "buttonSMPlaying"
              : bpm == 7 && !animate
              ? "buttonSMSelected"
              : "buttonSM"
          }
          onClick={() => setBpm(7)}
        >
          medium
        </button>
        <button
          disabled={animate}
          className={
            bpm == 4 && animate
              ? "buttonSMSelectedPlaying"
              : bpm != 4 && animate
              ? "buttonSMPlaying"
              : bpm == 4 && !animate
              ? "buttonSMSelected"
              : "buttonSM"
          }
          onClick={() => setBpm(4)}
        >
          fast
        </button>
      </div>
    </div>
  );
};
