import type { MetaFunction } from "@remix-run/node";
import boomboardImage from '../images/boomboard.png';
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
   <div>
    <div style = {{width: 652, position: "absolute", backgroundColor: "#56666B"}}>
    <img style={{ height: 1000 }} src={boomboardImage} alt="Boomboard"/>
    </div>
    <div style={{position: "absolute", height: 1000, width: 652, paddingLeft: 65}}></div>
    </div>
  );
}
