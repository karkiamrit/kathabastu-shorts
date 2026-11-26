// Kathabastu (manual) — डाँफे र काग: सुन्दर हुनु ठूलो कि असल हुनु?  folk-art style, original characters.
const DG='#1E9E6A',DP='#4B3FA8',DC='#D8742A',DT='#C8561C',CK='#26262E',CG='#6E6E7A';

function danphe(x,y,s,t,o={}){X.save();X.translate(x,y);if(o.shake)X.translate(Math.sin(t*40)*4,0);X.scale(s*(o.flip?-1:1),s);
 let bob=o.hop?Math.abs(Math.sin(t*7))*18:Math.sin(t*2)*3;X.translate(0,-bob);
 // tail fan
 X.save();X.translate(-120,-150);X.rotate(o.proud?-0.35:0.15);for(let i=-2;i<=2;i++){X.save();X.rotate(i*0.16);ell(-90,0,95,26,i%2?DT:'#E07A2E',5);X.restore()}X.restore();
 // legs
 limb(-20,-90,-30,-5,'#8A8A8A',12);limb(30,-90,40,-5,'#8A8A8A',12);line(-50,-2,-10,-2,P.ink,8);line(20,-2,60,-2,P.ink,8);
 // body
 ell(0,-160,130,90,DP);ell(-30,-185,85,45,'#6A5CD0',0);ell(-60,-140,40,22,'#fff',0);
 // neck
 let hb=o.bow?0.55:0;X.save();X.translate(80,-210);X.rotate(hb);
 X.beginPath();X.moveTo(-50,50);X.quadraticCurveTo(-55,-40,-28,-115);X.lineTo(40,-115);X.quadraticCurveTo(48,-30,52,50);X.closePath();fs(DC,6);X.beginPath();X.moveTo(-40,10);X.quadraticCurveTo(0,-10,45,10);ol(0);X.strokeStyle='#B85A1A';X.lineWidth=8;X.stroke();
 // head
 X.save();X.translate(10,-130);circ(0,0,52,DG);
 // crest
 for(let i=-1;i<=1;i++){X.save();X.rotate(i*0.3-0.1+Math.sin(t*3+i)*0.05);line(0,-45,0,-115,P.ink,6);ell(0,-125,11,17,'#2EC48A',4);X.restore()}
 ell(16,-4,24,18,'#3FA9F5',0);circ(18,-4,8,P.ink,0);circ(21,-7,3,'#fff',0);
 poly([42,0,82,12,44,22],'#BBA27A',5);
 if(o.mood==='worry'){line(4,-30,30,-22,P.ink,5)}else if(o.mood==='sad'){line(4,-22,30,-30,P.ink,5)}
 X.restore();X.restore();
 if(o.sparkle){for(let i=0;i<6;i++){let a=t*2+i;let px=Math.cos(a)*190,py=-200+Math.sin(a*1.3)*120;star(px,py,10+5*Math.sin(t*6+i))}}
 if(o.sweat){for(let i=0;i<3;i++){let k=((t*1.2+i*0.33)%1);X.globalAlpha=1-k;ell(140+i*30,-360+k*60,8,13,'#7FD3FF',3);X.globalAlpha=1}}
 X.restore()}
function star(x,y,r){X.save();X.translate(x,y);X.beginPath();for(let i=0;i<8;i++){let rr=i%2?r*0.35:r;let a=i*PI/4;X.lineTo(Math.cos(a)*rr,Math.sin(a)*rr)}X.closePath();X.fillStyle='#FFF3A0';X.fill();X.restore()}

function crow(x,y,s,t,o={}){X.save();X.translate(x,y);X.scale(s*(o.flip?-1:1),s);
 let fl=o.fly?Math.sin(t*12):0;
 if(!o.fly){limb(-10,-40,-14,0,'#333',8);limb(14,-40,18,0,'#333',8)}
 poly([-70,-90,-150,-60,-140,-40,-60,-55],CK,5);
 ell(0,-80,80,55,CK);
 // wing
 X.save();X.translate(-10,-95);X.rotate(o.fly?-0.6+fl*0.8:0.15);ell(-30,0,70,30,'#3A3A46',5);X.restore();
 // head
 X.save();X.translate(65,-135);circ(0,0,44,CG);X.beginPath();X.arc(0,0,44,PI*1.1,PI*1.9);X.closePath();fs(CK,0);
 poly([36,-6,88,6,36,16],'#2B2B2B',5);
 circ(14,-8,11,'#fff',3);circ(17,-8,6,P.ink,0);
 // lashes (Kali)
 line(10,-20,6,-30,P.ink,3);line(17,-21,17,-31,P.ink,3);line(24,-19,28,-28,P.ink,3);
 if(o.smile){X.beginPath();X.arc(30,14,10,0.1*PI,0.8*PI);ol(3);X.stroke()}
 X.restore();
 // little scarf
 rr(30,-110,40,26,10,P.mari,4);
 X.restore()}

