// Kathabastu — रातको अन्तिम बस, भाग १ (night-thriller style)
// Original characters: विकास (young conductor), ड्राइभर दाइ, सेतो शलकी आमा. Kalikhola is a fictional stop.
const NB={sky1:'#04070F',sky2:'#18213A',fog:'rgba(190,200,220,',seat:'#7A1E2B',seat2:'#5C1520',shawl:'#ECEAE4',skin:'#C08A5E',glow:'#FFE7A3',red:'#E0303A'};
const DARKSUB='#14161F',LIGHTTXT='#F2EEE4';

// ---------- atmosphere ----------
function bFog(t,y0,y1,a=0.18,n=9,seed=1){for(let i=0;i<n;i++){let r=rnd(i*3+seed),y=lerp(y0,y1,rnd(i*7+seed));let x=((r*W*1.6+t*(25+r*35))%(W*1.6))-W*0.3;X.fillStyle=NB.fog+(a*(0.5+0.5*rnd(i+seed)))+')';X.beginPath();X.ellipse(x,y,260+r*200,40+r*40,0,0,PI*2);X.fill()}}
function bFrame(part){let b=26;X.fillStyle='#07080D';X.fillRect(0,0,W,b);X.fillRect(0,H-b,W,b);X.fillRect(0,0,b,H);X.fillRect(W-b,0,b,H);X.lineWidth=4;X.strokeStyle='#8E1B24';X.strokeRect(b+6,b+6,W-2*b-12,H-2*b-12);
 if(part){X.save();X.translate(150,105);rr(-80,-34,160,68,14,NB.red,5);txt(part,0,3,42,'#fff',{stroke:0,f:'Mukta'});X.restore()}}
function bTitle(y,sc=1){X.save();X.translate(540,y);X.scale(sc,sc);X.shadowColor='rgba(224,48,58,0.8)';X.shadowBlur=30;txt('रातको अन्तिम बस',0,0,104,'#F4E9D8',{stroke:14,sc:'#2A0507',f:'Mukta'});X.restore()}
function shake(t,amp){X.translate(Math.sin(t*61)*amp,Math.cos(t*47)*amp)}

// ---------- places ----------
function bRoad(t){grad(NB.sky1,NB.sky2,0,1100);
 for(let i=0;i<30;i++){X.globalAlpha=0.3+0.3*Math.sin(t*2+i);circ(rnd(i+5)*W,rnd(i*9)*600,2+rnd(i)*2,'#DDE6FF',0)}X.globalAlpha=1;
 X.fillStyle='#0E1424';X.beginPath();X.moveTo(0,900);for(let x=0;x<=W;x+=60)X.lineTo(x,760+Math.sin(x*0.006+1)*90+Math.sin(x*0.02)*20);X.lineTo(W,1100);X.lineTo(0,1100);X.fill();
 X.fillStyle='#0A0F1B';X.beginPath();X.moveTo(0,1000);for(let x=0;x<=W;x+=50)X.lineTo(x,900+Math.sin(x*0.009+3)*70);X.lineTo(W,1200);X.lineTo(0,1200);X.fill();
 // ground + road in perspective
 X.fillStyle='#0B0E15';X.fillRect(0,1050,W,870);
 poly([500,1050,580,1050,1180,1920,-100,1920],'#23262E',0);
 for(let i=0;i<8;i++){let k=((i/8)+t*0.35)%1,k2=k+0.045;let y1=lerp(1050,1920,k*k),y2=lerp(1050,1920,k2*k2);poly([540-3-k*k*14,y1,540+3+k*k*14,y1,540+3+k2*k2*14,y2,540-3-k2*k2*14,y2],'#D9C26B',0)}
 // guard rail posts
 for(let i=0;i<7;i++){let k=((i/7)+t*0.35)%1,kk=k*k;let x=lerp(495,-140,kk),y=lerp(1050,1920,kk);rr(x-4*(1+kk*6),y-30*(1+kk*6),8*(1+kk*6),30*(1+kk*6),3,'#B9BEC8',0);X.fillStyle=NB.red;X.fillRect(x-4*(1+kk*6),y-30*(1+kk*6),8*(1+kk*6),6*(1+kk*4))}
 // pine silhouettes
 [[90,1060,1.2],[200,1050,0.8],[930,1060,1.3],[1010,1045,0.9]].forEach(([x,y,s])=>{poly([x-60*s,y,x,y-260*s,x+60*s,y],'#060911',0)})}
