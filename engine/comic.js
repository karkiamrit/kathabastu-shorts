// ============ comic-book helpers ============
const K={blue:'#2F62C9',blueD:'#1F4596',yel:'#F6C324',gold:'#E8A317',paper:'#F4E8CC',cap:'#FFE14D',ink:'#141414',red:'#C8102E',saf:'#F28C28',grn:'#3E8E41',purple:'#5B2A86'};
let HT=null;
function halftone(col,bg,gap=22,r=4.5){if(!HT)HT={};let key=col+bg+gap;if(!HT[key]){let c=document.createElement('canvas');c.width=c.height=gap;let g=c.getContext('2d');g.fillStyle=bg;g.fillRect(0,0,gap,gap);g.fillStyle=col;g.beginPath();g.arc(gap/2,gap/2,r,0,PI*2);g.fill();HT[key]=X.createPattern(c,'repeat')}return HT[key]}
function page(){X.fillStyle=halftone('#E2D2AE',K.paper,22,4);X.fillRect(0,0,W,H)}
// panel: clip, draw, border; pops in at t0
function panel(x,y,w,h,t,t0,fn,o={}){if(t<t0)return;let p=ss(t0,t0+0.35,t);X.save();X.globalAlpha=p;let cx=x+w/2,cy=y+h/2,sc=lerp(0.92,1,p);X.translate(cx,cy);X.scale(sc,sc);if(o.tilt)X.rotate(o.tilt);X.translate(-cx,-cy);
 X.fillStyle=K.ink;X.fillRect(x+12,y+14,w,h);X.save();X.beginPath();X.rect(x,y,w,h);X.clip();X.translate(x,y);fn(w,h);X.restore();X.lineWidth=10;X.strokeStyle=K.ink;X.strokeRect(x,y,w,h);X.restore()}
