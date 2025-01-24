import type { MetaFunction } from "@remix-run/node";
import Board from "../components/Board/board";
import Mooglogo from "../components/Logos/moogboardlogo";
import MooglogoSmall from "../components/Logos/moogboardlogoSmall";
import PopUp from "~/components/popUp";
import { useState, useEffect } from "react";
import { Line } from "../components/line";
import { PopOut } from "~/components/popOut";
export const meta: MetaFunction = () => {
  return [
    { title: "MoogBoard" },
    { name: "description", content: "Welcome to Moogboard!" },
  ];
};

export default function Index() {
  const [animate, setAnimate] = useState(false);
  const [bpm, setBpm] = useState(7);
  const [isClient, setIsClient] = useState(false);
  const handleClick = () => {
    setTimeout(() => setAnimate(true), 0);
    setTimeout(
      () => setAnimate(false),
      bpm === 10 ? 9999 : bpm === 7 ? 6999 : bpm === 4 ? 3999 : 9999
    );
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; //
  }

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="flex flex-col w-full h-[100dvh] justify-center items-center">
          <Mooglogo></Mooglogo>
        </div>
        <div className="flex flex-col justify-center items-center w-screen h-[100dvh] max-w-[750px] overflow-hidden">
          <Board></Board>
          <Line bpm={bpm} animate={animate}></Line>
          {isMobile ? (
            <PopUp
              bpm={bpm}
              setBpm={setBpm}
              animate={animate}
              handleClick={handleClick}
            />
          ) : (
            <PopOut
              bpm={bpm}
              setBpm={setBpm}
              animate={animate}
              handleClick={handleClick}
            />
          )}
          <MooglogoSmall />
        </div>
      </div>
    </>
  );
}
