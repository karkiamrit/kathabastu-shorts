// ============ scenes ============
const PX=60,PW=960;
function c0(t){ // cover
 X.fillStyle=K.paper;X.fillRect(0,0,W,H);rays2(540,980,'#F7C948','#F29E2E',24,t);X.fillStyle=halftone('rgba(200,40,20,0.25)','rgba(0,0,0,0)',26,6);X.fillRect(0,0,W,H);
 // masthead
 rr(60,150,960,170,10,K.red,10);txt('कथाबस्तु कमिक्स',540,238,92,K.yel,{stroke:16});
 krishna(540,1680,1.55,{arms:'flute',mood:'smile'});
 let p=ss(0.2,0.6,t);X.save();X.translate(540,470);X.scale(p,p);X.rotate(-0.04);rr(-470,-110,940,230,16,'#FFFFFF',10);txt('यदि कृष्णजी रामायणमा',0,-38,78,K.blueD,{stroke:0,f:'Mukta'});txt('रामको सट्टा भएको भए?',0,58,84,K.red,{stroke:0,f:'Mukta'});X.restore();
 burst('विशेष अंक!',860,720,120,1.0,8,t,K.yel,K.red,48,0.18);
 for(let i=0;i<5;i++){let k=((t*0.4+i*0.2)%1);note(300+i*110+Math.sin(t*2+i)*20,1250-k*400,1.1,(1-k)*ss(0.6,1,t))}
}
function c1(t){page();
 panel(PX,170,PW,680,t,0,(w,h)=>{grad('#FFD58A','#FFF1C9',0,h);sun(800,170,70,t*0.2);palace(w/2,h-90,1.2);X.fillStyle='#D8B25A';X.fillRect(0,h-90,w,90);line(0,h-90,w,h-90,K.ink,7)});
 caption('अयोध्या। राजा दशरथको वचन — चौध वर्षको वनवास।',PX+20,190,PW-40,0.3,4.4,t);
 panel(PX,900,PW,720,t,4.4,(w,h)=>{rays2(w/2,h*0.6,'#8FD3FF','#BDE6FF',20,t);krishna(w/2,h+330,1.35,{arms:'flute',mood:'smile'});});
 caption('राम त चुपचाप वनतिर लागे। तर कृष्णजी?',PX+20,920,PW-40,4.6,7.5,t);
 bubble('वचन पूरा गर्छु… तर आफ्नै तरिकाले!',540,1000,560,1250,7.6,11,t,'श्रीकृष्ण',50);
}
function c2(t){page();let dk=t>6.8;
 panel(PX,170,PW,820,t,0,(w,h)=>{grad('#8FD18A','#E7F6C9',0,h);for(let i=0;i<6;i++)tree(80+i*170,h-120+(i%2)*30,0.9+(i%3)*0.15,i%2?K.grn:'#2E7D32');hut(160,h-60,0.8);X.fillStyle='#6FA84A';X.fillRect(0,h-70,w,70);line(0,h-70,w,h-70,K.ink,7);
  let dx=dk?lerp(560,1200,ss(7.2,9.5,t)):560+Math.sin(t*1.5)*90;deer(dx,h-60,1.1,t,dk);if(!dk){for(let i=0;i<8;i++){let a=t*3+i;circ(dx+Math.cos(a)*170,h-260+Math.sin(a*1.3)*80,5,'#FFF6A0',0)}}});
 caption('पञ्चवटीमा सुनौलो मृग देखियो।',PX+20,190,PW-40,0.3,3.3,t);
 panel(PX,1030,PW,590,t,3.2,(w,h)=>{grad('#2F62C9','#8FB8FF',0,h);krishna(w/2,h+300,1.15,{arms:t>6.6?'flute':'rest',mood:'smile',look:t>6.6?0:4});
  if(t>6.6)for(let i=0;i<7;i++){let k=((t-6.6)*0.6+i/7)%1;note(w/2+120+k*360,h*0.55-k*240+Math.sin(i+t*3)*30,1.2,1-k)}});
 bubble('सुनको मृग? यो त माया हो!',560,1110,560,1300,3.4,6.6,t,'श्रीकृष्ण',52);
 caption('बाँसुरीको एउटै धुनमा मारीचको छल खुल्यो।',PX+20,190,PW-40,6.6,12,t);
 burst('फुर्र!',800,600,110,7.0,9.5,t,'#B9F',K.ink,80,0.15);
}
function c3(t){page();
 panel(PX,170,PW,1450,t,0,(w,h)=>{grad('#F7C46C','#FDEBC2',0,h);tree(90,h-150,1.1);tree(w-80,h-180,1.2,'#2E7D32');hut(w/2,h-170,1.5);X.fillStyle='#B07B4A';X.fillRect(0,h-170,w,170);line(0,h-170,w,h-170,K.ink,7);
  let sh=t>3.6?lerp(0.35,0.8,ss(3.6,5,t)):0.35;ravan(260,h-90,1.05,{sage:true,shadow:sh,mood:t>8.2?'shock':'neutral'});krishna(w-250,h-90,1.05,{arms:'bless',mood:'smile',flip:true});});
 caption('रावण साधु बनेर आयो…',PX+20,190,PW-40,0.3,3.5,t);
 bubble('स्वागत छ, लङ्कापति! छायाँमा त दस टाउको देखिँदैछ नि!',560,330,760,820,3.6,8.2,t,'श्रीकृष्ण',50);
 burst('हँ!?',300,520,110,8.2,10,t,K.yel,K.red,96,-0.15);
}
function c4(t){page();let vr=t>7.6;
 panel(PX,170,PW,560,t,0,(w,h)=>lanka(w,h,t));
 caption('युद्धअघि कृष्णजी आफैँ शान्तिदूत बनेर लङ्का पुग्थे।',PX+20,190,PW-40,0.3,4.5,t);
 panel(PX,770,PW,850,t,0.6,(w,h)=>{
  if(!vr){grad('#5B1A1A','#A0522D',0,h);for(let i=0;i<4;i++)rr(40+i*270,0,60,h,0,'#D4A017',6);rr(w*0.25-170,h-520,340,430,30,K.gold,8);ravan(w*0.27,h-60,0.85,{mood:'angry'});krishna(w*0.78,h-60,0.9,{arms:'bless',mood:'smile',flip:true});X.fillStyle='#7A0F18';X.fillRect(0,h-60,w,60);line(0,h-60,w,h-60,K.ink,7)}
  else{rays2(w/2,h*0.55,'#FFF2B3','#FFC94D',28,t);speed(w/2,h*0.55,w,h,t);for(let i=0;i<10;i++){let a=PI*(1.08+i*0.084)+Math.sin(t*2+i)*0.04,r=380;let ex=w/2+Math.cos(a)*r,ey=h*0.62+Math.sin(a)*r;limb(w/2,h*0.62,ex,ey,K.blue,30);circ(ex,ey,10,K.gold,4);krishnaItem(i,ex+Math.cos(a)*40,ey+Math.sin(a)*40)}krishna(w/2,h+430,1.5,{arms:'bless',mood:'smile'});
   let fl=1-ss(7.6,8.2,t);if(fl>0){X.fillStyle=`rgba(255,255,255,${fl})`;X.fillRect(0,0,w,h)}}});
 bubble('म कसैको कुरा मान्दिनँ!',420,900,330,1150,4.6,7.6,t,'रावण',54);
 caption('अनि देखाउँथे — विश्वरूप!',PX+20,790,PW-40,7.7,12,t,52);
 burst('झलल!',830,1450,110,7.8,10.5,t,K.yel,K.red,84,0.1);
}
function krishnaItem(i,x,y){let k=i%4;if(k===0){circ(x,y,34,K.gold,6);for(let j=0;j<8;j++){let a=j*PI/4;line(x,y,x+Math.cos(a)*30,y+Math.sin(a)*30,K.ink,4)}circ(x,y,10,K.red,3)}else if(k===1){ell(x,y,22,34,'#FFF8EC',6,0.5);X.beginPath();X.arc(x,y,14,0,PI*1.5);ol(4);X.stroke()}else if(k===2){for(let j=0;j<5;j++){X.save();X.translate(x,y);X.rotate(j*PI/5-PI/2.5);ell(0,-18,10,22,'#F78FB3',4);X.restore()}}else{line(x-20,y+30,x+10,y-20,'#7A4A1A',10);circ(x+14,y-28,18,K.gold,5)}}
function c5(t){page();
 panel(PX,170,PW,1000,t,0,(w,h)=>{grad('#FFB067','#FFE1B8',0,h);speed(w*0.2,h*0.6,w,h,t,'rgba(120,60,20,0.25)');X.fillStyle='#C99A5B';X.fillRect(0,h-120,w,120);line(0,h-120,w,h-120,K.ink,7);
  chariot(w*0.6,h-60,0.95,t);krishna(w*0.6+20,h-260,0.62,{arms:'reins',mood:'smile'});flagH(w*0.6+190,h-60-720,0.9,t)});
 caption('युद्धमा कृष्णजी हतियार उठाउँदैनथे — सारथि बन्थे।',PX+20,190,PW-40,0.3,4.3,t);
 panel(PX,1210,PW,410,t,4.4,(w,h)=>{rays2(w/2,h/2,'#FFD27A','#FFB347',20,t);line(w*0.3,h*0.3,w*0.3,h+20,'#6B3E1F',16);flagH(w*0.3,h*0.3,1.55,t)});
 caption('र रथको ध्वजामा — हनुमानजी!',PX+20,1230,PW-40,4.5,7.3,t);
 if(t>7.3){panel(560,700,460,500,t,7.3,(w,h)=>{rays2(w/2,h,'#FFE08A','#FFC04D',16,t);hanuman(w/2-30,h+170,0.72,{})},{tilt:0.03})}
 bubble('प्रभु, रूप जुनसुकै होस् — तपाईं त मेरै राम!',470,520,700,760,7.4,12,t,'हनुमान',50);
}
function c6(t){page();let u=t>4.6;
 panel(PX,170,465,1120,t,0,(w,h)=>{grad('#8FC3E8','#E2F1FB',0,h);ram(w/2,h+70,0.95,{mood:'calm'});rr(20,h-130,w-40,100,10,'#FFFFFF',6);txt('मर्यादा पुरुषोत्तम',w/2,h-78,46,K.blueD,{stroke:0,f:'Mukta'})});
 panel(PX+495,170,465,1120,t,0.15,(w,h)=>{grad('#F7D774','#FFF5D1',0,h);krishna(w/2,h+70,0.95,{arms:'flute',mood:'smile'});rr(20,h-130,w-40,100,10,'#FFFFFF',6);txt('लीला पुरुषोत्तम',w/2,h-78,46,K.red,{stroke:0,f:'Mukta'})});
 caption('राम — मर्यादा पुरुषोत्तम। कृष्ण — लीला पुरुषोत्तम।',PX+20,190,PW-40,0.3,4.5,t);
 if(u){let p=ss(4.6,5.2,t);X.save();X.translate(540,760);X.scale(p,p);X.rotate(t*1.5);circ(0,0,120,K.gold,8);for(let i=0;i<12;i++){X.rotate(PI/6);poly([-14,-120,14,-120,0,-175],K.saf,5)}circ(0,0,40,K.red,6);X.restore()}
 caption('दुवै एउटै — भगवान विष्णुका अवतार।',PX+20,190,PW-40,4.6,7.9,t);
 panel(PX,1330,PW,290,t,8.0,(w,h)=>{X.fillStyle=K.red;X.fillRect(0,0,w,h);X.fillStyle=halftone('rgba(255,255,255,0.15)','rgba(0,0,0,0)',20,5);X.fillRect(0,0,w,h);X.fillStyle='#fff';X.font='800 54px Mukta';X.textAlign='center';X.textBaseline='middle';X.fillText('तपाईंलाई कसको बाटो मन पर्छ?',w/2,h*0.36);X.fillStyle=K.yel;X.fillText('कमेन्टमा लेख्नुहोस्!',w/2,h*0.7)});
}
const DUR=[8,11,12,10,12,12,13],FN=[c0,c1,c2,c3,c4,c5,c6];