function caption(s,x,y,maxW,t0,t1,t,size=50){if(t<t0||t>t1)return;let a=ss(t0,t0+0.15,t)*(1-ss(t1-0.15,t1,t));X.save();X.globalAlpha=a;X.font=`800 ${size}px Mukta`;let L=wrap(s,maxW-40);let lh=size*1.28;let w=Math.max(...L.map(l=>X.measureText(l).width))+44,h=L.length*lh+28;let dx=lerp(-30,0,ss(t0,t0+0.25,t));X.translate(dx,0);X.fillStyle=K.ink;X.fillRect(x+8,y+8,w,h);X.fillStyle=K.cap;X.fillRect(x,y,w,h);X.lineWidth=6;X.strokeStyle=K.ink;X.strokeRect(x,y,w,h);X.fillStyle=K.ink;X.textAlign='left';X.textBaseline='middle';L.forEach((l,i)=>X.fillText(l,x+22,y+14+lh*(i+0.5)+3));X.restore()}
function burst(s,x,y,r,t0,t1,t,fill=K.yel,tc=K.red,size=96,rot=-0.12){if(t<t0||t>t1)return;let p=ss(t0,t0+0.18,t)+Math.sin(cl((t-t0)*9,0,PI))*0.12;let a=1-ss(t1-0.2,t1,t);X.save();X.globalAlpha=a;X.translate(x,y);X.rotate(rot);X.scale(p,p);X.beginPath();let n=14;for(let i=0;i<n*2;i++){let rr=i%2?r*0.68:r*(1+0.12*Math.sin(i*1.7));let an=i*PI/n;X.lineTo(Math.cos(an)*rr*1.35,Math.sin(an)*rr)}X.closePath();X.fillStyle=fill;X.fill();X.lineWidth=8;X.strokeStyle=K.ink;X.stroke();txt(s,0,6,size,tc,{stroke:size*0.16});X.restore()}
function speed(cx,cy,w,h,t,col='rgba(255,255,255,0.55)'){X.save();X.strokeStyle=col;for(let i=0;i<60;i++){let a=rnd(i)*PI*2,r0=120+rnd(i+9)*200,r1=r0+300+rnd(i+3)*700;X.lineWidth=2+rnd(i+5)*6;X.beginPath();X.moveTo(cx+Math.cos(a)*r0,cy+Math.sin(a)*r0);X.lineTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);X.stroke()}X.restore()}
function rays2(cx,cy,c1,c2,n,t){X.save();X.translate(cx,cy);X.rotate(t*0.15);for(let i=0;i<n;i++){X.fillStyle=i%2?c1:c2;X.beginPath();X.moveTo(0,0);X.arc(0,0,2400,i*2*PI/n,(i+1)*2*PI/n);X.closePath();X.fill()}X.restore()}
function note(x,y,s,a){X.save();X.globalAlpha=a;X.translate(x,y);X.scale(s,s);ell(0,0,14,10,K.ink,0,-0.4);line(12,-4,12,-50,K.ink,5);line(12,-50,30,-40,K.ink,5);X.restore()}
// ============ characters ============
function crown(cx,cy,w,h,tall){poly([cx-w/2,cy,cx+w/2,cy,cx+w/2-8,cy-h*0.6,cx+w*0.25,cy-h*0.75,cx,cy-h*(tall?1.25:1),cx-w*0.25,cy-h*0.75,cx-w/2+8,cy-h*0.6],K.gold,6);circ(cx,cy-h*0.45,10,K.red,4);circ(cx-w*0.28,cy-h*0.3,6,'#2E86C1',3);circ(cx+w*0.28,cy-h*0.3,6,'#2E86C1',3)}
function feather(x,y,s,rot){X.save();X.translate(x,y);X.rotate(rot);X.scale(s,s);line(0,0,0,-90,'#6B4F1D',5);ell(0,-95,26,46,'#2E8B57',5);ell(0,-100,15,24,'#1ABC9C',0);ell(0,-102,8,12,'#1F3A93',0);circ(0,-104,4,K.ink,0);X.restore()}
function face(o){ // at origin head center, r=60
 let m=o.mood||'smile';
 // almond eyes
 [[-22,0],[22,0]].forEach(([ex])=>{X.beginPath();X.ellipse(ex,-4,15,8,0,0,PI*2);X.fillStyle='#fff';X.fill();ol(4);X.stroke();circ(ex+(o.look||0),-4,5,K.ink,0)});
 if(m==='angry'){line(-38,-24,-8,-14,K.ink,7);line(38,-24,8,-14,K.ink,7)}else{X.beginPath();X.arc(-22,-14,16,1.15*PI,1.85*PI);ol(4);X.stroke();X.beginPath();X.arc(22,-14,16,1.15*PI,1.85*PI);X.stroke()}
 X.beginPath();if(m==='smile'){X.arc(0,16,16,0.15*PI,0.85*PI);ol(5);X.stroke()}else if(m==='shock'){ell(0,26,10,14,'#5A1010',4)}else if(m==='angry'){X.moveTo(-16,28);X.lineTo(16,28);ol(6);X.stroke()}else{X.moveTo(-12,24);X.lineTo(12,24);ol(5);X.stroke()}}