function bLamp(x,y,t,on=1){line(x,y,x,y-640,'#1C1F27',16);line(x,y-640,x+90,y-660,'#1C1F27',12);let f=on*(0.85+0.15*Math.sin(t*23)*Math.sin(t*7));
 X.save();X.globalAlpha=0.22*f;poly([x+60,y-650,x+120,y-650,x+330,y,x-150,y],'#FFE7A3',0);X.restore();circ(x+90,y-652,18,`rgba(255,231,163,${f})`,4)}

// ---------- bus ----------
function bBusFront(x,y,s,t){X.save();X.translate(x,y);X.scale(s,s);
 // headlight beams
 X.save();X.globalAlpha=0.18;poly([-150,-90,-100,-90,-420,420,80,420],'#FFF2C4',0);poly([100,-90,150,-90,420,420,-80,420],'#FFF2C4',0);X.restore();
 rr(-200,-470,400,440,40,'#C0392B',8);rr(-200,-470,400,70,30,'#F1C40F',6);txt('काठमाडौं',0,-436,40,P.ink,{stroke:0,f:'Mukta'});
 rr(-170,-390,340,170,18,'#1A2236',6);X.save();X.globalAlpha=0.35;rr(-160,-380,320,150,14,NB.glow,0);X.restore();
 for(let i=0;i<9;i++)poly([-170+i*38,-390,-151+i*38,-366,-132+i*38,-390],[P.mari,'#2E86C1',P.green][i%3],0);
 rr(-200,-200,400,120,10,'#962D22',6);for(let i=0;i<6;i++)line(-150+i*60,-180,-150+i*60,-110,'#5E1A14',8);
 [[-140],[140]].forEach(([hx])=>{circ(hx,-140,34,'#FFF6D0',6);X.save();X.globalAlpha=0.5+0.2*Math.sin(t*9);circ(hx,-140,60,'#FFF2C4',0);X.restore()});
 rr(-210,-60,420,40,10,'#555',6);rr(-180,-30,70,60,14,'#111',5);rr(110,-30,70,60,14,'#111',5);
 X.restore()}
function bBusSide(x,y,t,moving){X.save();X.translate(x,y);let bob=moving?Math.sin(t*14)*3:0;X.translate(0,bob);
 rr(0,-440,900,380,40,'#C0392B',8);rr(0,-440,900,60,30,'#F1C40F',6);
 for(let i=0;i<6;i++){rr(40+i*130,-360,110,120,12,'#1A2236',5);X.save();X.globalAlpha=0.55;rr(46+i*130,-354,98,108,10,NB.glow,0);X.restore()}
 rr(820,-360,60,300,10,'#1A2236',5);X.save();X.globalAlpha=0.6;rr(826,-354,48,288,8,NB.glow,0);X.restore();
 for(let i=0;i<14;i++)poly([20+i*62,-200,51+i*62,-170,82+i*62,-200],[P.mari,'#2E86C1',P.green][i%3],0);
 line(0,-140,900,-140,'#F1C40F',10);
 [[170],[730]].forEach(([wx])=>{circ(wx,-60,62,'#111',6);circ(wx,-60,26,'#777',5);let a=moving?t*12:0;line(wx+Math.cos(a)*24,-60+Math.sin(a)*24,wx-Math.cos(a)*24,-60-Math.sin(a)*24,'#333',6)});
 circ(892,-100,16,'#FFF6D0',4);X.save();X.globalAlpha=0.16;poly([900,-110,900,-90,1400,60,1400,-260],'#FFF2C4',0);X.restore();
 X.restore()}

