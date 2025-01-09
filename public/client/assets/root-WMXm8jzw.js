import{r as i,j as e}from"./jsx-runtime-56DGgGmo.js";import{l as h,n as m,o as x,p as f,_ as S,O as j,M as w,L as g,S as k}from"./components-BCSVz2pM.js";/**
 * @remix-run/react v2.15.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function M({getKey:t,...l}){let{isSpaMode:c}=h(),o=m(),u=x();f({getKey:t,storageKey:a});let p=i.useMemo(()=>{if(!t)return null;let s=t(o,u);return s!==o.key?s:null},[]);if(c)return null;let y=((s,d)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[d||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(r){console.error(r),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",S({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${y})(${JSON.stringify(a)}, ${JSON.stringify(p)})`}}))}function O({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx("link",{rel:"icon",href:"/faviconHold.svg",type:"image/svg+xml"}),e.jsx("link",{rel:"stylesheet",href:"https://use.typekit.net/cyp4jyx.css"}),e.jsx(w,{}),e.jsx(g,{})]}),e.jsxs("body",{children:[t,e.jsx(M,{}),e.jsx(k,{})]})]})}function R(){return e.jsx(j,{})}export{O as Layout,R as default};
