import type { MetaFunction } from "@remix-run/node";

import Row18 from "../components/rows/row18";
import Row17 from "../components/rows/row17";
import Row16 from "../components/rows/row16";
import Row15 from "../components/rows/row15";
import Row14 from "../components/rows/row14";
import Row13 from "../components/rows/row13";
import Row12 from "../components/rows/row12";
import Row11 from "../components/rows/row11";
import Row10 from "../components/rows/row10";
import Row9 from "../components/rows/row9";
import Row8 from "../components/rows/row8";
import Row7 from "../components/rows/row7";
import Row6 from "../components/rows/row6";
import Row5 from "../components/rows/row5";
import Row4 from "../components/rows/row4";
import Row3 from "../components/rows/row3";
import Row2 from "../components/rows/row2";
import Row1 from "../components/rows/row1";
import Mooglogo from "../components/icons/Board/logos/moogboardlogo";

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
        <Mooglogo></Mooglogo>
        <div className="flex flex-col w-full h-screen justify-center items-center"></div>
        <div className="flex flex-col w-full h-screen justify-center items-center">
          <Row18></Row18>
          <Row17></Row17>
          <Row16></Row16>
          <Row15></Row15>
          <Row14></Row14>
          <Row13></Row13>
          <Row12></Row12>
          <Row11></Row11>
          <Row10></Row10>
          <Row9></Row9>
          <Row8></Row8>
          <Row7></Row7>
          <Row6></Row6>
          <Row5></Row5>
          <Row4></Row4>
          <Row3></Row3>
          <Row2></Row2>
          <Row1></Row1>
        </div>
      </div>
    </>
  );
}
