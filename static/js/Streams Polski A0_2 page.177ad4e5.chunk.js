"use strict";(self.webpackChunkap_education=self.webpackChunkap_education||[]).push([[1460],{789:(e,s,t)=>{t.r(s),t.d(s,{default:()=>m});var n=t(1488),a=t(5294),o=t(9527),c=t(1679),r=t(2791),i=t(6710),l=t(7689),d=t(1608),h=t(9901),u=t(3201),p=t(184);const m=()=>{const[e,s]=(0,r.useState)(!1),[t,m]=(0,r.useState)(!1),[x,g]=(0,r.useState)(!1),[j,y]=(0,r.useState)(!0),[f,k]=(0,r.useState)(""),[w,S]=(0,r.useState)(!1),[b,v]=(0,r.useState)(""),[C,N,O,D]=(0,l.bx)(),I=(0,r.useRef)(),[_,R]=(0,n.Z)(I),[Z,z]=(0,n.Z)(document.body),[W,q]=(0,r.useState)(!1),[K,P]=(0,r.useState)([]),A=s=>{m((e=>!e)),k(e||x?e=>"kahoot":e=>"")},B=0===_&&Z>z?Z-300:Z-_,F=(0,r.useRef)(null);return(0,r.useEffect)((()=>{document.title="Polski A0, 2 | AP Education",F.current=(0,d.io)("https://ap-chat-server.onrender.com/"),F.current.on("connected",((e,s)=>{console.log(e),console.log(s.time)}));return(async()=>{console.log("get");try{const e=(await a.Z.get("https://ap-chat-server.onrender.com/messages/room",{params:{room:D}})).data.filter((e=>new Date(e.createdAt).getDate()===(new Date).getDate()));P((s=>e))}catch(e){console.log(e)}})(),F.current.on("message",(async e=>{P((s=>[...s,e]));await(async()=>{try{await a.Z.post("https://ap-chat-server.onrender.com/messages",e)}catch(s){console.log(s)}})()})),F.current.on("message:get",(async e=>{P((s=>[...s,e]))})),F.current.on("message:pinned",(async(e,s)=>{console.log(e),console.log(s),P((t=>(t[t.findIndex((s=>s.id===e))].isPinned=s.isPinned,[...t])))})),F.current.on("message:delete",(async e=>{console.log("delete fired"),P((s=>[...s.filter((s=>s.id!==e))]));await(async()=>{try{await a.Z.delete("https://ap-chat-server.onrender.com/messages/".concat(e))}catch(s){console.log(s)}})()})),F.current.on("message:deleted",(async e=>{console.log(e),P((s=>[...s.filter((s=>s.id!==e))]))})),F.current.on("user:banned",(async(e,s)=>{console.log(e),console.log(s),e===O.userID&&q(!0)})),()=>{F.current.off("connected"),F.current.off("message"),F.current.disconnect()}}),[O,D]),(0,p.jsx)(p.Fragment,{children:(void 0===C.polskia0_2||C.polskia0_2[0]<10)&&!N?(0,p.jsx)(u.r,{children:(0,p.jsxs)(u.Rq,{children:["\u041f\u043e\u043a\u0438 \u0449\u043e \u0442\u0440\u0430\u043d\u0441\u043b\u044f\u0446\u0456\u0457 \u0442\u0443\u0442 \u043d\u0435\u043c\u0430\u0454! ",(0,p.jsx)("br",{}),"\u041f\u0435\u0440\u0435\u0432\u0456\u0440\u0442\u0435, \u0447\u0438 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e \u0432\u0438 \u0432\u043a\u0430\u0437\u0430\u043b\u0438 \u0430\u0434\u0440\u0435\u0441\u0443 \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0438 \u0430\u0431\u043e \u0441\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u043f\u0456\u0437\u043d\u0456\u0448\u0435."]})}):O.isBanned||W?(0,p.jsx)(u.r,{children:(0,p.jsxs)(u.Rq,{children:["\u0425\u043c\u043c\u043c\u043c, \u0441\u0445\u043e\u0436\u0435 \u0449\u043e \u0432\u0438 \u0431\u0443\u043b\u0438 \u043d\u0435\u0447\u0435\u043c\u043d\u0456! ",(0,p.jsx)("br",{}),"\u0412\u0430\u0441 \u0431\u0443\u043b\u043e \u0437\u0430\u0431\u043b\u043e\u043a\u043e\u0432\u0430\u043d\u043e \u0437\u0430 \u043f\u043e\u0440\u0443\u0448\u0435\u043d\u043d\u044f \u043f\u0440\u0430\u0432\u0438\u043b \u043d\u0430\u0448\u043e\u0457 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0438. \u0417\u0432'\u044f\u0436\u0456\u0442\u044c\u0441\u044f \u0437\u0456 \u0441\u0432\u043e\u0457\u043c \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440\u043e\u043c \u0441\u0435\u0440\u0432\u0456\u0441\u0443!"]})}):(0,p.jsxs)(p.Fragment,{children:[(0,p.jsxs)(u.QU,{style:{width:e&&Z>z?"".concat(B,"px"):"100%"},children:[(0,p.jsxs)(u.c6,{children:[(0,p.jsx)(u.i1,{}),(0,p.jsx)(u.tW,{}),(0,p.jsx)(u.Rs,{className:w&&"sound"===b||w&&"live"===b?"animated":"",children:(0,p.jsx)(u.CO,{className:w&&"sound"===b||w&&"live"===b?"animated":""})}),(0,p.jsx)(u.$D,{className:w&&"quality"===b?"animated":"",children:(0,p.jsx)(u.hY,{className:w&&"quality"===b?"animated":""})}),(0,p.jsx)(i.Z,{playing:!0,muted:!0,controls:!0,config:{youtube:{playerVars:{rel:0}}},style:{display:"block",position:"absolute",top:0,left:0},width:"100%",height:"100vh",url:C.polskia0_2})]}),(0,p.jsxs)(u.KN,{className:j?"":"hidden",children:[(0,p.jsx)(u.kd,{onClick:A,className:w&&"kahoot_open"===b?"animated":"",children:(0,p.jsx)(u.ev,{})}),(0,p.jsx)(u.Ms,{onClick:()=>{s((e=>!e)),k(t||x?e=>"chat":e=>"")},className:w&&"chat_open"===b?"animated":"",children:(0,p.jsx)(u.DS,{})}),(0,p.jsx)(u.wH,{onClick:()=>{g((e=>!e)),v(""),k(t||e?e=>"support":e=>"")},children:(0,p.jsx)(u.RB,{})})]}),(0,p.jsx)(u.gF,{id:"no-transform",onClick:()=>{y((e=>!e))},children:j?(0,p.jsx)(u.cz,{}):(0,p.jsx)(u.IL,{})}),z>Z&&(0,p.jsx)(u.rW,{ref:I,className:e?"shown":"hidden",style:"chat"===f?{zIndex:"2"}:{zIndex:"1"},children:(0,p.jsx)(h.e,{socket:F.current,messages:K,isChatOpen:e,currentUser:O})}),(0,p.jsx)(c.B,{sectionWidth:Z,isSupportOpen:x,isOpenedLast:f,handleSupport:e=>{v((s=>e)),w||S((e=>!e))},openKahoot:A,isKahootOpen:t}),(0,p.jsx)(o.M,{sectionWidth:Z,sectionHeight:z,isKahootOpen:t,isChatOpen:e,isOpenedLast:f})]}),Z>=z&&(0,p.jsx)(u.rW,{ref:I,className:e?"shown":"hidden",style:"chat"===f?{zIndex:"2"}:{zIndex:"1"},children:(0,p.jsx)(h.e,{socket:F.current,messages:K,isChatOpen:e,currentUser:O})})]})})}}}]);
//# sourceMappingURL=Streams Polski A0_2 page.177ad4e5.chunk.js.map