!function(){"use strict";var e,t={789:function(e,t,r){var i=r(294),l=r(745);var n=function(e){let{item:t}=e;return i.createElement("div",{className:"filter-container__item all breakfast"},i.createElement("img",{src:t.img,alt:"Виды блюд",width:"207",height:"166",loading:"lazy"}),i.createElement("p",{className:"text text--filter-container"},"$",t.price))};var a=function(e){let{arr:t}=e;return console.log(t),i.createElement("div",{className:"filter-container",id:"container"},t.map((e=>i.createElement(n,{item:e,key:e.id}))))};const o=[{id:"filter-1",price:20,img:"./img/food_01.webp",type:["all","breakfast","desert"]},{id:"filter-2",price:19,img:"./img/food_02.webp",type:["all","special","dinner"]},{id:"filter-3",price:25,img:"./img/food_03.webp",type:["all","special","desert"]},{id:"filter-4",price:15,img:"./img/food_04.webp",type:["all","breakfast","desert"]},{id:"filter-5",price:20,img:"./img/food_05.webp",type:["all","special","dinner"]},{id:"filter-6",price:18,img:"./img/food_06.webp",type:["all","breakfast","desert"]},{id:"filter-7",price:21,img:"./img/food_07.webp",type:["all","special","dinner"]},{id:"filter-8",price:27,img:"./img/food_08.webp",type:["all","breakfast","dinner"]}],c=["All","Breakfast","Special","Desert","Dinner"];var f=function(){const[e,t]=(0,i.useState)(o),[r,l]=(0,i.useState)("all"),[n,f]=(0,i.useState)(0);return(0,i.useEffect)((()=>{const e=o.filter((e=>e.type.includes(r)));t(e)}),[r]),i.createElement("div",{className:"pricing__filter filter"},i.createElement("ul",{className:"filter-controls"},c.map(((e,t)=>i.createElement("li",{key:`filter-${t}`,className:n===t?"filter-controls__item text text--filter-controls filter-controls__item--active":"filter-controls__item text text--filter-controls",onClick:e=>{f(t),l(e.target.innerText.toLowerCase())}},e)))),i.createElement(a,{arr:e}))};l.createRoot(document.querySelector("#filter-wrap")).render(i.createElement(f,null))}},r={};function i(e){var l=r[e];if(void 0!==l)return l.exports;var n=r[e]={exports:{}};return t[e](n,n.exports,i),n.exports}i.m=t,e=[],i.O=function(t,r,l,n){if(!r){var a=1/0;for(s=0;s<e.length;s++){r=e[s][0],l=e[s][1],n=e[s][2];for(var o=!0,c=0;c<r.length;c++)(!1&n||a>=n)&&Object.keys(i.O).every((function(e){return i.O[e](r[c])}))?r.splice(c--,1):(o=!1,n<a&&(a=n));if(o){e.splice(s--,1);var f=l();void 0!==f&&(t=f)}}return t}n=n||0;for(var s=e.length;s>0&&e[s-1][2]>n;s--)e[s]=e[s-1];e[s]=[r,l,n]},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},function(){var e={165:0};i.O.j=function(t){return 0===e[t]};var t=function(t,r){var l,n,a=r[0],o=r[1],c=r[2],f=0;if(a.some((function(t){return 0!==e[t]}))){for(l in o)i.o(o,l)&&(i.m[l]=o[l]);if(c)var s=c(i)}for(t&&t(r);f<a.length;f++)n=a[f],i.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return i.O(s)},r=self.webpackChunksitewithgulp=self.webpackChunksitewithgulp||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}();var l=i.O(void 0,[745],(function(){return i(789)}));l=i.O(l)}();