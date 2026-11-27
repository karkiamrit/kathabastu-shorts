// Kathabastu — यदि योमरीले बोल्न सक्थ्यो भने? (folk-art style, Yomari Punhi season)
// Original characters: मरि (a talking yomari), निरु (girl), हजुरआमा (grandmother).
const YM='#F4EAD3',YM2='#E3D2AE',CHAKU='#7A4416';

// ---------- characters ----------
function yomari(x,y,s,t,o={}){X.save();X.translate(x,y);X.scale(s*(o.flip?-1:1),s);
 if(o.bounce)X.translate(0,-Math.abs(Math.sin(t*5))*16);if(o.shake)X.translate(Math.sin(t*45)*5,0);
 // pointed tail (the classic yomari tip)
 let tw=Math.sin(t*3)*8;
 X.beginPath();X.moveTo(70,-170);X.quadraticCurveTo(190,-190,235+tw,-320);X.quadraticCurveTo(215,-150,95,-50);X.closePath();fs(YM,6);
 for(let i=0;i<4;i++){let k=0.25+i*0.17;let px=lerp(110,215,k),py=lerp(-150,-290,k);X.beginPath();X.moveTo(px-18,py+14);X.quadraticCurveTo(px,py+2,px+14,py+20);ol(4);X.strokeStyle='rgba(43,27,18,0.45)';X.stroke()}
 // body
 ell(0,-115,135,112,YM);ell(-45,-160,42,24,'#FFFBF1',0);ell(30,-40,70,18,YM2,0);
 if(o.face===false){X.restore();return}
 // face
 let m=o.mood||'happy';let ex=-38,ey=-125;
 if(m==='sleep'){[[ex],[ex+58]].forEach(([e])=>{X.beginPath();X.arc(e,ey,12,0.1*PI,0.9*PI);ol(5);X.stroke()})}
 else{let r=m==='scared'||m==='wow'?17:13;[[ex],[ex+58]].forEach(([e])=>{circ(e,ey,r,P.ink,0);circ(e+4,ey-5,r*0.35,'#fff',0)})}
 circ(ex-26,ey+34,13,'#F4A0A0',0);circ(ex+84,ey+34,13,'#F4A0A0',0);
 let talk=o.talk?Math.abs(Math.sin(t*13))*14+4:0;
 if(m==='scared'){ell(ex+29,ey+52,16,20+talk*0.5,'#7A1F1F',5);X.save();X.translate(ex+110,ey-30);X.beginPath();X.moveTo(0,-26);X.quadraticCurveTo(16,0,0,10);X.quadraticCurveTo(-16,0,0,-26);fs('#7FD3FF',4);X.restore();
  line(ex-18,ey-30,ex+4,ey-22,P.ink,5);line(ex+76,ey-30,ex+54,ey-22,P.ink,5)}
 else if(o.talk||m==='wow'){ell(ex+29,ey+48,22,Math.max(talk,m==='wow'?16:4),'#7A1F1F',5)}
 else if(m!=='sleep'){X.beginPath();X.arc(ex+29,ey+36,22,0.15*PI,0.85*PI);ol(5);X.stroke()}
 else{line(ex+18,ey+44,ex+40,ey+44,P.ink,5)}
 X.restore()}

function plate(x,y,s,t,n=5,o={}){X.save();X.translate(x,y);X.scale(s,s);ell(0,0,300,70,'#D9A441',7);ell(0,-6,240,50,'#F0C766',0);
 let pos=[[-150,10],[-60,-10],[40,8],[130,-6],[-10,25]];for(let i=0;i<n;i++)yomari(pos[i][0],pos[i][1]+10,0.38,t+i,{face:false});X.restore()}