function chick(x,y,s,t,i=0){X.save();X.translate(x,y+Math.abs(Math.sin(t*8+i))*-6);X.scale(s,s);limb(-8,-10,-10,0,'#8A8A8A',5);limb(8,-10,10,0,'#8A8A8A',5);ell(0,-40,34,30,'#A0774E');circ(18,-62,20,'#B98A5C');circ(24,-66,5,P.ink,0);poly([36,-62,50,-58,36,-54],P.mari,3);X.restore()}

function rhodo(x,y,s,t){X.save();X.translate(x,y);X.scale(s,s);
 limb(0,0,0,-420,'#6B3E1F',30);limb(0,-300,-160,-430,'#6B3E1F',20);limb(0,-360,170,-470,'#6B3E1F',20);
 [[-170,-460],[0,-480],[170,-500],[-80,-560],[90,-580]].forEach(([cx,cy],i)=>{circ(cx,cy,95,'#2F7A43',6);for(let j=0;j<5;j++){let a=j*1.3+i;circ(cx+Math.cos(a)*55,cy+Math.sin(a)*50,16,'#E0304A',4);circ(cx+Math.cos(a)*55,cy+Math.sin(a)*50,6,'#FFD1DA',0)}});
 X.restore()}
function rock(x,y,s){X.save();X.translate(x,y);X.scale(s,s);poly([-200,0,-170,-150,-60,-220,90,-200,190,-110,210,0],'#8C8C96',6);poly([-120,-150,-60,-200,40,-190,-20,-150],'#fff',4);X.restore()}

function snowfall(t,n,seed=3,wind=0){X.fillStyle='#fff';for(let i=0;i<n;i++){let r1=rnd(i+seed),r2=rnd(i*5+seed),y=((r2*H+t*(80+r1*120))%H),x=((r1*W+t*wind*(0.5+r1)+Math.sin(t+i)*30)%W+W)%W;X.beginPath();X.arc(x,y,4+r1*7,0,PI*2);X.fill()}}
function himal(t,night){if(night)grad('#1B2340','#4A5A86');else grad('#8CCBF0','#E6F5FF');
 if(!night){cloud(230,250,0.9);cloud(830,190,0.7)}
 range(1100,night?'#3C4A6E':'#6F86A6',[[200,640,340],[640,800,400],[1000,560,300]]);
 range(1180,night?'#4E5D84':'#8AA0BD',[[420,420,300],[880,350,260]]);
 if(!night)flags(-20,960,W+20,900,11,t,40);
 X.beginPath();X.moveTo(-20,1200);X.bezierCurveTo(300,1150,700,1250,W+20,1180);X.lineTo(W+20,H+20);X.lineTo(-20,H+20);X.closePath();fs(night?'#C9D3E8':'#F7FBFF',6);
 for(let i=0;i<6;i++)ell(120+i*170,1450+(i%2)*80,60,12,night?'#AEB9D2':'#DDEAF5',0)}

// ---------- scenes ----------
function c0(t){himal(t);snowfall(t,25);rhodo(880,1560,0.9,t);crow(760,1200,1.25,t,{flip:true,smile:true});danphe(330,1600,1.15,t,{proud:true});
 let p=ss(0.2,0.6,t);X.save();X.translate(540,520);X.scale(p,p);X.rotate(-0.03);rr(-460,-150,920,300,30,P.cream,9);
 txt('डाँफे र काग',0,-58,104,P.crimson,{stroke:0,f:'Mukta'});txt('सुन्दर हुनु ठूलो कि असल हुनु?',0,62,58,P.blue,{stroke:0,f:'Mukta'});X.restore();
 txt('कथाबस्तु',540,170,70,P.mari,{stroke:14});border()}
function c1(t){himal(t);snowfall(t,30);danphe(520,1600,1.45,t,{proud:true,sparkle:t>4});chick(150,1600,1.1,t,0);chick(260,1640,1,t,1);
 sub('हिमालको काखमा बस्थ्यो डाँफे — नेपालको राष्ट्रिय पक्षी।',0.3,4,t,360,56);
 bubble('हेर त मेरो रङ! म जस्तो सुन्दर कोही छैन!',540,660,640,980,4.1,8,t,'डाँफे');border()}
function c2(t){himal(t);rhodo(860,1600,1.0,t);crow(720,1230,1.35,t,{flip:true,smile:true});danphe(330,1620,1.15,t,{proud:t>6.7});
 sub('रूखमा बसेकी काली कागले मुसुक्क हाँस्दै भनी—',0.3,3.4,t,360,56);
 bubble('रङले मात्र मन जितिँदैन, डाँफे दाइ!',540,660,800,1000,3.5,6.6,t,'काली');
 bubble('कालो कागलाई रङको के थाहा!',480,700,380,1160,6.7,11,t,'डाँफे');border()}
