const n=n=>{const e=Uint32Array.from([0,0,0,0].map(((e,i)=>parseInt(n.substr(8*i+2,8),16)))),i=()=>{let n,i=e[3];return e[3]=e[2],e[2]=e[1],e[1]=n=e[0],i^=i<<11,i^=i>>>8,e[0]=i^n^n>>>19,e[0]/4294967296},t=(n=.5)=>i()<n,o=void 0,r=(n,e)=>{const t=e-n;return i()*t+n},d=(n,e)=>Math.floor(r(n,e)),w=n=>n.length?n[d(0,n.length)]:void 0,c=n=>{let e=n.reduce(((n,e)=>n+e)),t=i()*e;for(let e=0;e<n.length;e++){if(t<n[e])return e;t-=n[e]}return 0};return{value:i,chance:t,bool:t,range:r,rangeFloor:d,pick:w,weighted:c}};var e;const{hash:i}=tokenData;let t=1e3,o=window.innerWidth,r=window.innerHeight,d=Math.min(o,r),w=d/1e3,c,h;.75*window.innerHeight>=window.innerWidth?(c=window.innerWidth,h=window.innerWidth/.75):(h=window.innerHeight,c=.75*window.innerHeight);const{value:l,chance:s,bool:a,range:g,rangeFloor:u,pick:p,weighted:k}=n(i);let v;const b={},f={};let y;function setup(){y=createCanvas(c,h),v=()=>{b.sw=g(0,50)*w,f.color=`rgb(100, 100, ${u(0,255)})`,background(255),push(),strokeWeight(b.sw),fill(f.color),circle(width/2,height/2,.5*d),pop()},v()}function draw(){}const W=()=>{console.log("click")};window.addEventListener("click",W),window.addEventListener("touchstart",W);const H=[1,2,3,4,5,6,7,8,9];let m=!0;function windowResized(){const n=void 0,e=y.canvas.style;let i,t;.75*window.innerHeight>=window.innerWidth?(i=window.innerWidth,t=window.innerWidth/.75):(t=window.innerHeight,i=.75*window.innerHeight),e.position="absolute",e.display="block",e.top=e.left=e.right=e.structure="0",e.width=`${i}px`,e.height=`${t}px`}window.addEventListener("keydown",(n=>{H.includes(Number(n.key))&&pixelDensity(Number(n.key)),"s"===n.key&&saveCanvas(i,"png")," "===n.key&&(m?(noLoop(),m=!1):(loop(),m=!0))}));