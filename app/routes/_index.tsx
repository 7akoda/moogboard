import type { MetaFunction } from "@remix-run/node";
import Board from "../components/Board/board";
import Mooglogo from "../components/Logos/moogboardlogo";
import { useState, useEffect } from "react";
import { Line } from "../components/line";
import { SideBar } from "~/components/sideBar";

import { BottomBar } from "~/components/bottomBar";
export const meta: MetaFunction = () => {
  return [
    { title: "MoogBoard" },
    { name: "description", content: "Welcome to Moogboard!" },
  ];
};

interface Climb {
  id: number;
  name: string;
  description: string;
  grade: string;
  hold_ids: string[];
}

export default function Index() {
  const [animate, setAnimate] = useState(false);
  const [bpm, setBpm] = useState(7);
  const [isClient, setIsClient] = useState(false);
  const [climb, setClimb] = useState<Climb | null>(null);
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
    return null;
  }

  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <Mooglogo></Mooglogo>
        <div className={isMobile ? "slide-in-mobile" : "slide-in"}>
          <Board climb={climb}></Board>
          <Line bpm={bpm} animate={animate}></Line>
          {isMobile ? (
            <BottomBar
              bpm={bpm}
              setBpm={setBpm}
              animate={animate}
              handleClick={handleClick}
              climb={climb}
              setClimb={setClimb}
            />
          ) : (
            <SideBar
              climb={climb}
              setClimb={setClimb}
              bpm={bpm}
              setBpm={setBpm}
              animate={animate}
              handleClick={handleClick}
            />
          )}
          {/* <MooglogoSmall /> */}
        </div>
      </div>
    </>
  );
}
