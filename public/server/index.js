import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Outlet, Meta, Links, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useRef, useEffect, useState } from "react";
import * as Tone from "tone";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx("link", { rel: "icon", href: "/faviconHold.svg", type: "image/svg+xml" }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          href: "https://use.typekit.net/cyp4jyx.css"
        }
      ),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const useCollision = (callback, id) => {
  const triggeredHolds = useRef(/* @__PURE__ */ new Set());
  useEffect(() => {
    const checkForElements = setInterval(() => {
      const holds = document.querySelectorAll(".svgHoldSelected");
      const line = document.querySelector(
        ".lineMoving4, .lineMoving7, .lineMoving10"
      );
      if (holds.length > 0 && line) {
        clearInterval(checkForElements);
        startCollisionDetection();
      }
    }, 10);
    let animationFrameId;
    const checkCollision = () => {
      const holds = document.querySelectorAll(".svgHoldSelected");
      const line = document.querySelector(
        ".lineMoving4, .lineMoving7, .lineMoving10"
      );
      if (!line || holds.length === 0) {
        cancelAnimationFrame(animationFrameId);
        return;
      }
      const lineRect = line.getBoundingClientRect();
      for (const svg of holds) {
        const svgId = svg.id.replace("hold-", "");
        if (triggeredHolds.current.has(svgId)) continue;
        const svgRect = svg.getBoundingClientRect();
        if (lineRect.y + lineRect.height >= svgRect.y && lineRect.y <= svgRect.y + svgRect.height) {
          triggeredHolds.current.add(svgId);
          if (svgId === id) {
            callback();
            cancelAnimationFrame(animationFrameId);
            return;
          }
        }
      }
    };
    const startCollisionDetection = () => {
      checkCollision();
      animationFrameId = requestAnimationFrame(startCollisionDetection);
    };
    return () => {
      clearInterval(checkForElements);
      cancelAnimationFrame(animationFrameId);
      triggeredHolds.current.clear();
    };
  }, [callback, id, Board]);
};
const Hold$1 = ({
  fill,
  d,
  note,
  SynthProp,
  id
}) => {
  const [selected, setSelected] = useState(false);
  const handleClick = async () => {
    setSelected(!selected);
  };
  const playTone = () => {
    const reverb = new Tone.Reverb(6).toDestination();
    const compressor = new Tone.Compressor({
      threshold: -18,
      ratio: 4,
      attack: 0.01,
      release: 0.1
    });
    if (SynthProp == Tone.Synth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "pulse",
          width: 0.4
        },
        envelope: {
          attack: 0.02,
          decay: 0.15,
          sustain: 0.3,
          release: 1.2
        }
      }).toDestination();
      const pulseFilter = new Tone.Filter({
        type: "bandpass",
        frequency: 1e3,
        Q: 2
      }).toDestination();
      synth.chain(pulseFilter, reverb, compressor);
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.AMSynth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "triangle"
        },
        envelope: {
          attack: 1,
          decay: 2,
          sustain: 0.7,
          release: 3
        }
      }).toDestination();
      const filter = new Tone.Filter({
        type: "highpass",
        frequency: 400,
        rolloff: -12,
        Q: 2
      }).toDestination();
      synth.chain(filter, reverb, compressor);
      synth.volume.value = 10;
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.FMSynth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "sawtooth"
        },
        envelope: {
          attack: 0.05,
          decay: 0.3,
          sustain: 0.4,
          release: 2
        }
      }).toDestination();
      const filter = new Tone.Filter({
        type: "bandpass",
        frequency: 800,
        rolloff: -24,
        Q: 8
      }).toDestination();
      synth.chain(filter, reverb, compressor);
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.MonoSynth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "square"
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.1,
          release: 1.5
        }
      }).toDestination();
      const filter = new Tone.Filter({
        type: "lowpass",
        frequency: 1200,
        rolloff: -12,
        Q: 1
      }).toDestination();
      synth.chain(filter, reverb, compressor);
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
    }
  };
  useCollision(playTone, id);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "svg",
    {
      id: `hold-${id}`,
      onClick: handleClick,
      className: `${selected ? "svgHoldSelected" : "svgHoldNotSelected"}`,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx("path", { fill, d })
    }
  ) });
};
const Row$1 = ({ children, viewBox }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("svg", { viewBox, children }) });
};
const Row = ({ viewBox, children }) => {
  return /* @__PURE__ */ jsx("svg", { viewBox, children });
};
const Hold = ({
  fill,
  d,
  note,
  SynthProp,
  id,
  viewBox
}) => {
  const [selected, setSelected] = useState(false);
  const handleClick = () => {
    setSelected(!selected);
  };
  const playTone = () => {
    const reverb = new Tone.Reverb(6).toDestination();
    const compressor = new Tone.Compressor({
      threshold: -18,
      ratio: 4,
      attack: 0.01,
      release: 0.1
    });
    if (SynthProp == Tone.Synth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "pulse",
          width: 0.4
        },
        envelope: {
          attack: 0.02,
          decay: 0.15,
          sustain: 0.3,
          release: 1.2
        }
      }).toDestination();
      const pulseFilter = new Tone.Filter({
        type: "bandpass",
        frequency: 1e3,
        Q: 2
      }).toDestination();
      synth.chain(pulseFilter, reverb, compressor);
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.AMSynth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "triangle"
        },
        envelope: {
          attack: 1,
          decay: 2,
          sustain: 0.7,
          release: 3
        }
      }).toDestination();
      const filter = new Tone.Filter({
        type: "highpass",
        frequency: 400,
        rolloff: -12,
        Q: 2
      }).toDestination();
      synth.chain(filter, reverb, compressor);
      synth.volume.value = 14;
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.FMSynth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "sawtooth"
        },
        envelope: {
          attack: 0.05,
          decay: 0.3,
          sustain: 0.4,
          release: 2
        }
      }).toDestination();
      const filter = new Tone.Filter({
        type: "bandpass",
        frequency: 800,
        rolloff: -24,
        Q: 8
      }).toDestination();
      synth.chain(filter, reverb, compressor);
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
    }
    if (SynthProp == Tone.MonoSynth) {
      const synth = new Tone.PolySynth(Tone.Synth, {
        oscillator: {
          type: "square"
        },
        envelope: {
          attack: 0.01,
          decay: 0.1,
          sustain: 0.1,
          release: 1.5
        }
      }).toDestination();
      const filter = new Tone.Filter({
        type: "lowpass",
        frequency: 1200,
        rolloff: -12,
        Q: 1
      }).toDestination();
      synth.chain(filter, reverb, compressor);
      synth.triggerAttackRelease(note, "10n");
      setTimeout(() => synth.dispose(), 1200);
    }
  };
  useCollision(playTone, id);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "svg",
    {
      viewBox,
      id: `hold-${id}`,
      onClick: handleClick,
      className: `${selected ? "svgHoldSelected" : "svgHoldNotSelected"}`,
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsx("path", { fill, d })
    }
  ) });
};
const Line = ({ playing, setPlaying }) => {
  const [animate, setAnimate] = useState(false);
  const [bpm, setBpm] = useState(7);
  const handleClick = () => {
    setTimeout(() => setAnimate(true), 0);
    setTimeout(
      () => setAnimate(false),
      bpm === 10 ? 1e4 : bpm === 7 ? 7e3 : bpm === 4 ? 4e3 : 1e4
    );
    setPlaying(!playing);
  };
  return /* @__PURE__ */ jsxs("div", { className: " flex flex-col justify-start items-center ", children: [
    /* @__PURE__ */ jsxs("div", { className: animate == true ? "flex flex-col" : "flex flex-col", children: [
      /* @__PURE__ */ jsx("button", { disabled: animate, className: "button", onClick: handleClick, children: "play" }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row ", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: animate,
            className: bpm == 10 ? "buttonSMSelected" : "buttonSM",
            onClick: () => setBpm(10),
            children: "slow"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: animate,
            className: bpm == 7 ? "buttonSMSelected" : "buttonSM",
            onClick: () => setBpm(7),
            children: "medium"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            disabled: animate,
            className: bpm == 4 ? "buttonSMSelected" : "buttonSM",
            onClick: () => setBpm(4),
            children: "fast"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      "svg",
      {
        viewBox: "0 0 242.5 1.2",
        className: animate && bpm == 10 ? "lineMoving10" : animate && bpm == 7 ? "lineMoving7" : animate && bpm == 4 ? "lineMoving4" : "absolute h-auto opacity-0 ",
        xmlns: "http://www.w3.org/2000/svg",
        children: /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx("rect", { fill: "#d97706", width: "800", height: "0.5" }) })
      }
    )
  ] });
};
const Board = () => {
  const [playing, setPlaying] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "-2.67425 -11.8885 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "188",
          SynthProp: Tone.FMSynth,
          note: ["C3", "E3", "G3", "B3"],
          fill: "#313638",
          d: "M4.082-4.155c2.497-.014 4.877.712 7.298 1.587C15.098-1.327 16.749.228 16.723.638c-.022.677-1.712 1.735-2.968 2.019-2.221.574-4.084.35-6.016.371L.492 2.794c-2.214-.188-3.161-1.01-3.165-1.778-.036-1.475.708-2.357 2.194-3.554 1.724-1.263 3.006-1.5 4.559-1.618"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "189",
          SynthProp: Tone.Synth,
          note: ["C3", "E3", "G3", "B3"],
          fill: "#e8ceb8",
          d: "M19.973-3.07c1.693-.417 1.807-.398 3.517-.607 4.39-.456 12.058-.063 12.845 1.693.73 1.378.747 1.099-.457 1.712-6.242 2.631-8.626 3.388-11.925 4.427-2.497.82-2.008.733-2.715-.871l-2.081-4.87c-.569-1.141-.599-1.126.816-1.484"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "190",
          SynthProp: Tone.FMSynth,
          note: ["C3", "E3", "G3", "B3"],
          fill: "#313638",
          d: "M43.667 1.023c-.111-4.534-.259-4.563 1.331-4.504 3.928.14 7.855.279 11.794.346 4.488 0 4.251-.43 4.546 1.295.473 2.689.45 2.516-.167 2.768-1.565.513-3.13 1.026-4.686 1.606-2.932 1.142-2.829 1.161-5.007 1.112l-6.385-.095c-1.377-.07-1.279-.126-1.426-2.528"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "191",
          SynthProp: Tone.AMSynth,
          note: ["C3", "E3", "G3", "B3"],
          fill: "#e8e9eb",
          d: "M67.037-4.455c1.541-.752 2.62-1.367 4.973-1.668 2.589-.344 4.581-.299 6.976-.08 3.499.447 3.993 2.011 3.389 3.306C81.1.108 79.16 2.511 78.03 3.499c-2.079 1.78-3.022 2.175-4.34 2.18-2.655-.042-4.919-1.099-5.41-1.86-.697-1.066-1.581-4.52-1.807-5.55-.462-2.218-.758-2.027.564-2.724"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "192",
          SynthProp: Tone.Synth,
          note: ["C3", "E3", "G3", "B3"],
          fill: "#e8ceb8",
          d: "M87.723-2.32c2.88-.318 5.868-.628 9.25-.661 1.976 0 3.684-.209 4.269 2.091.26 1.224-1.322 2.815-2.468 3.141-2.169.528-4.404.176-6.824-.251-2.143-.419-4.747-.879-5.751-1.432-1.306-.611-1.733-2.612 1.524-2.888"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "193",
          SynthProp: Tone.MonoSynth,
          note: ["C3", "E3", "G3", "B3"],
          fill: "#ffe57f",
          d: "M116.408-3.42c1.654-.202 3.724-.095 4.442.001 1.32.189 1.204.351 1.416 1.294.146.838.181 1.405.189 1.998-.022.994.036 1.179-.947 1.398-1.337.376-3.396.6-4.362.686-1.393.122-1.373.194-1.433-.811A66 66 0 0 1 115.571-2c-.027-1.173-.086-1.3.837-1.42"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "194",
          SynthProp: Tone.Synth,
          note: ["C3", "E3", "G3", "B3"],
          fill: "#e8ceb8",
          d: "M138.085-9.107c.986-1.082 1.717-1.689 3.254-2.409 1.633-.52 2.64-.465 4.032-.024 2.358.703 3.695 2.123 4.301 3.812.717 2.171-.027 4.473-1.021 6.131-1.309 2.176-2.902 3.627-4.437 4.477-1.681.831-2.849 1.008-5.276-.744-1.943-1.716-2.102-3.078-2.265-5.149-.106-3.167.142-4.387 1.402-6.084m5.073.324c-1.301.108-1.688.237-2.784.967-.924.752-1.128 1.15-.87 2.696.215 1.032.679 1.708 2.43 1.998 1.212.172 2.189.086 3.317-.29 1.128-.504 1.539-.72 1.689-1.751.054-.827-.118-1.708-.421-2.266-.731-1.15-1.266-1.44-3.361-1.354"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "195",
          SynthProp: Tone.FMSynth,
          note: ["C3", "E3", "G3", "B3"],
          fill: "#313638",
          d: "M158.933-3.27c1.694-.081 3.109-.081 5.045-.141 1.838-.074 2.19-.185 3.899-.25 1.461-.086 1.493-.064 1.493 1.408.051 1.249.126 2.474.213 3.685.11 1.374.099 1.363-1.437 1.256-3.105-.107-6.145-.183-9.12-.301-1.977-.064-2.106-.096-1.897-1.272.079-.412.203-.81.228-1.13.036-.724.036-1.379.057-1.991.086-1.182-.043-1.236 1.519-1.264"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "196",
          SynthProp: Tone.AMSynth,
          note: ["C3", "E3", "G3", "B3"],
          fill: "#e8e9eb",
          d: "M180.825-4.244a97 97 0 0 1 4.416-.186c1.586-.025 3.138-.017 4.739.014 2.276.114 2.503.157 4.047.58 1.548.484 1.534.857.771 1.859-.605.863-1.379 1.664-2.153 2.382a7.4 7.4 0 0 1-2.597 1.672c-1.186.454-3.281.758-5.087.441-1.558-.276-2.151-.524-3.102-1.489-.772-.772-1.503-2.027-1.981-3.624-.363-1.243-.335-1.505.947-1.649"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "197",
          SynthProp: Tone.Synth,
          note: ["C3", "E3", "G3", "B3"],
          fill: "#e8ceb8",
          d: "M206.18-2.619c1.371-.544 2.05-.741 3.789-.886 1.007-.042 2.017-.065 3.038.009 1.125.102 1.904.346 2.724.769.822.503 1.219 1.195 1.512 2.005.179.509.18 1.607-.577 2.358-1.004 1.025-2.261 1.754-3.652 2.391-1.71.672-2.127.511-3.261-.016-1.12-.546-1.886-1.069-2.477-1.677-.807-.821-1.814-2.108-2.025-2.712-.361-.907-.261-1.77.929-2.241"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "198",
          SynthProp: Tone.MonoSynth,
          note: ["C3", "E3", "G3", "B3"],
          fill: "#ffe57f",
          d: "m227.02-2.41 7.006-.526c.648-.014.579.069.62.441.031.624.335 1.163.298 1.647-.034.423-1.558 2.209-2.521 3.255-.403.516-.753.467-1.126-.007-.69-.796-1.187-1.848-2.08-2.37a30 30 0 0 0-2.326-1.283c-.335-.146-.374-.435-.381-.806-.004-.282-.021-.316.51-.351"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "-2.2 6.5 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "177",
          SynthProp: Tone.MonoSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#ffe57f",
          d: "M4.282 16.914c1.295.14 2.515.131 4.293-.11.528-.079.592-.081.396.349-.894 1.972-1.775 3.946-2.715 5.917-.227.453-.338.502-.531-.025a224 224 0 0 1-1.872-5.747c-.122-.4-.022-.441.429-.384"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "178",
          SynthProp: Tone.FMSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#313638",
          d: "M23.2 18.11c1.08-2.782 4.762-3.351 7.976-3.217 2.897.105 2.942.638 2.919 2.303-.046 1.412-.046 2.77-.112 4.335-.068 1.335.007 1.162-1.103 1.005-2.864-.453-5.609-.933-8.553-1.434-1.377-.239-1.377-.246-1.348-1.499.016-.525.068-1.115.221-1.493"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "179",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M44.949 19.675c2.986-2.729 6.322-4.536 8.778-5.571 1.485-.574 4.34-.457 3.427 1.244-1.265 2.225-2.782 4.606-5.234 8.02-1.136 1.597-1.527 1.801-2.974 1.042a46 46 0 0 1-4.253-2.406c-1.291-.852-1.035-1.196.256-2.329"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "180",
          SynthProp: Tone.MonoSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#ffe57f",
          d: "M74.719 16.127c.121-.344.413-.702 1.148-.22.67.41 1.34.819 1.687 1.068.811.529.766.63.338 1.216-.375.497-.902 1.07-1.491 1.63-.54.512-1.591 1.328-2.436 1.662-.314.126-2.158.045-3.216-.094-.622-.082-.631-.44-.33-.627 1.52-.752 3.841-3.357 4.3-4.635"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "181",
          SynthProp: Tone.AMSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8e9eb",
          d: "M89.601 19.05c2.033-1.712 3.312-2.772 5.726-4.374 1.744-1.12 2.913-1.539 5.359-1.973 1.334-.172 1.766-.114 2.479.494.494.438.965.858 1.492 1.343.779.755.699.707-.007 1.499a897 897 0 0 1-9.337 9.751c-1.242 1.239-1.614 1.253-2.527.22-1.101-1.297-2.147-2.718-3.121-4.083-1.085-1.567-1.217-1.883-.064-2.877"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "182",
          SynthProp: Tone.AMSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8e9eb",
          d: "M115.618 14.937C118.538 14.758 121.469 14.853 124.376 14.971c.773.032.954.094.898.827-.088 1.063-.176 2.127-.264 3.191-.064.632-.643.762-1.32.973-3.2 1.068-6.108 2.061-8.732 3.764-.287.186-.638.247-.804-.402-.513-1.923-1.025-3.846-1.537-5.769-.455-1.655 1.532-2.542 3.001-2.617"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "183",
          SynthProp: Tone.FMSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#313638",
          d: "M136.001 16.202c5.174-.165 6.312-.218 13.001.215 1.451.1 1.392.462 1.189 1.539q-.138.731-.27 1.467c-.156.933-.38.95-.848 1.071-1.475.357-10.775.935-14.077.35-.945-.202-1.244-.266-1.096-1.185.162-.776.22-1.109.273-2.072.076-1.092.544-1.313 1.828-1.385"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "184",
          SynthProp: Tone.MonoSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#ffe57f",
          d: "M161.784 17.421c2.239.176 4.11-1.044 4.759-1.372.572-.32.859-.376.504.524-.545 1.328-1.194 2.62-1.796 3.749-.586.997-2.034.205-3.179.336-.318.039-.432-.052-.375-.25.293-1.128.24-1.804-.136-2.585-.144-.324-.003-.414.223-.402"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "185",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M180.982 17.271c1.398-1.847 2.389-2.692 4.028-3.546.853-.385 1.159-.422 2.093-.162 2.73.9 5.396 4.486 6.232 7.217.499 1.773-1.703 3.345-3.506 3.302-1.283-.061-2.735-.628-3.993-1.221-1.731-.876-3.444-2.141-4.445-3.288-.615-.691-.982-1.483-.409-2.302"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "186",
          SynthProp: Tone.FMSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#313638",
          d: "M203.245 15.266a6 6 0 0 1 1.227-.211c2.55-.164 6.234-.205 9.212-.058 1.544.103 2.522.678 1.737 1.677a161 161 0 0 1-4.834 5.806c-.789.897-2.316.96-3.044.181a83 83 0 0 1-5.06-5.933c-.494-.708-.607-1.03.762-1.462"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "187",
          SynthProp: Tone.AMSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8e9eb",
          d: "M229.229 13.316c3.279 1.238 5.407 2.234 7.298 4.471.565.744.718 1.509.332 2.309-.91 1.761-1.833 2.643-3.171 3.963-.914.862-1.128.911-2.169-.186-1.678-1.716-3.324-3.454-4.971-5.177-.837-.913-.799-1.295-.422-2.047l1.487-2.8c.376-.781.435-.996 1.616-.533"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "-1.12 24.8 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "166",
          SynthProp: Tone.FMSynth,
          note: ["D2", "F2", "A2", "E3"],
          fill: "#313638",
          d: "M8.015 32.003c1.642 1.1 2.819 2.339 3.479 3.849.184.472.129.72-.146.949-1.874 1.62-3.817 3.2-5.837 4.812-.648.53-.717.605-1.204.431-.941-.394-1.532-.726-2.689-1.605-.253-.187-.311-.37-.076-.582 2.511-2.06 5.272-5.41 5.851-7.523.14-.512.147-.639.622-.331"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "167",
          SynthProp: Tone.AMSynth,
          note: ["D2", "F2", "A2", "E3"],
          fill: "#e8e9eb",
          d: "M22.38 34.996c3.949.075 7.795.148 11.65.224.75.018.915-.006 1.005.443l.315 1.577c.164.949-.383 1.305-1.045 1.61-2.924 1.386-5.098 2.281-8.378 3.37-.544.199-.606.195-.895-.285-1.223-1.954-2.439-3.954-3.206-6.009-.305-.874-.098-.94.554-.93"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "168",
          SynthProp: Tone.Synth,
          note: ["D2", "F2", "A2", "E3"],
          fill: "#e8ceb8",
          d: "M46.036 36.327c3.872-.06 7.701-.118 11.557-.172.774-.012.739.033.755.724.03 1.336.06 2.679.085 4.016.013.505-.017.526-.506.549-3.856.112-7.536.108-11.355.011-.654-.016-.787-.137-.844-.665a653 653 0 0 1-.293-3.726c-.032-.612-.061-.727.601-.737"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "169",
          SynthProp: Tone.MonoSynth,
          note: ["D2", "F2", "A2", "E3"],
          fill: "#ffe57f",
          d: "M71.205 35.304c1.806-.257 3.632.201 4.633.78.723.426.788 1.047.799 1.844-.017 1.397-.178 2.388-.554 3.303-.209.46-.657.668-1.11.725-.356.043-.733.071-1.102.086-.442.004-.483-.067-.638-.294a56 56 0 0 1-2.625-4.776c-.395-.884-.199-1.565.597-1.668"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "170",
          SynthProp: Tone.Synth,
          note: ["D2", "F2", "A2", "E3"],
          fill: "#e8ceb8",
          d: "M88.846 35.464c3.963-1.084 6.542-1.609 10.399-1.487 1.536.107 2.412.919 2.804 1.747.67 1.443.465 3.234.09 4.242-.548 1.194-1.158 1.632-2.447 2.067-1.56.424-3.057.177-4.995-.246-2.239-.566-3.897-1.278-5.535-2.235-.729-.456-1.453-.885-1.675-1.714-.256-1.097-.119-1.941 1.359-2.374"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "171",
          SynthProp: Tone.AMSynth,
          note: ["D2", "F2", "A2", "E3"],
          fill: "#e8e9eb",
          d: "M112.646 38.141c1.809-1.536 3.503-2.939 4.587-3.795 1.349-1.11 2.566-.737 3.58.283 2.21 2.264 3.789 4.333 4.96 6.758.453 1.006-.045.95-.897.743q-5.981-1.625-11.965-3.244c-.715-.187-.712-.361-.265-.745"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "172",
          SynthProp: Tone.Synth,
          note: ["D2", "F2", "A2", "E3"],
          fill: "#e8ceb8",
          d: "M136.066 35.974c2.235-.529 5.486-.302 7.932-.183 3.016.113 5.907.219 8.77.338 1.403.053 1.628.236 1.817 1.226.424 2.54-.002 2.967-.724 3.784-.526.53-.618.48-1.225.276-3.849-1.193-5.931-1.136-9.644-.545-1.084.2-1.876.257-2.981.023-1.661-.39-3.352-1.028-4.987-1.654-1.274-.451-1.364-.993-.888-1.898.365-.713 1-1.105 1.93-1.367"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "173",
          SynthProp: Tone.AMSynth,
          note: ["D2", "F2", "A2", "E3"],
          fill: "#e8e9eb",
          d: "M160.956 31.11c1.807.326 3.25.679 5.063 1.241.932.305 1.469.863 1.464 1.688l.149 6.974c.027 1.095-.959 1.409-1.896 1.406a15 15 0 0 1-2.425-.251c-2.76-.532-4.915-6.961-4.906-9.128.04-1.725.347-2.338 2.551-1.93"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "174",
          SynthProp: Tone.FMSynth,
          note: ["D2", "F2", "A2", "E3"],
          fill: "#313638",
          d: "M180.464 34.59c4.378-.005 9.246.205 12.136 1.201.76.276 1.106.63.911 1.629l-.515 3.419c-.114.731-.326.678-1.159.738l-10.128.702c-.855.079-.841-.038-1.177-1.041-.323-1.061-.642-2.105-.954-3.164-.462-1.613-.77-3.523.886-3.484"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "175",
          SynthProp: Tone.MonoSynth,
          note: ["D2", "F2", "A2", "E3"],
          fill: "#ffe57f",
          d: "M205.876 36.073c2.162-.433 5.054-.414 6.53.066.749.255.999.341.763.989-.441 1.197-1.382 2.252-2.119 2.599-1.291.556-2.852.658-3.917.088-1.204-.734-1.923-1.991-2.104-2.924-.114-.67-.003-.624.847-.818"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "176",
          SynthProp: Tone.Synth,
          note: ["D2", "F2", "A2", "E3"],
          fill: "#e8ceb8",
          d: "M228.995 34.512c3.296-.179 5.888.718 8.069 1.948 1.106.636.694 1.518-.084 2.195a29.4 29.4 0 0 1-4.458 3.102c-.939.515-2.137.475-3.02-.324-1.26-1.255-2.219-3.054-2.277-4.438 0-1.359.423-2.362 1.77-2.483"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "0 43.1 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "155",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M-3.339 58.371c3.726-1.608 4.141-1.073 5.531-1.798 4.431-3.345 6.358-4.003 8.516-5.794 1.746-1.563 3.121-1.79 3.086-.211-.063 2.852-1.068 6.673-2.571 9.09-1.181 1.726-2.618 2.444-5.325 2.389-4.199-.151-7.988-.376-9.871-1.17-1.084-.512-.862-1.932.634-2.506"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "156",
          SynthProp: Tone.MonoSynth,
          note: ["E2", "G2", "B2", "D3"],
          fill: "#ffe57f",
          d: "M25.944 55.113c2.432-.338 3.113-.316 5.925.114.429.08.33.381.272.662-.201.911-.525 2.173-.83 2.472-.77.781-3.923.013-4.347-.29-.517-.353-1.114-1.211-1.467-2.176-.211-.516-.214-.655.447-.782"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "157",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M46.9 59.092c-.694-.802-.304-.944.7-1.822 3.066-2.508 4.789-3.868 9.123-6.993.72-.541.91-.246 1.444.259a17 17 0 0 1 1.52 1.679c.479.569.55.726.303.975-1.727 1.758-5.788 5.6-8.844 8.073-.809.613-1.177.723-1.806.158-.867-.711-1.679-1.459-2.44-2.329"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "158",
          SynthProp: Tone.FMSynth,
          note: ["E2", "G2", "B2", "D3"],
          fill: "#313638",
          d: "M70.976 52.85c4.394-.312 11.078.753 15.661 1.593 1.92.369 1.993.946.229 1.757-3.261 1.442-14.505 6.29-19.502 8.148-.704.257-1.454.497-1.426-.737.169-3.796.76-6.521 1.6-8.794.49-1.358 2.02-1.898 3.438-1.967"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "159",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M96.98 53.115c.813-.203 1.893-.123 2.381.199.856.475 1.481 1.348 1.924 2.169.435 1.001.166 1.643-.315 2.54-.354.595-1.464 1.931-3.053 2.945-1.146.721-2.675.59-3.97.2-3.434-1.127-2.202-4.339-.686-5.927 1.002-.94 2.013-1.741 3.719-2.126"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "160",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M110.869 60.417c3.226-3.222 7.146-6.933 10.694-9.783 1.105-.815 1.947-1.005 3.239-.262a19.1 19.1 0 0 1 4.816 4.056c.537.659.55 1.554-.259 2.216-3.005 2.402-8.716 5.734-13.665 8.359-.983.501-1.402.556-2.401.223-1.526-.592-2.962-1.575-3.074-3.186-.01-.574.112-1.054.65-1.623"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "161",
          SynthProp: Tone.FMSynth,
          note: ["E2", "G2", "B2", "D3"],
          fill: "#313638",
          d: "M137.276 55.833c3.032-1.182 6.838-1.534 10.642-1.197.769.069.881.131.868.709l.048 6.239c.004.339-.028.289-.257.265l-12.734-1.756c-.402-.055-.472-.025-.48-.371-.012-.739-.014-1.476-.016-2.225-.004-.704 1.004-1.272 1.929-1.664"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "162",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M161.366 52.837c-.088 2.908-.081 5.36-.295 7.839-.235 2.221 4.479 3.679 5.725.64 2.057-4.663.573-8.891-.533-9.927-1.334-1.286-4.879-.252-4.897 1.448"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "163",
          SynthProp: Tone.FMSynth,
          note: ["E2", "G2", "B2", "D3"],
          fill: "#313638",
          d: "M182.75 51.645c6.79-.111 13.071.271 14.699 1.267 1.281.722 1.407 1.167.757 2.304-3.225 6.038-10.939 9.697-15.982 9.657-.996.036-1.064.069-1.054-.64l.019-10.592c-.035-1.168.635-1.987 1.561-1.996"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "164",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M207.451 50.009c2.059 1.04 7.11 5.188 10.247 8.411.759.742 1.02 1.573.099 2.138-11.165 6.574-20.954-3.432-12.898-10.094 1.109-.936 1.549-.95 2.552-.455"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "165",
          SynthProp: Tone.AMSynth,
          note: ["E2", "G2", "B2", "D3"],
          fill: "#e8e9eb",
          d: "M229.436 51.856c-.045-.592.099-.558.532-.381 2.518 1.055 5.751 3.603 7.192 5.242 1.94 2.384-3.207 5.399-5.223 3.121-1.517-1.695-2.288-4.713-2.501-7.982"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "-0.8076 61.4 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "144",
          SynthProp: Tone.AMSynth,
          note: ["F2", "A2", "C3", "E3"],
          fill: "#e8e9eb",
          d: "M-.136 79.115c-.188-1.44-.383-2.9-.572-4.33-1.269-7.785 9.968-4.186 12.225.255 1.185 2.593-.266 3.568-2.446 3.971-2.942.532-5.389.835-8.372.945-.831.028-.696-.008-.835-.841"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "145",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3", "E3"],
          fill: "#e8ceb8",
          d: "M22.48 75.468c-.113-.474.057-.842.827-1.029l8.364-1.635c1.306-.238 1.807.039 2.13 1.065l1.064 3.175c.334 1.035-.17 1.161-.945 1.317-3.822.703-6.345 1.06-9.891 1.42-.497.056-.534-.045-.684-.665-.285-1.217-.57-2.433-.865-3.648"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "146",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3", "E3"],
          fill: "#e8ceb8",
          d: "M44.378 80.236c-.783-.98-.827-1.269-.316-2.117 2.571-3.649 5.947-6.203 8.501-7.48 1.247-.631 1.581-.495 2.95.162 1.292.734 2.128 1.497 2.576 2.121.778 1.118.34 1.535-.536 2.37-2.514 2.339-5.283 4.885-7.713 6.789-.958.746-1.433.811-2.252.497-1.387-.605-2.414-1.38-3.21-2.342"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "147",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3", "E3"],
          fill: "#e8ceb8",
          d: "M73.371 72.287c-2.862-2.427-7.269.205-4.097 3.445 1.457 1.566 3.741 3.788 6.336 4.53 1.57.402 3.968-1.294 2.946-2.722-1.349-1.896-3.428-3.898-5.185-5.253"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "148",
          SynthProp: Tone.MonoSynth,
          note: ["F2", "A2", "C3", "E3"],
          fill: "#ffe57f",
          d: "M98.467 69.116c.395-.997 1.562-.772 1.473-.021-.49 3.694-.74 8.635-1.543 9.747-.552.713-1.243.749-2.841.488-1.348-.238-2.78-.877-3.821-1.618-.689-.516-1.054-.752-.507-1.454.96-1.128 1.051-.957 4.963-3.765 1.928-1.386 1.929-2.53 2.276-3.377"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "149",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3", "E3"],
          fill: "#e8ceb8",
          d: "M110.394 72.375c-.53-.617-.594-1.335.137-1.833q1.148-.809 2.293-1.62c.622-.454.823-.394 1.425-.074 4.307 2.308 8.204 5.679 12.681 8.988 1.098.832.983 1.422.261 2.096-1.064 1.033-2.239 1.877-3.389 2.595-.722.423-1.369.51-2.116-.051-2.235-1.747-8.279-6.686-11.292-10.101"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "150",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3", "E3"],
          fill: "#e8ceb8",
          d: "M138.522 73.004c1.357-.178 2.589-.208 4.181-.126 1.068.064 2.866.239 3.593 3.045.347 1.164-.08 1.979-1.379 3.269-1.127 1.02-1.399 1.176-2.921.664-2.246-.876-3.477-1.902-4.651-3.514-1.224-1.75-1.286-3.064 1.177-3.338"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "151",
          SynthProp: Tone.MonoSynth,
          note: ["F2", "A2", "C3", "E3"],
          fill: "#ffe57f",
          d: "M160.58 73.283c2.111.62 5.463.496 8.22.248 1.39-.099 1.542 1.747.958 2.429-1.42 1.61-3.743 2.514-5.299 3.109-.829.331-1.111.246-1.63-.295a35.3 35.3 0 0 1-4.099-4.811c-.316-.434 1.082-.856 1.85-.68"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "152",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3", "E3"],
          fill: "#e8ceb8",
          d: "M190.275 73.914c1.25-.102 1.324 3.572.883 5.094-.143.498-.237.551-.944.408-3.764-.774-8.295-1.7-8.41-1.73-6.468-1.357-7.71-1.502-.209-2.608a138 138 0 0 1 8.68-1.164"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "153",
          SynthProp: Tone.AMSynth,
          note: ["F2", "A2", "C3", "E3"],
          fill: "#e8e9eb",
          d: "M203.761 74.353c-.008-.2.037-.203.283-.205 2.847.018 5.638.028 11.963.108.234.003.291.002.283.234-.011.949-.024 1.894-.031 2.415.002.611-.128.812-.701.905-3.802.651-8.221 1.855-11.405 1.953-.195.004-.268-.04-.273-.274z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "154",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3", "E3"],
          fill: "#e8ceb8",
          d: "M225.238 72.766c-.548-.485-.416-.605.074-.854 1.852-.876 3.856-1.08 4.897-.896 1.493.24 6.571 4.628 7.893 6.785.254.48.392.783-.11 1.156q-1.197.833-2.391 1.669c-.287.186-.499.285-1.088-.215-3.105-2.549-6.185-5.1-9.275-7.645"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "-1 79.7 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "133",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M-1.814 92.993c3.243.033 7.805-.151 9.729.098 1.449.196 3.406 3.091 1.121 3.477-1.196.151-8.524.322-11.661-.037-2.962-.374-1.179-3.498.811-3.538"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "134",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M23.734 95.957c2.413-2.298 4.146-2.818 5.338-4.579 2.146-2.803 6.296 1.836 4.562 3.646-.381.41-1.783.468-4.186 2.088-.544.313-1.915 2.123-3.469 2.111-2.469-.04-3.333-2.106-2.245-3.266"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "135",
          SynthProp: Tone.FMSynth,
          note: ["G2", "B2", "D3"],
          fill: "#313638",
          d: "M42.459 93.136c.003-.338-.007-.338.333-.356 6.157-.259 9.523-.537 14.47-.959.464-.044.437.014.514.255l.997 3.412c.086.268.065.314-.047.376-4.316 2.313-8.609 4.638-12.901 6.962-.307.17-.305.121-.454-.273-.877-2.412-2.914-8.437-2.912-9.417"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "136",
          SynthProp: Tone.MonoSynth,
          note: ["G2", "B2", "D3"],
          fill: "#ffe57f",
          d: "M68.431 96.149c1.854-1.182 3.681-2.294 5.742-3.385l1.377-.732c.191-.099.424-.218.384.081-.228 1.619.142 2.869.311 4.103l.107.794c.031.211-.017.258-.283.364-.64.245-.962.406-1.608.321-1.679-.248-3.631-.151-5.553-.237-.744-.036-.878-.999-.477-1.309"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "137",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M91.96 93.287c-.872.132-1.394 1.01-1.415 2.363.021 1.557.318 2.238 1.46 2.296 3.616.086 6.436.105 10.158-.13 1.394-.107 1.365-.567 1.428-2.265.025-1.656-.016-2.151-1.403-2.338-2.635-.341-7.197-.334-10.228.074"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "138",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M114.9 92.939c.417-1.388.739-1.665 2.242-1.492 2.443.29 4.633 1.592 6.439 3.071 1.065.826 1.368 1.553.481 2.547-1.15 1.337-4.215 2.058-6.979 1.883-.668-.035-1.163-.245-1.418-.872-.828-2.031-1.172-3.42-.765-5.137"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "139",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M134.007 91.398c5.051-.315 10.396-.399 16.082-.079.655.042.598.186.577.676l-.279 5.447c-.035.748-.18.746-.954.835-5.126.39-9.453.335-14.444-.029-1.292-.098-1.458-.407-1.459-1.164.026-1.679.065-3.366.105-5.048.016-.589-.009-.613.372-.638"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "140",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M159.397 90.742c.611-.564 1.276-.737 2.118-.478 4.358 1.422 7.572 4.262 9.431 7.641.499.972.081 1.166-.57 1.772-1.006.848-1.155.866-2.446.524-3.08-.832-7.371-4.046-9.233-7.721-.22-.465-.043-.992.7-1.738"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "141",
          SynthProp: Tone.AMSynth,
          note: ["G2", "B2", "D3"],
          fill: "#e8e9eb",
          d: "M176.137 91.718c6.157-.375 12.217-.338 17.253-.144.65.033.654.182.618.795-.121 2.576-.183 5.183-.395 7.688-.191 1.692-1.812 1.973-3.104 1.491-3.825-1.433-6.736-3.028-9.879-4.722-2.104-1.261-4.839-2.667-5.049-4.552-.045-.395-.074-.502.556-.556"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "142",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3"],
          fill: "#e8ceb8",
          d: "M212.745 92.32c2.834.403 3.417 2.954 2.866 3.676-.756.985-2.693 1.99-4.521 2.571-1.689.523-2.014.335-3.137-.36-1.564-1.022-2.583-2.388-3.328-3.831-.606-1.233 1.888-2.065 2.845-2.167 1.917-.209 3.4-.119 5.275.111"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "143",
          SynthProp: Tone.MonoSynth,
          note: ["G2", "B2", "D3"],
          fill: "#ffe57f",
          d: "M231.365 93.43c-.678-.109-.977.123-1.208.696a54 54 0 0 1-.767 2.011c-.126.315-.058.624.838.618 1.909.001 3.497-.115 5.263-.235.462-.033.452-.183.45-.575v-1.876c-.002-.339.032-.528-.369-.512-1.581.077-3.203.052-4.207-.127"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "-1 98 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "122",
          SynthProp: Tone.MonoSynth,
          note: ["D2", "F#2", "A2", "C3"],
          fill: "#ffe57f",
          d: "M2.504 111.268c-.002-.622.059-.939.671-1.026 1.654-.216 2.792-.227 3.98-.068 1.058.124 1.146.44 1.201 1.23.063 1.093.132 2.182.203 3.275.038.607-.009.746-.748.675l-4.651-.511c-.593-.072-.628-.264-.636-.87q-.008-1.351-.02-2.705"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "123",
          SynthProp: Tone.Synth,
          note: ["D2", "F#2", "A2", "C3"],
          fill: "#e8ceb8",
          d: "M21.977 115.057c.714-1.19 4.848-4.41 7.268-6.161 1.899-1.317 5.487-.603 5.567 2.448.011 1.466-3.299 2.626-7.984 5.681-2.116 1.278-6.051-.291-4.851-1.968"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "124",
          SynthProp: Tone.AMSynth,
          note: ["D2", "F#2", "A2", "C3"],
          fill: "#e8e9eb",
          d: "M45.082 112.721c1.375-.599 3.345-1.508 5.314-2.418 1.065-.488 1.505-.367 2.383.069l5.051 2.476c.383.192.392.305 0 .487-1.86.863-3.625 1.78-5.592 2.558-1.958.685-2.231.655-3.593.412-7.742-1.517-7.446-1.737-3.563-3.584"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "125",
          SynthProp: Tone.Synth,
          note: ["D2", "F#2", "A2", "C3"],
          fill: "#e8ceb8",
          d: "m81.975 110.759c-4.606-.642-9.867-.556-15.011.101-2.347.283-2.156 5.654-.2 5.753 5.703.371 14.58-.171 15.172-.235 1.724-.152 1.688-5.424.039-5.619"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "126",
          SynthProp: Tone.AMSynth,
          note: ["D2", "F#2", "A2", "C3"],
          fill: "#e8e9eb",
          d: "m92.83 114.615 5.93-6.139c.463-.491.891-.355 1.308-.05l2.851 1.945c.305.208.369.323.067.47-2.999 1.392-6.771 3.739-7.748 7.598-.094.386-.159.256-.336.067l-2.12-2.37c-.518-.564-.63-.849.048-1.521"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "127",
          SynthProp: Tone.Synth,
          note: ["D2", "F#2", "A2", "C3"],
          fill: "#e8ceb8",
          d: "M115.539 111.017c-.044-2.214 1.513-3.251 3.809-3.293 2.396.034 3.857 1.139 3.873 3.271.036 1.302.043 2.568.035 4.025-.022 2.957-2.452 4.138-3.801 4.131-2.18-.062-3.838-.93-3.894-4.175z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "128",
          SynthProp: Tone.Synth,
          note: ["D2", "F#2", "A2", "C3"],
          fill: "#e8ceb8",
          d: "M137.809 110.031c.439-1.54 1.524-1.627 3.25-1.173 3.27 1.056 5.126 2.951 6.285 5.006.933 1.68.293 1.941-.84 2.829-2.698 1.984-7.044 1.496-8.935.793-1.213-.465-1.172-1.237-.974-2.516.284-1.739.755-3.309 1.214-4.939"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "129",
          SynthProp: Tone.AMSynth,
          note: ["D2", "F#2", "A2", "C3"],
          fill: "#e8e9eb",
          d: "M154.517 112.386c-.497-.356-.581-.505-.102-.923 1.98-1.698 4.411-3.591 9.549-3.875 4.722-.085 6.955 1.216 8.913 3.598.452.63.35.793-.129 1.076-3.076 1.843-6.153 3.686-9.22 5.559-.574.347-.597.281-1.156-.074a910 910 0 0 0-7.855-5.361"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "130",
          SynthProp: Tone.Synth,
          note: ["D2", "F#2", "A2", "C3"],
          fill: "#e8ceb8",
          d: "M181.705 107.064c-.177-.791.331-1.1 1.067-.648 2.836 1.769 4.336 2.896 5.891 4.34.325.313 2.487 1.57 6.106 2.457 1.253.275 1.192 1.102.963 1.527-.474.862-4.013 1.171-6.049 1.206-4.549-.042-6.61-2.132-7.017-4.198-.262-1.561-.64-3.121-.961-4.684"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "131",
          SynthProp: Tone.Synth,
          note: ["D2", "F#2", "A2", "C3"],
          fill: "#e8ceb8",
          d: "M216.293 110.797c1.847.342 1.569 1.161.819 2.052-3.372 3.795-8.058 5.808-12.054 1.675-1.198-1.408-1.311-2.592-1.298-3.203.033-.665.311-.688 1.16-.911 3.807-.837 7.275-.377 11.373.387"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "132",
          SynthProp: Tone.Synth,
          note: ["D2", "F#2", "A2", "C3"],
          fill: "#e8ceb8",
          d: "M229.629 110.568c.352-.568.538-.918 1.374-.832 2.436.282 4.502 1.653 4.903 3.371.248 1.415-.554 2.241-1.474 2.748-1.489.692-2.536.34-3.506-.082-1.668-.785-2.419-2.007-1.897-3.773.162-.538.393-1.09.6-1.432"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "0 116.3 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "111",
          SynthProp: Tone.Synth,
          note: ["A2", "C3", "E3", "G3"],
          fill: "#e8ceb8",
          d: "M-2.958 131.598c-.337.132-.32.287-.055.549 1.329 1.242 3.555 2.605 6.028 3.31.907.243 2.143.671 2.852-.706.53-1.06 3.398-4.151 5.528-5.49.569-.371.282-.87-.197-1.238-.873-.721-1.791-1.177-3.002-1.553-.776-.248-1.146-.199-1.87.362-1.926 1.603-5.773 3.332-9.284 4.766"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "112",
          SynthProp: Tone.FMSynth,
          note: ["A2", "C3", "E3", "G3"],
          fill: "#313638",
          d: "M19.631 130.664c.212-.773.609-1.288 1.533-1.55 1.744-.577 11.149-1.576 16.246-.074.573.169.627.341.681.956.063.84.042 1.702.035 2.855.002.192-.04.203-.339.251-4.305.706-12.324.709-16.523.308a4 4 0 0 1-1.347-.352c-.309-.129-.397-.326-.396-.719 0-.57-.014-1.174.11-1.675"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "113",
          SynthProp: Tone.Synth,
          note: ["A2", "C3", "E3", "G3"],
          fill: "#e8ceb8",
          d: "M52.391 127.266c1.18-.598 1.153-.386 2.192.762 1.041 1.242 1.041 1.542.198 2.359-1.933 1.847-3.89 3.926-5.801 5.553-.654.519-1.816-.562-2.514-1.617-1.438-2.262-1.503-2.831.277-3.875z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "114",
          SynthProp: Tone.Synth,
          note: ["A2", "C3", "E3", "G3"],
          fill: "#e8ceb8",
          d: "M68.321 129.703c-.148-.37-.264-.513.279-.648 3.501-.812 7.055-.494 10.396.153 1.083.199 1.981.782 2.048 1.379.041.444-.135.514-.581.646l-9.536 2.53c-.703.18-.961-.124-1.238-.778z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "115",
          SynthProp: Tone.FMSynth,
          note: ["A2", "C3", "E3", "G3"],
          fill: "#313638",
          d: "M88.833 127.193c-.202-.487-.237-.599.127-.856a45 45 0 0 1 2.765-1.729c.34-.2.432-.139.804.027 4.436 2.127 9.397 5.441 13.652 8.619.349.257.256.297-.174.659-3.973 3.246-7.177 5.718-11.058 6.05-.482.048-.528.087-.744-.366a448 448 0 0 1-5.372-12.404"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "116",
          SynthProp: Tone.Synth,
          note: ["A2", "C3", "E3", "G3"],
          fill: "#e8ceb8",
          d: "M114.898 128.102c-.227-.888.273-1.483 1.713-1.155 2.231.591 4.203 1.311 6.165 2.105 1.871.759 2.433 2.139 1.611 3.271-1.333 1.723-2.526 2.456-4.855 2.826-1.295.202-2.223-.803-2.572-1.579a33 33 0 0 1-2.062-5.468"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "117",
          SynthProp: Tone.MonoSynth,
          note: ["A2", "C3", "E3", "G3"],
          fill: "#ffe57f",
          d: "M140.567 133.97c-1.52-1.331-2.785-3.248-3.744-5.054-.461-1.028-1.99-.125-1.287-2.019.378-1.02.98-2.129 2.312-1.789.203.058.311.069.258.203-.108.276-.246 1.21.025 1.706 1.237 2.25 3.74 2.119 8.483 1.978.412-.001.793.768.68.883-.959 1.006-3.468 3.01-5.314 4.389-.581.413-.961.066-1.413-.297"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "118",
          SynthProp: Tone.Synth,
          note: ["A2", "C3", "E3", "G3"],
          fill: "#e8ceb8",
          d: "M159.354 132.21c.785-.767 3.62-3.404 4.647-4.209 1.904-1.48 1.952-1.522 3.576-.028 1.455 1.396 1.404 1.44-.573 3.027-1.028.859-3.826 2.743-5.257 3.654-1.049.625-1.086.821-2.259-.189-1.272-1.206-1.089-1.265-.134-2.255"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "119",
          SynthProp: Tone.Synth,
          note: ["A2", "C3", "E3", "G3"],
          fill: "#e8ceb8",
          d: "M188.028 126.936c-1.769-1.298-3.372-1.35-4.878-.298-2.053 1.609-1.442 3.103.828 4.876 2.488 1.958 3.963 2.803 5.966 3.458 1.579.476 2.381.488 3.405-.332.927-.824 1.238-1.237-.114-2.886a40.6 40.6 0 0 0-5.207-4.818"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "120",
          SynthProp: Tone.Synth,
          note: ["A2", "C3", "E3", "G3"],
          fill: "#e8ceb8",
          d: "M205.282 130.551c.437-1.557.75-1.599 2.731-1.53 4.74.1 3.201-.449 9.623-1.45 1.465-.256 1.724.138 1.436 1.435-.429 1.892-.923 3.268-2.236 5.2-.633.856-.841.727-2.219.315-3.084-.873-5.766-.826-8.556-.811-1.141-.004-1.486-.71-1.269-1.461.164-.566.326-1.126.49-1.698"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "121",
          SynthProp: Tone.MonoSynth,
          note: ["A2", "C3", "E3", "G3"],
          fill: "#ffe57f",
          d: "M230.365 131.6c.592-1.231 1.598-2.337 2.82-2.774.831-.305 3.032.555 3.085 2.119.011 1.322-1.854 2.786-2.862 2.976-.414.08-.922.138-1.027.022-.643-.721-1.318-1.302-2.105-1.91-.056-.038.02-.281.089-.433"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "1.7 134.6 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "100",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "C3"],
          fill: "#e8ceb8",
          d: "M3.638 149.285a556 556 0 0 1 4.431-4.389c.87-.785 2.715-.946 3.584-.219.553.445 1.058.877 1.559 1.311 1.397 1.277 1.016 1.615.242 2.246-1.998 1.561-3.979 3.112-6.032 4.665-.725.523-1.494.411-2.073.098-.685-.356-1.314-.894-1.773-1.415-.447-.494-.86-1.287.062-2.297"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "101",
          SynthProp: Tone.MonoSynth,
          note: ["E2", "G2", "C3"],
          fill: "#ffe57f",
          d: "M25.653 149.535c3.308-1.343 4.297-2.34 6.295-4.266.27-.247.504-.265.627-.059.767 1.302 1.534 2.603 2.391 4.438.308.66.29.754-.492 1.315-.375.278-1.451.88-2.321 1.842-.373.436-1.901.175-6.118-1.813-.833-.413-.907-1.25-.382-1.457"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "102",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "C3"],
          fill: "#e8ceb8",
          d: "M45.679 149.061c5.497-1.424 8.731-3.794 12.305-6.371.882-.637 1.639-.631 1.374.529-.938 4.558-1.222 7.819-5.983 8.335-2.481.142-6.27-.3-7.945-.631-.781-.159-.818-1.597.249-1.862"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "103",
          SynthProp: Tone.AMSynth,
          note: ["E2", "G2", "C3"],
          fill: "#e8e9eb",
          d: "M70.976 145.407q5.231-.017 10.465-.003c2.204.016 4.373 2.408 5.731 4.021.611.744.439.965-.179 1.027-7.33.5-16.298.439-21.87-.005-.657-.057-.9-.258-.247-.985 1.605-1.617 4.1-4.031 6.1-4.055"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "104",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "C3"],
          fill: "#e8ceb8",
          d: "M97.298 154.973c-5.945-5.545-7.791-8.351-5.939-10.029.511-.452.789-.743 1.598-.747 3.822-.066 14.19 6.292 11.789 8.675-1.302 1.272-3.342 2.374-4.726 2.946-1.329.57-2.075-.242-2.722-.845"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "105",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "C3"],
          fill: "#e8ceb8",
          d: "M118.598 154.092c-.584.259-1.085.344-1.781-.081-.832-.573-1.578-1.306-1.856-2.036-.349-1.035-.266-1.611.71-2.447 2.589-2.131 6.508-5.352 7.653-6.093.988-.672 2.72-.419 3.671.905.553.797 1.036 1.578 1.533 2.376.96 1.49.904 1.82-.23 2.382-3.233 1.665-6.547 3.583-9.7 4.994"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "106",
          SynthProp: Tone.FMSynth,
          note: ["E2", "G2", "C3"],
          fill: "#313638",
          d: "M137.138 149.528c-.092-.025-.209-.039-.177-.257.071-.482.072-.499.081-1.005.007-.204.029-.275.281-.307 2.639-.319 13.69-1.273 16.019-1.347.383-.014.41.132.308.295q-1.802 2.698-3.599 5.401c-.164.241-.39.165-.695.081-3.977-1.206-7.582-1.719-12.218-2.861"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "107",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "C3"],
          fill: "#e8ceb8",
          d: "M158.488 143.482c-.372-1.347.566-1.64 1.54-.946 1.351.989 4.187 2.31 9.549 5.581.878.537 2.707 1.038 4.073 1.245 1.707.273 2.338.562 2.685.783 1.448 1.016.766 1.937-.048 2.487-2.573 1.605-8.91 1.538-10.979 1.104-2.425-.42-4.351-1.88-4.845-3.677Z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "108",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "C3"],
          fill: "#e8ceb8",
          d: "M185.242 147.071c5.938.049 7.518.312 8.068.443 1.863.441 1.965 1.97.38 2.582-2.717.962-6.423 1.455-8.402 1.555-.583.022-1.715-.064-2.058-.668-.445-.891-.445-2.25-.017-3.326.237-.549 1.085-.576 2.029-.586"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "109",
          SynthProp: Tone.MonoSynth,
          note: ["E2", "G2", "C3"],
          fill: "#ffe57f",
          d: "M206.179 147.529c.774-1.104 1.755-1.738 2.42-1.727 2.868.057 5.475 1.782 7.176 3.678.333.384.517.521.311.869-.322.516-1.444 1.904-2.54 2.321-2.105.704-5.438-1.836-6.867-3.186-.84-.869-1.051-1.086-.5-1.955"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "110",
          SynthProp: Tone.AMSynth,
          note: ["E2", "G2", "C3"],
          fill: "#e8e9eb",
          d: "M227.408 146.95c5.626.023 11.253.047 14.92.084.751.007.907.04.696.298-.456.592-2.752 2.764-5.817 3.281-3.557.576-6.989.832-10.355 1.231-.34.05-.347-.186-.327-.413l.327-3.94c.029-.415.103-.542.556-.541"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "1.7 152.9 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "89",
          SynthProp: Tone.AMSynth,
          note: ["G2", "C3", "D3", "F3"],
          fill: "#e8e9eb",
          d: "M-5.264 160.769c.638-.756 2.939-3.256 4.711-4.121 1.21-.588 2.507-.671 3.589-.121 2.528 1.257 7.668 4.545 9.638 7.341 1.819 2.88.934 5.523-.452 6.916-1.108 1.159-3.906 1.768-7.181.203-3.533-1.882-6.738-4.24-9.762-6.753-1.095-.957-1.454-2.398-.543-3.465m8.463 2.917c1.566-.752 1.888-1.834 1.767-2.736-.246-1.808-2.577-2.318-3.903-1.874-3.458 1.098-3.108 4.192-1.747 4.991 1.421.802 3.383-.133 3.883-.381"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "90",
          SynthProp: Tone.Synth,
          note: ["G2", "C3", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M25.254 166.983c-.039-.758.049-2.264 1.448-2.361 1.884-.068 2.685.7 3.896.772 1.327.063 2.629-.292 3.596-.36 1.528-.082 2.196.558 2.496 1.295.229.626.246 1.836-.809 2.539-1.817.996-2.424-.204-4.923.064-1.184.086-2.016.345-3.094.686-1.598.444-2.494-.609-2.61-2.635"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "91",
          SynthProp: Tone.Synth,
          note: ["G2", "C3", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M49.215 165.416c4.418-1.658 5.326-1.781 7.875-2.378 1.124-.226 1.275.041 1.146.614-.184 1.028-1.686 6.038-3.124 6.97-2.713 1.975-6.361-1.619-6.648-2.107-1.122-1.735-.081-2.771.751-3.099"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "92",
          SynthProp: Tone.Synth,
          note: ["G2", "C3", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M68.588 169.407c4.033-2.442 7.622-5.181 10.435-8.289.697-.712.998-.596 1.665-.037l4.181 3.293c.626.5.52.649.148.925a855 855 0 0 0-10.916 8.77c-.499.407-.612.33-.999.037l-4.551-3.663c-.349-.29-.596-.642.037-1.036"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "93",
          SynthProp: Tone.FMSynth,
          note: ["G2", "C3", "D3", "F3"],
          fill: "#313638",
          d: "M103.739 166.22c.508.385.35.512-.024.806-2.185 1.779-4.333 3.544-6.302 5.574-.415.416-.574.306-.897-.043-.935-1.071-3.925-3.421-1.42-12.191.085-.296.416-.455.665-.28z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "94",
          SynthProp: Tone.Synth,
          note: ["G2", "C3", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M116.114 165.709c3.107-2.039 5.908-3.667 8.88-4.515 2.531-.763 3.336 1.163 2.48 3.775-1.21 3.568-3.994 6.51-6.218 6.794-3.008.267-5.409-2.079-5.915-3.503-.45-1.474-.182-1.896.773-2.551"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "95",
          SynthProp: Tone.FMSynth,
          note: ["G2", "C3", "D3", "F3"],
          fill: "#313638",
          d: "m135.95 169.067-.62-3.926c-.039-.264-.105-.649.202-.721 4.792-1.1 9.584-2.199 14.232-2.6.278-.026.69.164.607.607-.316 1.777-.789 4.423-1.199 7.243-.044.269-.272.436-.597.515-3.51.734-8.501.409-11.976-.208-.421-.064-.582-.532-.649-.91"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "96",
          SynthProp: Tone.Synth,
          note: ["G2", "C3", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M157.65 166.512c.007-.447.241-.627.403-.628 4.759.014 15.059.026 15.297.038.22.006.923.391 1.339.614.341.192.374.33.369.642l.009 3.362c0 .502-.296.632-.612.574-4.954-.932-10.943-1.698-16.304-1.533-.317.007-.523-.015-.525-.348-.002-.916 0-1.806.024-2.721"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "97",
          SynthProp: Tone.Synth,
          note: ["G2", "C3", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M182.388 168.493c-.243-.19-.071-.356.11-.557 1.338-1.49 9.788-6.238 11.534-6.292.628-.02 1.002.058 2.094 1.221.231.252.104.395-.021.601-1.11 1.823-5.336 5.924-8.913 8.49-.175.13-.264.137-.497-.046a3586 3586 0 0 1-4.307-3.417"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "98",
          SynthProp: Tone.Synth,
          note: ["G2", "C3", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M202.037 163.795c-.565-1.004-.391-2.001.83-3.081 1.848-1.581 2.865-1.315 4.151-.697 2.089.924 9.86 6.516 11.741 8.294 1.377 1.284.323 2.411-1.314 4.38-2.34 2.629-4.987 2.312-6.51 1.384-1.407-.871-7.795-8.27-8.898-10.28"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "99",
          SynthProp: Tone.FMSynth,
          note: ["G2", "C3", "D3", "F3"],
          fill: "#313638",
          d: "M227.831 164.269c-.277-.401-.257-.651-.057-.833l1.645-1.422c.361-.288.825.005 1.06.25 3.183 3.346 4.902 4.866 9.703 7.696.496.293.371.374.138.487-.972.48-1.934.983-2.928 1.451-1.768.766-4.319-.621-5.922-1.582-.698-.417-.784-.768-.829-1.295-.136-1.975-1.75-3.321-2.81-4.752"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "1.7 171.2 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "78",
          SynthProp: Tone.FMSynth,
          note: ["F2", "A2", "C3", "G3"],
          fill: "#313638",
          d: "M-.61 191.887c-3.961-3.366-1.304-5.826 1.078-8.001 3.068-2.69 6.317-2.668 9.537-1.857 5.075 1.23 4.771 5.003 1.424 8.215-4.973 4.411-7.91 5.171-12.039 1.643M1 190c1.289 1.402 3.951 3.033 5.843 1.096 1.468-1.621-.11-3.353-.842-4.095C4.873 185.836 2.437 185.547 1 187c-.691.722-.728 2.083 0 3"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "79",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3", "G3"],
          fill: "#e8ceb8",
          d: "M22.535 183.927c-.53-.432-.538-.573.033-1.045 4.861-3.815 7.099-4.304 9.638-2.643 6.793 4.497 5.019 6.371 4.539 7.122-.894 1.276-2.116 2.246-4.51 3.682-.45.274-.676.042-.997-.205z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "80",
          SynthProp: Tone.FMSynth,
          note: ["F2", "A2", "C3", "G3"],
          fill: "#313638",
          d: "m45.039 182.899 13.962-1.189c.396-.035.463.162.48.48.143 1.948.287 3.895.42 5.847.024.419-.088.414-.288.387l-14.685-1.997c-.438-.065-.462-.162-.453-.453l.079-2.701c.008-.316.123-.337.485-.374"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "81",
          SynthProp: Tone.MonoSynth,
          note: ["F2", "A2", "C3", "G3"],
          fill: "#ffe57f",
          d: "M70.941 185.35c2.243-1.876 4.551-3.502 7.74-5.202.765-.368 1.205-.448 1.29.458l.707 6.034c.079.805.074.822-.446.909-1.567.225-2.757.592-4.139.975-.334.089-.514.127-.69 0-2.214-1.573-3.028-1.214-4.558-2.266-.447-.301-.529-.385.096-.908"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "82",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3", "G3"],
          fill: "#e8ceb8",
          d: "M95.008 181.211c2.937.066 5.835.589 7.55 2.225.841.842-.484 3.324-2.561 4.326-2.033.832-6.557-2.743-6.933-3.713-.534-1.276.014-2.851 1.944-2.838"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "83",
          SynthProp: Tone.AMSynth,
          note: ["F2", "A2", "C3", "G3"],
          fill: "#e8e9eb",
          d: "M113.083 180.974c-.17-.329-.277-.68.038-.898l1.882-1.274c.431-.3.982-.077 1.338.081 2.103.981 11.229 8.845 12.504 10.017.261.242.156.395-.041.55l-2.593 2.047c-.181.139-.217.157-.383.048-5.638-3.754-12.068-9.304-12.745-10.571"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "84",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3", "G3"],
          fill: "#e8ceb8",
          d: "M137.685 186.043a72 72 0 0 1 7.391-5.6c.365-.228.609-.159.911.119l2.984 2.838c.229.234.256.383-.035.612l-7.087 5.582c-.189.145-.231.17-.435.012l-3.721-3c-.201-.16-.281-.325-.008-.563"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "85",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3", "G3"],
          fill: "#e8ceb8",
          d: "M170.303 184.064c2.501 3.303-3.725 3.737-5.357 3.295-2.894-.903-3.14-4.184-1.74-5.052 2.903-1.643 5.183-.845 7.097 1.757"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "86",
          SynthProp: Tone.AMSynth,
          note: ["F2", "A2", "C3", "G3"],
          fill: "#e8e9eb",
          d: "m183.033 179.965 10.218-.389c.666-.027.685.269.53.849l-1.977 8.325c-.064.264-.244.259-.468.259-1.775 0-3.55 0-5.363-.012-1.715-.025-3.908-4.285-5.987-6.598-.527-.609 1.505-2.388 3.047-2.434"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "87",
          SynthProp: Tone.FMSynth,
          note: ["F2", "A2", "C3", "G3"],
          fill: "#313638",
          d: "M206.415 184.859c1.217-2.401 4.336-5.285 6.264-6.058 1.441-.585 4.905 2.052 3.795 5.653-.589 1.736-4.965 4.927-7.756 6.251-.564.261-.892.033-1.182-.598-.72-1.628-1.745-3.918-1.121-5.248"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "88",
          SynthProp: Tone.FMSynth,
          note: ["F2", "A2", "C3", "G3"],
          fill: "#313638",
          d: "M226.656 182.717c.005-.54.12-.744.626-.785 5.925-.455 11.338-.193 14.423.504.654.15.552.358.449.554-2.051 3.75-3.066 4.157-5.966 4.899-3.219.831-6.181 1.098-8.022 1.033-1.084-.038-1.536-.505-1.533-1.784z"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "1.4 189.5 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "67",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "B2"],
          fill: "#e8ceb8",
          d: "M2.101 201.977c-.722-.986-.51-2.005.932-2.359 3.961-1.026 10.853.45 12.037 1.077.523.295.667.406.138 1.385-4.115 7.06-10.414 3.652-13.107-.103"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "68",
          SynthProp: Tone.AMSynth,
          note: ["E2", "G2", "B2"],
          fill: "#e8e9eb",
          d: "M28.073 199.014h5.906c1.518-.022 2.511 3.172 2.669 5.979.018.324-.09.338-.349.337l-10.249-.054c-.371-.006-.412-.134-.405-.27.133-2.932.797-5.996 2.428-5.992"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "69",
          SynthProp: Tone.MonoSynth,
          note: ["E2", "G2", "B2"],
          fill: "#ffe57f",
          d: "m49.972 200.581 7.042-.371c1.413-.062 1.115 2.286.884 2.794-.64 1.528-3.704 2.142-5.816 2.509-.293.047-1.519-.597-1.568-.799-.258-1.054-.708-1.988-1.312-2.622-.313-.355.288-1.487.77-1.511"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "70",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "B2"],
          fill: "#e8ceb8",
          d: "M79.128 199.321c.667.387 1.081.624 1.669.964.285.171.351.321.136.574l-4.576 5.309c-1.254 1.283-4.192-.126-6.227-1.211-.538-.301-.535-.89.363-1.47l6.229-3.928c.805-.503 1.76-.607 2.406-.238"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "71",
          SynthProp: Tone.AMSynth,
          note: ["E2", "G2", "B2"],
          fill: "#e8e9eb",
          d: "M92.342 198.489c1.035-.442 1.988-.849 2.986-1.259 2.35-.974 8.252 4.357 11.476 7.226.521.463.26.697-.098.9-3.954 2.145-7.985 3.548-11.838 4.687-.426.129-.489.095-.608-.427a785 785 0 0 1-2.263-10.361c-.104-.479-.088-.58.345-.766"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "72",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "B2"],
          fill: "#e8ceb8",
          d: "M122.936 204.949c-1.383 1.029-4.103 2.286-6.142.573-1.866-1.837-.399-4.588 1.221-5.325 1.172-.571 4.179-.582 6.473.208 2.455.835 1.109 2.496-1.552 4.544"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "73",
          SynthProp: Tone.MonoSynth,
          note: ["E2", "G2", "B2"],
          fill: "#ffe57f",
          d: "M145.148 199.273c.562-.207.67-.04.817.283l1.262 2.596c.145.318.097.488.005.658l-1.243 2.347c-.185.336-.734.282-1.096.097-2.487-1.357-5.803-2.048-6.229-3.497-.127-.49.112-.686.58-.653.814.018 3.752-1.017 5.904-1.831"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "74",
          SynthProp: Tone.MonoSynth,
          note: ["E2", "G2", "B2"],
          fill: "#ffe57f",
          d: "M165.759 200.861a32 32 0 0 1 4.338.274c.377.044.418.158.305.373l-1.631 3.123c-.367.681-1.665.235-2.464.605-.434.18-.6.089-.94-.119-.73-.466-2.023-1.021-2.982-1.134-.461-.061-.491-.216-.508-.487-.039-.615-.056-1.511-.061-1.699-.009-.384.326-.577.634-.663.576-.159 1.313-.225 3.309-.273"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "75",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "B2"],
          fill: "#e8ceb8",
          d: "M184.035 194.586c5.229 1.507 8.43 5.493 9.04 7.378.564 1.672-.825 3.848-3.102 4.255-3.844.55-8.059-.369-10.968-2.216-2.765-1.895-3.252-4.899-1.928-7.312.812-1.329 4.214-2.876 6.958-2.105m1.4 7.18c2.024-1.38 2.111-3.193 1.092-3.832-1.33-.898-3.333-.639-4.852-.104-2.123.706-2.522 3.351-.276 4.386 1.016.489 2.17.844 4.036-.45"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "76",
          SynthProp: Tone.MonoSynth,
          note: ["E2", "G2", "B2"],
          fill: "#ffe57f",
          d: "M208.061 201.008c-.005-1.06.744-2.016 2.946-1.733 1.563.198 2.546.44 2.83 1.751l.523 2.229c.207.972-1.472 2.262-3.065 2.403-1.742.098-3.165-.191-3.214-2.111z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "77",
          SynthProp: Tone.Synth,
          note: ["E2", "G2", "B2"],
          fill: "#e8ceb8",
          d: "M227.005 205.163c-.421.004-.47-.192-.527-.386l-.439-1.545c-.114-.403.28-.761.984-.896l10.764-1.756c.55-.086.829.041.983.457l1.124 3.371c.211.616.081.646-.404.65z"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row$1, { viewBox: "1.4 207.8 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "56",
          SynthProp: Tone.AMSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8e9eb",
          d: "M2.933 220.001c1.383-1.679 3.47-3.458 5.33-4.369.348-.158.921-.179 1.206-.066 1.448.602 3.055 1.762 4.527 3.01.434.369.417.572.125 1.05-1.385 2.237-2.77 4.474-4.229 6.859-.322.518-1.094.243-1.536-.177-1.79-1.749-5.16-5.06-5.575-5.489-.246-.243-.16-.411.152-.818"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "57",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M24.635 219.224c-.448.127-.851.26-.854 1.219l.013 1.41c-.002.35.165.368.496.392 4.631.265 9.13.231 13.669 0 .525-.033.736-.049.739-.447l.019-2.07c.004-.206-.193-.274-.372-.343-1.32-.489-12.36-.556-13.71-.161"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "58",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M48.644 221.285c1.875-1.402 5.067-3.79 5.961-4.456 1.331-.978 4.236-.149 4.346 1.485.048 1.637-2.975 3.757-6.858 5.772-1.037.488-2.495.221-3.275-.488-.718-.723-.831-1.838-.174-2.313"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "59",
          SynthProp: Tone.MonoSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#ffe57f",
          d: "M71.71 220.736c2.524-2.013 4.471-3.543 4.608-4.596.021-.185.386-.074.338.064-.734 2.288 1.06 4.194 1.082 4.825.032.7-.295 1.206-.888 1.226-1.866.032-3.42-.479-5.043-.978-.546-.179-.312-.371-.097-.541"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "60",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M92.049 219.013c.022-.939.473-1.338 1.952-1.341 2.994-.01 5.983-.025 8.978-.039 1.726.007 1.992.545 1.993 1.38l.022 4.03c-.002.428-.494.439-.985.438q-5.497.045-10.996.087c-.683-.017-1.058-.092-1.052-.591z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "61",
          SynthProp: Tone.FMSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#313638",
          d: "M114.009 218.154c-.413-.403-.317-.577.057-.795 1.684-.944 11.602-.081 13 1.048.312.245.098.479-.104.725l-4.981 6.179c-.156.187-.222.171-.391.017z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "62",
          SynthProp: Tone.AMSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8e9eb",
          d: "M136.059 221.933c4.288-1.925 8.869-3.275 12.864-5.774.287-.176.567.179.444.369-1.237 1.961-5.339 6.329-8.73 9.488-.382.335-.692.294-.905.12l-4.066-3.315c-.475-.399-.012-.711.393-.888"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "63",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M158.422 223.654c2.518-2.864 6.772-6.957 8.52-7.736 1.346-.622 2.841.103 4.59 1.078 2.368 1.378 2.305 3.211.933 4.462-1.398 1.301-8.629 5.164-10.763 5.688-1.076.247-1.927.125-2.824-.586-.937-.807-1.878-1.326-.456-2.906"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "64",
          SynthProp: Tone.AMSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8e9eb",
          d: "M192.896 221.598c.654 1.061-.35 2.102-1.41 2.426-1.611.515-2.655.483-3.69-.494-1.834-1.82-3.05-3.139-3.446-5.034-.112-.618-.14-1.335.31-1.636.507-.292 1.397-.03 2.464.376 2.676 1.071 4.673 2.689 5.772 4.362"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "65",
          SynthProp: Tone.AMSynth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8e9eb",
          d: "M206.366 219.039c.452-.858 1.778-1.426 2.64-1.451l6.989-.176c.645.002.887.503.593 1.055-2.256 4.191-2.959 4.232-5.545 4.423-1.986.105-3.412.525-5.049.83-.709.126-1.137-.329-.813-1.297.403-1.121.805-2.651 1.185-3.384"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold$1,
        {
          id: "66",
          SynthProp: Tone.Synth,
          note: ["G2", "B2", "D3", "F3"],
          fill: "#e8ceb8",
          d: "M225.002 212.964c1.245-.41 1.826-.041 2.983.76 2.197 1.579 4.899 3.83 7.291 5.292 2.59 1.606 5.334 4.63 3.817 6.013-1.601 1.42-3.284-.166-4.801-.74-.831-.305-1.38-.478-2.116-.521-.272-.019-.587-.182-.735-.376-.86-1.166-2.292-3.748-5.335-5.275-.874-.461-3.76-1.869-3.71-2.901.069-.908 1.404-1.818 2.606-2.252"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row, { viewBox: "0 0 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "45",
          SynthProp: Tone.Synth,
          note: ["D2", "F2", "A2"],
          viewBox: "1.4 226.1 242.5 24.57",
          fill: "#e8ceb8",
          d: "m3.018 236.163 11.005-1.137c.954-.107 3.544.524 3.097 2.992-.233 1.321-.461 2.645-.692 3.969-.227 1.234-1.469 1.153-2.456 1.15-4.022-.053-7.753-.296-11.67-.604-1.3-.129-2.229-.815-2.037-3.231.187-2.056 1.009-2.946 2.753-3.139"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "46",
          SynthProp: Tone.AMSynth,
          note: ["D2", "F2", "A2"],
          viewBox: "1.4 226.1 242.5 24.57",
          fill: "#e8e9eb",
          d: "M25.008 234.711c5.039.144 9.995.48 14.921 1.264.611.101.646.288.547.615l-1.648 5.616c-.149.48-.387.581-1.273.637-4.394.2-8.796.428-11.484.659-.555.035-.226-.725-1.482-1.162-2.431-.843-2.34-3.616-2.357-5.446.001-1.136.95-2.208 2.776-2.183"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "47",
          SynthProp: Tone.FMSynth,
          note: ["D2", "F2", "A2"],
          viewBox: "1.4 226.1 242.5 24.57",
          fill: "#313638",
          d: "M48.488 237.948c3.605-3.035 7.719-3.679 10.326-1.686 1.767 1.385-3.21 6.736-7.797 5.222l-3.683-1.14a1.8 1.8 0 0 0-.759-.063c-.241.032-.232-.097-.176-.219.27-.565.705-.941 2.089-2.114"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "48",
          SynthProp: Tone.Synth,
          note: ["D2", "F2", "A2"],
          viewBox: "1.4 226.1 242.5 24.57",
          fill: "#e8ceb8",
          d: "M68.331 240.147c-.366.323-.383.514 0 .818l4.668 3.61c.483.366.557.329 1.13.041 2.427-1.269 8.434-8.321 8.962-9.324.418-.786.353-1.643-.707-2.128-.97-.466-1.456-.436-2.624.005-3.067 1.189-8.541 4.488-11.429 6.978"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "49",
          SynthProp: Tone.FMSynth,
          note: ["D2", "F2", "A2"],
          viewBox: "1.4 226.1 242.5 24.57",
          fill: "#313638",
          d: "M93.057 239.899c-.005.36.276.359.582.389l9.628.795c.601.046.632-.108.681-.431l.562-4.028c.046-.283-.022-.376-.483-.375-4.782.043-9.392.252-10.536 1.325-.516.524-.42 1.646-.434 2.325"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "50",
          SynthProp: Tone.MonoSynth,
          note: ["D2", "F2", "A2"],
          viewBox: "1.4 226.1 242.5 24.57",
          fill: "#ffe57f",
          d: "M118 234.968c2.967-.034 5.654.142 8.362.56.971.166 1.021.843.919 1.538a224 224 0 0 1-.743 5.941c-.063.381-.202.389-.424.371-2.284-.165-5.276-.287-6.544-.041-1.192.257-1.976.454-2.559.422-.442-.026-.774-.467-.884-.79-.756-2.146-1.518-4.305-1.93-6.469-.195-1.004 1.798-1.482 3.803-1.532"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "51",
          SynthProp: Tone.Synth,
          note: ["D2", "F2", "A2"],
          viewBox: "1.4 226.1 242.5 24.57",
          fill: "#e8ceb8",
          d: "M141.998 243.325c-3.701-.052-9.661-.488-9.488-4.008.049-1.248 1.681-3.204 7.095-3.922 2.028-.307 5.962-1.86 7.519-1.066 2.453 1.216 2.307 3.261 1.635 5.074-1.337 3.594-2.839 3.912-6.761 3.922"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "52",
          SynthProp: Tone.FMSynth,
          note: ["D2", "F2", "A2"],
          viewBox: "1.4 226.1 242.5 24.57",
          fill: "#313638",
          d: "M162.739 236.751c1.679-1.261 3.393-2.509 5.257-3.309.374-.153.533-.111.841-.021l5.496 1.578c.541.171.427.39 0 .717-3.495 2.75-6.99 5.5-10.466 8.277-.249.2-.389.212-.631.026l-3.991-2.982c-.273-.207-.198-.693.056-1.048.905-1.322 2.125-2.214 3.438-3.238"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "53",
          SynthProp: Tone.MonoSynth,
          note: ["D2", "F2", "A2"],
          viewBox: "1.4 226.1 242.5 24.57",
          fill: "#ffe57f",
          d: "M185.843 241.921c.274-3.167.189-4.753.024-6.32-.099-1.019 1.24-1.437 2.608-1.444 1.971.026 2.51.125 2.919 1.91.621 2.709.568 2.843-.324 4.888-.081.186-.126.304-.02.449.554.698.638 1.122-.533 1.522-.57.176-.665.22-.865-.087a.23.23 0 0 0-.18-.109l-1.088-.11c-.103-.011-.163.03-.164.104-.007.604-2.505.654-2.377-.803"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "54",
          SynthProp: Tone.Synth,
          note: ["D2", "F2", "A2"],
          viewBox: "1.4 226.1 242.5 24.57",
          fill: "#e8ceb8",
          d: "M208.379 236.216c2.255-1.588 4.4-2.897 7.314-3.918.834-.263 1.582.231 2.458.805.796.553 1.628 1.197 1.284 1.889-2.144 4.256-7.369 8.253-12.277 10.222-.867.318-.944.269-2.423-1.021-1.479-1.322-1.489-1.231-1.096-2.247.971-2.384 2.642-4.177 4.74-5.73"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "55",
          SynthProp: Tone.MonoSynth,
          note: ["D2", "F2", "A2"],
          viewBox: "1.4 226.1 242.5 24.57",
          fill: "#ffe57f",
          d: "m230.416 236.877 5.458.093c.372.008.375.156.371.545.017 2.476-.264 3.085-1.44 3.194l-2.752.267c-.215.021-.327-.115-.394-.314-.413-1.199-1.232-2.166-1.672-3.228-.11-.301.096-.559.429-.557"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row, { viewBox: "0 0 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "34",
          SynthProp: Tone.AMSynth,
          note: ["F2", "A2", "C3"],
          viewBox: "0.5 244.4 242.5 24.57",
          fill: "#e8e9eb",
          d: "M1.353 255.066c-.366-.471-.261-.494.058-.499 1.78-.025 2.654-.997 9.599-.941 1.719.008 2.058 2.36 2.095 4.401-.006.546-.558.702-1.099.695-7.969-.036-9.051-1.651-10.653-3.656"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "35",
          SynthProp: Tone.MonoSynth,
          note: ["F2", "A2", "C3"],
          viewBox: "0.5 244.4 242.5 24.57",
          fill: "#ffe57f",
          d: "M27.98 255.713c-.463.095-.42.601-.152 1.272.906 2.048 1.928 2.118 4.167 1.976 1.858-.134 2.627-.336 2.749-2.078.023-.31.026-.444.114-.569.52-.69.996-1.262.406-1.577-.658-.33-5.041.483-7.284.976"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "36",
          SynthProp: Tone.MonoSynth,
          note: ["F2", "A2", "C3"],
          viewBox: "0.5 244.4 242.5 24.57",
          fill: "#ffe57f",
          d: "M58.395 254.874c.371.015.409.115.106.331-2.455 1.803-3.578 2.724-5.742 4.781-.431.412-1.022.397-1.084-.012-.275-1.704-.44-3.354-.603-4.906a.4.4 0 0 1 .407-.441c3.096.106 4.613.16 6.916.247"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "37",
          SynthProp: Tone.AMSynth,
          note: ["F2", "A2", "C3"],
          viewBox: "0.5 244.4 242.5 24.57",
          fill: "#e8e9eb",
          d: "M68.813 260.649c-.491.121-.735.042-.319-.497 2.5-3.372 5.142-5.803 8.389-8.306.747-.534 1.17-.554 1.817.278 1.06 1.344 2.142 3.063 2.395 4.598.087.603-.404.699-.851.828-3.81 1.037-7.62 2.075-11.431 3.099"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "38",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3"],
          viewBox: "0.5 244.4 242.5 24.57",
          fill: "#e8ceb8",
          d: "M91.858 259.035c4.11-5.875 7.681-6.493 9.423-4.861 1.834 1.784 1.643 2.064.332 3.317a32.3 32.3 0 0 1-9.292 5.81c-1.125.452-1.72.355-2.081.14-1.081-.741.389-2.647 1.618-4.406"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "39",
          SynthProp: Tone.FMSynth,
          note: ["F2", "A2", "C3"],
          viewBox: "0.5 244.4 242.5 24.57",
          fill: "#313638",
          d: "M111.259 254.946c-.015-.393.187-.69.716-.867 4.182-1.356 10.373-1.231 14.322.612.578.286.813.608.838 1.115l.161 2.307c.071 1.071-.634 1.286-1.312 1.476-3.641 1.039-10.402-.448-13.924-1.558-.606-.183-.726-.557-.738-1.005q-.036-1.04-.063-2.08"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "40",
          SynthProp: Tone.MonoSynth,
          note: ["F2", "A2", "C3"],
          viewBox: "0.5 244.4 242.5 24.57",
          fill: "#ffe57f",
          d: "M141.978 253.598c1.902.008 4.006-.011 4.066 1.417.113 3.545-.361 4.821-3.025 5.432-1.172.206-2.718.132-3.985-.073-.808-.138-.848-.502-.848-.702.003-.178.05-.401.419-.417.226-.009.414.034.493-.287.174-.76.164-1.508-.044-2.159-.024-.077-.047-.153-.078-.223-.191-.462-.79-.854-1.192-1.277-.225-.23-.1-.642.262-.87.961-.594 2.341-.848 3.932-.841"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "41",
          SynthProp: Tone.AMSynth,
          note: ["F2", "A2", "C3"],
          viewBox: "0.5 244.4 242.5 24.57",
          fill: "#e8e9eb",
          d: "M170.95 257.168c.765.68.531 1.072-.002 1.514a161 161 0 0 1-3.546 2.872c-.409.309-1.08.051-1.48-.227-2.87-2.021-6.427-5.055-7.991-7.293-.31-.45.069-.876.745-1.366 1.523-1.056 1.825-1.112 2.841-.86 4.041 1.083 7.221 3.434 9.433 5.36"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "42",
          SynthProp: Tone.Synth,
          note: ["F2", "A2", "C3"],
          viewBox: "0.5 244.4 242.5 24.57",
          fill: "#e8ceb8",
          d: "M186.007 253.602c2.809.079 7.335.433 4.998 3.392-1.797 2.266-3.621 4.347-6.989 2.718-2.154-1.049-3.99-2.692-3.055-4.243 1.111-1.749 2.039-1.916 5.046-1.867"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "43",
          SynthProp: Tone.FMSynth,
          note: ["F2", "A2", "C3"],
          viewBox: "0.5 244.4 242.5 24.57",
          fill: "#313638",
          d: "m206.273 259.96-.031-4.419c.012-.873.005-.831-1.027-2.471-.166-.261.151-.414.576-.527 1.22-.304 2.608-.439 4.248-.523.386-.019.532.075.594.218.511 1.002.316 1.834.256 2.564-.37 3.758-.009 5.359-1.382 5.873-.575.214-1.498-.031-2.599-.058-.57-.014-.636-.1-.635-.657"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "44",
          SynthProp: Tone.AMSynth,
          note: ["F2", "A2", "C3"],
          viewBox: "-1.8 244.4 242.5 24.57",
          fill: "#e8e9eb",
          d: "M230.608 252.838c1.382 1.121 2.729 2.282 3.927 3.65.299.357-.119.785-.429 1.136l-2.455 2.669c-1.827 1.86-3.261-2.051-3.652-4.203-.176-1.02.771-2.211 1.565-3.1.347-.383.558-.53 1.044-.152"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row, { viewBox: "0 0 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "23",
          SynthProp: Tone.FMSynth,
          note: ["A2", "C3", "E3"],
          viewBox: "1.1 262.7 242.5 24.57",
          fill: "#313638",
          d: "m9.299 270.985 5.06 4.391c.393.337.399.733 0 1.078-1.22 1.035-2.436 2.067-3.128 2.645-.99.794-1.628.714-2.405.156-1.984-1.537-3.586-2.926-4.866-4.196-.421-.423-.144-1.174.372-1.525l3.944-2.753c.316-.221.674-.089 1.023.204"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "24",
          SynthProp: Tone.AMSynth,
          note: ["A2", "C3", "E3"],
          viewBox: "0.5 262.7 242.5 24.57",
          fill: "#e8e9eb",
          d: "M31.687 270.968c1.186-.806 1.817-.311 3.134.867 1.489 1.351 2.166 1.68 1.286 2.629l-4.657 5.008c-1.097 1.186-2.478.079-3.735-1.035-1.226-1.141-2.708-2.869-1.427-3.763z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "25",
          SynthProp: Tone.Synth,
          note: ["A2", "C3", "E3"],
          viewBox: "0.5 262.7 242.5 24.57",
          fill: "#e8ceb8",
          d: "M48.87 267.591c3.973 3.04 7.947 6.08 11.974 9.119.382.288.462.549.161.88-2.082 2.208-4.272 3.023-6.983 1.759-2.541-1.276-5.395-4.743-7.314-7.263-2.038-2.74-1.324-3.724-.198-4.458.652-.411 1.444-.707 2.36-.037"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "26",
          SynthProp: Tone.AMSynth,
          note: ["A2", "C3", "E3"],
          viewBox: "0.5 262.7 242.5 24.57",
          fill: "#e8e9eb",
          d: "M71.296 272.53c1.153-1.072 2.373-2.257 3.779-3.066.547-.298.879-.315 1.577.244 2.414 1.972 5.196 4.378 6.755 6.2.63.779.322 1.425.049 1.93-.689 1.216-1.193 2.397-2.075 3.281-.73.687-1.659.183-2.34-.386-2.834-2.471-5.26-4.6-7.725-6.887-.498-.469-.365-.999-.02-1.316"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "27",
          SynthProp: Tone.FMSynth,
          note: ["A2", "C3", "E3"],
          viewBox: "0.5 262.7 242.5 24.57",
          fill: "#313638",
          d: "M93.332 272.696q1.792-.552 3.586-1.099c.34-.103.537.132.686.318 1.12 1.344 2.664 2.682 4.49 3.91.688.462.514.555.304.77l-1.628 1.72c-.333.343-.758.23-1.193-.022-2.39-1.428-4.915-3.005-6.377-5.088-.123-.176-.223-.396.132-.509"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "28",
          SynthProp: Tone.AMSynth,
          note: ["A2", "C3", "E3"],
          viewBox: "0.5 262.7 242.5 24.57",
          fill: "#e8e9eb",
          d: "M114.519 274.563c-.825-.677-1.135-1.324-.252-2.073 1.292-1.065 2.563-2.096 4.766-2.627.491-.108.961.302 1.287.546 3.693 2.768 5.057 5.73 3.498 10.487-.163.497-.579.419-.939.144a2388 2388 0 0 1-8.36-6.477"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "29",
          SynthProp: Tone.MonoSynth,
          note: ["A2", "C3", "E3"],
          viewBox: "0.5 262.7 242.5 24.57",
          fill: "#ffe57f",
          d: "M139.448 275.813c-.275-.476-.317-.659.083-1.097.387-.449 1.023-1.02 1.167-1.25.401-.578.085-1.188.05-1.523-.083-.717.17-.682.637-.591 3.074.713 2.743 3.123 3.321 4.089.153.275-.331.418-1.25 1.277-.261.251-.851.801-1.353 1.42-.238.297-.588.293-.939-.062a15 15 0 0 1-1.716-2.263"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "30",
          SynthProp: Tone.FMSynth,
          note: ["A2", "C3", "E3"],
          viewBox: "0.5 262.7 242.5 24.57",
          fill: "#313638",
          d: "M167.288 277.136c-.049.91-.019 1.167-.681 1.208q-3.189.14-6.38.272c-.552.013-.483-.449-.305-.983q1.297-3.593 2.599-7.184c.139-.354.612-.493 1.392-.369 1.002.162 2.003.327 2.999.507.734.153.616.897.593 1.348z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "31",
          SynthProp: Tone.AMSynth,
          note: ["A2", "C3", "E3"],
          viewBox: "0.5 262.7 242.5 24.57",
          fill: "#e8e9eb",
          d: "M182.296 270.011c-.306-2.454-.253-2.248 1.458-1.163 6.476 4.071 7.203 7.144 6.742 9.208-.426 1.904-1.318 2.452-2.622 1.674-2.37-1.536-5.014-4.185-5.231-6.379z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "32",
          SynthProp: Tone.Synth,
          note: ["A2", "C3", "E3"],
          viewBox: "0.5 262.7 242.5 24.57",
          fill: "#e8ceb8",
          d: "M202.856 273.334c1.171-1.351 2.7-2.617 4.46-3.42.406-.177.838-.108 1.686.208 1.604.623 3.214 1.233 4.814 1.904 2.292 1.02 2.024 2.057.742 3.08-1.92 1.575-3.837 3.154-5.806 4.689-1.56 1.076-3.379.023-3.986-1.027-1.129-1.94-1.67-2.995-2.212-4.05-.192-.37-.162-.855.302-1.384"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "33",
          SynthProp: Tone.MonoSynth,
          note: ["A2", "C3", "E3"],
          viewBox: "-2 262.7 242.5 24.57",
          fill: "#ffe57f",
          d: "M228.9 272.164c4.684-1.007 6.103 2.379 4.523 3.96-1.812 1.807-3.733 1.771-5.452-.452-.769-1.104-1.139-2.997.929-3.508"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row, { viewBox: "0 0 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "12",
          SynthProp: Tone.AMSynth,
          note: ["G2", "B2", "D3"],
          viewBox: "0.5 281 242.5 24.57",
          fill: "#e8e9eb",
          d: "M10.863 289.085c1.557 1.47 3.219 3.731 4.339 5.527.885 1.493-2.098 1.98-4.209 1.957-2.771-.09-4.656-.413-6.18-1.642-.956-.783-.519-1.526.162-2.081 1.582-1.295 3.152-2.624 4.722-3.952.461-.375.908-.049 1.166.191"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "13",
          SynthProp: Tone.FMSynth,
          note: ["G2", "B2", "D3"],
          viewBox: "0.5 281 242.5 24.57",
          fill: "#313638",
          d: "M26.009 291.245c2.144-.114 4.28-.25 6.432-.344 1.333-.046 3.538 1.803 2.972 3.263-.522 1.326-1.044 2.652-1.383 3.391-.347.737-.329.855-.812.513-2.618-1.845-5.341-3.915-7.425-5.839-.959-.878-.8-.926.216-.984"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "14",
          SynthProp: Tone.FMSynth,
          note: ["G2", "B2", "D3"],
          viewBox: "0.7 281 242.5 24.57",
          fill: "#313638",
          d: "M47.085 291.076c2.992-2.252 6.231-4.02 9.97-.952 4.137 3.434.902 7.193-1.2 8.816-2.089 1.632-5.785 4.449-6.275 4.712-2.234 1.201-5.088-.043-7.066-2.085-2.721-2.811-2.808-3.975.074-6.767 1.367-1.337 2.959-2.531 4.497-3.724m1.002 5.487c-1.836-.764-2.74-.2-2.651.587.147 1.099.382 2.357 1.591 2.524 1.091.146 2.386.364 2.409-.642.024-.798.085-1.843-1.349-2.469"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "15",
          SynthProp: Tone.MonoSynth,
          note: ["G2", "B2", "D3"],
          viewBox: "0.2 281 242.5 24.57",
          fill: "#ffe57f",
          d: "M72.604 291.917c2.016-1.327 3.506-1.525 6.066.283 1.66 1.248 2.52 2.712.936 4.224-1.413 1.322-2.817 1.504-5.556-.028-1.523-.893-4.119-2.773-1.446-4.479"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "16",
          SynthProp: Tone.MonoSynth,
          note: ["G2", "B2", "D3"],
          viewBox: "1.6 281 242.5 24.57",
          fill: "#ffe57f",
          d: "M98.919 295.987c.15.329.63.148.613-.084a1.8 1.8 0 0 1 .067-.67c.152-.503 1.058-.93 1.37-1.387.272-.377.416-.915.446-1.216.056-.54.497-1.195.964-2.023.161-.284-.159-.344-.522-.253-1.424.378-3.87 1.064-4.631 2.021-.553.754.761 1.558 1.693 3.612"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "17",
          SynthProp: Tone.FMSynth,
          note: ["G2", "B2", "D3"],
          viewBox: "2 281 242.5 24.57",
          fill: "#313638",
          d: "m120.902 289.43 6.691 2.821c.553.229 1.378 1.662 1.791 2.655.081.191-.149.362-.448.489-.794.331-1.581.656-2.384.995-.269.113-.443.201-.684.203l-5.158.014c-1.959-.05-2.363-1.992-1.508-3.979l1.131-2.952c.135-.355.242-.374.569-.246"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "18",
          SynthProp: Tone.AMSynth,
          note: ["G2", "B2", "D3"],
          viewBox: "2.2 281 242.5 24.57",
          fill: "#e8e9eb",
          d: "M139.277 289.714c2.165-.286 4.234-.544 6.524-.64 2.679-.114 5.319.607 6.718 1.486 1.682 1.021 1.447 2.95.946 3.404-2.22 1.965-4.797 3.319-7.305 4.727a.94.94 0 0 1-1.083-.099c-2.691-2.41-4.567-5.566-6.008-8.227-.245-.49-.153-.598.208-.651"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "19",
          SynthProp: Tone.FMSynth,
          note: ["G2", "B2", "D3"],
          viewBox: "1.5 281 242.5 24.57",
          fill: "#313638",
          d: "M173.969 289.625c2.012.01 2.261.589 2.322 2.342.156 6.541-8.919 4.643-12.594 3.042-1.522-.672-3.043-1.345-4.559-2.076-.909-.451.116-1.532.907-1.919 2.454-1.184 9.001-1.357 13.924-1.389"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "20",
          SynthProp: Tone.AMSynth,
          note: ["G2", "B2", "D3"],
          viewBox: "4.5 281 242.5 24.57",
          fill: "#e8e9eb",
          d: "M188.985 292.326c-.096-.399.508-.814.955-1.143 2.239-1.61 6.072-1.682 7.837-.001.683.667.55 1.929.22 2.195-1.494 1.151-4.415 2.962-6.876 4.267-.317.158-.87-.018-.935-.297a598 598 0 0 1-1.201-5.021"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "21",
          SynthProp: Tone.FMSynth,
          note: ["G2", "B2", "D3"],
          viewBox: "5.5 281 242.5 24.57",
          fill: "#313638",
          d: "M216.423 290.185a29.6 29.6 0 0 1 3.365 2.52c.358.313.338.914.089 1.215a18.4 18.4 0 0 1-3.039 2.905c-.465.354-.818.267-1.408-.148-1.424-.991-2.879-2.134-3.744-3.033-.515-.525-.232-.986.039-1.206 1.089-.858 2.243-1.697 3.527-2.446.446-.255.555-.198 1.171.193"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "22",
          SynthProp: Tone.FMSynth,
          note: ["G2", "B2", "D3"],
          viewBox: "5 281 242.5 24.57",
          fill: "#313638",
          d: "M235.297 288.4c.199-.354.541-.429 1.027-.204 1.948.883 4.91 3.268 7.277 5.185.322.263.215.395.043.78a7.92 7.92 0 0 1-4.07 3.828c-.429.184-.647.207-.86.001-4.423-4.445-5.656-5.664-3.417-9.59"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(Row, { viewBox: "0 0 242.5 24.57", children: [
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "1",
          SynthProp: Tone.FMSynth,
          note: ["C3", "E3", "G3"],
          viewBox: "-0.7 299.3 242.5 24.57",
          fill: "#313638",
          d: "M5.978 306.415c.66-.253.895-.195 1.406.25 1.756 1.563 3.518 3.126 5.273 4.691.889.8.567 4.926-.313 6.893-.196.435-.32.362-.625.137L.225 309.385c-.361-.281-.263-.584.144-.748 1.875-.742 3.748-1.483 5.609-2.222"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "2",
          SynthProp: Tone.MonoSynth,
          note: ["C3", "E3", "G3"],
          viewBox: "-0.5 299.3 242.5 24.57",
          fill: "#ffe57f",
          d: "M27.401 309.054c-.29.042-.312.248-.315.438-.024 1.732 1.318 3.7 2.217 4.186.629.326 2.961-.32 3.641-.77.23-.144.222-.229.237-.38.106-1.443-.218-2.488-.889-3.187-.175-.164-.432-.235-.688-.273-1.299-.182-2.893-.205-4.203-.014"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "3",
          SynthProp: Tone.MonoSynth,
          note: ["C3", "E3", "G3"],
          viewBox: "0.5 299.3 242.5 24.57",
          fill: "#ffe57f",
          d: "M52.013 308.622c1.954.693 3.916 1.657 5.863 2.078.434.096.258.35-.057.626-.704.634-1.885 1.426-2.86 2.093-.413.277-1.15-.065-1.537-.371-1.158-.935-2.382-1.924-3.201-2.59-.561-.462-.154-1.171.199-1.451.674-.523 1.031-.591 1.593-.385"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "4",
          SynthProp: Tone.AMSynth,
          note: ["C3", "E3", "G3"],
          viewBox: "0.5 299.3 242.5 24.57",
          fill: "#e8e9eb",
          d: "M84.994 307.47c.608.002.745.171.731.678-.052 2.528-.752 6.023-2.759 6.143-4.944.235-10.447.443-13.353-.494-1.177-.394-1.541-3.801-1.568-5.802-.005-.475.11-.626.499-.623z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "5",
          SynthProp: Tone.FMSynth,
          note: ["C3", "E3", "G3"],
          viewBox: "0.5 299.3 242.5 24.57",
          fill: "#313638",
          d: "M100.595 305.817c1.843.829 5.51 3.922 5.601 4.664.057.418-.108.809-.242 1.2-1.096 3.163-8.293 7.262-12.505 3.75-3.398-3.167 3.093-7.663 6.252-9.688.274-.17.538-.081.894.074"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "6",
          SynthProp: Tone.MonoSynth,
          note: ["C3", "E3", "G3"],
          viewBox: "1 299.3 242.5 24.57",
          fill: "#ffe57f",
          d: "M119.772 311.271c-.301-1.276.81-2.233 2.219-2.294 1.81-.067 3.037-.053 3.776 2.009.517 1.601-.451 2.386-2.316 2.314-1.888-.096-3.311-.415-3.679-2.029"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "7",
          SynthProp: Tone.FMSynth,
          note: ["C3", "E3", "G3"],
          viewBox: "1 299.3 242.5 24.57",
          fill: "#313638",
          d: "M141.963 310.733c-.268.166-.195.367.1.528l5.28 2.893a.58.58 0 0 0 .624-.01c1.295-.765 2.59-1.53 3.873-2.327.437-.278.275-.646.114-.95l-.194-.365c-.046-.09-.072-.186.011-.251l.491-.399c.106-.089.097-.17-.046-.194l-6.241-1.141c-.27-.046-.524.036-.741.171z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "8",
          SynthProp: Tone.AMSynth,
          note: ["C3", "E3", "G3"],
          viewBox: "0.5 299.3 242.5 24.57",
          fill: "#e8e9eb",
          d: "M163.644 310.119c-.145-.668.748-1.084 1.727-1.283 1.702-.349 4.199-.342 6.456-.146.516.048.865.204.996.692.141.556.2 1.316.146 2.057-.05.545-.397 1.254-1.494 1.418-1.982.257-4.253.243-6.78.109-.285-.019-.463-.03-.556-.501z"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "9",
          SynthProp: Tone.MonoSynth,
          note: ["C3", "E3", "G3"],
          viewBox: "3 299.3 242.5 24.57",
          fill: "#ffe57f",
          d: "M193.003 307.513c1.72-.045 2.421.668 3.776 2.496.792 1.138-.66 2.573-1.801 3.527-1.728 1.351-3.012 1.124-5.474-.6-1.188-.908-2.158-2.544-1.493-3.82.602-1.116 2.386-1.524 4.992-1.603"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "10",
          SynthProp: Tone.AMSynth,
          note: ["C3", "E3", "G3"],
          viewBox: "5 299.3 242.5 24.57",
          fill: "#e8e9eb",
          d: "M220 308.246c.606.01.833.106.907.6l.586 4.084c.191 1.203.194 2.03-2.016 1.919-3.589-.235-8.057-.568-10.455-1.45-1.068-.404-1.021-1.731-.03-2.84 2.104-2.288 6.612-2.354 11.008-2.313"
        }
      ),
      /* @__PURE__ */ jsx(
        Hold,
        {
          id: "11",
          SynthProp: Tone.MonoSynth,
          note: ["C3", "E3", "G3"],
          viewBox: "5 299.3 242.5 24.57",
          fill: "#ffe57f",
          d: "M233.724 311.008c-.221-.296.037-.429.337-.469 1.255-.167 2.559-.715 3.304-1.428.354-.324.489-.269.785-.169 1.142.41 2.122.378 2.946.466.959.106.359.571.42.946.166 1.093-.325 2.188-2.357 3.472-1.93 1.192-4.431-1.519-5.435-2.818"
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Line, { playing, setPlaying })
  ] });
};
const Mooglogo = () => {
  if (typeof document !== "undefined") {
    const svgElement = document.querySelector("svg");
    window.onbeforeunload = function() {
      window.scrollTo(0, 0);
    };
    const updateScale = () => {
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const scrollPercent = window.scrollY / scrollHeight;
      const clampedPercent = Math.min(Math.max(scrollPercent, 0), 1);
      svgElement.style.transform = `scale(${1 - clampedPercent * 0.3})`;
    };
    window.addEventListener("scroll", updateScale);
  }
  return (
    //multiple svgs with slight viewbox changes to account for discrepancies with hand modelled font in regards to overlapping opacity
    /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 278.67 296.25",
        className: "flex flex-col justify-center max-h-[70vh] fixed z-0",
        children: [
          /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("style", { children: `
        .cls-1 {
          fill: #FFFFFF;
          stroke: #FFFFFF;
          stroke-miterlimit: 10;
          stroke-width: 3px;
        }
        .cls-2 {
          fill: #231f20;
          stroke-width: 0px;
        }
      ` }) }),
          /* @__PURE__ */ jsx("g", { id: "Layer_1", "data-name": "Layer 1", children: /* @__PURE__ */ jsx(
            "circle",
            {
              cx: "139.36",
              cy: "146.91",
              r: "106.42",
              fill: "#b8cbcd",
              fillOpacity: 0
            }
          ) }),
          /* @__PURE__ */ jsx("g", { id: "Layer_2", "data-name": "Layer 2", children: /* @__PURE__ */ jsxs("g", { children: [
            /* @__PURE__ */ jsxs("g", { children: [
              /* @__PURE__ */ jsx(
                "path",
                {
                  className: "cls-1",
                  d: "M112.4,158.56c-.05-10.27.05-20.55.3-30.83.33-12.2,6.06-19.52,15.33-19.75,9.28-.18,14.73,6.99,14.8,19.38.04,10.42.05,20.84.05,31.26-.02,12.39-5.59,19.53-15.13,19.43-9.54-.14-15.27-7.3-15.35-19.5ZM134.93,157.14c0-9.43,0-18.86.04-28.29.02-8.56-2.26-12.41-7.08-12.33-4.81.09-7.23,3.99-7.37,12.49-.15,9.37-.21,18.73-.19,28.1.03,8.5,2.43,12.35,7.34,12.4,4.92.04,7.26-3.81,7.26-12.37Z"
                }
              ),
              /* @__PURE__ */ jsx(
                "path",
                {
                  className: "cls-1",
                  d: "M155.08,158.6c.03-10.37-.03-20.73-.18-31.1-.15-12.35,5.03-19.28,14.32-18.73,9.26.59,15.23,7.94,15.8,19.75.43,9.97.61,19.91.53,29.86-.13,11.79-6,18.86-15.52,19.22-9.54.33-14.96-6.65-14.93-19ZM177.62,157.02c.04-9.13-.09-18.26-.4-27.41-.3-8.29-2.82-12.19-7.63-12.43-4.82-.24-6.98,3.5-6.81,11.96.19,9.32.27,18.63.25,27.95-.03,8.46,2.25,12.23,7.17,12.12,4.9-.12,7.37-3.91,7.42-12.19Z"
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "path",
              {
                className: "cls-1",
                d: "M57.74,173.41c0-.12.02-.24.01-.36-.98-13.83-.92-27.47.19-41.33.63-7.43,3.25-10.77,7.61-11.27,4.39-.5,6.22,2.47,5.71,10.27-.93,14.47-.98,28.8-.16,43.26,0,.13.04.25.06.38,2.59.17,5.18.33,7.77.47,0-.13.02-.25.02-.38-.73-14.78-.68-29.45.14-44.24.47-7.93,2.98-11.4,7.36-11.76,4.4-.36,6.34,2.83,5.99,11.03-.64,15.24-.68,30.41-.11,45.65,0,.14.04.27.05.4,2.6.12,5.19.22,7.79.32,0-.13.03-.26.03-.4-.48-15.93-.43-31.82.14-47.76.42-12.06-4.28-18.27-13.25-17.36-4.85.49-8.38,3.09-10.93,7.21-1.83-3.68-4.86-5.45-9.71-4.78-8.9,1.29-15.13,7.98-16.2,18.38-1.33,13.87-1.44,27.47-.33,41.3,0,.12.04.24.07.35,2.58.21,5.17.42,7.75.62Z"
              }
            ),
            /* @__PURE__ */ jsx(
              "path",
              {
                className: "cls-1",
                d: "M210.5,112.7c-9.47-1.33-14.1,4.8-13.46,16.4.55,9.75.77,19.44.67,29.15-.13,11.56,4.95,17.85,14.68,17.07,2.64-.2,5.35-1.29,7.56-2.73-.19,2.69-.41,5.38-.68,8.09-.31,3.13-3.21,5.2-6.23,5.55-4.66.53-9.33,1.02-14,1.45-.1,0-.2.04-.3.06-.2,2.45-.42,4.91-.67,7.37.1,0,.19,0,.29,0,4.72-.16,9.43-.4,14.12-.71,7.58-1.12,12.59-6.27,13.49-14.03,2.17-16.54,2.68-32.56,1.47-48.89-1.05-10.37-7.54-17.42-16.95-18.78ZM220.6,156.61c-.09,6.92-3.75,10.87-7.77,11.09-5.12.27-7.26-3.13-7.18-10.91.07-8.59-.16-17.18-.69-25.81-.49-7.82,1.42-11.14,6.44-10.57,4.98.57,7.75,4.25,8.36,11.67.65,8.22.93,16.38.84,24.54Z"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxs(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 -3 278.67 296.25",
              className: "flex flex-col justify-center max-h-[49vh] fixed center z-0 opacity-50",
              children: [
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("style", { children: `
        .cls-0 {
          fill: #FFFFFF;
          stroke: #FFFFFF;
          stroke-miterlimit: 10;
          stroke-width: 3px;
        }
        .cls-2 {
          fill: #231f20;
          stroke-width: 0px;
          
        }
      ` }) }),
                /* @__PURE__ */ jsx("g", { id: "Layer_1", "data-name": "Layer 1", children: /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: "139.36",
                    cy: "146.91",
                    r: "106.42",
                    fill: "#b8cbcd",
                    fillOpacity: 0
                  }
                ) }),
                /* @__PURE__ */ jsx("g", { id: "Layer_2", "data-name": "Layer 2", children: /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsxs("g", { children: [
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: "cls-0",
                      d: "M112.4,158.56c-.05-10.27.05-20.55.3-30.83.33-12.2,6.06-19.52,15.33-19.75,9.28-.18,14.73,6.99,14.8,19.38.04,10.42.05,20.84.05,31.26-.02,12.39-5.59,19.53-15.13,19.43-9.54-.14-15.27-7.3-15.35-19.5ZM134.93,157.14c0-9.43,0-18.86.04-28.29.02-8.56-2.26-12.41-7.08-12.33-4.81.09-7.23,3.99-7.37,12.49-.15,9.37-.21,18.73-.19,28.1.03,8.5,2.43,12.35,7.34,12.4,4.92.04,7.26-3.81,7.26-12.37Z"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "path",
                    {
                      className: "cls-0",
                      d: "M155.08,158.6c.03-10.37-.03-20.73-.18-31.1-.15-12.35,5.03-19.28,14.32-18.73,9.26.59,15.23,7.94,15.8,19.75.43,9.97.61,19.91.53,29.86-.13,11.79-6,18.86-15.52,19.22-9.54.33-14.96-6.65-14.93-19ZM177.62,157.02c.04-9.13-.09-18.26-.4-27.41-.3-8.29-2.82-12.19-7.63-12.43-4.82-.24-6.98,3.5-6.81,11.96.19,9.32.27,18.63.25,27.95-.03,8.46,2.25,12.23,7.17,12.12,4.9-.12,7.37-3.91,7.42-12.19Z"
                    }
                  )
                ] }) }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0.4 -3 278.67 296.25",
              className: "flex flex-col justify-center max-h-[49vh] fixed center z-0 opacity-50",
              children: [
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("style", { children: `
        .cls-0 {
          fill: #FFFFFF;
          stroke: #FFFFFF;
          stroke-miterlimit: 10;
          stroke-width: 3px;
        }
        .cls-2 {
          fill: #231f20;
          stroke-width: 0px;
          
        }
      ` }) }),
                /* @__PURE__ */ jsx("g", { id: "Layer_1", "data-name": "Layer 1", children: /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: "139.36",
                    cy: "146.91",
                    r: "106.42",
                    fill: "#b8cbcd",
                    fillOpacity: 0
                  }
                ) }),
                /* @__PURE__ */ jsx("g", { id: "Layer_2", "data-name": "Layer 2", children: /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    className: "cls-0",
                    d: "M210.5,112.7c-9.47-1.33-14.1,4.8-13.46,16.4.55,9.75.77,19.44.67,29.15-.13,11.56,4.95,17.85,14.68,17.07,2.64-.2,5.35-1.29,7.56-2.73-.19,2.69-.41,5.38-.68,8.09-.31,3.13-3.21,5.2-6.23,5.55-4.66.53-9.33,1.02-14,1.45-.1,0-.2.04-.3.06-.2,2.45-.42,4.91-.67,7.37.1,0,.19,0,.29,0,4.72-.16,9.43-.4,14.12-.71,7.58-1.12,12.59-6.27,13.49-14.03,2.17-16.54,2.68-32.56,1.47-48.89-1.05-10.37-7.54-17.42-16.95-18.78ZM220.6,156.61c-.09,6.92-3.75,10.87-7.77,11.09-5.12.27-7.26-3.13-7.18-10.91.07-8.59-.16-17.18-.69-25.81-.49-7.82,1.42-11.14,6.44-10.57,4.98.57,7.75,4.25,8.36,11.67.65,8.22.93,16.38.84,24.54Z"
                  }
                ) }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "-0.1 -3 278.67 296.25",
              className: "flex flex-col justify-center max-h-[49vh] fixed center z-0 opacity-50",
              children: [
                /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsx("style", { children: `
        .cls-0 {
          fill: #FFFFFF;
          stroke: #FFFFFF;
          stroke-miterlimit: 10;
          stroke-width: 3px;
        }
        .cls-2 {
          fill: #231f20;
          stroke-width: 0px;
          
        }
      ` }) }),
                /* @__PURE__ */ jsx("g", { id: "Layer_1", "data-name": "Layer 1", children: /* @__PURE__ */ jsx(
                  "circle",
                  {
                    cx: "139.36",
                    cy: "146.91",
                    r: "106.42",
                    fill: "#b8cbcd",
                    fillOpacity: 0
                  }
                ) }),
                /* @__PURE__ */ jsx("g", { id: "Layer_2", "data-name": "Layer 2", children: /* @__PURE__ */ jsx("g", { children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    className: "cls-0",
                    d: "M57.74,173.41c0-.12.02-.24.01-.36-.98-13.83-.92-27.47.19-41.33.63-7.43,3.25-10.77,7.61-11.27,4.39-.5,6.22,2.47,5.71,10.27-.93,14.47-.98,28.8-.16,43.26,0,.13.04.25.06.38,2.59.17,5.18.33,7.77.47,0-.13.02-.25.02-.38-.73-14.78-.68-29.45.14-44.24.47-7.93,2.98-11.4,7.36-11.76,4.4-.36,6.34,2.83,5.99,11.03-.64,15.24-.68,30.41-.11,45.65,0,.14.04.27.05.4,2.6.12,5.19.22,7.79.32,0-.13.03-.26.03-.4-.48-15.93-.43-31.82.14-47.76.42-12.06-4.28-18.27-13.25-17.36-4.85.49-8.38,3.09-10.93,7.21-1.83-3.68-4.86-5.45-9.71-4.78-8.9,1.29-15.13,7.98-16.2,18.38-1.33,13.87-1.44,27.47-.33,41.3,0,.12.04.24.07.35,2.58.21,5.17.42,7.75.62Z"
                  }
                ) }) })
              ]
            }
          )
        ]
      }
    ) })
  );
};
const meta = () => {
  return [
    { title: "MoogBoard" },
    { name: "description", content: "Welcome to Moogboard!" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full h-screen justify-center items-center", children: /* @__PURE__ */ jsx(Mooglogo, {}) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col w-full h-screen justify-center items-center ", children: /* @__PURE__ */ jsx(Board, {}) })
  ] }) });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-lOW8w6UU.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-BCSVz2pM.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-WMXm8jzw.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-BCSVz2pM.js"], "css": ["/assets/root-CcwkzUf-.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-CVgpslAh.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": [] } }, "url": "/assets/manifest-e8ef48fc.js", "version": "e8ef48fc" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
