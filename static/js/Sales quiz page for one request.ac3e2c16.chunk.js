"use strict";(self.webpackChunkap_education=self.webpackChunkap_education||[]).push([[6768],{7708:(e,n,s)=>{s.r(n),s.d(n,{default:()=>k});var i=s(2791),r=s(1005),t=s(2122),a=s(5294),c=s(7723),l=s(8313),d=s(5705),u=s(8007),o=s(10),x=s(6739),A=s(184);a.Z.defaults.baseURL="https://ap-server-8qi1.onrender.com";const j=e=>{let{nextQuestion:n,quizValues:s,activeSlide:r,previousQuestion:t,lang:j}=e;const[h,g]=(0,i.useState)(!1),m={name:"",phone:"",mail:s.current.mail,password:s.current.password,tag:s.current.tag,lang:s.current.lang,adult:s.current.adult,age:s.current.age,knowledge:s.current.knowledge,quantity:s.current.quantity,difficulties:s.current.difficulties,interests:s.current.interests},p=u.Ry().shape({name:u.Z_().required("\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u0432\u043a\u0430\u0436\u0456\u0442\u044c \u0441\u0432\u043e\u0454 \u0456\u043c'\u044f!").matches(/^[A-Za-z\u0410-\u042f\u0430-\u044f\u0456\u0406\u0457\u0407\u0454\u0404]/,"\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u0432\u0432\u0435\u0434\u0456\u0442\u044c \u0456\u043c'\u044f, \u0431\u0435\u0437 \u0446\u0438\u0444\u0440 \u0442\u0430 \u0441\u043f\u0435\u0446\u0441\u0438\u043c\u0432\u043e\u043b\u0456\u0432!").min(2,"\u041d\u0435\u043e\u0431\u0445\u0456\u0434\u043d\u043e \u0432\u0432\u0435\u0441\u0442\u0438 \u043d\u0435 \u043c\u0435\u043d\u0448\u0435 \u043d\u0456\u0436 2 \u0441\u0438\u043c\u0432\u043e\u043b\u0438!").max(50,"\u041d\u0435\u043e\u0431\u0445\u0456\u0434\u043d\u043e \u0432\u0432\u0435\u0441\u0442\u0438 \u043d\u0435 \u0431\u0456\u043b\u044c\u0448\u0435 \u043d\u0456\u0436 50 \u0441\u0438\u043c\u0432\u043e\u043b\u0456\u0432!"),phone:u.Z_().required("\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u0432\u043a\u0430\u0436\u0456\u0442\u044c \u0441\u0432\u0456\u0439 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443!").matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,"\u0411\u0443\u0434\u044c \u043b\u0430\u0441\u043a\u0430, \u0432\u0432\u0435\u0434\u0456\u0442\u044c \u0432\u0430\u043b\u0456\u0434\u043d\u0438\u0439 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443!").min(10,"\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443 \u043c\u0430\u0454 \u0441\u043a\u043b\u0430\u0434\u0430\u0442\u0438\u0441\u044f \u043d\u0435 \u043c\u0435\u043d\u0448\u0435 \u043d\u0456\u0436 \u0437 10 \u0441\u0438\u043c\u0432\u043e\u043b\u0456\u0432!").max(15,"\u041d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443 \u043c\u0430\u0454 \u0441\u043a\u043b\u0430\u0434\u0430\u0442\u0438\u0441\u044f \u043d\u0435 \u0431\u0456\u043b\u044c\u0448\u0435 \u043d\u0456\u0436 \u0437 15 \u0441\u0438\u043c\u0432\u043e\u043b\u0456\u0432!"),mail:u.Z_().required(),password:u.Z_().required(),tag:u.Z_().required(),lang:u.Z_().required(),adult:u.O7().required(),age:u.Z_().required(),knowledge:u.Z_().required(),quantity:u.Z_().required(),difficulties:u.Z_().required(),interests:u.Z_().required()}),Q=()=>{console.log((0,d.u6)());const{values:e,isValid:n,submitForm:i}=(0,d.u6)();return(0,A.jsx)(x.OB,{href:s.current.leadPage,onClick:async s=>{s.preventDefault(),console.log(n),e.name&&e.phone&&n&&(console.log("valid"),await i(),setTimeout((()=>{g((e=>!1))}),1500))},children:"\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043c\u0435\u0441\u0435\u043d\u0434\u0436\u0435\u0440"})};return(0,A.jsx)(A.Fragment,{children:(0,A.jsxs)(x.$_,{children:[(0,A.jsx)(x.TR,{}),(0,A.jsx)(x.Dx,{children:"\u041c\u0430\u0439\u0436\u0435 \u0433\u043e\u0442\u043e\u0432\u043e!"}),(0,A.jsxs)(x.dk,{children:["\u0429\u043e\u0431 \u043e\u0442\u0440\u0438\u043c\u0430\u0442\u0438 \u0434\u043e\u0441\u0442\u0443\u043f \u0434\u043e ",j?"\u043f\u0440\u043e\u0431\u043d\u0438\u0445 \u0437\u0430\u043d\u044f\u0442\u044c":"\u043c\u0430\u0440\u0430\u0444\u043e\u043d\u0443",", \u0432\u0432\u0435\u0434\u0456\u0442\u044c \u0441\u0432\u043e\u0454 \u0456\u043c\u2019\u044f \u0456 \u0430\u043a\u0442\u0443\u0430\u043b\u044c\u043d\u0438\u0439 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0443 \u0442\u0430 \u043f\u0435\u0440\u0435\u0439\u0434\u0456\u0442\u044c \u0443 \u0437\u0440\u0443\u0447\u043d\u0438\u0439 \u0434\u043b\u044f \u0432\u0430\u0441 \u043c\u0435\u0441\u0435\u043d\u0434\u0436\u0435\u0440."]}),(0,A.jsx)(d.J9,{initialValues:m,onSubmit:async(e,n)=>{let{resetForm:i}=n;g((e=>!0));try{const n=await a.Z.post("/leads/quiz-one/",s.current);console.log(n),s.current.leadPage=n.data.engPage,s.current.crmId=n.data.crmId,s.current.contactId=n.data.contactId,console.log(n.data.crmId,n.data.contactId),(async(n,i)=>{const r={name:e.name.trim().trimStart(),mail:e.mail,password:e.password,pupilId:"0000000",crmId:n,contactId:i,age:s.current.age,lang:"en"!==s.current.lang||s.current.adult?s.current.lang:"enkids",course:"0",package:"\u041c\u0430\u0440\u0430\u0444\u043e\u043d",knowledge:s.current.knowledge,manager:"-"};try{const e=await a.Z.post("/users/new",r);console.log(e)}catch(t){console.error(t)}})(n.data.crmId,n.data.contactId),setTimeout((()=>{i()}),1500)}catch(r){console.error(r)}},validationSchema:p,children:(0,A.jsxs)(o.ag,{children:[(0,A.jsx)(o.RF,{}),(0,A.jsxs)(c.Ck,{children:[(0,A.jsxs)(c.__,{children:[(0,A.jsx)(x.Zq,{type:"text",name:"name",placeholder:"\u0406\u043c'\u044f*"}),(0,A.jsx)(c.r2,{component:"p",name:"name"})]}),(0,A.jsxs)(c.__,{children:[(0,A.jsx)(x.Zq,{type:"tel",name:"phone",placeholder:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d*"}),(0,A.jsx)(c.r2,{component:"p",name:"phone"})]})]}),(0,A.jsx)(c.x1,{type:"text",name:"tag"}),(0,A.jsx)(c.x1,{type:"text",name:"lang"}),(0,A.jsx)(c.x1,{type:"text",name:"adult"}),(0,A.jsx)(c.x1,{type:"text",name:"age"}),(0,A.jsx)(c.x1,{type:"text",name:"knowledge"}),(0,A.jsx)(c.x1,{type:"text",name:"quantity"}),(0,A.jsx)(c.x1,{type:"text",name:"difficulties"}),(0,A.jsx)(c.x1,{type:"text",name:"interests"}),(0,A.jsx)(Q,{}),h&&(0,A.jsx)(l.a,{})]})}),(0,A.jsx)(x.kM,{})," ",(0,A.jsx)(x.gl,{}),(0,A.jsx)(x.lf,{})," ",(0,A.jsx)(x.BQ,{}),(0,A.jsxs)(x.tl,{children:[(0,A.jsx)(x.Cw,{className:r-1<1&&"disabled",disabled:r-1<1&&!0,onClick:t,children:(0,A.jsx)(x.hM,{})}),(0,A.jsxs)(x.Tp,{children:[(0,A.jsx)(x.Ck,{children:r}),"/",j?7:8]}),(0,A.jsx)(x.p3,{className:"hidden",onClick:n,children:(0,A.jsx)(x.pX,{})})]})]})})};var h=s(4820),g=s(2965),m=s(8809),p=s(6793),Q=s(1445),w=s(2474),C=s(8970);const k=e=>{let{utms:n}=e;const[s,a]=(0,i.useState)(0),[c,l]=(0,i.useState)(!1),d=(0,i.useRef)(),u=e=>{e.currentTarget.classList.add("chosen"),d.current.adult&&l(!1),a((e=>e+1))},o=()=>{a((e=>e-1))},x=()=>{a((e=>e+1))};return(0,A.jsxs)(A.Fragment,{children:[0===s&&(0,A.jsx)(C.l,{beginQuiz:()=>{a(1),d.current={pipeline_id:6453287},d.current.utm_content=n.utm_content,d.current.utm_medium=n.utm_medium,d.current.utm_campaign=n.utm_campaign,d.current.utm_source=n.utm_source,d.current.utm_term=n.utm_term,d.current.utm_referrer=n.utm_referrer,d.current.referrer=n.referrer,d.current.gclientid=n.gclientid,d.current.gclid=n.gclid,d.current.fbclid=n.fbclid}}),1===s&&(0,A.jsx)(g.F,{continueQuiz:u,activeSlide:s,previousQuestion:o,nextQuestion:x,quizValues:d}),2===s&&(0,A.jsx)(Q.Y,{activeSlide:s,continueQuiz:u,continueQuizForChild:e=>{l(!0),u(e)},previousQuestion:o,nextQuestion:x,quizValues:d}),3===s&&(0,A.jsx)(r.B,{activeSlide:s,isChild:c,continueQuiz:u,previousQuestion:o,nextQuestion:x,quizValues:d}),4===s&&(0,A.jsx)(m.Y,{activeSlide:s,isChild:c,continueQuiz:u,previousQuestion:o,nextQuestion:x,quizValues:d}),5===s&&(0,A.jsx)(p.D,{activeSlide:s,continueQuiz:u,previousQuestion:o,nextQuestion:x,quizValues:d}),6===s&&(0,A.jsx)(t.s,{activeSlide:s,continueQuiz:u,previousQuestion:o,nextQuestion:x,quizValues:d}),7===s&&(0,A.jsx)(h.Z,{activeSlide:s,continueQuiz:u,previousQuestion:o,nextQuestion:x,quizValues:d}),8===s&&(0,A.jsx)(j,{nextQuestion:x,quizValues:d,activeSlide:s,previousQuestion:o}),9===s&&(0,A.jsx)(w.O,{})]})}},4820:(e,n,s)=>{s.d(n,{Z:()=>a});var i=s(708),r=s(6739),t=s(184);const a=e=>{var n,s,a,c,l,d;let{activeSlide:u,continueQuiz:o,previousQuestion:x,nextQuestion:A,quizValues:j,lang:h}=e;const g=(e,n)=>{j.current.interests=n,o(e)};return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)(r.$_,{children:[(0,t.jsx)(r.TR,{}),(0,t.jsxs)(r.HN,{children:["\u0429\u043e \u0432\u0430\u0441 \u0437\u0430\u0440\u0430\u0437 \u0446\u0456\u043a\u0430\u0432\u0438\u0442\u044c \u0443 \u0432\u0438\u0432\u0447\u0435\u043d\u043d\u0456"," ","en"===j.current.lang?"\u0430\u043d\u0433\u043b\u0456\u0439\u0441\u044c\u043a\u043e\u0457":"de"===j.current.lang?"\u043d\u0456\u043c\u0435\u0446\u044c\u043a\u043e\u0457":"pl"===j.current.lang?"\u043f\u043e\u043b\u044c\u0441\u044c\u043a\u043e\u0457":"\u0456\u043d\u043e\u0437\u0435\u043c\u043d\u043e\u0457"," ","\u043c\u043e\u0432\u0438?",(0,t.jsx)(r.a4,{src:i,alt:"Alumni hat emoji"})]}),(0,t.jsxs)(r.Tx,{children:[(0,t.jsx)(r.Ub,{onClick:e=>g(e,"\u0420\u043e\u0437\u0448\u0438\u0440\u0438\u0442\u0438 \u0441\u043b\u043e\u0432\u043d\u0438\u043a\u043e\u0432\u0438\u0439 \u0437\u0430\u043f\u0430\u0441"),className:"\u0420\u043e\u0437\u0448\u0438\u0440\u0438\u0442\u0438 \u0441\u043b\u043e\u0432\u043d\u0438\u043a\u043e\u0432\u0438\u0439 \u0437\u0430\u043f\u0430\u0441"===(null===(n=j.current)||void 0===n?void 0:n.interests)&&"chosen",children:(0,t.jsx)(r.OU,{children:"\u0412\u0438\u0432\u0447\u0438\u0442\u0438 \u0441\u043b\u043e\u0432\u0430"})}),(0,t.jsx)(r.Ub,{onClick:e=>g(e,"\u0412\u0438\u0432\u0447\u0438\u0442\u0438 \u0433\u0440\u0430\u043c\u0430\u0442\u0438\u043a\u0443"),className:"\u0412\u0438\u0432\u0447\u0438\u0442\u0438 \u0433\u0440\u0430\u043c\u0430\u0442\u0438\u043a\u0443"===(null===(s=j.current)||void 0===s?void 0:s.interests)&&"chosen",children:(0,t.jsx)(r.OU,{children:"\u0412\u0438\u0432\u0447\u0438\u0442\u0438 \u0433\u0440\u0430\u043c\u0430\u0442\u0438\u043a\u0443"})}),(0,t.jsx)(r.Ub,{onClick:e=>g(e,"\u0412\u0456\u043b\u044c\u043d\u043e \u0440\u043e\u0437\u043c\u043e\u0432\u043b\u044f\u0442\u0438"),className:"\u0412\u0456\u043b\u044c\u043d\u043e \u0440\u043e\u0437\u043c\u043e\u0432\u043b\u044f\u0442\u0438"===(null===(a=j.current)||void 0===a?void 0:a.interests)&&"chosen",children:(0,t.jsx)(r.OU,{children:"\u0412\u0456\u043b\u044c\u043d\u043e \u0440\u043e\u0437\u043c\u043e\u0432\u043b\u044f\u0442\u0438"})}),(0,t.jsx)(r.Ub,{onClick:e=>g(e,"\u0412\u0441\u0435 \u0440\u0430\u0437\u043e\u043c"),className:"\u0412\u0441\u0435 \u0440\u0430\u0437\u043e\u043c"===(null===(c=j.current)||void 0===c?void 0:c.interests)&&"chosen",children:(0,t.jsx)(r.OU,{children:"\u0412\u0441\u0435 \u0440\u0430\u0437\u043e\u043c"})})]}),(0,t.jsx)(r.Sg,{}),(0,t.jsx)(r.TQ,{}),(0,t.jsx)(r.lf,{}),(0,t.jsxs)(r.tl,{children:[(0,t.jsx)(r.Cw,{className:u-1<1&&"disabled",disabled:u-1<1&&!0,onClick:x,children:(0,t.jsx)(r.hM,{})}),(0,t.jsxs)(r.Tp,{children:[(0,t.jsx)(r.Ck,{children:u}),"/",h?7:8]}),(0,t.jsx)(r.p3,{className:u+1>1&&!(null!==(l=j.current)&&void 0!==l&&l.interests)&&"disabled",disabled:u+1>1&&!(null!==(d=j.current)&&void 0!==d&&d.interests)&&!0,onClick:A,children:(0,t.jsx)(r.pX,{})})]})]})})}},2965:(e,n,s)=>{s.d(n,{F:()=>t});var i=s(6739),r=s(184);const t=e=>{var n,s,t,a,c;let{continueQuiz:l,activeSlide:d,previousQuestion:u,nextQuestion:o,quizValues:x,lang:A}=e;console.log(x.current);const j=(e,n)=>{x.current.lang=n,l(e)};return(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)(i.$_,{children:[(0,r.jsx)(i.TR,{}),(0,r.jsx)(i.HN,{children:"\u0412\u0438\u0432\u0447\u0435\u043d\u043d\u044f \u044f\u043a\u043e\u0457 \u043c\u043e\u0432\u0438 \u0432\u0430\u0441 \u0446\u0456\u043a\u0430\u0432\u0438\u0442\u044c?"}),(0,r.jsxs)(i.Tx,{children:[(0,r.jsx)(i.Ub,{onClick:e=>j(e,"en"),className:"en"===(null===(n=x.current)||void 0===n?void 0:n.lang)&&"chosen",children:(0,r.jsxs)(i.OU,{children:[(0,r.jsx)(i.dy,{src:"data:image/png;base64,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",alt:"Great Britain flag emoji",width:"21"}),"\u0410\u043d\u0433\u043b\u0456\u0439\u0441\u044c\u043a\u0430"]})}),(0,r.jsx)(i.Ub,{onClick:e=>j(e,"de"),className:"de"===(null===(s=x.current)||void 0===s?void 0:s.lang)&&"chosen",children:(0,r.jsxs)(i.OU,{children:[(0,r.jsx)(i.dy,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAArCAYAAADhXXHAAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAVASURBVHgB7ZfPbxtFFMff7tpeu3biOk1SWgNtKtqCrJZwqIJ6gEocuHPKBXHLIVc4IJCQfOLEJfwB4b9AHLjAhQgBAaHQmh+CxtQ0SpvEiX/tj3l83+6ss3HsYH44EpKf9PXMzu7M+7yZ8dsdorGNbWxjG9sozaBTtqWlpaRlWTml1AVcXvA874zv+0loF9dbuFddXV3dMwyD6bRgV1ZW7I2NjWk4fxYgtwBXQjnnum7RcZwCNNHpdEyUhPagD57lRCJxkE6na5lM5gvc+3Rzc/OTtbW1h8dgb8CKxaKzsLDwY7lcVkNyGcvLy1k4Og+gm5ipeTh/AWUJYBcBlG6324SSWq0WSV0kdWkTWDxH6EuYTQIsTU5OUqFQCK7r9fo7lUrlfXGUiHvd2dl5LZfLvbu+vl5ZXFz82LbtddM0qxhgD2UDA6YAlUJ5CY9fRnmNmUuNRuMq4GbgONELFYeRGZR61IY+3brci2YYgMJCyWSSMH53OxyBrVar8lBydna2lM/nS9lslrAkQSdABpFKXxlUHMUlTqWMnApczE9g0hYsBcYRnWS9fY/BijWbTcI+oVqtFkCmUqlgaUS9TqLrSJj9oUD+qSX6NUZLJtHJbAmEzGyk6DoqewPoV+93/Z/ADmuR8/jsxttPMqXFNLz9K9hhTGA6UBqagS5DV6Br0FkK05FAP4L+gO5BX0O/Qx5k0Yhgxan8n2ehEvQMdB1agC5qMLnvQk6sdDSYr4PL6OvPoM+hj/rBvq0d/gB9Az3UnZkOE3K0bEmoAEkOm9Ng89Dz0BQNDobpr5de4G3oBpQdBPuUdvwGNAE9hn6FtqEGhUs5oQGvQvlYEFKaNNr3d/9sALWgHIUzJQ9ZsdLUpRern4aZ9D+yMeyobOR5tmtRGohSgqQT+ctHOUuScVuXA9LFaGD1xyWn8HOewjcBxEjALG8C5CM+A2Fd2dXAAGWkHN5B/QGFaWgD2hoE+6K+WaXh3oW+hsIohuSxp1GXhHtFAwpoRr6g9Fh+CCaAAaQbtrMKwYO3geRH5FB+GaqjXoHe6wf7UuhQsjL/gvI+he/BfQqWh7F0bIcQjEMJI/vzE3rWkKAZzgxPw/UEFATFWrquYm3EhzuF433TNGBmJUI8wEUKM78VLmUAmdTXhh5MSuuwLYDphO29b4bo2xRfuF3QLjDHguij+HEl0cOqR49F6GtADuGCfWZpUegs+sji6L2MSu+3M+vlVjGx3mpxaBUP4OgQx/9gkZOooxnbUwFY7J7RdcBkCgAeNpSedqJjwALoo6MHuZ4IOw77FqcakhONiuCtCJhPgFWHszVwaVS4AjKbyojtMAQjoMEsc7jkAuC4TB2HqdWBWj41Wh4dNFzab7o4MHoAlWMQB2AJQKax7SZyTOfOMrXRR3ncH9ZTYZQenFhwbpqx2Y1ANaAR21DSIn08OBW4Zptpv6Fo70DRbt0PymZLKUBvd1y/5rneb66nqjiF1JWvHJlp/FemMeQ5HDzmbFs9V8i7E7YtRyWjP2y9RXwPGaCOfDeNyHJZpgz+jTaiTSYYRxhAmuF+9LFmniyjD5C2TwdNRj8OyrbDWx1HfYfAv8f2ucsd90vHtH4qf/i4TkPYnTt+4tYc3cyd8V+ZyFiVqP3I//at1ykLkNtofTWVsG6nU8Z12zan7JSBwyOiNEyAmgA1yPXNju8bNUzKfcXmz7hx11XGt1nb/urND2qPDPpbJ5ahzBgcHSXmn6SZlJEsmiZPKcPMYYmAabiWZW4rix40WvZ+/tLuQbkcvIPGNraxjW1sx+1PmTc0G5Jr+skAAAAASUVORK5CYII=",alt:"Germany flag emoji",width:"21"}),"\u041d\u0456\u043c\u0435\u0446\u044c\u043a\u0430"]})}),(0,r.jsx)(i.Ub,{onClick:e=>j(e,"pl"),className:"pl"===(null===(t=x.current)||void 0===t?void 0:t.lang)&&"chosen",children:(0,r.jsxs)(i.OU,{children:[(0,r.jsx)(i.dy,{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACoAAAArCAYAAAAOnxr+AAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAU8SURBVHgB7ZfNThxHEMerZ2Y/zLLmwyAb+wBOFGwLBTmHHOITUg45IuUB8hQ5JSef8gB5g4hTXiCKEJJzixSSILJSgsFxRAiOwd5g9mN2Pro7/5rdXobeWSDBcPEWKnq6t7r6V9UzU9NEAxnIQAYykPOIoEuU1dXVnO/7w7lcbkopNSWlHBJC5IIgOIjjeC+fz+8sLCy8wpimywDd3NwsNBqNCSx4N4qi913XncP1ba31Lfw8hrYMUAdKACRuAa2hddg98zzve9itVKvVbxcXF5+zT884X1paend4eDjED5swVmdkEpVKpYSFr4dhOI959x3HeQ9Zm0N2biJzxUKhQLgmjCcTYMtQCSCCIMxL+lABLSOoMmxnDw4OPkH7GaZ8cQwUDj5GZJ8vLy8/XllZ+QZRrWHhHUx8BW3AcR6L5jE2DdsZ6Cyu57Bt7wBoslQqecVikQwYxgjzCDaJdrKWwDEsg7Oa31nZHusS+2k2m4Rd6d4CXVBEQKOjoznoHLpz7IzVOOHJ7JgdMQyDMJCB4vE0WDflqessQL7mIIydaXmMtQfUCC9sFjVg3HI/S83CRm24dN+AGkDTsvJvBjg9nglqL5B2ZkPZDm3HWbBpTdvYv9lzMzOaXjzruh9gFoAdtMlY1px+wfSA2je2cWg7OAmuXzZYeGuzgjgtwC5f1mAWgB3IaRmwfZ0W1EmQLN5pgP0i/q/A55W+GbWv+93wFwVmi0eXIMn9Gfikmz7F+3sU/L1LQbVKQcunsNUilS+SHhoiZ/waOVM3SbiM1edheq1gQYui37co+LVC8fZTind3SKKghI0aRa2AIpTNKEb5jOJEY1QriT4/bl6pTOU7d6k5/TapkfFe0OZ3yxT6H5CenCBRKnEa+oIIfhvww4V3q6rXSCFDcmuD5F9/UrT9RwKmw4BELt+dk1QZpfleSebCSccZ1ME/+EqCBDAH6W9tUq3Z6gX1136iw40K7X/9FRVu3KDC9Ftopyg3Mkbe0BXy4Njhklo/RL2tkn65Txrb52D7GNjpVLBuMCnI/yUmIBu0kyrSrkOy+pLCg39I/sIVicspSqlVNk2LGnuUnQuUC3uY9Al9ndL0oE49P9p6mbxW0Ky7WqfudZ1ho61BkeqmP4q9sy6qM1pt9YUFZgP3apu064ezSp2+5cY7iVJ3/mudhtPHtzH5ZmUbfBxnQKazo3v0CFKRvYY4llLPdmrDpGFNFo5lhRfh70xxHL4HuDu3rUofAZrt16JjQ73iZaXApJ6dOZSC7VQLOzNtECypnRTYcaeJP7QxNIIta8iHO1Zc8x87cztztYXbBeX3sYkmnVXOltDtyAVGuv1OakSHCF+ayXg7yzjAoY0RaaAktaQiHxWogYrUCEKqQ0NUowgHvFjGyeIu7At43ZWLOKbiaNOCv5gyjiI81I4O29jN5FEuVQpKpKMFDCdSKi6Hmpo4wNUBVQsjOmQFUDOWKorVi1DFz8NYPo2U3MHAIapVGMacITVBWl5DqLeLfnBvNIjKBRyJhOP1gjYQ/pNmQDXAjsFomE+DnkuFnMDLHlui2xkDEckkWkrUh30jgZPwIcmXci9Sah1BVxDcb0LqH2pXoq0vf9w6pDPIApju35uedzV9eLWoH5vx7iPw6fz1Uu3AfYAj/Uee4z7ANtzJe+54ARUol1QiJ9neNqQOwP0MudiWRE+0EBuOctZy2v354fr6PmU/D+eSzI/JhQXyZisTk/mrV25hZ8ddzxkGjPJcJ9JCvXAdd1fVZW1kZqb+8NGjmAYykIEM5M2VfwHYchJSWXSAaAAAAABJRU5ErkJggg==",alt:"Poland flag emoji",width:"21"})," \u041f\u043e\u043b\u044c\u0441\u044c\u043a\u0430"]})})]}),(0,r.jsx)(i.Sg,{}),(0,r.jsx)(i.TQ,{}),(0,r.jsx)(i.lf,{}),(0,r.jsxs)(i.tl,{children:[(0,r.jsx)(i.Cw,{className:d-1<1&&"disabled",disabled:d-1<1&&!0,onClick:u,children:(0,r.jsx)(i.hM,{})}),(0,r.jsxs)(i.Tp,{children:[(0,r.jsx)(i.Ck,{children:d}),"/",A?7:8]}),(0,r.jsx)(i.p3,{className:d+1>1&&!(null!==(a=x.current)&&void 0!==a&&a.lang)&&"disabled",disabled:d+1>1&&!(null!==(c=x.current)&&void 0!==c&&c.lang)&&!0,onClick:o,children:(0,r.jsx)(i.pX,{})})]})]})})}},8809:(e,n,s)=>{s.d(n,{Y:()=>o});var i=s(7689),r=s(5648),t=s(708),a=s(6521),c=s(1692),l=s(5401),d=s(6739),u=s(184);const o=e=>{var n,s,o,x,A,j;let{activeSlide:h,isChild:g,continueQuiz:m,previousQuestion:p,nextQuestion:Q,quizValues:w,lang:C}=e;const k=(e=>{switch(e){case"/quiz-one":case"/quiz-one/":return"quiz-one"}})((0,i.TH)().pathname),U=Math.floor(1e6*Math.random()).toString(),v=Math.floor(1e6*Math.random()).toString();w.current.tag=k,w.current.mail=U.length<6?"marathon-ap0".concat(U,"@ap.edu"):"marathon-ap".concat(U,"@ap.edu"),w.current.password=v.length<6?"0"+v:v;const B=(e,n)=>{w.current.knowledge=n,m(e)};return(0,u.jsx)(u.Fragment,{children:(0,u.jsxs)(d.$_,{children:[(0,u.jsx)(d.TR,{}),(0,u.jsx)(d.Yc,{children:g?"\u0412\u043a\u0430\u0436\u0456\u0442\u044c \u0440\u0456\u0432\u0435\u043d\u044c \u0434\u0438\u0442\u0438\u043d\u0438":"\u0412\u043a\u0430\u0436\u0456\u0442\u044c \u0432\u0430\u0448 \u0440\u0456\u0432\u0435\u043d\u044c"}),(0,u.jsxs)(d.Nl,{children:["\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0440\u0456\u0432\u0435\u043d\u044c \u0442\u0430 \u043e\u0442\u0440\u0438\u043c\u0430\u0439\u0442\u0435 \u0433\u0430\u0440\u0430\u043d\u0442\u043e\u0432\u0430\u043d\u0456"," ",(0,u.jsx)(d.Ro,{children:"\u043f\u043e\u0434\u0430\u0440\u0443\u043d\u043a\u0438"})," \u0432 \u043a\u0456\u043d\u0446\u0456 \u043e\u043f\u0438\u0442\u0443\u0432\u0430\u043d\u043d\u044f",(0,u.jsx)(d.QE,{src:a,alt:"Present emoji",width:"30"})]}),(0,u.jsxs)(d.Tx,{children:[(0,u.jsx)(d.Ub,{onClick:async e=>{B(e,"a0")},className:"a0"===(null===(n=w.current)||void 0===n?void 0:n.knowledge)&&"chosen",children:(0,u.jsxs)(d.OU,{children:[(0,u.jsx)(d.dy,{src:l,alt:"Running man emoji",width:"21"}),"\u041d\u0443\u043b\u044c\u043e\u0432\u0438\u0439"]})}),(0,u.jsx)(d.Ub,{onClick:async e=>{B(e,"a1")},className:"a1"===(null===(s=w.current)||void 0===s?void 0:s.knowledge)&&"chosen",children:(0,u.jsxs)(d.OU,{children:[(0,u.jsx)(d.dy,{src:r,alt:"Face in glasses emoji",width:"21"}),"\u041f\u043e\u0447\u0430\u0442\u043a\u043e\u0432\u0438\u0439"]})}),(0,u.jsx)(d.Ub,{onClick:async e=>{B(e,"a2")},className:"a2"===(null===(o=w.current)||void 0===o?void 0:o.knowledge)&&"chosen",children:(0,u.jsxs)(d.OU,{children:[(0,u.jsx)(d.dy,{src:t,alt:"Alumni hat emoji",width:"21"}),"\u0421\u0435\u0440\u0435\u0434\u043d\u0456\u0439"]})}),"en"===w.current.lang&&w.current.adult&&(0,u.jsx)(d.Ub,{onClick:async e=>{B(e,"b1")},className:"b1"===(null===(x=w.current)||void 0===x?void 0:x.knowledge)&&"chosen",children:(0,u.jsxs)(d.OU,{children:[(0,u.jsx)(d.dy,{src:c,alt:"Prize cup emoji",width:"21"}),"\u0412\u0438\u0441\u043e\u043a\u0438\u0439"]})})]}),(0,u.jsx)(d.Sg,{}),(0,u.jsx)(d.TQ,{}),(0,u.jsx)(d.lf,{}),(0,u.jsxs)(d.tl,{children:[(0,u.jsx)(d.Cw,{className:h-1<1&&"disabled",disabled:h-1<1&&!0,onClick:p,children:(0,u.jsx)(d.hM,{})}),(0,u.jsxs)(d.Tp,{children:[(0,u.jsx)(d.Ck,{children:h}),"/",C?7:8]}),(0,u.jsx)(d.p3,{className:h+1>1&&!(null!==(A=w.current)&&void 0!==A&&A.knowledge)&&"disabled",disabled:h+1>1&&!(null!==(j=w.current)&&void 0!==j&&j.knowledge)&&!0,onClick:Q,children:(0,u.jsx)(d.pX,{})})]})]})})}},2474:(e,n,s)=>{s.d(n,{O:()=>a});const i=s.p+"static/media/rocket.83b600fc7ea922f9454c.png";var r=s(6739),t=s(184);const a=()=>(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)(r.$_,{children:[(0,t.jsx)(r.TR,{}),(0,t.jsx)(r.Dx,{children:"\u041e\u0431\u043e\u0432'\u044f\u0437\u043a\u043e\u0432\u043e \u043f\u0435\u0440\u0435\u0439\u0434\u0456\u0442\u044c \u0432 \u043c\u0435\u0441\u0435\u043d\u0434\u0436\u0435\u0440!"}),(0,t.jsx)(r.dk,{children:"\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u043c\u0435\u0441\u0435\u043d\u0434\u0436\u0435\u0440, \u0432 \u044f\u043a\u043e\u043c\u0443 \u0432\u0430\u043c \u0431\u0443\u0434\u0435 \u0437\u0440\u0443\u0447\u043d\u043e \u043f\u0440\u043e\u0434\u043e\u0432\u0436\u0438\u0442\u0438 \u0440\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044e \u043d\u0430 \u043c\u0430\u0440\u0430\u0444\u043e\u043d!"}),(0,t.jsxs)(r.PJ,{children:[(0,t.jsx)(r.rE,{children:(0,t.jsx)(r.ZI,{to:"/marathon/wa",children:(0,t.jsx)(r.uQ,{})})}),(0,t.jsx)(r.rE,{children:(0,t.jsx)(r.ZI,{to:"/marathon/tg",children:(0,t.jsx)(r.At,{})})}),(0,t.jsx)(r.rE,{children:(0,t.jsx)(r.ZI,{to:"/marathon/viber",children:(0,t.jsx)(r.mn,{})})})]}),(0,t.jsx)(r.EX,{src:i,alt:"Rocket emoji",width:"80"}),(0,t.jsx)(r.kM,{})," ",(0,t.jsx)(r.gl,{}),(0,t.jsx)(r.lf,{})," ",(0,t.jsx)(r.BQ,{})]})})}}]);
//# sourceMappingURL=Sales quiz page for one request.ac3e2c16.chunk.js.map