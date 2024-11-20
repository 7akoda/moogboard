import Row18 from "../components/icons/Board/icon-rows/row18";
import Row17 from "../components/icons/Board/icon-rows/row17";
import Row16 from "../components/icons/Board/icon-rows/row16";
import Row15 from "../components/icons/Board/icon-rows/row15";
import Row14 from "../components/icons/Board/icon-rows/row14";
import Row13 from "../components/icons/Board/icon-rows/row13";
import Row12 from "../components/icons/Board/icon-rows/row12";
import Row11 from "../components/icons/Board/icon-rows/row11";
import Row10 from "../components/icons/Board/icon-rows/row10";
import Row9 from "../components/icons/Board/icon-rows/row9";
import Row8 from "../components/icons/Board/icon-rows/row8";
import Row7 from "../components/icons/Board/icon-rows/row7";
import Row6 from "../components/icons/Board/icon-rows/row6";
import Row5 from "../components/icons/Board/icon-rows/row5";
import Row4 from "../components/icons/Board/icon-rows/row4";
import Row3 from "../components/icons/Board/icon-rows/row3";
import Row2 from "../components/icons/Board/icon-rows/row2";
import Row1 from "../components/icons/Board/icon-rows/row1";

import React, { useState } from "react";
import * as Tone from "tone";

const Board = () => {
  const [synth, setSynth] = useState<Tone.AMSynth | null>(null);
  const [selected, setSelected] = useState<boolean>(false);
  const handleBlackClick = async (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if (selected) {
      console.log("hold selected!");
    }
    //     if (!synth) {
    //       await Tone.start();
    //       const newSynth = new Tone.AMSynth().toDestination();
    //       setSynth(newSynth);
    //     }
    //     synth?.triggerAttack("C4", "+0.5");
    //     synth?.triggerAttack("C3", "+1");
    //     synth?.triggerAttack("C2", "+1.5");
    //     synth?.triggerAttack("C1", "+2");
  };

  return (
    <>
      <Row18
        selected={selected}
        setSelected={setSelected}
        handleBlackClick={handleBlackClick}
      ></Row18>
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
    </>
  );
};
export default Board;
