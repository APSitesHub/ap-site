"use strict";(self.webpackChunkap_education=self.webpackChunkap_education||[]).push([[8036],{5799:(e,t,s)=>{s.r(t),s.d(t,{default:()=>y});var a=s(1488),n=s(5294),c=s(2605),r=s(8313),o=s(610),l=s(9527),i=s(1679),d=s(5984),u=s(2791),h=s(6710),m=s(1608),x=s(9901),p=s(5070),j=s(616),g=s(184);n.Z.defaults.baseURL="https://ap-server-8qi1.onrender.com";const y=()=>{const[e,t]=(0,u.useState)(!1),[s,y]=(0,u.useState)(!1),[S,f]=(0,u.useState)(!1),[b,w]=(0,u.useState)(""),[k,v]=(0,u.useState)(!1),[C,_]=(0,u.useState)(""),D=(0,u.useRef)(),[N,O]=(0,a.Z)(D),[I,R]=(0,a.Z)(document.body),[Z,L]=(0,u.useState)(!1),[W,q]=(0,u.useState)({}),[z,K]=(0,u.useState)(""),[A,F]=(0,u.useState)(""),[P,Y]=(0,u.useState)(!1),[B,E]=(0,u.useState)([]);(0,u.useLayoutEffect)((()=>{(async()=>{try{const e=await n.Z.get("/");console.log(e.data)}catch(e){console.log(e)}})();(async()=>{try{L((e=>!0)),q((await n.Z.get("/links")).data)}catch(e){console.log(e)}finally{L((e=>!1))}})()}),[]);const H=t=>{y((e=>!e)),w(e||S?e=>"kahoot":e=>"")},M=0===N&&I>R?I-300:I-N,U=e=>{e.preventDefault();const t=(0,d.x0)(8);F((e=>t)),localStorage.setItem("userName",z.trim()),localStorage.setItem("userID",t),Y((e=>!e))},Q=(0,u.useRef)(null);return(0,u.useEffect)((()=>{document.title="B2 Speaking Club | AP Education",Q.current=(0,m.io)("https://ap-chat-server.onrender.com/"),(e=>{const t=localStorage.getItem("userName");localStorage.getItem("userID")&&t&&Y((e=>!0))})(),Q.current.on("connected",((e,t)=>{console.log(e),console.log(t)}));return(async()=>{try{const e=(await n.Z.get("https://ap-chat-server.onrender.com/messages")).data.filter((e=>new Date(e.createdAt).getDate()===(new Date).getDate()));E((t=>e))}catch(e){console.log(e)}})(),Q.current.on("message",(async e=>{await(async()=>{try{await n.Z.post("https://ap-chat-server.onrender.com/messages",e),E((t=>[...t,e]))}catch(t){console.log(t)}})()})),Q.current.on("message:get",(async e=>{E((t=>[...t,e]))})),()=>{Q.current.off("connected"),Q.current.off("message"),Q.current.disconnect()}}),[]),(0,g.jsx)(g.Fragment,{children:(void 0===W.trials_de||W.trials_de[0]<10)&&!Z?(0,g.jsx)(j.r,{children:(0,g.jsxs)(j.Rq,{children:["\u041f\u043e\u043a\u0438 \u0449\u043e \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0456\u0457 \u0442\u0443\u0442 \u043d\u0435\u043c\u0430\u0454! ",(0,g.jsx)("br",{}),"\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435, \u0447\u0438 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e \u0432\u0438 \u0432\u043a\u0430\u0437\u0430\u043b\u0438 \u0430\u0434\u0440\u0435\u0441\u0443 \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0438 \u0430\u0431\u043e \u0441\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u0456\u0437\u043d\u0456\u0448\u0435."]})}):(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(j.QU,{style:{width:e&&I>R?"".concat(M,"px"):"100%"},children:(0,g.jsxs)(c.C,{children:[Z&&(0,g.jsx)(o.s,{children:(0,g.jsx)(r.a,{})}),(0,g.jsxs)(j.c6,{children:[(0,g.jsx)(j.i1,{}),(0,g.jsx)(j.tW,{}),(0,g.jsx)(j.Rs,{className:k&&"sound"===C||k&&"live"===C?"animated":"",children:(0,g.jsx)(j.CO,{className:k&&"sound"===C||k&&"live"===C?"animated":""})}),(0,g.jsx)(j.$D,{className:k&&"quality"===C?"animated":"",children:(0,g.jsx)(j.hY,{className:k&&"quality"===C?"animated":""})}),(0,g.jsx)(h.Z,{playing:!0,muted:!0,controls:!0,config:{youtube:{playerVars:{rel:0}}},style:{display:"block",position:"absolute",top:0,left:0},width:"100%",height:"100vh",url:W.trials_de})]}),(0,g.jsxs)(j.KN,{children:[(0,g.jsx)(j.kd,{onClick:H,className:k&&"kahoot_open"===C?"animated":"",children:(0,g.jsx)(j.ev,{})}),(0,g.jsx)(j.Ms,{onClick:()=>{t((e=>!e)),w(s||S?e=>"chat":e=>"")},className:k&&"chat_open"===C?"animated":"",children:(0,g.jsx)(j.DS,{})}),(0,g.jsx)(j.wH,{onClick:()=>{f((e=>!e)),_(""),w(s||e?e=>"support":e=>"")},children:(0,g.jsx)(j.RB,{})})]}),!W.trials_de||W.trials_de.includes("youtube")||W.trials_de.includes("youtu.be")?null:window.location.replace("https://us06web.zoom.us/j/85110373569?pwd=9uh82pP55jRsvk2YDHqd0RcKSnfWlk.1#success"),R>I&&(0,g.jsx)(j.rW,{ref:D,className:e?"shown":"hidden",style:"chat"===b?{zIndex:"2"}:{zIndex:"1"},children:P?(0,g.jsx)(x.e,{socket:Q.current,messages:B,isChatOpen:e}):(0,g.jsxs)(p._Y,{onSubmit:U,children:[(0,g.jsx)(p.mD,{children:"AP Open Chat"}),(0,g.jsx)(p.bt,{htmlFor:"username",children:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0432\u0430\u0448\u0435 \u0456\u043c'\u044f \u0442\u0430 \u043f\u0440\u0456\u0437\u0432\u0438\u0449\u0435 \u043f\u043e\u0432\u043d\u0456\u0441\u0442\u044e"}),(0,g.jsx)(p._8,{type:"text",minLength:3,name:"username",id:"username",value:z,onChange:e=>K(e.target.value)}),(0,g.jsx)(p.bh,{children:"\u0413\u043e\u0442\u043e\u0432\u043e!"})]})}),(0,g.jsx)(l.M,{sectionWidth:I,sectionHeight:R,isKahootOpen:s,isChatOpen:e,isOpenedLast:b}),(0,g.jsx)(i.B,{sectionWidth:I,isSupportOpen:S,isOpenedLast:b,handleSupport:e=>{_((t=>e)),k||v((e=>!e))},openKahoot:H,isKahootOpen:s})]})}),I>=R&&(0,g.jsx)(j.rW,{ref:D,className:e?"shown":"hidden",style:"chat"===b?{zIndex:"2"}:{zIndex:"1"},children:P?(0,g.jsx)(x.e,{socket:Q.current,messages:B,isChatOpen:e}):(0,g.jsxs)(p._Y,{onSubmit:U,children:[(0,g.jsx)(p.mD,{children:"AP Open Chat"}),(0,g.jsx)(p.bt,{htmlFor:"username",children:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0432\u0430\u0448\u0435 \u0456\u043c'\u044f \u0442\u0430 \u043f\u0440\u0456\u0437\u0432\u0438\u0449\u0435 \u043f\u043e\u0432\u043d\u0456\u0441\u0442\u044e"}),(0,g.jsx)(p._8,{type:"text",minLength:3,name:"username",id:"username",value:z,onChange:e=>K(e.target.value)}),(0,g.jsx)(p.bh,{children:"\u0413\u043e\u0442\u043e\u0432\u043e!"})]})})]})})}}}]);
//# sourceMappingURL=Speaking Club B2 page.2264ec83.chunk.js.map