"use strict";(self.webpackChunkap_education=self.webpackChunkap_education||[]).push([[9],{4430:(e,t,s)=>{s.r(t),s.d(t,{default:()=>y});var a=s(1488),n=s(5294),c=s(2605),l=s(8313),o=s(610),r=s(9527),i=s(2791),d=s(6710),u=s(616),h=s(1679),m=s(5070),p=s(9901),x=s(1608),g=s(5984),j=s(184);n.Z.defaults.baseURL="https://aggregator-server.onrender.com";const y=()=>{const[e,t]=(0,i.useState)(!1),[s,y]=(0,i.useState)(!1),[f,S]=(0,i.useState)(!1),[b,w]=(0,i.useState)(""),[k,_]=(0,i.useState)(!1),[C,v]=(0,i.useState)(""),D=(0,i.useRef)(),[N,O]=(0,a.Z)(D),[I,Z]=(0,a.Z)(document.body),[L,R]=(0,i.useState)(!1),[W,z]=(0,i.useState)({}),[A,F]=(0,i.useState)(""),[K,P]=(0,i.useState)(""),[q,E]=(0,i.useState)(!1),[Y,B]=(0,i.useState)([]);(0,i.useLayoutEffect)((()=>{(async()=>{try{const e=await n.Z.get("/");console.log(e.data)}catch(e){console.log(e)}})();(async()=>{try{R((e=>!0)),z((await n.Z.get("/links")).data)}catch(e){console.log(e)}finally{R((e=>!1))}})()}),[]);const H=t=>{y((e=>!e)),w(e||f?e=>"kahoot":e=>"")},M=0===N&&I>Z?I-300:I-N,U=e=>{e.preventDefault();const t=(0,g.x0)(8);P((e=>t)),localStorage.setItem("userName",A.trim()),localStorage.setItem("userID",t),E((e=>!e))},Q=(0,i.useRef)(null);return(0,i.useEffect)((()=>{document.title="Polski Trial | AP Education",Q.current=(0,x.io)("https://ap-chat.onrender.com/"),(e=>{const t=localStorage.getItem("userName");localStorage.getItem("userID")&&t&&E((e=>!0))})(),Q.current.on("connected",((e,t)=>{console.log(e),console.log(t)}));return(async()=>{try{const e=(await n.Z.get("https://ap-chat.onrender.com/messages")).data.filter((e=>new Date(e.createdAt).getDate()===(new Date).getDate()));B((t=>e))}catch(e){console.log(e)}})(),Q.current.on("message",(async e=>{await(async()=>{try{await n.Z.post("https://ap-chat.onrender.com/messages",e),B((t=>[...t,e]))}catch(t){console.log(t)}})()})),Q.current.on("message:get",(async e=>{B((t=>[...t,e]))})),()=>{Q.current.off("connected"),Q.current.off("message"),Q.current.disconnect()}}),[]),(0,j.jsx)(j.Fragment,{children:(void 0===W.trials_pl||W.trials_pl[0]<10)&&!L?(0,j.jsx)(u.r,{children:(0,j.jsxs)(u.Rq,{children:["\u041f\u043e\u043a\u0438 \u0449\u043e \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0456\u0457 \u0442\u0443\u0442 \u043d\u0435\u043c\u0430\u0454! ",(0,j.jsx)("br",{}),"\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435, \u0447\u0438 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e \u0432\u0438 \u0432\u043a\u0430\u0437\u0430\u043b\u0438 \u0430\u0434\u0440\u0435\u0441\u0443 \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0438 \u0430\u0431\u043e \u0441\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u0456\u0437\u043d\u0456\u0448\u0435."]})}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(u.QU,{style:{width:e&&I>Z?"".concat(M,"px"):"100%"},children:(0,j.jsxs)(c.C,{children:[L&&(0,j.jsx)(o.s,{children:(0,j.jsx)(l.a,{})}),(0,j.jsxs)(u.c6,{children:[(0,j.jsx)(u.i1,{}),(0,j.jsx)(u.tW,{}),(0,j.jsx)(u.Rs,{className:k&&"sound"===C||k&&"live"===C?"animated":"",children:(0,j.jsx)(u.CO,{className:k&&"sound"===C||k&&"live"===C?"animated":""})}),(0,j.jsx)(u.$D,{className:k&&"quality"===C?"animated":"",children:(0,j.jsx)(u.hY,{className:k&&"quality"===C?"animated":""})}),(0,j.jsx)(d.Z,{playing:!0,muted:!0,controls:!0,config:{youtube:{playerVars:{rel:0}}},style:{display:"block",position:"absolute",top:0,left:0},width:"100%",height:"100vh",url:W.trials_pl})]}),(0,j.jsxs)(u.KN,{children:[(0,j.jsx)(u.kd,{onClick:H,className:k&&"kahoot_open"===C?"animated":"",children:(0,j.jsx)(u.ev,{})}),(0,j.jsx)(u.Ms,{onClick:()=>{t((e=>!e)),w(s||f?e=>"chat":e=>"")},className:k&&"chat_open"===C?"animated":"",children:(0,j.jsx)(u.DS,{})}),(0,j.jsx)(u.wH,{onClick:()=>{S((e=>!e)),v(""),w(s||e?e=>"support":e=>"")},children:(0,j.jsx)(u.RB,{})})]}),!W.trials_pl||W.trials_pl.includes("youtube")||W.trials_pl.includes("youtu.be")?null:window.location.replace(W.trials_pl),Z>I&&(0,j.jsx)(u.rW,{ref:D,className:e?"shown":"hidden",style:"chat"===b?{zIndex:"2"}:{zIndex:"1"},children:q?(0,j.jsx)(p.e,{socket:Q.current,messages:Y,isChatOpen:e}):(0,j.jsxs)(m._Y,{onSubmit:U,children:[(0,j.jsx)(m.mD,{children:"AP Open Chat"}),(0,j.jsx)(m.bt,{htmlFor:"username",children:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0432\u0430\u0448\u0435 \u0456\u043c'\u044f \u0442\u0430 \u043f\u0440\u0456\u0437\u0432\u0438\u0449\u0435 \u043f\u043e\u0432\u043d\u0456\u0441\u0442\u044e"}),(0,j.jsx)(m._8,{type:"text",minLength:3,name:"username",id:"username",value:A,onChange:e=>F(e.target.value)}),(0,j.jsx)(m.bh,{children:"\u0413\u043e\u0442\u043e\u0432\u043e!"})]})}),(0,j.jsx)(r.M,{sectionWidth:I,sectionHeight:Z,isKahootOpen:s,isChatOpen:e,isOpenedLast:b}),(0,j.jsx)(h.B,{sectionWidth:I,isSupportOpen:f,isOpenedLast:b,handleSupport:e=>{v((t=>e)),k||_((e=>!e))},openKahoot:H,isKahootOpen:s})]})}),I>=Z&&(0,j.jsx)(u.rW,{ref:D,className:e?"shown":"hidden",style:"chat"===b?{zIndex:"2"}:{zIndex:"1"},children:q?(0,j.jsx)(p.e,{socket:Q.current,messages:Y,isChatOpen:e}):(0,j.jsxs)(m._Y,{onSubmit:U,children:[(0,j.jsx)(m.mD,{children:"AP Open Chat"}),(0,j.jsx)(m.bt,{htmlFor:"username",children:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0432\u0430\u0448\u0435 \u0456\u043c'\u044f \u0442\u0430 \u043f\u0440\u0456\u0437\u0432\u0438\u0449\u0435 \u043f\u043e\u0432\u043d\u0456\u0441\u0442\u044e"}),(0,j.jsx)(m._8,{type:"text",minLength:3,name:"username",id:"username",value:A,onChange:e=>F(e.target.value)}),(0,j.jsx)(m.bh,{children:"\u0413\u043e\u0442\u043e\u0432\u043e!"})]})})]})})}}}]);
//# sourceMappingURL=Polska trials page.22ecac5d.chunk.js.map