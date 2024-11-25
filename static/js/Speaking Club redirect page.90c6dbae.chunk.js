"use strict";(self.webpackChunkap_education=self.webpackChunkap_education||[]).push([[1113],{49868:(e,s,a)=>{a.r(s),a.d(s,{default:()=>u});var t=a(55294),c=a(2605),l=a(8313),r=a(10610),d=a(72791),i=a(57689),n=a(3201),o=a(80184);t.Z.defaults.baseURL="https://ap-server-8qi1.onrender.com";const u=()=>{var e,s;const[a,u]=(0,d.useState)(!1),[p,m]=(0,d.useState)(""),[h,g]=(0,d.useState)({}),[w,x]=(0,d.useState)(""),[j,v]=(0,d.useState)(""),[k,f]=(0,d.useState)(!1),b=(0,i.TH)().pathname,Z=b.replace("/streams/","").replace("sc",""),I=Z.includes("dea1")?Z.replace("dea1","deutsch"):Z.includes("de")?Z.replace("de","deutsch"):Z.includes("pla1")?Z.replace("pla1","polski"):Z.includes("pl")?Z.replace("pl","polski"):Z;(0,d.useLayoutEffect)((()=>{(async()=>{try{u((e=>!0)),m((await t.Z.get("/speakings")).data[I]);const e=await t.Z.post("/users/refresh",{mail:localStorage.getItem("mail")});console.log(41,e.data.user),g((s=>({userId:e.data.user.id,name:e.data.user.name,mail:e.data.user.mail,zoomMail:e.data.user.zoomMail,age:e.data.user.age,lang:e.data.user.lang,course:e.data.user.course,crmId:e.data.user.crmId,contactId:e.data.user.contactId,successRate:e.data.user.successRate,temperament:e.data.user.temperament,visited:e.data.user.visited,visitedTime:e.data.user.visitedTime,feedback:e.data.user.feedback})))}catch(e){console.log(e)}finally{u((e=>!1))}})()}),[I]);const S=(e=>e.includes("de")||e.includes("deutsch")?"de":e.includes("pl")||e.includes("polski")?"pl":"en")(b);return(0,d.useEffect)((()=>{document.title="\u041f\u0440\u0430\u043a\u0442\u0438\u0447\u043d\u0435 \u0437\u0430\u043d\u044f\u0442\u0442\u044f | AP Education";(async()=>{try{x((await t.Z.get("/timetable")).data.filter((e=>Z.includes(e.level)&&S===e.lang))[0].course),v((await t.Z.get("/timetable")).data.filter((e=>{var s;return S===e.lang&&(h.course===e.course||(null===(s=h.course)||void 0===s?void 0:s.split("/").some((s=>s===e.course))))}))[0].level),console.log(h.userId);const e=await t.Z.get("/speakingusers/".concat(h.userId));console.log("existingUser",e),console.log(103,h);(e.data?await t.Z.put("/speakingusers/".concat(h.userId),h):await t.Z.post("/speakingusers/new",h)).data._id&&f(!0)}catch(e){console.log(e)}})()}),[h,Z,S]),(0,o.jsx)(o.Fragment,{children:(0,o.jsx)(n.QU,{children:(0,o.jsxs)(c.CS,{children:[a&&(0,o.jsx)(r.sb,{children:(0,o.jsx)(l.a,{})}),w===h.course||null!==(e=h.course)&&void 0!==e&&e.split("/").some((e=>e===w))?(0,o.jsxs)(n.r,{children:[(0,o.jsxs)(n.Rq,{children:["\u041f\u0440\u0438\u0432\u0456\u0442! ",(0,o.jsx)("br",{}),"\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u0437\u0430\u0447\u0435\u043a\u0430\u0439\u0442\u0435, \u043d\u0435\u0437\u0430\u0431\u0430\u0440\u043e\u043c \u0432\u0430\u0441 \u043f\u0435\u0440\u0435\u0430\u0434\u0440\u0435\u0441\u0443\u0454 \u043d\u0430 \u043f\u0440\u0430\u043a\u0442\u0438\u0447\u043d\u0435 \u0437\u0430\u043d\u044f\u0442\u0442\u044f \u0432 Zoom"]}),(0,o.jsxs)(n.Fz,{children:[(0,o.jsx)(n.Hq,{children:"\u041e\u0447\u0456\u043a\u0443\u0454\u0442\u0435 \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0434\u043e\u0432\u0433\u043e?"}),(0,o.jsx)(n.ZU,{onClick:()=>window.location.reload(),children:"\u041d\u0430\u0442\u0438\u0441\u043d\u0456\u0442\u044c \u0441\u044e\u0434\u0438, \u0449\u043e\u0431 \u043e\u043d\u043e\u0432\u0438\u0442\u0438 \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0443"})]})]}):(0,o.jsxs)(n.r,{children:[(0,o.jsxs)(n.Rq,{children:["\u0425\u043c\u043c\u043c... ",(0,o.jsx)("br",{}),"\u0417\u0434\u0430\u0454\u0442\u044c\u0441\u044f, \u0432\u0438 \u043d\u0430\u043c\u0430\u0433\u0430\u0454\u0442\u0435\u0441\u044c \u043f\u0456\u0434'\u0454\u0434\u043d\u0430\u0442\u0438\u0441\u044f \u0434\u043e \u043f\u0440\u0430\u043a\u0442\u0438\u0447\u043d\u043e\u0433\u043e \u0437\u0430\u043d\u044f\u0442\u0442\u044f \u043d\u0435 \u0441\u0432\u043e\u0433\u043e \u0440\u0456\u0432\u043d\u044f!"]}),(0,o.jsxs)(n.Fz,{children:[(0,o.jsxs)(n.Hq,{children:["\u0412\u043f\u0435\u0432\u043d\u0435\u043d\u0456, \u0449\u043e \u043d\u0435 \u043f\u043e\u043c\u0438\u043b\u0438\u043b\u0438\u0441\u044c? ",(0,o.jsx)("br",{})," \u0417\u0432'\u044f\u0436\u0456\u0442\u044c\u0441\u044f \u0437 \u0432\u0430\u0448\u0438\u043c \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440\u043e\u043c \u0430\u0431\u043e"]}),(0,o.jsx)(n.ZU,{onClick:()=>window.location.replace("https://www.academy.ap.education/streams/"+("en"!==S?S:"")+j+"sc"),children:"\u043c\u043e\u0436\u0435, \u0446\u0435 \u0432\u0430\u0448\u0435 \u043f\u0440\u0430\u043a\u0442\u0438\u0447\u043d\u0435 \u0437\u0430\u043d\u044f\u0442\u0442\u044f?"})]})]}),((w===h.course||(null===(s=h.course)||void 0===s?void 0:s.split("/").some((e=>e===w))))&&p&&k||"Dev Acc"===h.name&&k||"\u0422\u0456\u0447\u0435\u0440"===h.name&&k)&&window.location.replace(p)]})})})}}}]);
//# sourceMappingURL=Speaking Club redirect page.90c6dbae.chunk.js.map