// Drawn exercise figures (side view) and drill diagrams (top-down).
// Colours come from CSS variables in index.css.
const RUN1={t:12,la:[50,-25],lb:[-20,-85],aa:[-45,40],ab:[50,110]},RUN2={t:12,la:[-20,-85],lb:[50,-25],aa:[50,110],ab:[-45,40]};
const WALK1={t:5,la:[25,5],lb:[-20,-30],aa:[-20,10],ab:[25,40]},WALK2={t:5,la:[-20,-30],lb:[25,5],aa:[25,40],ab:[-20,10]};
const K1={t:-5,lb:[8,-5],la:[-30,-100],aa:[-50,-20],ab:[60,40]},K2={t:-12,lb:[5,0],la:[55,35],aa:[40,20],ab:[-40,-20]};
const SQ={t:30,la:[75,-20],lb:[75,-20],aa:[80,80],ab:[80,80]},ST={};
const SETP={t:20,la:[35,-20],lb:[35,-20],aa:[40,100],ab:[40,100]};
const PLK={t:83,la:[-75,-75],lb:[-75,-75],aa:[0,90],ab:[0,90]};
const AF={t:75,la:[0,-90],lb:[0,-90],aa:[0,0],ab:[0,0]};
const BRA={t:-90,la:[120,60],lb:[120,60],aa:[90,90],ab:[90,90]},BRB={t:-110,la:[100,50],lb:[60,60],aa:[90,90],ab:[90,90]};
const HK={la:[85,0],lb:[-25,-90]};
const WALLB={k:'ball',a:[70,85],b:[107,85]},WALL={k:'wall'},GOAL={k:'goal'};
const fig=(a,b,props,o)=>Object.assign({a,b,props:props||[]},o||{});
const kickWall=fig(K1,K2,[WALL,WALLB],{x:-8});
const kickGoal=fig(K1,K2,[GOAL,{k:'ball',a:[62,85],b:[108,62]}],{x:-16});
const VIZ={
 wu:fig(RUN1,RUN2),
 p_wall:kickWall,p_wall1:kickWall,p_weak:kickWall,t_turn:kickWall,df_clr:fig(K1,K2,[WALL,{k:'ball',a:[62,85],b:[107,40]}],{x:-16}),s_wall:fig(K1,K2,[WALL,{k:'ball',a:[62,85],b:[107,66]}],{x:-16}),
 t_juggle:fig({la:[50,30],aa:[-30,-10],ab:[40,30]},{la:[15,5],aa:[-20,-5],ab:[30,20]},[{k:'ball',a:[76,74],b:[76,36]}],{x:-6}),
 t_air:fig({la:[80,-10],aa:[-30,-10],ab:[40,20]},{la:[60,0],aa:[-30,-10],ab:[40,20]},[{k:'ball',a:[76,58],b:[76,16]}],{x:-6}),
 s_fin:kickGoal,s_tf:kickGoal,s_long:kickGoal,s_vol:fig(K1,K2,[GOAL,{k:'ball',a:[64,70],b:[108,52]}],{x:-16}),
 h_self:fig({t:-10,la:[30,-25],lb:[30,-25],aa:[-30,30],ab:[-30,30]},{t:15,lift:12,la:[-10,-40],lb:[5,-20],aa:[40,90],ab:[40,90]},[WALL,{k:'ball',a:[72,12],b:[107,30]}],{x:-12}),
 h_jump:fig({t:-10,la:[30,-25],lb:[30,-25],aa:[-30,30],ab:[-30,30]},{t:15,lift:12,la:[-10,-40],lb:[5,-20],aa:[40,90],ab:[40,90]},[{k:'ball',a:[104,22],b:[72,10]}],{x:-10}),
 gk_hand:fig({t:5,la:[15,-10],lb:[15,-10],aa:[80,110],ab:[80,110]},{t:5,la:[20,-15],lb:[20,-15],aa:[70,95],ab:[70,95]},[WALL,{k:'ball',a:[82,42],b:[107,42]}],{x:-10}),
 gk_dive:fig(SETP,{t:85,la:[-80,-80],lb:[-70,-88],aa:[100,100],ab:[92,92]},[{k:'ball',a:[100,80],b:[100,80]}],{x:-22}),
 pl_sj:fig(SQ,{lift:14,aa:[170,170],ab:[170,170]}),
 pl_bj:fig(Object.assign({x:-22},SQ),{x:16,lift:12,t:20,la:[50,10],lb:[30,-30],aa:[150,150],ab:[150,150]}),
 pl_sk:fig({x:-16,t:15,la:[10,-15],lb:[-30,-80],aa:[40,60],ab:[-30,10]},{x:16,t:15,la:[-30,-80],lb:[10,-15],aa:[-30,10],ab:[40,60]}),
 pl_pogo:fig({aa:[15,60],ab:[15,60]},{lift:8,aa:[15,60],ab:[15,60]}),
 pl_rope:fig({aa:[10,70],ab:[10,70]},{lift:6,aa:[10,70],ab:[10,70]}),
 lo_sq:fig(ST,SQ),
 lo_gob:fig({aa:[25,150],ab:[25,150]},{t:25,la:[75,-20],lb:[75,-20],aa:[25,150],ab:[25,150]},[],{wt:1}),
 lo_back:fig({aa:[40,165],ab:[40,165]},{t:35,la:[75,-20],lb:[75,-20],aa:[40,165],ab:[40,165]},[],{bar:1}),
 lo_split:fig({la:[10,0],lb:[-30,-70]},{t:10,la:[70,0],lb:[-20,-95]},[{k:'box',x:14,w:22,h:15}],{x:4}),
 lo_lunge:fig({la:[15,0],lb:[-15,-25]},{t:5,la:[70,0],lb:[-20,-90]}),
 lo_step:fig({t:10,la:[80,0],lb:[0,0]},{x:18,lift:16.5,la:[0,0],lb:[-20,-30]},[{k:'box',x:60,w:26,h:16.5}],{x:-12}),
 lo_calf:fig(ST,{lift:6}),
 po_bridge:fig(BRA,BRB,[],{x:-8}),po_thrust:fig(BRA,Object.assign({},BRB,{lb:[100,50]}),[],{x:-8}),
 po_nord:fig({la:[0,-90],lb:[0,-90],aa:[40,130],ab:[40,130]},{t:50,la:[-50,-90],lb:[-50,-90],aa:[60,120],ab:[60,120]},[],{x:-8}),
 po_rdl:fig(ST,{t:75,la:[-10,5],lb:[-10,5]},[],{wt:1}),
 po_sl:fig(ST,{t:80,la:[0,0],lb:[-85,-85]}),
 po_swing:fig({t:55,la:[20,-15],lb:[20,-15],aa:[-20,-20],ab:[-20,-20]},{aa:[90,90],ab:[90,90]},[],{wt:1}),
 up_push:fig({t:72,la:[-62,-62],lb:[-62,-62]},{t:85,la:[-72,-72],lb:[-72,-72],aa:[-70,20],ab:[-70,20]},[],{x:-6}),
 up_pull:fig({lift:4,aa:[180,180],ab:[180,180],la:[5,-20],lb:[5,-20]},{lift:23,aa:[100,-140],ab:[100,-140],la:[5,-20],lb:[5,-20]},[{k:'rail',y:-8}]),
 up_row:fig({t:70,la:[10,-10],lb:[10,-10]},{t:70,la:[10,-10],lb:[10,-10],aa:[-60,30]},[],{wt:1}),
 up_brow:fig({aa:[90,90],ab:[90,90]},{aa:[-30,90],ab:[-30,90]},[{k:'band'}]),
 up_press:fig({aa:[40,170],ab:[40,170]},{aa:[180,180],ab:[180,180]},[],{wt:1}),
 up_bench:fig({t:-90,la:[80,0],lb:[80,0],aa:[100,180],ab:[100,180]},{t:-90,la:[80,0],lb:[80,0],aa:[180,180],ab:[180,180]},[{k:'box',x:28,w:36,h:21}],{wt:1}),
 co_plank:fig(PLK,PLK,[],{x:-4}),
 co_side:fig(Object.assign({},PLK,{ab:[180,180]}),Object.assign({},PLK,{ab:[170,170],lift:1}),[],{x:-4}),
 co_dead:fig({t:-90,la:[180,90],lb:[180,90],aa:[180,180],ab:[180,180]},{t:-90,la:[180,90],lb:[98,98],aa:[180,180],ab:[-100,-100]},[],{x:6}),
 co_bird:fig(AF,Object.assign({},AF,{lb:[-90,-90],ab:[90,90]}),[],{x:-4}),
 co_pal:fig({aa:[30,150],ab:[30,150]},{aa:[90,90],ab:[90,90]},[{k:'band'}]),
 co_leg:fig({t:-90,la:[100,100],lb:[100,100],aa:[90,90],ab:[90,90]},{t:-90,la:[175,175],lb:[175,175],aa:[90,90],ab:[90,90]},[],{x:-6}),
 en_44:fig(RUN1,RUN2),en_tempo:fig(RUN1,RUN2),
 en_bike:fig({lift:16,t:35,la:[70,10],lb:[30,-30],aa:[70,90],ab:[70,90]},{lift:16,t:35,la:[30,-30],lb:[70,10],aa:[70,90],ab:[70,90]},[{k:'wheels'}]),
 en_walk:fig(WALK1,WALK2),re_jog:fig(WALK1,WALK2),
 re_foam:fig({x:-6,t:-50,la:[95,95],lb:[95,95],aa:[-20,0],ab:[-20,0]},{x:6,t:-50,la:[95,95],lb:[95,95],aa:[-20,0],ab:[-20,0]},[{k:'roller',x:80}]),
 mo_9090:fig({t:-5,la:[100,-80],lb:[80,-100],aa:[-30,-10],ab:[-30,-10]},{t:12,la:[80,-100],lb:[100,-80],aa:[60,80],ab:[60,80]}),
 mo_wgs:fig({t:60,la:[75,0],lb:[-30,-75]},{t:60,la:[75,0],lb:[-30,-75],ab:[170,170]},[],{x:-6}),
 mo_ank:fig(HK,{la:[70,-25],lb:[-30,-90]},[WALL],{x:8}),
 mo_tsp:fig(AF,Object.assign({},AF,{ab:[160,160]}),[],{x:-4}),
 mo_sw:fig({la:[55,45],aa:[90,90]},{la:[-35,-55],aa:[90,90]},[WALL],{x:24}),
 st_ham:fig({t:10,la:[90,90],lb:[90,90],aa:[60,80],ab:[60,80]},{t:55,la:[90,90],lb:[90,90],aa:[75,88],ab:[75,88]},[],{x:-14}),
 st_quad:fig(HK,{x:5,t:-6,la:[72,-12],lb:[-36,-90],aa:[150,170],ab:[150,170]}),
 st_gro:fig({t:5,la:[100,-80],lb:[100,-80],aa:[40,80],ab:[40,80]},{t:32,la:[100,-80],lb:[100,-80],aa:[40,80],ab:[40,80]}),
 st_calf:fig({t:15,la:[35,-15],lb:[-30,-30],aa:[95,95],ab:[95,95]},{t:22,la:[45,-20],lb:[-36,-36],aa:[95,95],ab:[95,95]},[WALL],{x:16}),
 st_glu:fig({t:-90,la:[150,70],lb:[130,30],aa:[90,90],ab:[90,90]},{t:-90,la:[165,80],lb:[150,40],aa:[130,150],ab:[130,150]}),
 st_back:fig({t:20,la:[90,-90],lb:[90,-90],aa:[30,60],ab:[30,60]},{t:85,la:[90,-90],lb:[90,-90],aa:[95,95],ab:[95,95]},[],{x:-14})
};
VIZ.lo_gobk=VIZ.lo_gob;VIZ.po_rdlb=VIZ.po_rdl;VIZ.co_cop=VIZ.co_side;
const DRILL={
 d_cones:{c:[[20,48],[31,48],[42,48],[53,48],[64,48],[75,48],[86,48],[97,48]],p:[[10,48],[25.5,40],[36.5,56],[47.5,40],[58.5,56],[69.5,40],[80.5,56],[91.5,40],[108,48]],ball:1},
 d_11:{c:[[60,48]],p:[[12,48],[50,48],[57,37],[68,42],[108,42]],ball:1},
 d_speed:{c:[[14,48],[106,48]],p:[[14,42],[106,42],[106,54],[14,54]],ball:1,l:[[60,32,'20 m']]},
 d_box:{c:[[32,18],[88,18],[88,74],[32,74]],p:[[40,64],[60,28],[78,58],[50,48],[76,32],[44,34],[40,64]],ball:1,l:[[60,90,'5 m square']]},
 p_gates:{c:[[22,22],[32,22],[70,18],[80,18],[90,50],[100,50],[50,72],[60,72],[18,56],[28,56]],p:[[27,34],[27,22],[75,18],[95,50],[55,72],[23,56],[27,34]],ballOnly:1},
 p_tri:{c:[[60,14],[22,76],[98,76]],p:[[60,22],[30,70],[90,70],[60,22]],ball:1,l:[[60,90,'8 m sides']]},
 p_cross:{goal:1,c:[[94,40],[94,56]],p:[[8,84],[84,84],[102,48]],ball:1},
 p_long:{sq:[[84,34,22,28]],c:[[14,48]],p:[[18,48],[95,48]],ballOnly:1,l:[[52,40,'25 to 35 m']]},
 t_box:{wall:1,c:[[50,50],[70,50],[70,70],[50,70]],p:[[60,60],[60,12],[60,60],[92,64]],ball:1},
 t_dir:{wall:1,c:[[26,56],[36,56],[84,56],[94,56]],p:[[60,64],[60,12],[60,64],[31,46],[60,64],[60,12],[60,64],[89,46]],ball:1},
 df_jock:{c:[[22,28],[42,68],[62,28],[82,68],[102,28]],p:[[22,36],[42,60],[62,36],[82,60],[102,36]]},
 df_rec:{c:[[20,48],[42,48],[106,48]],p:[[42,48],[20,48],[106,48]],l:[[30,36,'back'],[76,36,'turn, sprint']]},
 df_11:{c:[[20,28],[100,28],[20,68],[100,68]],p:[[96,48],[56,48],[46,58]],l:[[60,86,'10 m channel']]},
 df_press:{c:[[94,48]],p:[[12,48],[70,48],[86,48]],l:[[48,36,'sprint, then chop']]},
 sp_acc:{c:[[20,48],[100,48]],p:[[20,48],[100,48]],l:[[60,36,'full effort']]},
 sp_fly:{c:[[14,48],[56,48],[104,48]],p:[[14,48],[104,48]],l:[[35,36,'build up'],[80,36,'top speed']]},
 sp_react:{c:[[34,48],[86,48]],p:[[34,48],[86,48]],l:[[60,36,'5 to 10 m']]},
 sp_rsa:{c:[[16,48],[104,48]],p:[[16,42],[104,42],[104,54],[16,54]],l:[[60,32,'sprint'],[60,70,'jog back']]},
 ag_505:{c:[[20,48],[60,48],[100,48]],p:[[60,42],[100,42],[100,54],[20,54],[20,42],[60,42]],l:[[40,32,'5 m'],[80,32,'5 m']]},
 ag_t:{c:[[60,88],[60,24],[22,24],[98,24]],p:[[60,82],[60,32],[26,32],[94,32],[60,32],[60,82]]},
 ag_lad:{ladder:1,p:[[8,48],[112,48]]},
 ag_zig:{c:[[18,64],[36,32],[54,64],[72,32],[90,64],[108,32]],p:[[8,58],[18,56],[36,40],[54,56],[72,40],[90,56],[108,40]]},
 en_1515:{c:[[14,48],[106,48]],p:[[14,48],[106,48]],l:[[60,36,'15 s hard'],[60,66,'15 s rest']]},
 en_ball:{c:[[20,20],[100,20],[100,76],[20,76],[45,76],[60,76],[75,76]],p:[[20,28],[94,28],[94,68],[80,68],[75,84],[67,68],[60,84],[52,68],[45,84],[36,68],[26,68],[20,28]],ball:1},
 gk_foot:{goal:1,c:[[20,48],[32,48],[44,48],[56,48],[68,48],[80,48]],p:[[14,42],[26,54],[38,42],[50,54],[62,42],[74,54],[98,48]]},
 gk_dist:{sq:[[44,40,14,18],[68,40,14,18],[92,40,14,18]],p:[[10,49],[99,49]],ballOnly:1,l:[[51,34,'20'],[75,34,'30'],[99,34,'40 m']]}
};
function lerpPose(a,b,u){
  const g=(o,k,i)=>{const v=o[k];return v==null?0:(i==null?v:v[i]);},L=(x,y)=>x+(y-x)*u;
  const o={t:L(g(a,'t'),g(b,'t')),x:L(g(a,'x'),g(b,'x')),lift:L(g(a,'lift'),g(b,'lift'))};
  for(const k of ['la','lb','aa','ab'])o[k]=[L(g(a,k,0),g(b,k,0)),L(g(a,k,1),g(b,k,1))];
  return o;
}
function joints(p,ox){
  const R=Math.PI/180,v=(a,l)=>[Math.sin(a*R)*l,Math.cos(a*R)*l];
  const add=(p1,d)=>[p1[0]+d[0],p1[1]+d[1]];
  const hip=[0,0],tv=[Math.sin(p.t*R),-Math.cos(p.t*R)];
  const neck=[tv[0]*26,tv[1]*26],head=[tv[0]*34,tv[1]*34];
  const ka=add(hip,v(p.la[0],20)),fa=add(ka,v(p.la[1],20)),kb=add(hip,v(p.lb[0],20)),fb=add(kb,v(p.lb[1],20));
  const ea=add(neck,v(p.aa[0],14)),ha=add(ea,v(p.aa[1],13)),eb=add(neck,v(p.ab[0],14)),hb=add(eb,v(p.ab[1],13));
  const J={hip,neck,head,ka,fa,kb,fb,ea,ha,eb,hb};
  let my=-1e9;for(const k in J)my=Math.max(my,J[k][1]+(k==='head'?6:0));
  const dx=60+(ox||0)+p.x,dy=88-p.lift-my;
  for(const k in J)J[k]=[J[k][0]+dx,J[k][1]+dy];
  return J;
}
function figBody(J,op){
  const f=n=>n.toFixed(1),ln=(a,b,c,far)=>'<path d="M'+f(a[0])+' '+f(a[1])+' L'+f(b[0])+' '+f(b[1])+' L'+f(c[0])+' '+f(c[1])+'" fill="none" stroke="var('+(far?'--muted':'--ink')+')" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"'+(far?' opacity=".55"':'')+'/>';
  return '<g opacity="'+op+'">'+ln(J.hip,J.kb,J.fb,1)+ln(J.neck,J.eb,J.hb,1)+
   '<path d="M'+f(J.hip[0])+' '+f(J.hip[1])+' L'+f(J.neck[0])+' '+f(J.neck[1])+'" stroke="var(--ink)" stroke-width="4" stroke-linecap="round"/>'+
   ln(J.hip,J.ka,J.fa)+ln(J.neck,J.ea,J.ha)+'<circle cx="'+f(J.head[0])+'" cy="'+f(J.head[1])+'" r="6" fill="var(--surface)" stroke="var(--ink)" stroke-width="2.6"/></g>';
}
function figSVG(V,u,stat){
  let h='<line x1="4" x2="116" y1="89.5" y2="89.5" stroke="var(--line)" stroke-width="2"/><g transform="translate(60 89.5) scale(.8) translate(-60 -89.5)">';
  for(const pr of V.props){
    if(pr.k==='wall')h+='<rect x="110" y="18" width="6" height="71" fill="var(--muted)" opacity=".5"/>';
    else if(pr.k==='goal')h+='<path d="M112 89 V42 H118" fill="none" stroke="var(--muted)" stroke-width="2.5"/>';
    else if(pr.k==='box')h+='<rect x="'+pr.x+'" y="'+(89-pr.h)+'" width="'+pr.w+'" height="'+pr.h+'" rx="2" fill="var(--soft)" stroke="var(--muted)" stroke-width="1.5"/>';
    else if(pr.k==='rail')h+='<line x1="38" x2="82" y1="'+pr.y+'" y2="'+pr.y+'" stroke="var(--accent)" stroke-width="3.5" stroke-linecap="round"/>';
    else if(pr.k==='roller')h+='<circle cx="'+pr.x+'" cy="83.5" r="5.5" fill="var(--accent)" opacity=".8"/>';
    else if(pr.k==='wheels')h+='<circle cx="40" cy="78" r="10" fill="none" stroke="var(--muted)" stroke-width="2"/><circle cx="84" cy="78" r="10" fill="none" stroke="var(--muted)" stroke-width="2"/><path d="M40 78 L60 72 L84 78" fill="none" stroke="var(--muted)" stroke-width="2"/>';
  }
  const pa=Object.assign({t:0,x:0,lift:0},V.a),pb=Object.assign({t:0,x:0,lift:0},V.b);
  if(stat)h+=figBody(joints(lerpPose(pa,pb,0),V.x),.28);
  const J=joints(lerpPose(pa,pb,u),V.x);
  for(const pr of V.props)if(pr.k==='band')h+='<path d="M6 '+J.neck[1].toFixed(1)+' L'+J.ha[0].toFixed(1)+' '+J.ha[1].toFixed(1)+'" stroke="var(--accent)" stroke-width="2" stroke-dasharray="3 2"/>';
  h+=figBody(J,1);
  if(V.wt)h+='<rect x="'+(J.ha[0]-5).toFixed(1)+'" y="'+(J.ha[1]-2.5).toFixed(1)+'" width="10" height="5" rx="2" fill="var(--accent)"/>';
  if(V.bar)h+='<circle cx="'+(J.neck[0]-3).toFixed(1)+'" cy="'+(J.neck[1]+1).toFixed(1)+'" r="5" fill="var(--accent)"/>';
  for(const pr of V.props)if(pr.k==='ball'){const x=pr.a[0]+(pr.b[0]-pr.a[0])*u,y=pr.a[1]+(pr.b[1]-pr.a[1])*u;h+='<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="4" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.8"/>';}
  return h+'</g>';
}
function along(p,u){
  let tot=0;const seg=[];for(let i=1;i<p.length;i++){const l=Math.hypot(p[i][0]-p[i-1][0],p[i][1]-p[i-1][1]);seg.push(l);tot+=l;}
  let d=u*tot;for(let i=0;i<seg.length;i++){if(d<=seg[i]||i===seg.length-1){const r=seg[i]?Math.min(1,d/seg[i]):0;return [p[i][0]+(p[i+1][0]-p[i][0])*r,p[i][1]+(p[i+1][1]-p[i][1])*r];}d-=seg[i];}
  return p[0];
}
function drillSVG(D,ph,stat){
  let h='<rect x="1" y="1" width="118" height="94" rx="8" fill="var(--pitch)" opacity=".12"/>';
  if(D.wall)h+='<rect x="12" y="4" width="96" height="5" fill="var(--muted)" opacity=".6"/>';
  if(D.goal)h+='<path d="M118 34 H111 V62 H118" fill="none" stroke="var(--ink)" stroke-width="2"/>';
  if(D.ladder){for(let x=20;x<100;x+=10)h+='<rect x="'+x+'" y="41" width="10" height="14" fill="none" stroke="var(--muted)" stroke-width="1.5"/>';}
  for(const s of D.sq||[])h+='<rect x="'+s[0]+'" y="'+s[1]+'" width="'+s[2]+'" height="'+s[3]+'" fill="none" stroke="var(--accent)" stroke-width="1.5" stroke-dasharray="3 2"/>';
  const p=D.p,n=p.length,a=p[n-2],b=p[n-1],ang=Math.atan2(b[1]-a[1],b[0]-a[0])*180/Math.PI;
  h+='<polyline points="'+p.map(q=>q.join(',')).join(' ')+'" fill="none" stroke="var(--muted)" stroke-width="1.6" stroke-dasharray="4 3" stroke-linejoin="round"/>'+
     '<path d="M0 -3.5 L7 0 L0 3.5 Z" fill="var(--muted)" transform="translate('+b[0]+' '+b[1]+') rotate('+ang.toFixed(1)+')"/>';
  for(const c of D.c||[])h+='<path d="M'+(c[0]-3.5)+' '+(c[1]+3)+' L'+c[0]+' '+(c[1]-4)+' L'+(c[0]+3.5)+' '+(c[1]+3)+' Z" fill="var(--accent)"/>';
  for(const l of D.l||[])h+='<text x="'+l[0]+'" y="'+l[1]+'" font-size="8" text-anchor="middle" fill="var(--muted)" font-family="var(--body)" font-weight="600">'+l[2]+'</text>';
  const q=along(p,stat?0:ph);
  if(D.ballOnly)h+='<circle cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="3.6" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.6"/>';
  else{h+='<circle cx="'+q[0].toFixed(1)+'" cy="'+q[1].toFixed(1)+'" r="4.6" fill="var(--ink)"/>';
    if(D.ball)h+='<circle cx="'+(q[0]+5).toFixed(1)+'" cy="'+(q[1]+4).toFixed(1)+'" r="2.6" fill="var(--surface)" stroke="var(--ink)" stroke-width="1.3"/>';}
  return h;
}
export function vizInner(id,ph,stat){
  if(DRILL[id])return drillSVG(DRILL[id],ph,stat);
  const V=VIZ[id];if(!V)return '';
  return figSVG(V,stat?1:.5-.5*Math.cos(ph*2*Math.PI),stat);
}
export const isDrill=id=>!!DRILL[id];
export const period=id=>DRILL[id]?(DRILL[id].p.length>4?5200:3200):2400;
