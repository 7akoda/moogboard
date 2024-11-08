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

export const meta: MetaFunction = () => {
  return [
    { title: "MoogBoard" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="px-[5vw] ">
      <Row18></Row18>
      <Row17></Row17>
      <Row16></Row16>
      <Row15></Row15>
      <Row14></Row14>
      <Row13></Row13>
      <Row12></Row12>
      <Row11></Row11>
      <Row10></Row10>
    </div>
  );
}