function girl(x,y,s,t,o={}){X.save();X.translate(x,y);X.scale(s*(o.flip?-1:1),s);
 let ph=o.walk?t*7:0,sw=o.walk?Math.sin(ph)*16:0;
 limb(-20,-150,-20+sw,-12,P.skin,18);limb(20,-150,20-sw,-12,P.skin,18);ell(-14+sw,-8,22,11,P.red,4);ell(26-sw,-8,22,11,P.red,4);
 let col=o.col||'#E8457A';
 // arms
 let up=o.arms==='up';
 let hl=up?[-95,-420]:[-75+sw*0.5,-185],hr=o.plate?[85,-250]:(up?[95,-420]:[75-sw*0.5,-185]);
 limb(-40,-290,hl[0],hl[1],P.skin,16);limb(40,-290,hr[0],hr[1],P.skin,16);
 poly([-42,-305,42,-305,88,-140,-88,-140],col);X.fillStyle=P.mari;X.fillRect(-80,-178,160,18);ol(4);X.strokeRect(-80,-178,160,18);
 for(let i=0;i<4;i++)circ(-48+i*32,-240,7,'#fff',0);
 if(o.plate){X.save();X.translate(hr[0]+20,hr[1]-8);X.scale(0.42,0.42);plate(0,0,1,t,3);X.restore()}
 // shawl for the winter night
 if(o.shawl)poly([-46,-305,46,-305,58,-250,-58,-250],'#4A6FA5',5);
 // head
 circ(-58,-360,22,P.ink,0);circ(58,-360,22,P.ink,0);circ(-58,-338,9,P.red,3);circ(58,-338,9,P.red,3);
 circ(0,-360,54,P.skin);X.beginPath();X.arc(0,-366,57,PI*1.0,PI*2.0);X.closePath();fs(P.ink,0);
 X.beginPath();X.moveTo(-50,-372);X.quadraticCurveTo(-20,-350,0,-382);X.quadraticCurveTo(20,-350,50,-372);X.lineTo(50,-390);X.lineTo(-50,-390);X.closePath();X.fillStyle=P.ink;X.fill();
 let m=o.mood||'happy';let r=m==='wow'?9:7;circ(-20,-352,r,P.ink,0);circ(20,-352,r,P.ink,0);circ(-17,-355,2.5,'#fff',0);circ(23,-355,2.5,'#fff',0);
 circ(-34,-332,9,'#E07A5F',0);circ(34,-332,9,'#E07A5F',0);
 let talk=o.talk?Math.abs(Math.sin(t*13))*9+3:0;
 if(m==='wow')ell(0,-322,11,15,'#7A1F1F',4);else if(o.talk)ell(0,-325,12,talk,'#7A1F1F',4);else{X.beginPath();X.arc(0,-334,16,0.15*PI,0.85*PI);ol(5);X.stroke()}
 X.restore()}

function hajurama(x,y,s,t,o={}){X.save();X.translate(x,y);X.scale(s*(o.flip?-1:1),s);
 poly([-62,-330,62,-330,104,0,-104,0],'#8E2C3C');for(let i=0;i<6;i++)circ(-70+i*28,-30,8,P.mari,0);
 poly([-62,-330,-10,-330,86,-150,64,-112],'#C98B2B',5);
 // shawl
 poly([-70,-335,70,-335,84,-250,-84,-250],'#5B6E3A',5);for(let i=0;i<6;i++)line(-70+i*28,-250,-74+i*28,-232,'#5B6E3A',5);
 let k=o.roll?Math.sin(t*5)*22:0;
 limb(-55,-310,-40+k,-200,P.skin,18);limb(55,-310,60+k,-200,P.skin,18);
 if(o.roll){X.save();X.translate(10+k,-200);rr(-80,-12,160,24,12,'#B98A55',4);X.restore()}
 circ(0,-388,55,P.skin);
 X.beginPath();X.arc(0,-394,58,PI*1.0,PI*2.0);X.closePath();fs('#CFC9C0',5);circ(-50,-418,24,'#CFC9C0',5);
 circ(0,-414,7,P.red,0);
 // glasses
 X.lineWidth=4;X.strokeStyle=P.ink;X.beginPath();X.arc(-20,-382,15,0,PI*2);X.moveTo(35,-382);X.arc(20,-382,15,0,PI*2);X.moveTo(-5,-382);X.lineTo(5,-382);X.stroke();
 circ(-20,-382,4,P.ink,0);circ(20,-382,4,P.ink,0);
 let talk=o.talk?Math.abs(Math.sin(t*12))*8+3:0;
 if(o.talk)ell(0,-352,12,talk,'#7A1F1F',4);else{X.beginPath();X.arc(0,-360,15,0.15*PI,0.85*PI);ol(5);X.stroke()}
 line(-40,-362,-32,-358,'rgba(43,27,18,0.5)',3);line(40,-362,32,-358,'rgba(43,27,18,0.5)',3);
 circ(-55,-376,6,P.mari,3);circ(55,-376,6,P.mari,3);X.restore()}

