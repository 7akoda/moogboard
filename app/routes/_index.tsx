import type { MetaFunction } from "@remix-run/node";

import Row18 from "../components/row18";
import Row17 from "../components/row17";
import Row16 from "../components/row16";
import Row15 from "../components/row15";
import Row14 from "../components/row14";
import Row13 from "../components/row13";
import Row12 from "../components/row12";
import Row11 from "../components/row11";
import Row10 from "../components/row10";
import Row9 from "../components/row9";
import Row8 from "../components/row8";
import Row7 from "../components/row7";
import Row6 from "../components/row6";
import Row5 from "../components/row5";
import Row4 from "../components/row4";
import Row3 from "../components/row3";
import Row2 from "../components/row2";
import Row1 from "../components/row1";

export const meta: MetaFunction = () => {
  return [
    { title: "MoogBoard" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-full items-center">
      <div className=" scale-[40%] flex flex-wrap">
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
  );
}
