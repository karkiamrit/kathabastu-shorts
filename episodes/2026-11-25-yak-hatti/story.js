// Kathabastu — यदि याक र हात्तीले घर साटे भए? (folk-art style)
// Original characters: डोर्जे (yak, Himalaya) and चम्पा (elephant, Terai).
const YK='#4A3426',YK2='#33231A',EL='#8E9AA6',EL2='#6F7C88';

// ---------- characters ----------
function yak(x,y,s,t,o={}){X.save();X.translate(x,y);if(o.shake)X.translate(Math.sin(t*45)*4,0);X.scale(s*(o.flip?-1:1),s);
 let bob=o.walk?Math.abs(Math.sin(t*6))*10:0;X.translate(0,-bob);
 // legs
 [[-120,0],[-70,1],[70,2],[120,3]].forEach(([lx,i])=>{let sw=o.walk?Math.sin(t*6+i*1.6)*18:0;limb(lx,-150,lx+sw,-20,YK2,30);ell(lx+sw+4,-12,24,13,'#1E1410',5)});
 // tail
 X.beginPath();X.moveTo(-170,-230);X.quadraticCurveTo(-220,-200+Math.sin(t*4)*10,-215,-140);ol(10);X.stroke();ell(-215,-128,20,32,YK2,5);
 // body
 ell(0,-215,180,115,YK);
 // shaggy fringe
 let pts=[-175,-170];for(let i=0;i<=14;i++){let k=i/14;pts.push(lerp(-170,165,k),-95+(i%2?0:26)+Math.sin(t*3+i)*3)}pts.push(165,-170);poly(pts,YK,6);
 ell(-40,-250,70,40,'#5C4232',0);
 // scarf
 if(o.scarf!==false){X.save();X.translate(150,-250);X.rotate(0.35);rr(-26,-70,52,140,16,P.red,5);for(let i=0;i<3;i++)line(-26,-40+i*40,26,-40+i*40,P.mari,6);X.restore();poly([150,-200,175,-110,145,-115],P.red,5)}
 // head
 X.save();X.translate(205,-255);if(o.nod)X.rotate(Math.sin(t*5)*0.08);
 // horns
 [[-1],[1]].forEach(([d])=>{X.beginPath();X.moveTo(-10+d*30,-48);X.quadraticCurveTo(d*95,-70,d*80,-125);ol(26);X.stroke();X.strokeStyle='#F1E6CF';X.lineWidth=15;X.stroke()});
 ell(0,0,72,64,YK);ell(18,22,46,40,'#E9DCC6',5);
 // fringe on forehead
 poly([-60,-30,-40,-62,-20,-40,0,-66,20,-42,42,-64,60,-30,30,-20,-30,-20],YK2,5);
 let m=o.mood||'happy';
 circ(-16,-4,9,P.ink,0);circ(30,-4,9,P.ink,0);circ(-13,-7,3,'#fff',0);circ(33,-7,3,'#fff',0);
 circ(6,32,6,P.ink,0);circ(32,32,6,P.ink,0);
 X.beginPath();if(m==='happy'||m==='laugh'){X.arc(18,40,18,0.15*PI,0.85*PI);ol(5);X.stroke();if(m==='laugh')ell(18,52,12,9,'#7A1F1F',4)}else if(m==='hot'){ell(18,52,14,12,'#7A1F1F',4);ell(24,66,8,12,'#E86A7A',3)}else{X.moveTo(6,50);X.lineTo(30,50);ol(5);X.stroke()}
 ell(-62,-10,26,14,YK,5,-0.4);
 X.restore();
 if(o.hot){for(let i=0;i<5;i++){let k=((t*0.9+i*0.2)%1);let dx=-120+i*70,dy=-330+k*160;X.globalAlpha=1-k;X.beginPath();X.moveTo(dx,dy-26);X.quadraticCurveTo(dx+16,dy,dx,dy+10);X.quadraticCurveTo(dx-16,dy,dx,dy-26);fs('#7FD3FF',4);X.globalAlpha=1}}
 X.restore()}