// ---------- backgrounds ----------
function kitchen(t){grad('#F6C97A','#E9A35A');
 // window with night sky + rising full moon
 rr(640,230,320,300,16,'#1B2A5A',8);circ(820,330,60,'#FFF2C2',4);for(let i=0;i<8;i++)circ(670+rnd(i)*270,250+rnd(i+3)*240,3,'#fff',0);
 line(800,230,800,530,P.wood,10);line(640,380,960,380,P.wood,10);X.lineWidth=8;X.strokeStyle=P.wood;X.strokeRect(640,230,320,300);
 // shelf with brass pots
 rr(90,640,460,24,6,P.wood,5);[[150,40],[250,52],[360,36],[460,46]].forEach(([px,r],i)=>{ell(px,640-r*0.9,r,r*0.9,i%2?'#D9A441':'#B87333',5);rr(px-r*0.45,640-r*1.9,r*0.9,r*0.35,6,i%2?'#D9A441':'#B87333',4)});
 // garland of chilli & garlic
 for(let i=0;i<7;i++){ell(110+i*58,180+Math.sin(i*1.2)*8,13,26,i%2?P.red:'#F2EBDD',4)}line(90,160,520,160,P.ink,4);
 // lower brick wall + floor
 X.fillStyle=P.brick;X.fillRect(0,1380,W,540);X.strokeStyle='rgba(43,27,18,0.35)';X.lineWidth=4;for(let r=0;r<12;r++){let y=1380+r*45;X.beginPath();X.moveTo(0,y);X.lineTo(W,y);X.stroke();for(let c=0;c<10;c++){let xx=c*120+(r%2)*60;X.beginPath();X.moveTo(xx,y);X.lineTo(xx,y+45);X.stroke()}}
 line(0,1380,W,1380,P.ink,8)}
function table(y){rr(40,y,1000,46,10,P.wood,7);rr(80,y+46,40,300,6,'#5A3216',6);rr(960,y+46,40,300,6,'#5A3216',6);
 X.fillStyle='rgba(43,27,18,0.18)';X.fillRect(40,y+46,1000,16)}
function stars(t,n,seed=1,h=H*0.55){for(let i=0;i<n;i++){let a=0.5+0.5*Math.sin(t*3+i*1.7);X.globalAlpha=a;circ(rnd(i+seed)*W,rnd(i*3+seed)*h,3+rnd(i*7)*3,'#FFF6D8',0)}X.globalAlpha=1}
function night(t){grad('#0E1B44','#3A4C8C');stars(t,45,2);
 X.save();X.globalAlpha=0.25;circ(800,380,220,'#FFF2C2',0);X.globalAlpha=0.4;circ(800,380,170,'#FFF2C2',0);X.restore();circ(800,380,130,'#FFF4C8',6);circ(760,350,20,'#EFE2B0',0);circ(830,420,14,'#EFE2B0',0);
 house(-40,1350,380,430);house(640,1330,420,400);
 // lamps in windows
 [[90,1150],[870,1140]].forEach(([lx,ly])=>{X.save();X.globalAlpha=0.5+0.2*Math.sin(t*4+lx);circ(lx,ly,30,'#FFD36B',0);X.restore()});
 X.fillStyle='#5B4636';X.fillRect(0,1350,W,570);X.strokeStyle='rgba(0,0,0,0.25)';X.lineWidth=4;for(let r=0;r<12;r++){let y=1350+r*48;X.beginPath();X.moveTo(0,y);X.lineTo(W,y);X.stroke()}line(0,1350,W,1350,P.ink,8)}
function fields(t){grad('#9ED8F5','#FFF1C9');sun(860,300,90,t*0.3);cloud(230,330,0.8);
 range(880,'#7C93B0',[[250,300,300],[720,360,340]]);
 terraces(880,7,150,['#E9B949','#D9A23A','#F2CC5E'],false);
 // golden paddy tufts
 X.strokeStyle='#B07A1E';X.lineWidth=5;for(let i=0;i<46;i++){let x=rnd(i)*W,y=960+rnd(i+4)*900;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+8,y-30,x+18+Math.sin(t*2+i)*6,y-56);X.moveTo(x,y);X.quadraticCurveTo(x-6,y-26,x-14+Math.sin(t*2+i)*5,y-50);X.stroke()}
 // straw stacks
 [[150,1250],[930,1180]].forEach(([sx,sy])=>{poly([sx-80,sy,sx,sy-170,sx+80,sy],'#E3B04B',6);line(sx,sy-170,sx,sy-210,P.wood,8)});birds(t,80,520,4)}
