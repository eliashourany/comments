if(!self.define){let e,s={};const n=(n,o)=>(n=new URL(n+".js",o).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(o,i)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let c={};const t=e=>n(e,r),m={module:{uri:r},exports:c,require:t};s[r]=Promise.all(o.map((e=>m[e]||t(e)))).then((e=>(i(...e),c)))}}define(["./workbox-6567b62a"],(function(e){"use strict";e.setCacheNameDetails({prefix:"comments"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/comments/css/app.b12cf01d.css",revision:null},{url:"/comments/data.json",revision:"e1009376d4fa83757f823cb1c6e7eabb"},{url:"/comments/img/back.cfeb8d3d.svg",revision:null},{url:"/comments/img/downArrow.a081991a.svg",revision:null},{url:"/comments/img/edit.ca37bf03.svg",revision:null},{url:"/comments/img/trash.168d8e2b.svg",revision:null},{url:"/comments/img/upArrow.ecc82b2e.svg",revision:null},{url:"/comments/img/user.be96b9dc.svg",revision:null},{url:"/comments/index.html",revision:"b1f0b92300e8b90349dd4a60a025dfc4"},{url:"/comments/js/app.373431df.js",revision:null},{url:"/comments/js/chunk-vendors.881eb98a.js",revision:null},{url:"/comments/manifest.json",revision:"825d228f983fca189fe1b395f57335c6"},{url:"/comments/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
