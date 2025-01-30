import { useState, useEffect } from "react";
import * as Tone from "tone";
import Hold from "./hold";
import Row from "./row";
import { fetchClimbById } from "~/lib/climbService";
import { holdData18 } from "../../data/holdData18";
import { holdData17 } from "../../data/holdData17";
import { holdData16 } from "../../data/holdData16";
import { holdData15 } from "../../data/holdData15";
import { holdData14 } from "../../data/holdData14";
import { holdData13 } from "../../data/holdData13";
import { holdData12 } from "../../data/holdData12";
import { holdData11 } from "../../data/holdData11";
import { holdData10 } from "../../data/holdData10";
import { holdData9 } from "../../data/holdData9";
import { holdData8 } from "../../data/holdData8";
import { holdData7 } from "../../data/holdData7";
import { holdData6 } from "../../data/holdData6";
import { holdData5 } from "../../data/holdData5";
import { holdData4 } from "../../data/holdData4";
import { holdData3 } from "../../data/holdData3";
import { holdData2 } from "../../data/holdData2";
import { holdData1 } from "../../data/holdData1";

const Board = () => {
  interface Climb {
    id: number;
    name: string;
    hold_ids: string[];
  }
  const [climb, setClimb] = useState<Climb | null>(null);

  useEffect(() => {
    async function getClimb() {
      try {
        const data = await fetchClimbById(1);
        setClimb(data);
      } catch (error) {
        console.error("Error fetching climb:", error);
      }
    }
    getClimb();
  }, []);

  if (!climb) {
    return; // Or null to render nothing
  }

  // active={climb?.hold_ids.includes(Number("188"))}
  console.log(climb);
  return (
    <>
      <Row viewBox="0 0 242.5 24.57 ">
        {holdData18.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData17.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData16.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData15.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData14.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData13.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData12.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData11.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>

      <Row viewBox="0 0 242.5 24.57">
        {holdData10.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData9.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData8.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData7.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData6.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData5.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>

      <Row viewBox="0 0 242.5 24.57">
        {holdData4.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData3.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData2.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
      <Row viewBox="0 0 242.5 24.57">
        {holdData1.map((hold) => (
          <Hold
            active={climb?.hold_ids.includes(hold.id)}
            viewBox={hold.viewBox}
            key={hold.id}
            id={hold.id}
            SynthProp={hold.SynthProp}
            note={hold.note}
            fill={hold.fill}
            d={hold.d}
          />
        ))}
      </Row>
    </>
  );
};

export default Board;