function elephant(x,y,s,t,o={}){X.save();X.translate(x,y);if(o.shiver)X.translate(Math.sin(t*50)*5,0);X.scale(s*(o.flip?-1:1),s);
 let bob=o.walk?Math.abs(Math.sin(t*5))*8:0;X.translate(0,-bob);
 // tail
 X.beginPath();X.moveTo(-195,-250);X.quadraticCurveTo(-235,-200,-225,-150+Math.sin(t*3)*8);ol(9);X.stroke();ell(-225,-140,10,18,P.ink,0);
 // legs
 [[-130,0],[-70,1],[70,2],[130,3]].forEach(([lx,i])=>{let sw=o.walk?Math.sin(t*5+i*1.6)*14:0;rr(lx-32+sw,-190,64,186,20,i%3?EL:EL2,6);for(let j=0;j<3;j++)ell(lx-16+j*16+sw,-10,8,6,'#F2EDE4',3)});
 ell(0,-250,205,140,EL);
 // saddle-cloth decoration (folk pattern)
 if(o.cloth!==false){poly([-90,-370,90,-370,110,-200,-110,-200],P.crimson,6);for(let i=0;i<5;i++)poly([-90+i*40,-205,-70+i*40,-175,-50+i*40,-205],P.mari,4);circ(0,-290,26,P.mari,5);circ(0,-290,10,P.saf,0)}
 // head
 X.save();X.translate(205,-330);
 let ear=o.fan?Math.sin(t*9)*0.25:Math.sin(t*2)*0.06;
 X.save();X.translate(-50,-10);X.rotate(-0.2+ear);ell(-30,30,85,115,EL2,6);ell(-22,32,58,85,'#E9A6B0',0);X.restore();
 circ(0,0,105,EL);
 // trunk
 let tw=o.trunkUp?-1:1;X.beginPath();X.moveTo(60,40);X.bezierCurveTo(115,90,120,170*tw+ (o.trunkUp?-40:0),95+Math.sin(t*3)*10,(o.trunkUp?-170:230));ol(58);X.stroke();X.strokeStyle=EL;X.lineWidth=46;X.stroke();
 for(let i=0;i<4;i++){let k=0.3+i*0.15;line(80+k*40,50+k*(o.trunkUp?-80:150),110+k*20,50+k*(o.trunkUp?-80:150),'rgba(43,27,18,0.4)',4)}
 // eyes, cheeks, smile
 let m=o.mood||'happy';
 circ(20,-22,11,P.ink,0);circ(24,-26,4,'#fff',0);circ(-10,25,14,'#F4A5B5',0);
 if(m==='happy'||m==='laugh'){X.beginPath();X.arc(35,50,20,0.1*PI,0.7*PI);ol(5);X.stroke()}
 if(m==='tired'){line(4,-40,36,-30,P.ink,6)}
 // flower on head
 if(!o.cap){for(let i=0;i<6;i++){let a=i*PI/3;circ(-30+Math.cos(a)*18,-92+Math.sin(a)*18,13,'#FF7FA8',4)}circ(-30,-92,10,P.mari,4)}
 else{X.beginPath();X.arc(-5,-35,100,PI*1.05,PI*1.95);X.closePath();fs(P.blue,6);rr(-110,-60,210,36,14,P.mari,5);for(let i=0;i<6;i++)circ(-80+i*30,-80,7,'#fff',0);circ(-5,-150,26,P.red,5)}
 X.restore();
 if(o.scarf){X.save();X.translate(150,-260);rr(-40,-34,90,68,20,P.blue,5);for(let i=0;i<3;i++)line(-28+i*28,-30,-28+i*28,30,P.mari,6);X.restore();rr(150,-240,40,140,14,P.blue,5)}
 if(o.hot){for(let i=0;i<5;i++){let k=((t*0.9+i*0.2)%1);let dx=60+i*50,dy=-560+k*160;X.globalAlpha=1-k;X.beginPath();X.moveTo(dx,dy-26);X.quadraticCurveTo(dx+16,dy,dx,dy+10);X.quadraticCurveTo(dx-16,dy,dx,dy-26);fs('#7FD3FF',4);X.globalAlpha=1}}
 X.restore()}

// ---------- backgrounds ----------
function snow(t,n,seed=3,h=H){X.fillStyle='#fff';for(let i=0;i<n;i++){let r1=rnd(i+seed),r2=rnd(i*5+seed),y=((r2*h+t*(60+r1*80))%h),x=(r1*W+Math.sin(t+i)*30);X.beginPath();X.arc(x,y,4+r1*6,0,PI*2);X.fill()}}
function himal(t,h=H){grad('#8CCBF0','#E6F5FF',0,h);cloud(230,260,0.9);cloud(820,180,0.7);
 range(h*0.6,'#6F86A6',[[200,h*0.33,340],[640,h*0.42,400],[1000,h*0.3,300]]);
 range(h*0.66,'#8AA0BD',[[420,h*0.22,300],[880,h*0.18,260]]);
 flags(-20,h*0.5,W+20,h*0.46,11,t,40);
 X.beginPath();X.moveTo(-20,h*0.66);X.bezierCurveTo(300,h*0.6,700,h*0.7,W+20,h*0.64);X.lineTo(W+20,h+20);X.lineTo(-20,h+20);X.closePath();fs('#F7FBFF',6);
 for(let i=0;i<6;i++)ell(120+i*170,h*0.8+(i%2)*60,60,12,'#DDEAF5',0)}