function tilak(){X.beginPath();X.moveTo(-10,-58);X.lineTo(-6,-30);X.lineTo(6,-30);X.lineTo(10,-58);ol(4);X.strokeStyle=K.yel;X.lineWidth=6;X.stroke();line(0,-52,0,-34,K.red,5)}
// generic divine figure: Krishna or Ram
function deity(x,y,s,o={}){let skin=o.skin||K.blue,dhoti=o.dhoti||K.yel;X.save();X.translate(x,y);X.scale(s*(o.flip?-1:1),s);
 // dhoti / lower body
 poly([-70,-250,70,-250,95,0,-95,0],dhoti,7);line(-60,-60,60,-60,K.red,10);ell(-40,6,30,12,skin,5);ell(40,6,30,12,skin,5);
 // torso
 X.beginPath();X.moveTo(-62,-420);X.quadraticCurveTo(-75,-300,-66,-245);X.lineTo(66,-245);X.quadraticCurveTo(75,-300,62,-420);X.closePath();fs(skin,7);
 poly([-62,-420,-30,-420,70,-260,40,-245],o.sash||K.saf,5);
 // garland
 for(let i=0;i<11;i++){let k=i/10,a=PI*(0.15+0.7*k);circ(Math.cos(a)*-52,-415+Math.sin(a)*120,9,i%2?'#E74C3C':'#F1C40F',3)}
 // arms
 let ax=o.arms||'rest';
 if(ax==='flute'){limb(-58,-405,-10,-330,skin,26);limb(58,-405,90,-350,skin,26);line(-140,-455,150,-425,'#8B5A2B',16);ol(4);for(let i=0;i<4;i++)circ(-60+i*40,-447+i*4,3,K.ink,0)}
 else if(ax==='bow'){limb(-58,-405,-110,-300,skin,26);limb(58,-405,120,-340,skin,26);X.beginPath();X.arc(120,-340,170,-0.5*PI,0.5*PI,true);X.lineWidth=10;X.strokeStyle='#7A4A1A';X.stroke();line(120,-510,120,-170,'#ddd',3)}
 else if(ax==='reins'){limb(-58,-405,-20,-300,skin,26);limb(58,-405,130,-330,skin,26)}
 else if(ax==='bless'){limb(-58,-405,-80,-280,skin,26);limb(58,-405,110,-480,skin,26);ell(115,-505,22,30,skin,5)}
 else {limb(-58,-405,-82,-270,skin,26);limb(58,-405,82,-270,skin,26)}
 // neck+head
 X.fillStyle=skin;X.fillRect(-16,-445,32,30);
 X.save();X.translate(0,-500);circ(0,0,60,skin,7);
 // hair
 X.beginPath();X.arc(0,-6,63,PI*0.92,PI*2.08);X.quadraticCurveTo(40,-20,0,-30);X.quadraticCurveTo(-40,-20,-63,4);fs(K.ink,0);
 for(let i=-1;i<=1;i+=2){X.beginPath();X.moveTo(i*58,0);X.quadraticCurveTo(i*80,60,i*62,110);ol(14);X.strokeStyle=K.ink;X.stroke()}
 face(o);tilak();circ(-60,10,8,K.gold,3);circ(60,10,8,K.gold,3);
 crown(0,-48,110,70,o.tallCrown);if(o.feather)feather(20,-80,0.9,0.25);
 X.restore();X.restore()}
function krishna(x,y,s,o={}){deity(x,y,s,Object.assign({skin:K.blue,dhoti:K.yel,sash:K.saf,feather:true},o))}
function ram(x,y,s,o={}){deity(x,y,s,Object.assign({skin:'#3A7CA5',dhoti:K.saf,sash:K.yel,tallCrown:true,arms:'bow'},o))}
function ravanHead(x,y,r,mood,cr=true){X.save();X.translate(x,y);X.scale(r/60,r/60);circ(0,0,60,'#9C6B3E',7);face({mood});
 X.beginPath();X.moveTo(-40,30);X.quadraticCurveTo(-10,16,0,26);X.quadraticCurveTo(10,16,40,30);X.quadraticCurveTo(48,40,30,40);X.quadraticCurveTo(10,30,0,38);X.quadraticCurveTo(-10,30,-30,40);X.quadraticCurveTo(-48,40,-40,30);fs(K.ink,0);
 line(-20,-50,20,-50,'#fff',5);line(-20,-42,20,-42,'#fff',5);circ(0,-46,5,K.red,0);if(cr)crown(0,-48,104,62,true);X.restore()}
function ravan(x,y,s,o={}){X.save();X.translate(x,y);X.scale(s,s);
 if(o.sage){ // saffron robe, beard, shadow heads
  X.save();X.globalAlpha=o.shadow??0.35;for(let i=1;i<=4;i++){[-1,1].forEach(d=>{X.fillStyle='#120818';X.beginPath();X.arc(d*i*78,-505+i*10,48,0,PI*2);X.fill();poly([d*i*78-40,-545+i*10,d*i*78,-610+i*10,d*i*78+40,-545+i*10],'#120818',0)})}X.restore();
  poly([-80,-440,80,-440,110,0,-110,0],'#E67E22',7);limb(-70,-420,-110,-260,'#9C6B3E',26);limb(70,-420,120,-300,'#9C6B3E',26);line(120,-460,120,-40,'#7A4A1A',12);
  X.save();X.translate(0,-500);circ(0,0,60,'#9C6B3E',7);face({mood:o.mood||'neutral',look:-4});poly([-46,20,46,20,30,110,0,130,-30,110],'#ECECEC',5);X.beginPath();X.arc(0,-10,64,PI,2*PI);fs('#ECECEC',5);circ(0,-80,24,'#ECECEC',5);X.restore();
 } else {
  poly([-90,-440,90,-440,120,0,-120,0],'#3B0A0A',7);poly([-90,-440,90,-440,70,-300,-70,-300],'#7A0F18',6);
  limb(-80,-420,-140,-270,'#9C6B3E',28);limb(80,-420,140,-270,'#9C6B3E',28);
  for(let i=4;i>=1;i--){[-1,1].forEach(d=>ravanHead(d*i*72,-500+i*14,52,o.mood||'angry'))}
  ravanHead(0,-500,64,o.mood||'angry');
 }
 X.restore()}
