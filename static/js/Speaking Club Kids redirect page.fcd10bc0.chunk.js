"use strict";(self.webpackChunkap_education=self.webpackChunkap_education||[]).push([[9552],{83165:(e,s,a)=>{a.r(s),a.d(s,{default:()=>o});var t=a(55294),i=a(2605),c=a(8313),d=a(10610),n=a(72791),l=a(3201),r=a(57689),u=a(80184);t.Z.defaults.baseURL="https://ap-server-8qi1.onrender.com";const o=()=>{const[e,s]=(0,n.useState)(!1),[a,o]=(0,n.useState)(""),[g,m]=(0,n.useState)({}),[p,h]=(0,n.useState)(""),[k,b]=(0,n.useState)(""),[f,w]=(0,n.useState)(!1),x=(0,r.TH)().pathname,j=x.includes("preschool")?x.replace("/streams-kids/","").slice(0,-2):x.includes("pre")||x.includes("beg")||x.includes("mid")||x.includes("high")?"kids"+x.replace("/streams-kids/","").replace("sc",""):x.replace("/streams-kids/","").replace("sc","")+"kids",v=j.includes("b1beginnerkids")?"b1kidsbeginner":j.includes("b2beginnerkids")?"b2kidsbeginner":j;console.log(41,j,p,k),(0,n.useLayoutEffect)((()=>{(async()=>{try{s((e=>!0)),o((await t.Z.get("/speakings")).data[v]);const e=await t.Z.post("/users/refresh",{mail:localStorage.getItem("mail")});console.log(51,e.data.user),m((s=>({userId:e.data.user.id,name:e.data.user.name,mail:e.data.user.mail,zoomMail:e.data.user.zoomMail,age:e.data.user.age,lang:e.data.user.lang,course:e.data.user.course,crmId:e.data.user.crmId,contactId:e.data.user.contactId,successRate:e.data.user.successRate,temperament:e.data.user.temperament,visited:e.data.user.visited,visitedTime:e.data.user.visitedTime,feedback:e.data.user.feedback})))}catch(e){console.log(e)}finally{s((e=>!1))}})()}),[v]);const Z=(e=>e.includes("de")||e.includes("deutsch")?"dekids":e.includes("pl")||e.includes("polski")?"plkids":"enkids")(x);return(0,n.useEffect)((()=>{document.title="\u041f\u0440\u0430\u043a\u0442\u0438\u0447\u043d\u0435 \u0437\u0430\u043d\u044f\u0442\u0442\u044f | AP Education";(async()=>{try{h((async e=>{j.includes("high")?(await t.Z.get("/timetable")).data.filter((e=>e.course.includes("high")&&Z===e.lang))[0].course:(await t.Z.get("/timetable")).data.filter((e=>j.includes(e.level)&&Z===e.lang))[0].course})),b((async e=>{(await t.Z.get("/timetable")).data.filter((e=>{var s;return Z===e.lang&&(g.course===e.course||(null===(s=g.course)||void 0===s?void 0:s.split("/").some((s=>s===e.course))))}))[0].level})),console.log(g.userId);const e=await t.Z.get("/speakingusers/".concat(g.userId));console.log("existingUser",e),console.log(103,g);(e.data?await t.Z.put("/speakingusers/".concat(g.userId),g):await t.Z.post("/speakingusers/new",g)).data._id&&w(!0)}catch(e){console.log(e)}})()}),[g,j,Z]),(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(l.QU,{children:(0,u.jsxs)(i.CS,{children:[e&&(0,u.jsx)(d.sb,{children:(0,u.jsx)(c.a,{})}),(0,u.jsxs)(l.r,{children:[(0,u.jsxs)(l.Rq,{children:["\u041f\u0440\u0438\u0432\u0456\u0442! ",(0,u.jsx)("br",{}),"\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u0437\u0430\u0447\u0435\u043a\u0430\u0439\u0442\u0435, \u043d\u0435\u0437\u0430\u0431\u0430\u0440\u043e\u043c \u0432\u0430\u0441 \u043f\u0435\u0440\u0435\u0430\u0434\u0440\u0435\u0441\u0443\u0454 \u043d\u0430 \u043f\u0440\u0430\u043a\u0442\u0438\u0447\u043d\u0435 \u0437\u0430\u043d\u044f\u0442\u0442\u044f \u0432 Zoom"]}),(0,u.jsxs)(l.Fz,{children:[(0,u.jsx)(l.Hq,{children:"\u041e\u0447\u0456\u043a\u0443\u0454\u0442\u0435 \u0437\u0430\u043d\u0430\u0434\u0442\u043e \u0434\u043e\u0432\u0433\u043e?"}),(0,u.jsx)(l.ZU,{onClick:()=>window.location.reload(),children:"\u041d\u0430\u0442\u0438\u0441\u043d\u0456\u0442\u044c \u0441\u044e\u0434\u0438, \u0449\u043e\u0431 \u043e\u043d\u043e\u0432\u0438\u0442\u0438 \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0443"})]})]}),a&&f&&window.location.replace(a)]})})})}}}]);
//# sourceMappingURL=Speaking Club Kids redirect page.fcd10bc0.chunk.js.map