// warp + render runtime. A story.js must define DUR (old scene lengths) and FN (scene functions).
let KN=DUR.map(d=>[[0,0],[d,d]]),ND=DUR.slice();let SCENES=[];
function setWarp(kn){KN=kn;ND=kn.map(k=>k[k.length-1][1]);SCENES=[];let a=0;ND.forEach(d=>{SCENES.push([a,a+d]);a+=d})}
setWarp(KN);
function warp(i,t){let k=KN[i];for(let j=1;j<k.length;j++){if(t<=k[j][1]||j===k.length-1){let [o0,n0]=k[j-1],[o1,n1]=k[j];return o0+(o1-o0)*cl((t-n0)/(n1-n0))}}return t}
function render(T){X.setTransform(1,0,0,1,0,0);X.globalAlpha=1;X.clearRect(0,0,W,H);let i=SCENES.findIndex(s=>T>=s[0]&&T<s[1]);if(i<0)i=SCENES.length-1;let t=T-SCENES[i][0],d=ND[i];X.save();FN[i](warp(i,t),DUR[i]);X.restore();X.globalAlpha=1;
 let f=0;if(i>0)f=Math.max(f,1-ss(0,0.25,t));f=Math.max(f,ss(d-(i===SCENES.length-1?0.8:0.25),d,t));if(f>0){X.fillStyle=`rgba(10,10,10,${f})`;X.fillRect(0,0,W,H)}}
function frame(T){render(T);return C.toDataURL('image/jpeg',0.92)}