// ---------- interior ----------
const VP=[540,700];
function seatAt(d,side){let f=lerp(1,0.22,d);return {x:540+side*470*f,y:VP[1]+1200*f*0.95,f}}
function bSeat(x,y,f,col=NB.seat){X.save();X.translate(x,y);X.scale(f,f);rr(-130,-420,260,300,30,col,7);rr(-90,-420,180,70,20,'#EFEAE0',5);ell(0,-110,150,40,NB.seat2,7);X.restore()}
function bInterior(t,L=1,o={}){grad('#1B2030','#0C0F17');
 poly([0,0,W,0,660,620,420,620],'#262B39',0);poly([0,H,W,H,660,820,420,820],'#2E2622',0);
 poly([0,0,420,620,420,820,0,H],'#1D2232',0);poly([W,0,660,620,660,820,W,H],'#1D2232',0);
 rr(420,620,240,200,8,'#0A1430',5);bFogClip(t,420,620,240,200);
 // side windows (black with fog)
 for(let i=0;i<4;i++){let d0=0.1+i*0.22,d1=d0+0.16;[[-1],[1]].forEach(([s])=>{let a=seatAt(d0,s),b=seatAt(d1,s);let xa=540+s*560*a.f,xb=540+s*560*b.f;poly([xa,700-560*a.f,xb,700-560*b.f,xb,700-150*b.f,xa,700-150*a.f],'#070B18',4)})}
 // ceiling lights
 for(let i=0;i<5;i++){let d=0.05+i*0.2;let f=lerp(1,0.22,d);let y=700-640*f;let li=L*(o.flick?flick(t,i):1);circ(540,y,26*f,`rgba(255,231,163,${0.25+0.75*li})`,3);if(li>0.2){X.save();X.globalAlpha=0.12*li;circ(540,y,120*f,'#FFE7A3',0);X.restore()}}
 // seats far -> near
 for(let k=3;k>=0;k--){let d=0.15+k*0.2;[[-1],[1]].forEach(([s])=>{let p=seatAt(d,s);bSeat(p.x,p.y,p.f);if(o.who&&o.who.k===k&&o.who.side===s)o.who.fn(p)})}
 if(L<1){X.fillStyle=`rgba(2,3,10,${(1-L)*0.88})`;X.fillRect(0,0,W,H)}}
function bFogClip(t,x,y,w,h){X.save();X.beginPath();X.rect(x,y,w,h);X.clip();bFog(t,y,y+h,0.3,5,7);X.restore()}
function flick(t,i){let v=Math.sin(t*37+i*3)*Math.sin(t*11.3+i);return v>0.2?1:(v>-0.3?0.45:0.1)}

// ---------- characters ----------
function bConductor(x,y,s,t,o={}){X.save();X.translate(x,y);X.scale(s,s);if(o.shake)shake(t,3);
 limb(-22,-170,-24,-12,'#2D3E5E',24);limb(22,-170,24,-12,'#2D3E5E',24);ell(-24,-8,28,12,'#111',4);ell(28,-8,28,12,'#111',4);
 let up=o.phone;let hr=up?[110,-360]:[78,-200];
 limb(-50,-310,-80,-200,NB.skin,18);limb(50,-310,hr[0],hr[1],NB.skin,18);
 rr(-58,-340,116,180,30,'#3B5B8C');line(-40,-335,42,-170,'#6B4F35',10);rr(40,-210,50,60,10,'#6B4F35',5);
 poly([-22,-340,0,-310,22,-340],'#EDE3CF',4);
 if(up){X.save();X.translate(hr[0],hr[1]);rr(-16,-40,32,60,8,'#222',4);circ(0,-30,6,'#FFF',0);X.restore()}
 X.save();X.translate(0,-400);if(o.sleep)X.rotate(0.22+Math.sin(t*2)*0.06);
 circ(0,0,58,NB.skin);X.beginPath();X.arc(0,-6,61,PI*1.05,PI*1.95);X.closePath();fs('#1A1A1A',0);
 // cap
 X.beginPath();X.arc(0,-18,60,PI,0);X.closePath();fs('#B03A2E',5);rr(-10,-34,95,18,8,'#8E2C22',4);
 let m=o.mood||'calm';
 if(o.sleep){[[-20],[22]].forEach(([e])=>{X.beginPath();X.arc(e,4,10,0.1*PI,0.9*PI);ol(5);X.stroke()})}
 else{let r=(m==='shock'||m==='scared')?11:7;[[-20],[22]].forEach(([e])=>{circ(e,2,r,'#fff',3);circ(e,3,r*0.55,P.ink,0)});
  if(m==='scared'){line(-36,-18,-10,-12,P.ink,5);line(36,-18,10,-12,P.ink,5);X.save();X.translate(52,-22);X.beginPath();X.moveTo(0,-18);X.quadraticCurveTo(12,0,0,8);X.quadraticCurveTo(-12,0,0,-18);fs('#9ED8FF',3);X.restore()}}
 let talk=o.talk?Math.abs(Math.sin(t*13))*10+3:0;
 if(o.sleep){line(-8,30,10,30,P.ink,4)}else if(m==='shock'||m==='scared')ell(0,32,10,12+talk*0.4,'#5A1010',4);else if(o.talk)ell(0,30,12,talk,'#5A1010',4);else{X.beginPath();X.arc(0,22,14,0.2*PI,0.8*PI);ol(4);X.stroke()}
 X.restore();
 if(o.sleep&&!o.noz){for(let i=0;i<3;i++){let k=((t*0.5+i*0.33)%1);X.save();X.globalAlpha=1-k;txt('z',60+k*60,-500-k*120,30+k*20,'#DDE6FF',{stroke:4,sc:P.ink});X.restore()}}
 X.restore()}
