"use strict";(self.webpackChunkap_education=self.webpackChunkap_education||[]).push([[8717],{51097:(e,s,t)=>{t.r(s),t.d(s,{default:()=>p});var n=t(1488),a=t(55294),c=t(59424),o=t(71679),r=t(72791),i=t(96710),l=t(57689),d=t(91608),h=t(29901),u=t(3201),m=t(80184);const p=()=>{const[e,s]=(0,r.useState)(!1),[t,p]=(0,r.useState)(!1),[x,g]=(0,r.useState)(!1),[j,f]=(0,r.useState)(!0),[y,k]=(0,r.useState)(""),[b,w]=(0,r.useState)(!1),[S,v]=(0,r.useState)(""),[C,N,O,D]=(0,l.bx)(),I=(0,r.useRef)(),[R,Z]=(0,n.Z)(I),[z,W]=(0,n.Z)(document.body),[_,q]=(0,r.useState)(!1),[K,A]=(0,r.useState)([]),B=s=>{p((e=>!e)),k(e||x?e=>"kahoot":e=>"")},E=0===R&&z>W?z-300:z-R,F=(0,r.useRef)(null);return(0,r.useEffect)((()=>{document.title="A1 Deutsch Kids Free | AP Education",F.current=(0,d.io)("https://ap-chat-server.onrender.com/"),F.current.on("connected",((e,s)=>{console.log(e),console.log(s.time)}));return(async()=>{try{const e=(await a.Z.get("https://ap-chat-server.onrender.com/messages/room",{params:{room:D}})).data.filter((e=>new Date(e.createdAt).getDate()===(new Date).getDate()));console.log(e),A((s=>e))}catch(e){console.log(e)}})(),F.current.on("message",(async e=>{A((s=>[...s,e]));await(async()=>{try{await a.Z.post("https://ap-chat-server.onrender.com/messages",e)}catch(s){console.log(s)}})()})),F.current.on("message:get",(async e=>{A((s=>[...s,e]))})),F.current.on("message:pinned",(async(e,s)=>{console.log(e),console.log(s),A((t=>(t[t.findIndex((s=>s.id===e))].isPinned=s.isPinned,[...t])))})),F.current.on("message:delete",(async e=>{console.log("delete fired"),A((s=>[...s.filter((s=>s.id!==e))]));await(async()=>{try{await a.Z.delete("https://ap-chat-server.onrender.com/messages/".concat(e))}catch(s){console.log(s)}})()})),F.current.on("message:deleted",(async e=>{console.log(e),A((s=>[...s.filter((s=>s.id!==e))]))})),F.current.on("user:banned",(async(e,s)=>{console.log(e),console.log(s),e===O.userID&&q(!0)})),()=>{F.current.off("connected"),F.current.off("message"),F.current.disconnect()}}),[O,D]),(0,m.jsx)(m.Fragment,{children:(void 0===C.dekidsfree||C.dekidsfree[0]<10)&&!N?(0,m.jsx)(u.r,{children:(0,m.jsxs)(u.Rq,{children:["\u041f\u0440\u0438\u0432\u0456\u0442! ",(0,m.jsx)("br",{}),"\u041d\u0430\u0440\u0430\u0437\u0456 \u0443\u0440\u043e\u043a \u043d\u0430 \u0446\u0456\u0439 \u0441\u0442\u043e\u0440\u0456\u043d\u0446\u0456 \u043d\u0435 \u043f\u0440\u043e\u0432\u043e\u0434\u0438\u0442\u044c\u0441\u044f! \u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435, \u0447\u0438 \u0432\u0438 \u043f\u0435\u0440\u0435\u0439\u0448\u043b\u0438 \u0437\u0430 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u0438\u043c \u043f\u043e\u0441\u0438\u043b\u0430\u043d\u043d\u044f\u043c \u0430\u0431\u043e \u0441\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u0456\u0437\u043d\u0456\u0448\u0435."]})}):O.isBanned||_?(0,m.jsx)(u.r,{children:(0,m.jsxs)(u.Rq,{children:["\u0425\u043c\u043c\u043c\u043c, \u0441\u0445\u043e\u0436\u0435 \u0449\u043e \u0432\u0438 \u0431\u0443\u043b\u0438 \u043d\u0435\u0447\u0435\u043c\u043d\u0456! ",(0,m.jsx)("br",{}),"\u0412\u0430\u0441 \u0431\u0443\u043b\u043e \u0437\u0430\u0431\u043b\u043e\u043a\u043e\u0432\u0430\u043d\u043e \u0437\u0430 \u043f\u043e\u0440\u0443\u0448\u0435\u043d\u043d\u044f \u043f\u0440\u0430\u0432\u0438\u043b \u043d\u0430\u0448\u043e\u0457 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0438. \u0417\u0432'\u044f\u0436\u0456\u0442\u044c\u0441\u044f \u0437\u0456 \u0441\u0432\u043e\u0457\u043c \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440\u043e\u043c \u0441\u0435\u0440\u0432\u0456\u0441\u0443!"]})}):(0,m.jsxs)(m.Fragment,{children:[(0,m.jsxs)(u.QU,{style:{width:e&&z>W?"".concat(E,"px"):"100%"},children:[(0,m.jsxs)(u.c6,{children:[(0,m.jsx)(u.i1,{}),(0,m.jsx)(u.tW,{}),(0,m.jsx)(u.Rs,{className:b&&"sound"===S||b&&"live"===S?"animated":"",children:(0,m.jsx)(u.CO,{className:b&&"sound"===S||b&&"live"===S?"animated":""})}),(0,m.jsx)(u.$D,{className:b&&"quality"===S?"animated":"",children:(0,m.jsx)(u.hY,{className:b&&"quality"===S?"animated":""})}),(0,m.jsx)(i.Z,{playing:!0,muted:!0,controls:!0,config:{youtube:{playerVars:{rel:0}}},style:{display:"block",position:"absolute",top:0,left:0},width:"100%",height:"100vh",url:C.dekidsfree})]}),(0,m.jsxs)(u.E4,{className:j?"":"hidden",children:[(0,m.jsx)(u.kd,{onClick:B,className:b&&"kahoot_open"===S?"animated":"",children:(0,m.jsx)(u.ev,{})}),(0,m.jsx)(u.Ms,{onClick:()=>{s((e=>!e)),k(t||x?e=>"chat":e=>"")},className:b&&"chat_open"===S?"animated":"",children:(0,m.jsx)(u.DS,{})}),(0,m.jsx)(u.wH,{onClick:()=>{g((e=>!e)),v(""),k(t||e?e=>"support":e=>"")},children:(0,m.jsx)(u.RB,{})}),(0,m.jsx)(u.b7,{href:"https://meet.google.com/iob-kwip-fhb",target:"_blank",rel:"noopener noreferrer",children:(0,m.jsx)(u.ce,{})})]}),(0,m.jsx)(u.uj,{id:"no-transform",onClick:()=>{f((e=>!e))},children:j?(0,m.jsx)(u.cz,{}):(0,m.jsx)(u.IL,{})}),W>z&&(0,m.jsx)(u.rW,{ref:I,className:e?"shown":"hidden",style:"chat"===y?{zIndex:"2"}:{zIndex:"1"},children:(0,m.jsx)(h.e,{socket:F.current,messages:K,isChatOpen:e,currentUser:O})}),(0,m.jsx)(o.B,{sectionWidth:z,isSupportOpen:x,isOpenedLast:y,handleSupport:e=>{v((s=>e)),b||w((e=>!e))},openKahoot:B,isKahootOpen:t}),(0,m.jsx)(c.b,{sectionWidth:z,sectionHeight:W,isKahootOpen:t,isChatOpen:e,isOpenedLast:y})]}),z>=W&&(0,m.jsx)(u.rW,{ref:I,className:e?"shown":"hidden",style:"chat"===y?{zIndex:"2"}:{zIndex:"1"},children:(0,m.jsx)(h.e,{socket:F.current,messages:K,isChatOpen:e,currentUser:O})})]})})}}}]);
//# sourceMappingURL=Deutsch Free Streams A1 Kids page.fb691e72.chunk.js.map