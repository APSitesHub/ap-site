"use strict";(self.webpackChunkap_education=self.webpackChunkap_education||[]).push([[9749],{5968:(e,t,s)=>{s.r(t),s.d(t,{default:()=>g});var a=s(1488),n=s(5294),c=s(2605),r=s(8313),o=s(610),l=s(1679),i=s(5984),d=s(2791),u=s(6710),h=s(1608),m=s(9901),x=s(5070),p=s(616),j=s(184);n.Z.defaults.baseURL="https://ap-server-8qi1.onrender.com";const g=()=>{const[e,t]=(0,d.useState)(!1),[s,g]=(0,d.useState)(!1),[y,S]=(0,d.useState)(!1),[f,w]=(0,d.useState)(""),[b,k]=(0,d.useState)(!1),[v,C]=(0,d.useState)(""),D=(0,d.useRef)(),[_,N]=(0,a.Z)(D),[I,O]=(0,a.Z)(document.body),[z,Z]=(0,d.useState)(!1),[L,R]=(0,d.useState)({}),[A,q]=(0,d.useState)(""),[F,K]=(0,d.useState)(""),[W,E]=(0,d.useState)(!1),[P,Y]=(0,d.useState)([]);(0,d.useLayoutEffect)((()=>{(async()=>{try{const e=await n.Z.get("/");console.log(e.data)}catch(e){console.log(e)}})();(async()=>{try{Z((e=>!0)),R((await n.Z.get("/links")).data)}catch(e){console.log(e)}finally{Z((e=>!1))}})()}),[]);const B=t=>{g((e=>!e)),w(e||y?e=>"kahoot":e=>"")},G=0===_&&I>O?I-300:I-_,H=e=>{e.preventDefault();const t=(0,i.x0)(8);K((e=>t)),localStorage.setItem("userName",A.trim()),localStorage.setItem("userID",t),E((e=>!e))},Q=(0,d.useRef)(null);return(0,d.useEffect)((()=>{document.title="A0 Kids Speaking Club | AP Education",Q.current=(0,h.io)("https://ap-chat-server.onrender.com/"),(e=>{const t=localStorage.getItem("userName");localStorage.getItem("userID")&&t&&E((e=>!0))})(),Q.current.on("connected",((e,t)=>{console.log(e),console.log(t)}));return(async()=>{try{const e=(await n.Z.get("https://ap-chat-server.onrender.com/messages")).data.filter((e=>new Date(e.createdAt).getDate()===(new Date).getDate()));Y((t=>e))}catch(e){console.log(e)}})(),Q.current.on("message",(async e=>{await(async()=>{try{await n.Z.post("https://ap-chat-server.onrender.com/messages",e),Y((t=>[...t,e]))}catch(t){console.log(t)}})()})),Q.current.on("message:get",(async e=>{Y((t=>[...t,e]))})),()=>{Q.current.off("connected"),Q.current.off("message"),Q.current.disconnect()}}),[]),(0,j.jsx)(j.Fragment,{children:(void 0===L.trials_de||L.trials_de[0]<10)&&!z?(0,j.jsx)(p.r,{children:(0,j.jsxs)(p.Rq,{children:["\u041f\u043e\u043a\u0438 \u0449\u043e \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0456\u0457 \u0442\u0443\u0442 \u043d\u0435\u043c\u0430\u0454! ",(0,j.jsx)("br",{}),"\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435, \u0447\u0438 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e \u0432\u0438 \u0432\u043a\u0430\u0437\u0430\u043b\u0438 \u0430\u0434\u0440\u0435\u0441\u0443 \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0438 \u0430\u0431\u043e \u0441\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u0456\u0437\u043d\u0456\u0448\u0435."]})}):(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(p.QU,{style:{width:e&&I>O?"".concat(G,"px"):"100%"},children:(0,j.jsxs)(c.C,{children:[z&&(0,j.jsx)(o.s,{children:(0,j.jsx)(r.a,{})}),(0,j.jsxs)(p.c6,{children:[(0,j.jsx)(p.i1,{}),(0,j.jsx)(p.tW,{}),(0,j.jsx)(p.Rs,{className:b&&"sound"===v||b&&"live"===v?"animated":"",children:(0,j.jsx)(p.CO,{className:b&&"sound"===v||b&&"live"===v?"animated":""})}),(0,j.jsx)(p.$D,{className:b&&"quality"===v?"animated":"",children:(0,j.jsx)(p.hY,{className:b&&"quality"===v?"animated":""})}),(0,j.jsx)(u.Z,{playing:!0,muted:!0,controls:!0,config:{youtube:{playerVars:{rel:0}}},style:{display:"block",position:"absolute",top:0,left:0},width:"100%",height:"100vh",url:L.trials_de})]}),(0,j.jsxs)(p.KN,{children:[(0,j.jsx)(p.kd,{onClick:B,className:b&&"kahoot_open"===v?"animated":"",children:(0,j.jsx)(p.ev,{})}),(0,j.jsx)(p.Ms,{onClick:()=>{t((e=>!e)),w(s||y?e=>"chat":e=>"")},className:b&&"chat_open"===v?"animated":"",children:(0,j.jsx)(p.DS,{})}),(0,j.jsx)(p.wH,{onClick:()=>{S((e=>!e)),C(""),w(s||e?e=>"support":e=>"")},children:(0,j.jsx)(p.RB,{})})]}),!L.trials_de||L.trials_de.includes("youtube")||L.trials_de.includes("youtu.be")?null:window.location.replace("https://us06web.zoom.us/j/87176543940?pwd=gtGmDaz09OHDhmjQ4wDTGzzyh6usLp.1#success"),O>I&&(0,j.jsx)(p.rW,{ref:D,className:e?"shown":"hidden",style:"chat"===f?{zIndex:"2"}:{zIndex:"1"},children:W?(0,j.jsx)(m.e,{socket:Q.current,messages:P,isChatOpen:e}):(0,j.jsxs)(x._Y,{onSubmit:H,children:[(0,j.jsx)(x.mD,{children:"AP Open Chat"}),(0,j.jsx)(x.bt,{htmlFor:"username",children:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0432\u0430\u0448\u0435 \u0456\u043c'\u044f \u0442\u0430 \u043f\u0440\u0456\u0437\u0432\u0438\u0449\u0435 \u043f\u043e\u0432\u043d\u0456\u0441\u0442\u044e"}),(0,j.jsx)(x._8,{type:"text",minLength:3,name:"username",id:"username",value:A,onChange:e=>q(e.target.value)}),(0,j.jsx)(x.bh,{children:"\u0413\u043e\u0442\u043e\u0432\u043e!"})]})}),(0,j.jsx)(l.B,{sectionWidth:I,isSupportOpen:y,isOpenedLast:f,handleSupport:e=>{C((t=>e)),b||k((e=>!e))},openKahoot:B,isKahootOpen:s})]})}),I>=O&&(0,j.jsx)(p.rW,{ref:D,className:e?"shown":"hidden",style:"chat"===f?{zIndex:"2"}:{zIndex:"1"},children:W?(0,j.jsx)(m.e,{socket:Q.current,messages:P,isChatOpen:e}):(0,j.jsxs)(x._Y,{onSubmit:H,children:[(0,j.jsx)(x.mD,{children:"AP Open Chat"}),(0,j.jsx)(x.bt,{htmlFor:"username",children:"\u0412\u0432\u0435\u0434\u0456\u0442\u044c \u0432\u0430\u0448\u0435 \u0456\u043c'\u044f \u0442\u0430 \u043f\u0440\u0456\u0437\u0432\u0438\u0449\u0435 \u043f\u043e\u0432\u043d\u0456\u0441\u0442\u044e"}),(0,j.jsx)(x._8,{type:"text",minLength:3,name:"username",id:"username",value:A,onChange:e=>q(e.target.value)}),(0,j.jsx)(x.bh,{children:"\u0413\u043e\u0442\u043e\u0432\u043e!"})]})})]})})}}}]);
//# sourceMappingURL=Speaking Club A0 Kids page.684c6ad8.chunk.js.map