function rays(cx,cy,c1,c2,t){X.save();X.translate(cx,cy);X.rotate(t*0.15);for(let i=0;i<20;i++){X.fillStyle=i%2?c1:c2;X.beginPath();X.moveTo(0,0);X.arc(0,0,2400,i*PI/10,(i+1)*PI/10);X.closePath();X.fill()}X.restore()}
function steamer(x,y,t,on){X.save();X.translate(x,y);
 // clay stove
 rr(-230,-40,460,180,24,'#9C5A3C',7);ell(0,-40,230,30,'#7A4430',6);for(let i=0;i<3;i++){X.save();X.globalAlpha=0.6+0.3*Math.sin(t*9+i);poly([-50+i*50,60,-30+i*50,0,-10+i*50,60],i%2?P.mari:P.saf,0);X.restore()}
 // pot + steamer tier
 ell(0,-70,190,40,'#B87333',6);rr(-190,-200,380,130,30,'#B87333',7);rr(-200,-240,400,50,20,'#D9A441',7);for(let i=0;i<9;i++)circ(-160+i*40,-215,6,P.ink,0);
 if(on)for(let i=0;i<6;i++){let k=((t*0.6+i*0.17)%1);let dx=-150+i*60+Math.sin(t*2+i)*20,dy=-260-k*360;X.save();X.globalAlpha=(1-k)*0.8;circ(dx,dy,24+k*30,'#FFFFFF',0);X.restore()}
 X.restore()}
function hearts(t,t0,cx,cy){if(t<t0)return;for(let i=0;i<6;i++){let k=(((t-t0)*0.5+i*0.17)%1);X.save();X.globalAlpha=1-k;X.translate(cx+Math.sin(i*2+t)*120,cy-k*360);X.scale(1.3,1.3);X.beginPath();X.moveTo(0,10);X.bezierCurveTo(-30,-15,-12,-35,0,-18);X.bezierCurveTo(12,-35,30,-15,0,10);fs(P.red,4);X.restore()}}
function sparkle(x,y,r,t,t0){if(t<t0)return;let p=ss(t0,t0+0.4,t),a=1-ss(t0+0.6,t0+1.2,t);X.save();X.globalAlpha=a;for(let i=0;i<10;i++){let an=i*PI/5+t;circ(x+Math.cos(an)*r*p,y+Math.sin(an)*r*p,10,[P.mari,'#fff',P.saf][i%3],3)}X.restore()}

// ---------- scenes ----------
function c0(t){ // hook / cover
 rays(540,1300,'#F6B93B','#F28C28',t);
 yomari(470,1640,1.55,t,{bounce:true,talk:t>0.4&&t<3.0,mood:'happy'});
 let p=ss(0.2,0.6,t);X.save();X.translate(540,620);X.scale(p,p);X.rotate(-0.03);rr(-480,-140,960,280,30,P.cream,9);
 txt('यदि योमरीले बोल्न सक्थ्यो भने',0,-48,62,P.crimson,{stroke:0,f:'Mukta'});txt('के भन्थ्यो होला?',0,52,86,P.blue,{stroke:0,f:'Mukta'});X.restore();
 let q=ss(1.2,1.6,t);X.save();X.globalAlpha=q;X.translate(540,880);X.rotate(0.02);rr(-250,-42,500,84,20,P.crimson,6);txt('योमरी पुन्ही विशेष',0,4,50,P.mari,{stroke:0,f:'Mukta'});X.restore();
 txt('कथाबस्तु',540,170,70,P.mari,{stroke:14});border()}
function c1(t){ // kitchen: grandma makes yomari, Niru asks
 kitchen(t);hajurama(320,1330,1.25,t,{roll:t<7,talk:t>7.0&&t<9.6});table(1260);
 plate(560,1250,0.9,t,5);rr(150,1185,150,70,20,'#EDE3CF',6);ell(225,1185,75,18,'#FFFFFF',5);
 girl(850,1640,1.15,t,{talk:t>4.0&&t<6.6,mood:'happy'});
 sub('मंसिरको चिसो साँझ। हजुरआमा योमरी बनाउँदै हुनुहुन्थ्यो।',0.3,3.9,t,360,56);
 bubble('हजुरआमा, यो के बनाउँदै हुनुहुन्छ?',540,600,840,1180,4.0,7.0,t,'निरु');
 bubble('योमरी नानी, नयाँ धानको पिठोबाट बनेको।',540,560,330,780,7.0,10,t,'हजुरआमा');
 border()}