function hanuman(x,y,s,o={}){X.save();X.translate(x,y);X.scale(s*(o.flip?-1:1),s);let fur='#D9480F',face_='#F4A261';
 X.beginPath();X.moveTo(60,-120);X.bezierCurveTo(200,-140,220,-360,140,-420);ol(16);X.strokeStyle=K.ink;X.stroke();X.lineWidth=9;X.strokeStyle=fur;X.stroke();
 poly([-60,-200,60,-200,80,0,-80,0],K.red,7);
 X.beginPath();X.moveTo(-70,-410);X.quadraticCurveTo(-85,-300,-70,-200);X.lineTo(70,-200);X.quadraticCurveTo(85,-300,70,-410);X.closePath();fs(fur,7);
 limb(-66,-395,-110,-260,fur,28);limb(66,-395,110,-470,fur,28);
 line(110,-470,60,-620,'#7A4A1A',14);circ(60,-640,46,K.gold,7);
 X.save();X.translate(0,-490);circ(0,0,62,fur,7);ell(0,18,44,38,face_,5);X.globalAlpha=1;circ(-20,-6,7,K.ink,0);circ(20,-6,7,K.ink,0);X.beginPath();X.arc(0,22,16,0.15*PI,0.85*PI);ol(5);X.stroke();ell(-62,0,14,18,face_,5);ell(62,0,14,18,face_,5);crown(0,-50,100,58,false);tilak();X.restore();
 X.restore()}
function deer(x,y,s,t,dark){X.save();X.translate(x,y);X.scale(s,s);let c=dark?'#3A1F4F':'#F2B90F';let b=Math.abs(Math.sin(t*6))*20;X.translate(0,-b);
 [[-70,0],[-40,1],[50,2],[80,3]].forEach(([lx,i])=>limb(lx,-110,lx+Math.sin(t*12+i)*25,-5,c,14));
 ell(0,-140,120,58,c,7);if(!dark)for(let i=0;i<7;i++)circ(-70+i*24,-150+(i%2)*20,7,'#FFF6C8',0);
 X.save();X.translate(110,-200);X.rotate(-0.5);ell(0,0,26,60,c,6);X.restore();X.save();X.translate(150,-250);ell(0,0,46,32,c,6);circ(14,-6,6,K.ink,0);
 if(dark){poly([-20,-26,-40,-80,-4,-30],'#120818',4);poly([10,-26,30,-80,22,-24],'#120818',4);circ(14,-6,7,'#FF2D2D',0)}else{X.strokeStyle='#8B5A2B';X.lineWidth=7;X.beginPath();X.moveTo(-10,-26);X.lineTo(-30,-90);X.moveTo(-22,-60);X.lineTo(-50,-80);X.moveTo(10,-26);X.lineTo(20,-92);X.moveTo(16,-62);X.lineTo(44,-80);X.stroke()}
 X.restore();X.restore()}
