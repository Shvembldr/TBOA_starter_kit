const e=e=>{const n=Uint32Array.from([0,0,0,0].map(((n,t)=>parseInt(e.substr(8*t+2,8),16)))),t=()=>{let e,t=n[3];return n[3]=n[2],n[2]=n[1],n[1]=e=n[0],t^=t<<11,t^=t>>>8,n[0]=t^e^e>>>19,n[0]/4294967296},o=(e=.5)=>t()<e,r=void 0,i=(e,n)=>{const o=n-e;return t()*o+e},c=(e,n)=>Math.floor(i(e,n)),a=e=>e.length?e[c(0,e.length)]:void 0,l=e=>{let n=e.reduce(((e,n)=>e+n)),o=t()*n;for(let n=0;n<e.length;n++){if(o<e[n])return n;o-=e[n]}return 0};return{value:t,chance:o,bool:o,range:i,rangeFloor:c,pick:a,weighted:l}};var n;const{hash:t}=tokenData;let o=1e3,r=window.innerWidth,i=window.innerHeight,c=Math.min(r,i),a=c/1e3;const{value:l,chance:s,bool:d,range:h,rangeFloor:u,pick:g,weighted:w}=e(t);let k;const p={},v={};function setup(){createCanvas(r,i),k=()=>{p.sw=h(0,50)*a,v.color=`rgb(100, 100, ${u(0,255)})`,background(255),push(),strokeWeight(p.sw),fill(v.color),circle(width/2,height/2,.5*c),pop()},k()}function draw(){}const b=()=>{console.log("click")};window.addEventListener("click",b),window.addEventListener("touchstart",b);const f=[1,2,3,4,5,6,7,8,9];let y=!0;window.addEventListener("keydown",(e=>{f.includes(Number(e.key))&&pixelDensity(Number(e.key)),"s"===e.key&&saveCanvas(t,"png")," "===e.key&&(y?(noLoop(),y=!1):(loop(),y=!0))}));