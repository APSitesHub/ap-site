"use strict";(self.webpackChunkap_education=self.webpackChunkap_education||[]).push([[6803],{3245:(e,t,s)=>{s.r(t),s.d(t,{default:()=>y});var a=s(1488),n=s(5294),c=s(2605),r=s(8313),o=s(610),l=s(9527),i=s(1679),d=s(5984),u=s(2791),h=s(6710),m=s(1608),x=s(9901),p=s(5070),j=s(616),g=s(184);n.Z.defaults.baseURL="https://ap-server-8qi1.onrender.com";const y=()=>{const[e,t]=(0,u.useState)(!1),[s,y]=(0,u.useState)(!1),[S,f]=(0,u.useState)(!1),[b,w]=(0,u.useState)(""),[k,v]=(0,u.useState)(!1),[C,_]=(0,u.useState)(""),D=(0,u.useRef)(),[N,I]=(0,a.Z)(D),[O,Z]=(0,a.Z)(document.body),[L,R]=(0,u.useState)(!1),[z,W]=(0,u.useState)({}),[q,A]=(0,u.useState)(""),[E,F]=(0,u.useState)(""),[K,P]=(0,u.useState)(!1),[B,H]=(0,u.useState)([]);(0,u.useLayoutEffect)((()=>{(async()=>{try{const e=await n.Z.get("/");console.log(e.data)}catch(e){console.log(e)}})();(async()=>{try{R((e=>!0)),W((await n.Z.get("/links")).data)}catch(e){console.log(e)}finally{R((e=>!1))}})()}),[]);const Y=t=>{y((e=>!e)),w(e||S?e=>"kahoot":e=>"")},M=0===N&&O>Z?O-300:O-N,Q=e=>{e.preventDefault();const t=(0,d.x0)(8);F((e=>t)),localStorage.setItem("userName",q.trim()),localStorage.setItem("userID",t),P((e=>!e))},U=(0,u.useRef)(null);return(0,u.useEffect)((()=>{document.title="Deutsch B1 Speaking Club | AP Education",U.current=(0,m.io)("https://ap-chat-server.onrender.com/"),(e=>{const t=localStorage.getItem("userName");localStorage.getItem("userID")&&t&&P((e=>!0))})(),U.current.on("connected",((e,t)=>{console.log(e),console.log(t)}));return(async()=>{try{const e=(await n.Z.get("https://ap-chat-server.onrender.com/messages")).data.filter((e=>new Date(e.createdAt).getDate()===(new Date).getDate()));H((t=>e))}catch(e){console.log(e)}})(),U.current.on("message",(async e=>{await(async()=>{try{await n.Z.post("https://ap-chat-server.onrender.com/messages",e),H((t=>[...t,e]))}catch(t){console.log(t)}})()})),U.current.on("message:get",(async e=>{H((t=>[...t,e]))})),()=>{U.current.off("connected"),U.current.off("message"),U.current.disconnect()}}),[]),(0,g.jsx)(g.Fragment,{children:(void 0===z.trials_de||z.trials_de[0]<10)&&!L?(0,g.jsx)(j.r,{children:(0,g.jsxs)(j.Rq,{children:["\u041f\u043e\u043a\u0438 \u0449\u043e \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0456\u0457 \u0442\u0443\u0442 \u043d\u0435\u043c\u0430\u0454! ",(0,g.jsx)("br",{}),"\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435, \u0447\u0438 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e \u0432\u0438 \u0432\u043a\u0430\u0437\u0430\u043b\u0438 \u0430\u0434\u0440\u0435\u0441\u0443 \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0438 \u0430\u0431\u043e \u0441\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u0456\u0437\u043d\u0456\u0448\u0435."]})}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(j.QU,{style:{width:e&&O>Z?"".concat(M,"px"):"100%"},children:(0,g.jsxs)(c.C,{children:[L&&(0,g.jsx)(o.sb,{children:(0,g.jsx)(r.a,{})}),(0,g.jsxs)(j.c6,{children:[(0,g.jsx)(j.i1,{}),(0,g.jsx)(j.tW,{}),(0,g.jsx)(j.Rs,{className:k&&"sound"===C||k&&"live"===C?"animated":"",children:(0,g.jsx)(j.CO,{className:k&&"sound"===C||k&&"live"===C?"animated":""})}),(0,g.jsx)(j.$D,{className:k&&"quality"===C?"animated":"",children:(0,g.jsx)(j.hY,{className:k&&"quality"===C?"animated":""})}),(0,g.jsx)(h.Z,{playing:!0,muted:!0,controls:!0,config:{youtube:{playerVars:{rel:0}}},style:{display:"block",position:"absolute",top:0,left:0},width:"100%",height:"100vh",url:z.trials_de})]}),(0,g.jsxs)(j.KN,{children:[(0,g.jsx)(j.kd,{onClick:Y,className:k&&"kahoot_open"===C?"animated":"",children:(0,g.jsx)(j.ev,{})}),(0,g.jsx)(j.Ms,{onClick:()=>{t((e=>!e)),w(s||S?e=>"chat":e=>"")},className:k&&"chat_open"===C?"animated":"",children:(0,g.jsx)(j.DS,{})}),(0,g.jsx)(j.wH,{onClick:()=>{f((e=>!e)),_(""),w(s||e?e=>"support":e=>"")},children:(0,g.jsx)(j.RB,{})})]}),!z.trials_de||z.trials_de.includes("youtube")||z.trials_de.includes("youtu.be")?null:window.location.replace("https://us06web.zoom.us/j/82741629820?pwd=rcxZ1LE8HzIWpl8N7aRxpnmbDqQPnZ.1#success"),Z>O&&(0,g.jsx)(j.rW,{ref:D,className:e?"shown":"hidden",style:"chat"===b?{zIndex:"2"}:{zIndex:"1"},children:K?(0,g.jsx)(x.e,{socket:U.current,messages:B,isChatOpen:e}):(0,g.jsxs)(p._Y,{onSubmit:Q,children:[(0,g.jsx)(p.mD,{children:"AP Open Chat"}),(0,g.jsx)(p.bt,{htmlFor:"username",children:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0432\u0430\u0448\u0435 \u0456\u043c'\u044f \u0442\u0430 \u043f\u0440\u0456\u0437\u0432\u0438\u0449\u0435 \u043f\u043e\u0432\u043d\u0456\u0441\u0442\u044e"}),(0,g.jsx)(p._8,{type:"text",minLength:3,name:"username",id:"username",value:q,onChange:e=>A(e.target.value)}),(0,g.jsx)(p.bh,{children:"\u0413\u043e\u0442\u043e\u0432\u043e!"})]})}),(0,g.jsx)(l.M,{sectionWidth:O,sectionHeight:Z,isKahootOpen:s,isChatOpen:e,isOpenedLast:b}),(0,g.jsx)(i.B,{sectionWidth:O,isSupportOpen:S,isOpenedLast:b,handleSupport:e=>{_((t=>e)),k||v((e=>!e))},openKahoot:Y,isKahootOpen:s})]})}),O>=Z&&(0,g.jsx)(j.rW,{ref:D,className:e?"shown":"hidden",style:"chat"===b?{zIndex:"2"}:{zIndex:"1"},children:K?(0,g.jsx)(x.e,{socket:U.current,messages:B,isChatOpen:e}):(0,g.jsxs)(p._Y,{onSubmit:Q,children:[(0,g.jsx)(p.mD,{children:"AP Open Chat"}),(0,g.jsx)(p.bt,{htmlFor:"username",children:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0432\u0430\u0448\u0435 \u0456\u043c'\u044f \u0442\u0430 \u043f\u0440\u0456\u0437\u0432\u0438\u0449\u0435 \u043f\u043e\u0432\u043d\u0456\u0441\u0442\u044e"}),(0,g.jsx)(p._8,{type:"text",minLength:3,name:"username",id:"username",value:q,onChange:e=>A(e.target.value)}),(0,g.jsx)(p.bh,{children:"\u0413\u043e\u0442\u043e\u0432\u043e!"})]})})]})})}}}]);
//# sourceMappingURL=Deutsch Sprechclub B1 page.f80db26c.chunk.js.map