function c2(t){ // the yomari wakes up and talks
 kitchen(t);table(1380);ell(540,1395,430,90,'#D9A441',7);ell(540,1388,350,66,'#F0C766',0);
 yomari(220,1420,0.7,t,{mood:'sleep'});yomari(860,1420,0.7,t+1,{mood:'sleep',flip:true});
 let awake=t>1.8;yomari(500,1450,1.25,t,{mood:awake?(t>3.5?'happy':'wow'):'sleep',talk:t>3.5&&t<6.4,bounce:t>3.5&&t<6.4});
 sparkle(540,1250,180,t,1.8);
 girl(940,1960,1.3,t,{mood:t>6.5?'wow':'happy',talk:t>6.6&&t<8.6,flip:true});
 sub('अनि अचानक… सानो योमरी बोल्यो!',0.3,3.4,t,360,58);
 bubble('नमस्ते निरु! मेरो पेटभित्र चाकु र तिल छ!',540,620,520,1130,3.5,6.5,t,'योमरी');
 bubble('ओहो! योमरी पनि बोल्छ?',520,620,930,1480,6.6,9,t,'निरु',60);
 border()}
function c3(t){ // harvest joy
 fields(t);yomari(470,1560,1.4,t,{bounce:true,talk:t>0.5&&t<3.4,mood:'happy'});sparkle(540,1200,220,t,0.4);
 txt('नयाँ धान',250,800,72,P.white,{stroke:16,sc:P.crimson});
 bubble('म त धान भित्र्याएपछिको खुसी हुँ!',540,600,560,1260,0.5,6,t,'योमरी');
 border()}
function c4(t){ // into the steamer
 kitchen(t);let k=ss(0.8,3.2,t);
 steamer(540,1600,t,t>3.0);
 yomari(500,lerp(980,1365,k),0.95,t,{mood:t>3.6?'scared':'happy',shake:t>3.6,talk:t>3.8&&t<6.7});
 // front rim of the steamer over the yomari
 X.save();X.translate(540,1600);rr(-200,-240,400,50,20,'#D9A441',7);for(let i=0;i<9;i++)circ(-160+i*40,-215,6,P.ink,0);X.restore();
 sub('हजुरआमाले योमरीलाई बाफमा पकाउन राख्नुभयो।',0.3,3.7,t,360,56);
 bubble('ए ए! बिस्तारै है, भित्र त तातो छ!',540,620,520,1000,3.8,9,t,'योमरी');
 border()}
function c5(t){ // full-moon night, children go asking for yomari
 night(t);let k=ss(0,4,t);
 girl(lerp(200,420,k),1640,1.1,t,{walk:t<4,plate:true,shawl:true,talk:t>4.0&&t<6.6});
 boy(lerp(500,700,k),1640,0.95,{run:t<4?0.5:0,ph:t*7,shirt:P.green,mood:'happy'});
 boy(lerp(720,900,k),1640,0.9,{run:t<4?0.5:0,ph:t*7+1,shirt:P.saf,mood:'happy'});
 sub('पूर्णिमाको रात, केटाकेटी घरघर योमरी माग्न निस्किए।',0.3,3.9,t,360,56);
 bubble('म पनि साथीहरूसँग जान्छु!',540,700,lerp(200,420,k),1190,4.0,9,t,'निरु',60);
 border()}
function c6(t){ // sharing
 night(t);girl(220,1660,1.1,t,{mood:'happy',shawl:true});boy(860,1660,1.0,{shirt:P.green,mood:'happy',arms:'up'});
 ell(540,1300,260,56,'#D9A441',7);ell(540,1294,200,40,'#F0C766',0);
 yomari(500,1310,0.85,t,{mood:'happy',talk:t>0.5&&t<3.2,bounce:t>0.5&&t<3.2});
 hearts(t,3.3,540,1080);
 bubble('मलाई एक्लै नखाऊ है, साथीसँग बाँडेर खाऊ!',540,620,520,1050,0.5,7,t,'योमरी');
 border()}
function c7(t){ // moral + CTA
 rays(540,1300,'#F6B93B','#F28C28',t);plate(540,1660,1.1,t,5);
 yomari(470,1520,1.2,t,{bounce:true,mood:'happy'});hearts(t,0.5,540,1100);
 sub('मिठाइ बाँडेर खाँदा झन् मीठो हुन्छ।',0.3,3.7,t,420,62);
 if(t>3.8){let p=ss(3.8,4.2,t);X.save();X.translate(540,600);X.scale(p,p);rr(-470,-150,940,300,30,P.crimson,9);
  txt('तपाईंलाई योमरी कति मन पर्छ?',0,-50,62,'#fff',{stroke:0,f:'Mukta'});txt('कमेन्टमा लेख्नुहोस्!',0,52,66,P.mari,{stroke:0,f:'Mukta'});X.restore()}
 txt('कथाबस्तु',540,170,70,P.mari,{stroke:14});border()}
const DUR=[6,10,9,6,9,9,7,9],FN=[c0,c1,c2,c3,c4,c5,c6,c7];