function bDriverBack(x,y,s,t){X.save();X.translate(x,y);X.scale(s,s);X.translate(Math.sin(t*1.7)*4,0);
 // steering wheel (seen from behind)
 X.beginPath();X.ellipse(0,-170,170,70,0,0,PI*2);ol(26);X.stroke();X.strokeStyle='#3A3A42';X.lineWidth=16;X.stroke();
 rr(-120,-40,240,240,60,'#2C2C34',7);limb(-90,0,-150,-160,'#2C2C34',30);limb(90,0,150,-160,'#2C2C34',30);circ(-150,-165,20,NB.skin,5);circ(150,-165,20,NB.skin,5);
 circ(0,-90,82,'#16161A',7);ell(-82,-90,14,22,NB.skin,4);ell(82,-90,14,22,NB.skin,4);
 X.restore()}
function bMirror(x,y,t,mood){X.save();X.translate(x,y);line(0,-80,0,-30,'#222',10);rr(-200,-30,400,140,40,'#2B2F3A',8);rr(-180,-14,360,108,30,'#141826',0);
 X.save();X.beginPath();X.roundRect(-180,-14,360,108,30);X.clip();rr(-150,0,300,140,40,'#A06B45',0);
 let wide=mood==='wide';[[-60],[60]].forEach(([e])=>{ell(e,40,wide?30:26,wide?20:10,'#fff',4);circ(e,40,wide?9:7,P.ink,0)});
 line(-95,wide?6:14,-30,wide?2:20,'#222',9);line(95,wide?6:14,30,wide?2:20,'#222',9);X.restore();X.restore()}
function bAama(x,y,s,t,o={}){X.save();X.translate(x,y);X.scale(s,s);let a=o.alpha??1;X.globalAlpha=a;
 X.save();X.globalAlpha=a*0.25;circ(0,-260,230,'#DDE6FF',0);X.restore();
 if(!o.seated){limb(-20,-60,-22,-8,NB.skin,14);limb(20,-60,22,-8,NB.skin,14)}
 // shawl body
 X.beginPath();X.moveTo(-70,-420);X.quadraticCurveTo(-130,-200,-110,o.seated?-90:-50);X.lineTo(110,o.seated?-90:-50);X.quadraticCurveTo(130,-200,70,-420);X.closePath();fs(NB.shawl,6);
 for(let i=0;i<4;i++){X.beginPath();X.moveTo(-60+i*40,-380);X.quadraticCurveTo(-70+i*45,-250,-80+i*52,o.seated?-100:-60);X.strokeStyle='rgba(120,120,130,0.4)';X.lineWidth=5;X.stroke()}
 // head under shawl hood
 X.beginPath();X.arc(0,-430,82,PI*0.9,PI*2.1);X.closePath();fs(NB.shawl,6);
 circ(0,-418,52,'#C9A27E',5);X.beginPath();X.arc(0,-440,56,PI*1.05,PI*1.95);X.fillStyle='#BFBFC4';X.fill();
 // closed calm eyes, faint smile, wrinkles
 [[-18],[18]].forEach(([e])=>{X.beginPath();X.arc(e,-418,9,0.1*PI,0.9*PI);ol(4);X.stroke()});
 let talk=o.talk?Math.abs(Math.sin(t*10))*6+2:0;if(o.talk)ell(0,-392,9,talk,'#4A1A1A',3);else{X.beginPath();X.arc(0,-396,12,0.2*PI,0.8*PI);ol(4);X.stroke()}
 line(-30,-400,-24,-396,'rgba(43,27,18,0.5)',3);line(30,-400,24,-396,'rgba(43,27,18,0.5)',3);circ(0,-446,5,NB.red,0);
 // basket in hands
 if(o.basket!==false){bBasket(0,o.seated?-120:-150,0.55,t,{})}
 X.restore()}
