import{r as i,j as e}from"./index-29b1rwwI.js";import{l as m,n as h,o as y,p as x,_ as w,O as S,M as g,L as j,S as k}from"./components-wYmdwKsX.js";/**
 * @remix-run/react v2.15.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let c="positions";function v({getKey:s,...l}){let{isSpaMode:o}=m(),t=h(),u=y();x({getKey:s,storageKey:c});let d=i.useMemo(()=>{if(!s)return null;let r=s(t,u);return r!==t.key?r:null},[]);if(o)return null;let p=((r,f)=>{if(!window.history.state||!window.history.state.key){let n=Math.random().toString(32).slice(2);window.history.replaceState({key:n},"")}try{let a=JSON.parse(sessionStorage.getItem(r)||"{}")[f||window.history.state.key];typeof a=="number"&&window.scrollTo(0,a)}catch(n){console.error(n),sessionStorage.removeItem(r)}}).toString();return i.createElement("script",w({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${p})(${JSON.stringify(c)}, ${JSON.stringify(d)})`}}))}function E({children:s}){const[l,o]=i.useState("bg-[#f5f5f5]");return i.useEffect(()=>{const t=()=>{window.scrollY<12?o("bg-[#84acac]"):o("bg-[#20616a]")};return window.addEventListener("scroll",t),t(),()=>{window.removeEventListener("scroll",t)}},[]),e.jsxs("html",{lang:"en",className:l,children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx("link",{rel:"icon",href:"/faviconHold.svg",type:"image/svg+xml"}),e.jsx("link",{rel:"stylesheet",href:"https://use.typekit.net/cyp4jyx.css"}),e.jsx(g,{}),e.jsx(j,{})]}),e.jsxs("body",{children:[s,e.jsx(v,{}),e.jsx(k,{})]})]})}function b(){return e.jsx(S,{})}export{E as Layout,b as default};
