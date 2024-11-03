import type { MetaFunction } from "@remix-run/node";
import Row from "../components/row"
import holdsArray from "~/data/holdArrays";
export const meta: MetaFunction = () => {
  return [
    { title: "MoogBoard" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
   <div className="">
    
    {Array.from({ length: 18 }).map((_, i) => (
  <Row key={i} holdArray={holdsArray[17 - i]} />
))}
    </div>
  );
}