function bBasket(x,y,s,t,o={}){X.save();X.translate(x,y);X.scale(s,s);if(o.shake){let k=o.shake;X.rotate(Math.sin(t*38)*0.08*k);X.translate(Math.sin(t*51)*6*k,0)}
 if(o.glow){X.save();X.globalAlpha=0.35*o.glow*(0.7+0.3*Math.sin(t*9));circ(0,-60,220,NB.red,0);X.restore()}
 X.beginPath();X.moveTo(-150,-120);X.lineTo(150,-120);X.lineTo(115,40);X.lineTo(-115,40);X.closePath();fs('#9C6B35',7);
 X.save();X.clip();for(let i=-8;i<9;i++){line(i*24,-130,i*24+30,50,'#7A4E22',6)}for(let j=0;j<6;j++){line(-160,-100+j*28,160,-100+j*28,'#B9884A',7)}
 if(o.glow){for(let j=0;j<6;j++){X.globalAlpha=o.glow*0.8;line(-120,-86+j*28,120,-86+j*28,'#FF4D4D',3)}X.globalAlpha=1}X.restore();
 X.beginPath();X.moveTo(-150,-120);X.lineTo(150,-120);X.lineTo(115,40);X.lineTo(-115,40);X.closePath();ol(7);X.stroke();
 // red cloth cover
 X.beginPath();X.moveTo(-160,-118);X.quadraticCurveTo(-60,-175,0,-150);X.quadraticCurveTo(70,-185,160,-118);X.quadraticCurveTo(0,-95,-160,-118);fs('#A3202B',6);
 X.beginPath();X.arc(0,-130,130,PI*1.1,PI*1.9);ol(9);X.stroke();X.strokeStyle='#9C6B35';X.lineWidth=5;X.stroke();
 X.restore()}
function bTicket(x,y,s,t,hl){X.save();X.translate(x,y);X.rotate(-0.06);X.scale(s,s);
 rr(-310,-180,620,360,10,'#E9DDB7',6);X.save();X.globalAlpha=0.25;for(let i=0;i<14;i++)circ(-300+rnd(i)*600,-170+rnd(i+4)*340,8+rnd(i*3)*18,'#A88B50',0);X.restore();
 X.setLineDash([12,10]);line(-310,-100,310,-100,'#8C6F3A',4);X.setLineDash([]);
 txt('सुनौलो यातायात सेवा',0,-140,44,'#5A3A16',{stroke:0,f:'Mukta'});
 txt('पोखरा  ➜  कालीखोला',0,-40,46,P.ink,{stroke:0,f:'Mukta'});
 txt('भाडा: रु. २',-140,50,50,'#7A1F1F',{stroke:0,f:'Mukta'});
 txt('मिति: २०६१/०५/१२',120,120,46,P.ink,{stroke:0,f:'Mukta'});
 if(hl>0){X.save();X.globalAlpha=hl;X.beginPath();X.ellipse(120,120,190,52,0,0,PI*2*hl);X.strokeStyle=NB.red;X.lineWidth=9;X.stroke();X.restore()}
 X.restore();
 // fingers holding it
 X.save();X.translate(x,y);X.rotate(-0.06);ell(-300*s,150*s,60*s,38*s,NB.skin,6);ell(-260*s,190*s,60*s,34*s,NB.skin,6);X.restore()}
function spot(cx,cy,r,dark=0.92){let g=X.createRadialGradient(cx,cy,r*0.35,cx,cy,r);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,`rgba(2,3,8,${dark})`);X.fillStyle=g;X.fillRect(0,0,W,H)}

// ---------- scenes ----------
function c0(t){ // hook
 bRoad(t);let k=ss(0,6.5,t);bBusFront(540,lerp(1150,1700,k),lerp(0.45,1.25,k),t);bFog(t,900,1500,0.22,10,3);
 let p=ss(0.2,0.8,t);X.save();X.globalAlpha=p;bTitle(430,lerp(0.85,1,p));X.restore();
 sub('मुग्लिनको बाटो, रातको अन्तिम बस… र एउटा अनौठो यात्रु।',0.4,6.8,t,640,54,DARKSUB,LIGHTTXT);
 txt('कथाबस्तु',540,190,60,P.mari,{stroke:12});bFrame('भाग १')}