function c3(t){himal(t,true);X.save();X.globalAlpha=0.6+0.4*Math.sin(t*9);X.fillStyle='rgba(255,255,255,0.08)';X.fillRect(0,0,W,H);X.restore();
 snowfall(t,160,9,-420);X.strokeStyle='rgba(255,255,255,0.55)';X.lineWidth=6;for(let i=0;i<8;i++){let y=700+i*110,x=((W-((t*700+i*260)%(W+600))));X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+120,y-40,x+260,y);X.stroke()}
 X.save();X.globalAlpha=0.85;danphe(300,1650,0.8,t,{});chick(500,1660,0.8,t,0);chick(580,1680,0.7,t,1);X.restore();
 txt('स्वाँ… स्वाँ…',760,1150,72,'#fff',{stroke:12,sc:'#1B2340'});
 sub('त्यही रात हिमालमा ठूलो हिउँ-आँधी आयो।',0.3,6,t,360,56);border()}
function c4(t){himal(t);for(let i=0;i<5;i++)ell(120+i*220,1590+(i%2)*40,110,50,'#EAF3FB',5);danphe(540,1600,1.35,t,{shake:t>4,mood:'worry',sweat:t>4,hop:t>4});
 sub('बिहान उठ्दा डाँफेका बच्चाहरू हराएका थिए!',0.3,3.9,t,360,56);
 bubble('मेरा बच्चाहरू कहाँ गए? कसैले देखेको छ?',540,660,680,1000,4.0,8,t,'डाँफे',50);border()}
function c5(t){himal(t);rock(760,1600,1.2);let peek=ss(3.5,4.2,t);chick(640,1600-peek*20,1,t,0);chick(880,1600-peek*20,1,t,1);
 let k=ss(0,3.4,t);crow(lerp(-150,520,k)+Math.sin(t*2)*30,lerp(820,1000,k),0.9,t,{fly:true,smile:true});
 if(t>3.5){X.save();X.globalAlpha=peek;X.translate(760,1300+Math.sin(t*6)*12);poly([-30,-80,30,-80,30,0,60,0,0,60,-60,0,-30,0],P.mari,6);X.restore()}
 sub('कालीले आकाशमा उड्दै खोजी गरी, अनि कराई—',0.3,3.4,t,360,56);
 bubble('उता! ठूलो ढुङ्गामुनि लुकेका छन्!',540,640,520,920,3.5,9,t,'काली');border()}
function c6(t){himal(t);rhodo(920,1620,0.8,t);crow(820,1300,1.15,t,{flip:true,smile:true});danphe(420,1620,1.2,t,{bow:t>3.7,mood:t>3.7?'sad':undefined});
 chick(150,1640,1,t,0);chick(700,1650,1,t,1);
 if(t<3.6)for(let i=0;i<5;i++){let k=((t*0.6+i*0.2)%1);X.save();X.globalAlpha=1-k;X.translate(420+Math.sin(i*2+t)*120,1150-k*250);X.scale(1.2,1.2);X.beginPath();X.moveTo(0,10);X.bezierCurveTo(-30,-15,-12,-35,0,-18);X.bezierCurveTo(12,-35,30,-15,0,10);fs(P.red,4);X.restore()}
 sub('बच्चाहरू सकुशल घर फर्किए। डाँफेको शिर झुक्यो।',0.3,3.6,t,360,56);
 bubble('माफ गर बहिनी, साँचो सुन्दरता त मनमा हुँदो रहेछ।',540,660,500,1050,3.7,10,t,'डाँफे');border()}
function c7(t){himal(t);snowfall(t,20);rays2(540,1250,'rgba(255,240,180,0.35)','rgba(255,255,255,0)',24,t);
 danphe(360,1620,1.05,t,{});crow(760,1580,1.3,t,{flip:true,smile:true});chick(560,1640,0.9,t,0);chick(140,1640,0.9,t,1);
 for(let i=0;i<6;i++){let k=((t*0.4+i/6)%1);X.save();X.globalAlpha=1-k;X.translate(300+i*90,1150-k*260);X.scale(1.1,1.1);X.beginPath();X.moveTo(0,10);X.bezierCurveTo(-30,-15,-12,-35,0,-18);X.bezierCurveTo(12,-35,30,-15,0,10);fs(P.red,4);X.restore()}
 sub('साथी हो, रूपभन्दा गुण ठूलो हुन्छ।',0.3,4.3,t,420,62);
 if(t>4.4){let p=ss(4.4,4.8,t);X.save();X.translate(540,460);X.scale(p,p);rr(-470,-150,940,300,30,P.crimson,9);
  txt('तपाईंलाई डाँफे मन पर्‍यो कि काली?',0,-50,58,'#fff',{stroke:0,f:'Mukta'});txt('कमेन्टमा लेख्नुहोस्!',0,52,64,P.mari,{stroke:0,f:'Mukta'});X.restore()}
 border()}
const DUR=[6,8,11,6,8,9,10,9],FN=[c0,c1,c2,c3,c4,c5,c6,c7];
