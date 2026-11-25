const C=document.getElementById('c'),X=C.getContext('2d'),W=1080,H=1920;
const P={red:'#D7263D',crimson:'#9E1B32',saf:'#F28C28',mari:'#F6B93B',blue:'#1F3A93',cream:'#FBEFD5',ink:'#2B1B12',green:'#4C8C4A',lgreen:'#7DB65A',dgreen:'#2E6B3A',skin:'#B9774A',brick:'#A4432B',white:'#FFF8EC',wood:'#6B3E1F'};
const cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ss=(a,b,t)=>{let x=cl((t-a)/(b-a));return x*x*(3-2*x)};
const lerp=(a,b,k)=>a+(b-a)*k;
const rnd=i=>{let x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
const PI=Math.PI;
function ol(w=6){X.lineWidth=w;X.strokeStyle=P.ink;X.lineJoin='round';X.lineCap='round'}
function fs(fill,w=6){X.fillStyle=fill;X.fill();if(w){ol(w);X.stroke()}}
function circ(x,y,r,fill,w=6){X.beginPath();X.arc(x,y,r,0,PI*2);fs(fill,w)}
function ell(x,y,rx,ry,fill,w=6,rot=0){X.beginPath();X.ellipse(x,y,rx,ry,rot,0,PI*2);fs(fill,w)}
function rr(x,y,w,h,r,fill,lw=6){X.beginPath();X.roundRect(x,y,w,h,r);fs(fill,lw)}
function poly(p,fill,w=6){X.beginPath();X.moveTo(p[0],p[1]);for(let i=2;i<p.length;i+=2)X.lineTo(p[i],p[i+1]);X.closePath();fs(fill,w)}
function line(x1,y1,x2,y2,c,w){X.beginPath();X.moveTo(x1,y1);X.lineTo(x2,y2);X.strokeStyle=c;X.lineWidth=w;X.lineCap='round';X.stroke()}
function limb(x1,y1,x2,y2,c,w){line(x1,y1,x2,y2,P.ink,w+10);line(x1,y1,x2,y2,c,w)}
function grad(c1,c2,y0=0,y1=H){let g=X.createLinearGradient(0,y0,0,y1);g.addColorStop(0,c1);g.addColorStop(1,c2);X.fillStyle=g;X.fillRect(0,0,W,H)}
function txt(s,x,y,size,fill,o={}){X.save();X.font=`800 ${size}px ${o.f||"'Baloo 2'"}`;X.textAlign='center';X.textBaseline='middle';if(o.stroke!==0){X.lineWidth=o.stroke||size*0.18;X.strokeStyle=o.sc||P.ink;X.lineJoin='round';X.strokeText(s,x,y)}X.fillStyle=fill;X.fillText(s,x,y);X.restore()}
function wrap(s,maxW){let ws=s.split(' '),L=[],cur='';for(const w of ws){let tt=cur?cur+' '+w:w;if(X.measureText(tt).width>maxW&&cur){L.push(cur);cur=w}else cur=tt}L.push(cur);return L}

// narration subtitle card
function sub(s,t0,t1,t,y=1330,size=58,bg=P.cream,fg=P.ink){if(t<t0||t>t1)return;let a=ss(t0,t0+0.2,t)*(1-ss(t1-0.2,t1,t));let sc=lerp(0.8,1,ss(t0,t0+0.25,t));X.save();X.font=`800 ${size}px Mukta`;let L=wrap(s,820);let lh=size*1.32;let w=Math.max(...L.map(l=>X.measureText(l).width))+90,h=L.length*lh+46;X.globalAlpha=a;X.translate(540,y);X.scale(sc,sc);X.fillStyle=P.ink;X.beginPath();X.roundRect(-w/2+10,-h/2+12,w,h,30);X.fill();rr(-w/2,-h/2,w,h,30,bg,7);X.fillStyle=fg;X.textAlign='center';X.textBaseline='middle';L.forEach((l,i)=>X.fillText(l,0,(i-(L.length-1)/2)*lh+5));X.restore()}

// speech bubble with tail + name tag
function bubble(s,x,y,tx,ty,t0,t1,t,name,size=54){if(t<t0||t>t1)return;let a=ss(t0,t0+0.15,t)*(1-ss(t1-0.2,t1,t));let sc=lerp(0.7,1,ss(t0,t0+0.25,t));X.save();X.font=`800 ${size}px Mukta`;let L=wrap(s,760);let lh=size*1.3;let w=Math.max(...L.map(l=>X.measureText(l).width))+80,h=L.length*lh+50;X.globalAlpha=a;X.translate(x,y);X.scale(sc,sc);let lx=(tx-x),ly=(ty-y);
 poly([-34,h/2-6,34,h/2-6,lx,ly],'#fff',6);rr(-w/2,-h/2,w,h,40,'#fff',6);poly([-27,h/2-12,27,h/2-12,lx*0.9,ly*0.9-8],'#fff',0);
 X.fillStyle=P.ink;X.textAlign='center';X.textBaseline='middle';X.font=`800 ${size}px Mukta`;L.forEach((l,i)=>X.fillText(l,0,(i-(L.length-1)/2)*lh+6));
 if(name){X.font=`800 36px Mukta`;let nw=X.measureText(name).width+40;rr(-w/2+20,-h/2-30,nw,54,18,P.crimson,5);X.fillStyle='#fff';X.fillText(name,-w/2+20+nw/2,-h/2-2)}
 X.restore()}

function border(){let b=34;X.fillStyle=P.crimson;X.fillRect(0,0,W,b);X.fillRect(0,H-b,W,b);X.fillRect(0,0,b,H);X.fillRect(W-b,0,b,H);
 for(let x=0;x<W;x+=34){poly([x,0,x+17,b-7,x+34,0],P.mari,0);poly([x,H,x+17,H-b+7,x+34,H],P.mari,0)}
 for(let y=0;y<H;y+=34){poly([0,y,b-7,y+17,0,y+34],P.mari,0);poly([W,y,W-b+7,y+17,W,y+34],P.mari,0)}
 X.lineWidth=6;X.strokeStyle=P.ink;X.strokeRect(b,b,W-2*b,H-2*b);
 [[b,b],[W-b,b],[b,H-b],[W-b,H-b]].forEach(([x,y])=>{circ(x,y,30,P.saf,5);circ(x,y,13,P.crimson,4)})}

function sun(x,y,r,rot){X.save();X.translate(x,y);X.rotate(rot);for(let i=0;i<16;i++){X.rotate(PI/8);poly([-16,-r-6,16,-r-6,0,-r-50],i%2?P.saf:P.red,4)}X.restore();circ(x,y,r,P.mari,6);circ(x,y,r*0.62,P.saf,0)}
function peak(x,base,h,w,col){poly([x-w,base,x,base-h,x+w,base],col,6);let k=0.3,sx=w*k,sy=base-h+h*k;poly([x,base-h,x+sx,sy,x+sx*0.45,sy-16,x,sy+12,x-sx*0.45,sy-16,x-sx,sy],P.white,5)}
function range(base,col,arr){arr.forEach(([x,h,w])=>peak(x,base,h,w,col))}
function bz(a,b,c,d,k){let m=1-k;return m*m*m*a+3*m*m*k*b+3*m*k*k*c+k*k*k*d}
function terraces(y0,n,bh,cols,tuft=true){for(let i=0;i<n;i++){let y=y0+i*bh,v=(i%2)*30;let ya=y+30,yb=y-30-v,yc=y+40+v,yd=y;X.beginPath();X.moveTo(-20,ya);X.bezierCurveTo(330,yb,720,yc,W+20,yd);X.lineTo(W+20,H+20);X.lineTo(-20,H+20);X.closePath();fs(cols[i%cols.length],6);
 if(tuft){X.strokeStyle=P.dgreen;X.lineWidth=4;for(let j=0;j<13;j++){let k=(j+0.5+(i%2)*0.5)/13;let x=lerp(-20,W+20,k),yy=bz(ya,yb,yc,yd,k)+bh*0.5;X.beginPath();X.moveTo(x-12,yy-16);X.lineTo(x,yy);X.lineTo(x+12,yy-16);X.moveTo(x,yy);X.lineTo(x,yy-20);X.stroke()}}}}
function flags(x1,y1,x2,y2,n,t,sag=60){let cols=[P.blue,'#FFFFFF',P.red,P.green,P.mari];let cx=(x1+x2)/2,cy=(y1+y2)/2+sag*2;X.beginPath();X.moveTo(x1,y1);X.quadraticCurveTo(cx,cy,x2,y2);ol(4);X.stroke();
 for(let i=0;i<n;i++){let k=(i+0.5)/n,m=1-k;let x=m*m*x1+2*m*k*cx+k*k*x2,y=m*m*y1+2*m*k*cy+k*k*y2;let wv=Math.sin(t*4+i*0.8)*12;poly([x-20,y,x+20,y,x+20+wv*0.4,y+56,x-20+wv,y+56],cols[i%5],3)}}
function birds(t,x0,y0,n){X.strokeStyle=P.ink;X.lineWidth=5;for(let i=0;i<n;i++){let x=x0+t*90+i*70,y=y0+Math.sin(i*2)*40,f=Math.sin(t*8+i)*14;X.beginPath();X.moveTo(x-24,y-f);X.quadraticCurveTo(x-10,y-12,x,y);X.quadraticCurveTo(x+10,y-12,x+24,y-f);X.stroke()}}
function cloud(x,y,s){X.save();X.translate(x,y);X.scale(s,s);X.beginPath();X.arc(-60,10,45,PI*0.5,PI*1.5);X.arc(-10,-25,55,PI,PI*2);X.arc(55,0,45,PI*1.3,PI*0.5);X.closePath();fs('#fff',6);X.restore()}

// characters ------------------------------------------------
function boy(x,y,s,o={}){let ph=o.ph||0,run=o.run??0,shirt=o.shirt||P.blue,shorts=o.shorts||'#6B4F35';X.save();X.translate(x,y);X.scale(s*(o.flip?-1:1),s);if(o.rot)X.rotate(o.rot);
 let a=Math.sin(ph)*0.65*run;let a2=-a;if(o.kick!==undefined)a=-o.kick;let LL=165;
 let foot=(hx,an)=>[hx+Math.sin(an)*LL,-170+Math.cos(an)*LL];
 let f1=foot(-16,a),f2=foot(16,a2);let feetCol=o.boots?'#111':P.skin;
 [[-16,f1],[16,f2]].forEach(([hx,f])=>{limb(hx,-170,f[0],f[1],P.skin,22);ell(f[0]+8,f[1]-4,24,12,feetCol,5)});
 rr(-44,-215,88,62,16,shorts);
 let up=o.arms==='up';let sw=Math.sin(ph)*0.7*run;
 let hand=(sx,an)=>up?[sx*2.2,-445]:[sx+Math.sin(an)*105,-305+Math.cos(an)*105];
 let h1=hand(-46,-sw-0.25),h2=hand(46,sw+0.25);if(o.wave!==undefined)h2=[95+Math.sin(o.wave)*25,-450];
 limb(-46,-305,h1[0],h1[1],P.skin,18);limb(46,-305,h2[0],h2[1],P.skin,18);
 rr(-50,-335,100,140,32,shirt);
 if(o.back&&o.num){X.font="800 38px Mukta";X.fillStyle='#fff';X.textAlign='center';X.textBaseline='middle';X.fillText(o.name||'',0,-300);X.font="800 64px Mukta";X.fillText(o.num,0,-245)}
 else{poly([-18,-335,0,-312,18,-335],'#fff',4)}
 if(o.bag)rr(o.flip?40:-80,-330,40,110,12,o.bag,5);
 circ(0,-390,58,P.skin);
 if(o.back){X.beginPath();X.arc(0,-392,60,PI*0.85,PI*2.15);X.closePath();fs(P.ink,0);ell(-58,-385,10,16,P.skin,4);ell(58,-385,10,16,P.skin,4)}
 else{X.beginPath();X.moveTo(-60,-395);X.lineTo(-56,-430);X.lineTo(-40,-452);X.lineTo(-30,-440);X.lineTo(-10,-462);X.lineTo(5,-445);X.lineTo(25,-460);X.lineTo(35,-440);X.lineTo(55,-445);X.lineTo(60,-400);X.quadraticCurveTo(30,-420,0,-418);X.quadraticCurveTo(-35,-418,-60,-395);fs(P.ink,0);
  let m=o.mood||'happy';X.fillStyle=P.ink;circ(-20,-388,7,P.ink,0);circ(22,-388,7,P.ink,0);circ(-36,-366,9,'#E07A5F',0);circ(38,-366,9,'#E07A5F',0);X.beginPath();
  if(m==='happy'){X.arc(0,-370,20,0.15*PI,0.85*PI);ol(5);X.stroke()}
  else if(m==='sad'){X.arc(0,-350,16,1.2*PI,1.8*PI);ol(5);X.stroke();line(-32,-410,-10,-404,P.ink,5);line(32,-410,10,-404,P.ink,5)}
  else if(m==='shout'){ell(0,-360,14,18,'#7A1F1F',5)}
  else if(m==='firm'){line(-12,-360,12,-360,P.ink,6);line(-32,-404,-10,-410,P.ink,6);line(32,-404,10,-410,P.ink,6)}}
 X.restore();return {h1:[x+(o.flip?-1:1)*h1[0]*s,y+h1[1]*s],h2:[x+(o.flip?-1:1)*h2[0]*s,y+h2[1]*s],f1:[x+(o.flip?-1:1)*f1[0]*s,y+f1[1]*s]}}

function woman(x,y,s,o={}){let col=o.col||P.red;X.save();X.translate(x,y);X.scale(s*(o.flip?-1:1),s);
 let ha=o.arm||0;let hx=50+Math.sin(ha)*100,hy=-310-Math.cos(ha)*100;
 poly([-55,-330,55,-330,95,0,-95,0],col);X.fillStyle=P.mari;X.fillRect(-92,-40,184,30);ol(5);X.strokeRect(-92,-40,184,30);
 poly([-55,-330,-20,-330,80,-140,60,-100],o.pallu||P.mari,5);
 limb(-50,-310,-75,-200,P.skin,18);limb(50,-310,hx,hy,P.skin,18);
 if(o.ladle){line(hx,hy,hx+10,hy-90,P.ink,14);line(hx,hy,hx+10,hy-90,'#999',8);ell(hx+12,hy-105,22,14,'#999',5)}
 if(o.ball){circ(hx,hy-30,36,'#EDE6D6',5);line(hx-15,hy-40,hx+10,hy-25,P.ink,4)}
 circ(0,-382,55,P.skin);X.beginPath();X.arc(0,-388,58,PI*1.0,PI*2.0);X.closePath();fs(P.ink,0);circ(-48,-410,24,P.ink,0);
 circ(0,-412,7,P.red,0);circ(-18,-378,6,P.ink,0);circ(20,-378,6,P.ink,0);
 if(o.angry){line(-34,-402,-8,-392,P.ink,6);line(34,-402,8,-392,P.ink,6);ell(0,-350,12,10,'#7A1F1F',4)}else{X.beginPath();X.arc(0,-362,14,0.15*PI,0.85*PI);ol(5);X.stroke()}
 circ(-56,-372,6,P.mari,3);circ(56,-372,6,P.mari,3);X.restore()}

function father(x,y,s,o={}){X.save();X.translate(x,y);X.scale(s,s);
 limb(-20,-170,-24,-5,'#E9DFC9',26);limb(20,-170,24,-5,'#E9DFC9',26);ell(-20,-4,26,12,P.ink,0);ell(26,-4,26,12,P.ink,0);
 poly([-52,-335,52,-335,62,-120,-62,-120],'#F2E8D2');poly([-52,-335,-14,-335,-14,-150,-58,-150],'#3A3A4A',5);poly([52,-335,14,-335,14,-150,58,-150],'#3A3A4A',5);
 let np=o.paper??1;
 circ(0,-390,55,P.skin);
 // dhaka topi
 poly([-48,-420,48,-420,40,-478,-30,-478],P.red,5);for(let i=0;i<5;i++){poly([-38+i*18,-425,-29+i*18,-445,-20+i*18,-425],[P.mari,P.blue,P.green,'#fff',P.mari][i],0);poly([-30+i*16,-450,-22+i*16,-470,-14+i*16,-450],[P.blue,P.mari,'#fff',P.green,P.blue][i],0)}
 circ(-18,-388,6,P.ink,0);circ(18,-388,6,P.ink,0);X.fillStyle=P.ink;X.beginPath();X.ellipse(0,-362,26,9,0,0,PI);X.fill();line(-30,-405,-8,-400,P.ink,6);line(30,-405,8,-400,P.ink,6);
 let py=lerp(-330,-200,1-np);limb(-50,-320,-70,py+60,P.skin,18);limb(50,-320,70,py+60,P.skin,18);
 X.save();X.translate(0,py+20);rr(-110,-40,220,150,6,'#F4F1E8',5);for(let i=0;i<5;i++)line(-90,0+i*22,i%2?60:90,0+i*22,'#999',5);X.font="800 30px Mukta";X.fillStyle=P.ink;X.textAlign='center';X.fillText('समाचार',0,-12);X.restore();
 X.restore()}

function goat(x,y,s,t){X.save();X.translate(x,y);X.scale(s,s);let b=Math.sin(t*10)*4;
 [[-70,0],[-40,0],[50,0],[80,0]].forEach(([lx],i)=>limb(lx,-110,lx+Math.sin(t*8+i)*8,-5,'#E8E0D0',14));
 ell(0,-140+b,115,62,'#F2EDE4');ell(-20,-150+b,40,28,'#8B5A2B',0);X.beginPath();X.moveTo(-110,-160+b);X.lineTo(-140,-195+b);ol(8);X.stroke();
 X.save();X.translate(115,-200+b);X.rotate(-0.4);ell(0,0,46,32,'#F2EDE4');X.beginPath();X.arc(-10,-40,30,PI*1.1,PI*1.9);ol(9);X.stroke();ell(-22,-6,22,10,'#E8E0D0',5,0.6);circ(10,-6,6,P.ink,0);poly([30,20,44,58,52,18],'#E8E0D0',4);X.restore();
 // garland
 for(let i=0;i<9;i++){let k=i/8;circ(lerp(60,140,k),-175+Math.sin(k*PI)*55+b,11,i%2?P.saf:P.mari,3)}
 X.restore()}

function pball(x,y,r,rot=0){X.save();X.translate(x,y);X.rotate(rot);circ(0,0,r,'#EDE6D6',5);X.save();X.beginPath();X.arc(0,0,r-3,0,PI*2);X.clip();X.fillStyle='rgba(70,150,220,0.55)';X.fillRect(-r,-r*0.3,r*2,r*0.5);X.restore();X.strokeStyle=P.ink;X.lineWidth=3;X.beginPath();X.moveTo(-r*0.5,-r*0.4);X.lineTo(-r*0.1,-r*0.1);X.lineTo(r*0.3,-r*0.5);X.moveTo(-r*0.3,r*0.5);X.lineTo(r*0.2,r*0.2);X.lineTo(r*0.5,r*0.45);X.stroke();X.restore()}
function fball(x,y,r,rot=0){X.save();X.translate(x,y);X.rotate(rot);circ(0,0,r,'#fff',Math.max(3,r/6));X.beginPath();for(let i=0;i<5;i++){let a=i*2*PI/5-PI/2;X.lineTo(Math.cos(a)*r*0.38,Math.sin(a)*r*0.38)}X.closePath();X.fillStyle=P.ink;X.fill();X.restore()}
function chappal(x,y,s,col){X.save();X.translate(x,y);X.scale(s,s);ell(0,0,30,64,col);line(-22,-18,0,-40,P.ink,10);line(22,-18,0,-40,P.ink,10);line(-22,-18,0,-40,'#2E86C1',5);line(22,-18,0,-40,'#2E86C1',5);X.restore()}
function nflag(x,y,s,wv){X.save();X.translate(x,y);X.scale(s,s);line(0,0,0,110,P.ink,6);poly([0,0,60+wv,42,20,42,60+wv,95,0,95],P.crimson,0);X.lineWidth=6;X.strokeStyle=P.blue;X.stroke();X.restore()}
function confetti(t,t0,n,seed=1){if(t<t0)return;let cols=[P.red,P.mari,P.blue,P.green,'#fff',P.saf];for(let i=0;i<n;i++){let r1=rnd(i+seed*100),r2=rnd(i*3+seed),r3=rnd(i*7+seed*3);let tt=t-t0-r3*1.2;if(tt<0)continue;let x=r1*W+Math.sin(tt*2+i)*40,y=-40+tt*(350+r2*300);if(y>H+40)continue;X.save();X.translate(x,y);X.rotate(tt*(3+r2*4));X.fillStyle=cols[i%6];X.fillRect(-10,-6,20,12);X.restore()}}
function house(x,y,w,h){X.fillStyle=P.white;X.fillRect(x,y-h,w,h);X.fillStyle=P.brick;X.fillRect(x,y-h*0.45,w,h*0.45);ol(6);X.strokeRect(x,y-h,w,h);
 poly([x-50,y-h,x+w/2,y-h-170,x+w+50,y-h],'#7D8C99');for(let i=1;i<10;i++){let k=i/10;line(lerp(x-50,x+w/2,0)+(w+100)*k,y-h,x+w/2,y-h-170,'rgba(43,27,18,0.35)',3)}
 rr(x+w*0.42,y-270,w*0.18,270,8,P.wood);circ(x+w*0.42+w*0.14,y-140,6,P.mari,0);
 [[x+w*0.12],[x+w*0.68]].forEach(([wx])=>{rr(wx,y-h+70,w*0.2,140,6,P.wood,6);for(let i=1;i<4;i++){line(wx+i*w*0.05,y-h+80,wx+i*w*0.05,y-h+200,P.mari,4)}line(wx+6,y-h+140,wx+w*0.2-6,y-h+140,P.mari,4);X.fillStyle=P.wood;X.fillRect(wx-14,y-h+56,w*0.2+28,16)})}