function c1(t){ // driver's cabin, sleepy conductor, a figure in the fog
 bRoad(t*0.6);X.save();X.beginPath();X.rect(0,0,W,1000);X.clip();bFog(t,600,1000,0.25,8,5);
 if(t>2.5){let a=ss(2.5,3.5,t);X.save();X.globalAlpha=a*0.9;X.translate(700,560);let w=Math.sin(t*6)*0.5;ell(0,-40,10,12,'#EDEDED',0);rr(-9,-28,18,40,6,'#EDEDED',0);X.save();X.translate(8,-24);X.rotate(-1.2+w);rr(0,-3,24,6,3,'#EDEDED',0);X.restore();X.restore()}X.restore();
 // windshield frame + dashboard
 X.fillStyle='#10131B';X.fillRect(0,0,W,90);poly([0,0,70,0,40,1000,0,1000],'#10131B',0);poly([W,0,W-70,0,W-40,1000,W,1000],'#10131B',0);line(540,90,540,1000,'#10131B',14);
 poly([0,980,W,980,W,H,0,H],'#191C26',0);rr(0,960,W,70,20,'#2A2E3A',6);for(let i=0;i<12;i++)poly([60+i*84,1030,84+i*84,1070,108+i*84,1030],[P.red,P.mari,'#2E86C1'][i%3],0);
 bDriverBack(300,1500,1.0,t);
 let awake=t>4.3;bConductor(820,1800,1.2,t,{sleep:!awake,mood:awake?'shock':'calm'});
 sub('कुहिरो लागेको रात। कन्डक्टर विकास निदाउन लागेको थियो।',0.3,4.1,t,330,54,DARKSUB,LIGHTTXT);
 bubble('ए विकास! उठ्! अगाडि कोही हात हल्लाउँदैछ।',540,790,320,1330,4.2,9,t,'ड्राइभर दाइ');
 bFrame('भाग १')}
function c2(t){ // lone lamp, old woman, bus stops
 grad(NB.sky1,NB.sky2,0,1500);X.fillStyle='#0A0F1B';X.beginPath();X.moveTo(0,1100);for(let x=0;x<=W;x+=50)X.lineTo(x,950+Math.sin(x*0.008+2)*80);X.lineTo(W,1500);X.lineTo(0,1500);X.fill();
 X.fillStyle='#1E2129';X.fillRect(0,1500,W,420);line(0,1500,W,1500,'#444',6);
 bLamp(860,1520,t);
 let k=ss(0.5,4.2,t);bBusSide(lerp(-1150,-160,k),1560,t,t<4.2);
 bAama(860,1540,1.12,t,{talk:t>5.0&&t<8.2,alpha:0.95});
 bFog(t,1250,1800,0.22,10,9);
 sub('सडकछेउमा सेतो शल ओढेकी एक बूढी आमा उभिएकी थिइन्।',0.3,4.8,t,330,54,DARKSUB,LIGHTTXT);
 bubble('बाबु, मलाई कालीखोलामा झारिदिनू है।',520,650,800,980,5.0,10,t,'आमा');
 bFrame('भाग १')}
function c3(t){ // inside: "Kalikhola?" — driver's eyes in the mirror
 bInterior(t,1,{who:{k:2,side:-1,fn:p=>bAama(p.x,p.y-20*p.f,p.f*1.15,t,{seated:true})}});
 bConductor(860,1830,1.25,t,{talk:t>0.4&&t<3.3,mood:t>4?'scared':'calm'});
 bMirror(300,250,t,t>4?'wide':'calm');
 bubble('कालीखोला? त्यस्तो ठाउँ त सुनेकै छैन।',560,560,840,1250,0.4,3.9,t,'विकास');
 bubble('कालीखोला त बीस वर्षअघि नै बाढीले बगायो…',560,590,300,370,4.0,9,t,'ड्राइभर दाइ');
 bFrame('भाग १')}