function tree(x,y,s,c=K.grn){X.save();X.translate(x,y);X.scale(s,s);rr(-18,-160,36,160,6,'#6B3E1F',6);circ(0,-200,80,c,7);circ(-60,-160,55,c,7);circ(60,-160,55,c,7);X.restore()}
function hut(x,y,s){X.save();X.translate(x,y);X.scale(s,s);rr(-120,-160,240,160,0,'#C69C6D',7);poly([-160,-150,0,-300,160,-150],'#B8860B',7);for(let i=0;i<8;i++)line(-140+i*40,-160,0,-290,'rgba(0,0,0,0.25)',3);rr(-40,-120,80,120,30,'#2B1B12',5);X.restore()}
function palace(x,y,s){X.save();X.translate(x,y);X.scale(s,s);rr(-300,-200,600,200,0,'#FFF4DE',7);for(let i=0;i<5;i++)rr(-270+i*120,-150,60,150,30,'#E8C27A',5);
 [[-220,-200,90],[0,-200,140],[220,-200,90]].forEach(([dx,dy,r])=>{X.beginPath();X.arc(dx,dy,r,PI,2*PI);fs('#FFF4DE',7);line(dx,dy-r,dx,dy-r-70,K.ink,6);poly([dx,dy-r-70,dx+60,dy-r-55,dx,dy-r-40],K.saf,4)});X.restore()}
function chariot(x,y,s,t){X.save();X.translate(x,y);X.scale(s,s);
 // horses
 for(let i=1;i>=0;i--){X.save();X.translate(-360+i*60,-30+i*-10);let b=Math.sin(t*10+i)*8;X.translate(0,b);[[-70,0],[-35,1],[50,2],[85,3]].forEach(([lx,j])=>limb(lx,-100,lx+Math.sin(t*14+j)*30,0,'#FAFAFA',13));ell(0,-130,115,52,'#FAFAFA',6);X.beginPath();X.moveTo(-80,-150);X.lineTo(-150,-260);X.lineTo(-110,-280);X.lineTo(-40,-170);X.closePath();fs('#FAFAFA',6);X.save();X.translate(-150,-270);X.rotate(-0.35);ell(-30,0,56,26,'#FAFAFA',6);circ(-30,-8,5,K.ink,0);poly([10,-20,22,-52,30,-18],'#FAFAFA',4);X.restore();X.beginPath();X.moveTo(-146,-262);X.quadraticCurveTo(-120,-230,-70,-160);X.lineWidth=12;X.strokeStyle='#8B5A2B';X.stroke();X.beginPath();X.moveTo(110,-150);X.quadraticCurveTo(160,-120,150,-60);X.lineWidth=12;X.stroke();X.restore()}
 line(-300,-130,-60,-170,'#6B3E1F',12);
 rr(-80,-300,300,190,14,'#C0392B',8);rr(-60,-280,260,40,8,K.gold,5);
 let a=t*4;circ(70,-90,110,'#8B5A2B',8);circ(70,-90,28,K.gold,6);X.save();X.translate(70,-90);X.rotate(a);for(let i=0;i<8;i++){X.rotate(PI/4);line(0,28,0,104,K.ink,8)}X.restore();
 line(200,-300,200,-760,'#6B3E1F',14);X.restore()}
function flagH(x,y,s,t){ // flag with hanuman emblem; (x,y)=pole top
 X.save();X.translate(x,y);X.scale(s,s);let w=Math.sin(t*5)*16;X.beginPath();X.moveTo(0,0);X.quadraticCurveTo(130,-10+w,260,20+w);X.quadraticCurveTo(140,60-w,0,120);X.closePath();fs(K.saf,6);
 X.save();X.translate(115,58);X.scale(0.15,0.15);hanuman(0,330,1,{});X.restore();X.restore()}
function lanka(w,h,t){grad('#3E1F5E','#E07A2F',0,h);for(let i=0;i<9;i++){let bx=60+i*(w-120)/8,bh=110+rnd(i)*150;rr(bx-38,h*0.62-bh,76,bh,4,K.gold,6);poly([bx-38,h*0.62-bh,bx,h*0.62-bh-80,bx+38,h*0.62-bh],'#D4A017',5)}
 X.fillStyle='#2D6A9F';X.fillRect(0,h*0.62,w,h);for(let i=0;i<6;i++)line(40+i*170+Math.sin(t*2+i)*20,h*0.7+i%3*40,120+i*170+Math.sin(t*2+i)*20,h*0.7+i%3*40,'rgba(255,255,255,0.6)',5)}