function terai(t,h=H){grad('#FFAE45','#FFE9A8',0,h);sun(820,h*0.17,110,t*0.3);
 X.save();X.strokeStyle='rgba(255,255,255,0.55)';X.lineWidth=5;for(let i=0;i<5;i++){let y=h*0.32+i*60;X.beginPath();for(let x=0;x<=W;x+=20)X.lineTo(x,y+Math.sin(x*0.03+t*4+i)*10);X.stroke()}X.restore();
 X.beginPath();X.moveTo(-20,h*0.62);X.bezierCurveTo(300,h*0.58,700,h*0.66,W+20,h*0.6);X.lineTo(W+20,h+20);X.lineTo(-20,h+20);X.closePath();fs('#86B84E',6);
 for(let i=0;i<5;i++)tree(80+i*230,h*0.63+(i%2)*20,0.95+(i%3)*0.1,i%2?'#3E8E41':'#2E6B3A');
 // tall grass
 X.strokeStyle='#4E7A2A';X.lineWidth=5;for(let i=0;i<40;i++){let x=rnd(i)*W,y=h*0.7+rnd(i+4)*h*0.25;X.beginPath();X.moveTo(x,y);X.quadraticCurveTo(x+8,y-30,x+14+Math.sin(t*2+i)*6,y-60);X.stroke()}}
function pahad(t,h=H){grad('#A8DDF5','#FFF4D6',0,h);sun(860,h*0.14,70,t*0.2);range(h*0.42,'#7C93B0',[[250,h*0.16,240],[700,h*0.2,280]]);
 terraces(h*0.45,6,h*0.1,[P.lgreen,'#9CC46A',P.green]);birds(t,100,h*0.2,4)}
function region(y0,y1,fn){X.save();X.beginPath();X.rect(0,y0,W,y1-y0);X.clip();X.translate(0,y0);fn(y1-y0);X.restore();line(0,y1,W,y1,P.ink,10)}

// ---------- scenes ----------
function c0(t){ // cover / hook
 region(0,960,h=>{himal(t,h);snow(t,30,1,h);yak(330,h-60,0.95,t,{nod:true})});
 region(960,H,h=>{terai(t,h);elephant(720,h-120,0.85,t,{flip:true,fan:true})});
 let p=ss(0.2,0.6,t);X.save();X.translate(540,960);X.scale(p,p);X.rotate(-0.03);rr(-470,-125,940,250,30,P.cream,9);
 txt('यदि याक र हात्तीले',0,-45,80,P.crimson,{stroke:0,f:'Mukta'});txt('घर साटे भए?',0,52,92,P.blue,{stroke:0,f:'Mukta'});X.restore();
 // swap arrows
 let a=ss(1,1.4,t);X.save();X.globalAlpha=a;X.translate(910,620);X.rotate(t*1.2);for(let d=0;d<2;d++){X.rotate(PI);X.beginPath();X.arc(0,0,70,0.1*PI,0.85*PI);ol(14);X.stroke();X.strokeStyle=P.mari;X.lineWidth=8;X.stroke();poly([-70,20,-92,-12,-46,-8],P.mari,5)}X.restore();
 txt('कथाबस्तु',540,150,70,P.mari,{stroke:14});border();
}
function c1(t){ // Himalaya, Dorje
 himal(t);snow(t,60);yak(470,1560,1.35,t,{nod:true,mood:'happy'});
 txt('हिमाल',540,170,90,P.white,{stroke:16,sc:P.blue});
 sub('हिमालमा बस्थ्यो डोर्जे याक — हिउँमा पनि मस्त।',0.3,4,t,360,56);
 bubble('यहाँ त हिउँ मात्रै! म तराई घुम्न जान्छु!',540,640,720,960,4.1,8,t,'डोर्जे');
 border()}
function c2(t){ // Terai, Champa
 terai(t);elephant(560,1600,1.25,t,{fan:true,mood:'tired',hot:true});
 txt('तराई',540,170,90,P.white,{stroke:16,sc:P.crimson});
 sub('तराईमा थिई चम्पा हात्ती — गर्मीले हैरान।',0.3,4,t,360,56);
 bubble('उफ् कति गर्मी! म त हिमाल जान्छु, चिसो खान!',540,640,760,860,4.1,8,t,'चम्पा');
 border()}
