import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { useEffect, useState } from "react";

export function Layout({ children }: { children: React.ReactNode }) {
  const [scrollClass, setScrollClass] = useState("bg-[#f5f5f5]");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 12) {
        setScrollClass("bg-[#f5f5f5]");
      } else {
        setScrollClass("bg-[#20616a]");
      }
    };
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <html lang="en" className={scrollClass}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/faviconHold.svg" type="image/svg+xml"></link>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/cyp4jyx.css"
        ></link>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
