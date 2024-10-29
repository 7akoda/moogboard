import type { MetaFunction } from "@remix-run/node";
import Row from "../components/row"
import holdsArray from "~/data/holdArrays";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
   <div className="bg-gray-400">
    {Array.from({ length: 18 }).map((_, i) => (
  <Row key={i} holdArray={holdsArray[17 - i]} />
))}
  
    </div>
  );
}
