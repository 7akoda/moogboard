import type { MetaFunction } from "@remix-run/node";

import Row18 from "../components/row18";

export const meta: MetaFunction = () => {
  return [
    { title: "MoogBoard" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    
   <div className="px-[5vw]">
   
  <Row18/>

  
    </div>
  );
}
