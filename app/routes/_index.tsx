import type { MetaFunction } from "@remix-run/node";
import Board from "../components/board";
import Mooglogo from "../components/icons/Board/logos/moogboardlogo";
import Line from "../components/line";
export const meta: MetaFunction = () => {
  return [
    { title: "MoogBoard" },
    { name: "description", content: "Welcome to Moogboard!" },
  ];
};

export default function Index() {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col w-full h-screen justify-center items-center">
          <Mooglogo></Mooglogo>
        </div>
        <div className="flex flex-col w-full h-screen justify-center items-center">
          <Board></Board>
          <Line></Line>
        </div>
      </div>
    </>
  );
}