function c3(t){ // the deal on the hill road
 pahad(t);
 let k=ss(0,2.5,t);yak(lerp(-150,300,k),1580,0.95,t,{walk:t<2.5,mood:t>6.5?'laugh':'happy'});
 elephant(lerp(1250,800,k),1600,0.85,t,{walk:t<2.5,flip:true,mood:'happy',trunkUp:t>6.5});
 if(t>6.5){let p=ss(6.5,6.9,t);X.save();X.globalAlpha=p;for(let i=0;i<10;i++){let a=i*PI/5+t;circ(560+Math.cos(a)*90*p,1180+Math.sin(a)*90*p,10,[P.mari,P.red,P.blue][i%3],3)}X.restore()}
 sub('अनि दुवैले एक हप्ताका लागि घर साटे।',0.3,3.4,t,330,56);
 bubble('चम्पा दिदी, मेरो घर तिम्रो, तिम्रो घर मेरो!',540,430,330,1150,3.5,6.5,t,'डोर्जे');
 bubble('सम्झौता पक्का!',620,520,800,1060,6.6,10,t,'चम्पा',64);
 border()}
function c4(t){ // yak in Terai
 terai(t);let hot=t>3.5;yak(480,1580,1.3,t,{hot,mood:hot?'hot':'happy',shake:hot});
 if(hot){X.save();X.globalAlpha=ss(3.5,4,t);txt('४५°',860,560,110,P.red,{stroke:16,sc:P.white});X.restore()}
 sub('डोर्जे तराई पुग्यो। तर उसको बाक्लो रौं…',0.3,3.9,t,330,56);
 bubble('ओहो! म त पग्लिन लागेँ! पसिना नै पसिना!',520,430,560,1080,4.0,8,t,'डोर्जे');
 border()}
function c5(t){ // elephant in Himalaya
 himal(t);snow(t,90,7);let sl=ss(0.5,3,t);elephant(lerp(300,600,sl),1600,1.1,t,{shiver:t>3.5,cap:t>3.5,mood:'tired',flip:false});
 if(t<3.5){X.save();X.strokeStyle='rgba(120,160,200,0.7)';X.lineWidth=6;for(let i=0;i<4;i++){line(lerp(60,350,sl)-i*40,1520+i*20,lerp(160,450,sl)-i*40,1520+i*20,'rgba(120,160,200,0.7)',6)}X.restore()}
 if(t>3.5){X.save();X.globalAlpha=ss(3.5,4,t);txt('-१५°',850,560,100,P.blue,{stroke:16,sc:P.white});X.restore()}
 sub('चम्पा हिमाल पुगिन्। हिउँमा चिप्लिँदै…',0.3,3.4,t,330,56);
 bubble('क… कति चिसो! मेरो कान नै जम्यो!',540,430,620,1000,3.5,8,t,'चम्पा');
 border()}
function c6(t){ // reunion on the hill
 pahad(t);yak(300,1580,0.95,t,{mood:t>3.5?'laugh':'happy',nod:true});elephant(800,1600,0.85,t,{flip:true,mood:'happy',trunkUp:t>6.5});
 if(t>6.5)for(let i=0;i<5;i++){let k=((t*0.5+i*0.2)%1);X.save();X.globalAlpha=1-k;X.translate(560+Math.sin(i*2+t)*60,1150-k*300);X.scale(1.2,1.2);X.beginPath();X.moveTo(0,10);X.bezierCurveTo(-30,-15,-12,-35,0,-18);X.bezierCurveTo(12,-35,30,-15,0,10);fs(P.red,4);X.restore()}
 sub('भोलिपल्टै दुवै बीच बाटोको पहाडमा भेटिए।',0.3,3.5,t,330,56);
 bubble('आफ्नो घर नै राम्रो रहेछ!',460,520,300,1050,3.6,6.5,t,'डोर्जे',60);
 bubble('तर घुम्न भने आइरहनु है, साथी!',580,560,800,1020,6.6,10,t,'चम्पा');
 border()}
function c7(t){ // moral + CTA
 region(0,960,h=>{himal(t,h);snow(t,30,2,h);yak(540,h-60,0.95,t,{nod:true,mood:'happy'})});
 region(960,H,h=>{terai(t,h);elephant(560,h-120,0.85,t,{flip:true,fan:true,mood:'happy'})});
 sub('आफ्नो माटो आफ्नै हो — तर साथी जहाँ पनि बन्छन्।',0.3,4.4,t,960,58);
 if(t>4.4){let p=ss(4.4,4.8,t);X.save();X.translate(540,960);X.scale(p,p);rr(-470,-150,940,300,30,P.crimson,9);
  txt('तपाईं हिमाल रोज्नुहुन्छ कि तराई?',0,-50,58,'#fff',{stroke:0,f:'Mukta'});txt('कमेन्टमा लेख्नुहोस्!',0,50,62,P.mari,{stroke:0,f:'Mukta'});X.restore()}
 border()}
const DUR=[6,8,8,10,8,8,10,9],FN=[c0,c1,c2,c3,c4,c5,c6,c7];