function c4(t){ // the ticket
 bInterior(t,0.7);X.fillStyle='rgba(0,0,0,0.45)';X.fillRect(0,0,W,H);
 let p=ss(0.1,0.6,t);bTicket(540,1000,lerp(0.8,1.08,p),t,ss(3.6,4.4,t));
 sub('आमाले दिएको टिकट हेर्दा विकास छक्क पर्‍यो।',0.3,3.4,t,330,56,DARKSUB,LIGHTTXT);
 bubble('दुई रुपैयाँको टिकट? मिति त २०६१ साल!',540,1500,880,1700,3.5,8,t,'विकास');
 bFrame('भाग १')}
function c5(t){ // lights flicker and die; the seat is empty
 let dark=t>2.8;let L=dark?0.06:(t<0.6?1:0.35+0.65*flick(t,1));
 X.save();if(dark&&t<3.1)shake(t,6);
 bInterior(t,L,{flick:!dark,who:dark?{k:2,side:-1,fn:p=>bBasket(p.x,p.y-100*p.f,p.f*0.9,t,{})}:{k:2,side:-1,fn:p=>bAama(p.x,p.y-20*p.f,p.f*1.15,t,{seated:true,alpha:t>2.2?0.6:1})}});
 X.restore();
 if(t>3.3){let a=ss(3.3,3.6,t);let p=seatAt(0.55,-1);X.save();X.beginPath();X.moveTo(930,1280);X.lineTo(p.x-180,p.y-320);X.lineTo(p.x+170,p.y+10);X.closePath();X.clip();X.globalAlpha=a;bInterior(t,1,{who:{k:2,side:-1,fn:q=>bBasket(q.x,q.y-100*q.f,q.f*1.1,t,{glow:0.4})}});X.restore();
  X.save();X.globalAlpha=0.22*a;poly([930,1280,p.x-180,p.y-320,p.x+170,p.y+10],'#FFF6D8',0);X.restore()}
 bConductor(860,1830,1.25,t,{mood:dark?'scared':'shock',phone:t>3.3,talk:t>3.6&&t<6.3,shake:dark});
 if(dark){X.fillStyle='rgba(0,0,8,0.35)';X.fillRect(0,1300,W,620)}
 sub('अचानक बत्ती झिलिमिली भयो… अनि निभ्यो।',0.3,3.3,t,330,56,DARKSUB,LIGHTTXT);
 bubble('आमा? आमा, तपाईं कहाँ जानुभयो?',560,560,840,1240,3.6,8,t,'विकास');
 bFrame('भाग १')}
function c6(t){ // the basket moves
 let sh=t>4.0;X.save();if(sh)shake(t,4);
 grad('#20242F','#0B0D13');bSeat(540,1700,1.9);bBasket(540,1300,1.5,t,{shake:sh?1:0,glow:sh?ss(4,4.6,t):0});
 X.restore();spot(540,1250,620,0.95);
 sub('सिट खाली थियो। तर उनको टोकरी त्यहीँ थियो…',0.3,3.9,t,330,56,DARKSUB,LIGHTTXT);
 sub('अनि टोकरी आफैँ हल्लियो।',4.0,9,t,420,66,'#2A0A0E','#FFD9D9');
 bFrame('भाग १')}
function c7(t){ // cliffhanger + CTA
 grad('#05060B','#14080B');bFog(t,900,1700,0.12,10,11);bBasket(540,1500,1.1,t,{shake:0.6,glow:1});spot(540,1450,560,0.9);
 bTitle(330,0.8);
 sub('टोकरीभित्र के होला? कमेन्टमा अनुमान लेख्नुहोस्!',0.3,3.5,t,620,58,DARKSUB,LIGHTTXT);
 if(t>3.6){let p=ss(3.6,4.0,t);X.save();X.translate(540,700);X.scale(p,p);rr(-450,-150,900,300,30,'#7A1218',8);
  txt('भाग २ चाँडै…',0,-45,92,'#FFF',{stroke:0,f:'Mukta'});txt('फलो गर्न नबिर्सनुहोस्!',0,60,58,P.mari,{stroke:0,f:'Mukta'});X.restore()}
 txt('कथाबस्तु',540,190,60,P.mari,{stroke:12});bFrame('भाग १')}
const DUR=[7,9,10,9,8,8,9,9],FN=[c0,c1,c2,c3,c4,c5,c6,c7];
