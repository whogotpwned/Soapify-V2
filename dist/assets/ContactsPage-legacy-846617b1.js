!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */e=function(){return r};var n,r={},a=Object.prototype,o=a.hasOwnProperty,i=Object.defineProperty||function(t,e,n){t[e]=n.value},u="function"==typeof Symbol?Symbol:{},c=u.iterator||"@@iterator",s=u.asyncIterator||"@@asyncIterator",l=u.toStringTag||"@@toStringTag";function f(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(n){f=function(t,e,n){return t[e]=n}}function d(t,e,n,r){var a=e&&e.prototype instanceof _?e:_,o=Object.create(a.prototype),u=new O(r||[]);return i(o,"_invoke",{value:I(t,n,u)}),o}function h(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}r.wrap=d;var p="suspendedStart",v="suspendedYield",g="executing",m="completed",y={};function _(){}function x(){}function w(){}var b={};f(b,c,(function(){return this}));var k=Object.getPrototypeOf,C=k&&k(k(T([])));C&&C!==a&&o.call(C,c)&&(b=C);var E=w.prototype=_.prototype=Object.create(b);function L(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function S(e,n){function r(a,i,u,c){var s=h(e[a],e,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==t(f)&&o.call(f,"__await")?n.resolve(f.__await).then((function(t){r("next",t,u,c)}),(function(t){r("throw",t,u,c)})):n.resolve(f).then((function(t){l.value=t,u(l)}),(function(t){return r("throw",t,u,c)}))}c(s.arg)}var a;i(this,"_invoke",{value:function(t,e){function o(){return new n((function(n,a){r(t,e,n,a)}))}return a=a?a.then(o,o):o()}})}function I(t,e,r){var a=p;return function(o,i){if(a===g)throw new Error("Generator is already running");if(a===m){if("throw"===o)throw i;return{value:n,done:!0}}for(r.method=o,r.arg=i;;){var u=r.delegate;if(u){var c=D(u,r);if(c){if(c===y)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(a===p)throw a=m,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);a=g;var s=h(t,e,r);if("normal"===s.type){if(a=r.done?m:v,s.arg===y)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(a=m,r.method="throw",r.arg=s.arg)}}}function D(t,e){var r=e.method,a=t.iterator[r];if(a===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=n,D(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),y;var o=h(a,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,y;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,y):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function q(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function T(e){if(e||""===e){var r=e[c];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var a=-1,i=function t(){for(;++a<e.length;)if(o.call(e,a))return t.value=e[a],t.done=!1,t;return t.value=n,t.done=!0,t};return i.next=i}}throw new TypeError(t(e)+" is not iterable")}return x.prototype=w,i(E,"constructor",{value:w,configurable:!0}),i(w,"constructor",{value:x,configurable:!0}),x.displayName=f(w,l,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,f(t,l,"GeneratorFunction")),t.prototype=Object.create(E),t},r.awrap=function(t){return{__await:t}},L(S.prototype),f(S.prototype,s,(function(){return this})),r.AsyncIterator=S,r.async=function(t,e,n,a,o){void 0===o&&(o=Promise);var i=new S(d(t,e,n,a),o);return r.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},L(E),f(E,l,"Generator"),f(E,c,(function(){return this})),f(E,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},r.values=T,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(q),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,a){return u.type="throw",u.arg=t,e.next=r,a&&(e.method="next",e.arg=n),!!a}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],u=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),s=o.call(i,"finallyLoc");if(c&&s){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),q(n),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var a=r.arg;q(n)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:T(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),y}},r}function n(t,e,n,r,a,o,i){try{var u=t[o](i),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(r,a)}function r(t){return function(){var e=this,r=arguments;return new Promise((function(a,o){var i=t.apply(e,r);function u(t){n(i,a,o,u,c,"next",t)}function c(t){n(i,a,o,u,c,"throw",t)}u(void 0)}))}}System.register(["./index-legacy-086f5e54.js","./methods-legacy-5d482884.js","./ShowContactDetailsModal-legacy-36d4f9da.js"],(function(t,n){"use strict";var a,o,i,u,c,s,l,f,d,h,p,v,g,m,y,_,x,w,b,k,C,E,L,S,I,D,j,q,O,T,A,P,F,z,N,K,W,G,U,B,R,V,Y,H,M,J,Q,X,Z,$,tt,et;return{setters:[function(t){a=t.d,o=t.u,i=t.B,u=t.r,c=t.o,s=t.c,l=t.w,f=t.a,d=t.b,h=t.a4,p=t.e,v=t.f,g=t.a2,m=t.an,y=t.i,_=t.t,x=t.j,w=t.k,b=t.ai,k=t.l,C=t.O,E=t._,L=t.g,S=t.n,I=t.C,D=t.D,j=t.p,q=t.x,O=t.E,T=t.J,A=t.q,P=t.F,F=t.V,z=t.S,N=t.ao,K=t.ah,W=t.ap,G=t.aq,U=t.s,B=t.ar,R=t.y,V=t.z,Y=t.A},function(t){H=t.g,M=t.a,J=t.p},function(t){Q=t.o,X=t.S,Z=t.i,$=t.j,tt=t.k,et=t.l}],execute:function(){var n=document.createElement("style");n.textContent='.onhover[data-v-d449d4da]{background-color:#1e1e1e;border:none;color:#000;padding:16px 32px;text-align:left;font-size:16px;transition:.3s}.onhover[data-v-d449d4da]:hover{background-color:#2a2a2a;color:#fff}img[data-v-d449d4da]{border-radius:30%}.image_container[data-v-d449d4da]{display:flex;justify-content:center;align-items:center;width:150px;height:80px;border-radius:50%;overflow:hidden;padding:30px}#deleteButton[data-v-d449d4da]{margin-left:0;margin-right:auto;float:right}ion-card[data-v-39eda40b]{height:200px}#addButton[data-v-39eda40b]{margin-bottom:10px;float:right;right:0}#alone iframe[data-v-39eda40b]{margin:0;position:absolute;top:50%;-ms-transform:translateY(-50%);transform:translateY(-50%)}@font-face{font-family:spongebobregular;src:url(/assets/SpongeboyRegular-gx2n6-09aceb57.otf) format("opentype"),url(/assets/SpongeboyRegular-gx2n6-09aceb57.otf) format("opentype");font-weight:400;font-style:normal}#forever-alone-head[data-v-39eda40b]{font-family:spongebobregular;font-size:50px;color:#fff;text-align:center;margin-top:50px}\n',document.head.appendChild(n);var nt={class:"image_container"},rt=["src"],at=a({__name:"ContactElement",props:{user:String,avatar:String,user_id:String,email:String},setup:function(t){var n=t,a=o(),E=i(null);var L=function(){var t=r(e().mark((function t(n,r,a){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.create({component:X,componentProps:{avatarUrl:n,userId:r,email:a}});case 2:t.sent.present();case 4:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}();return Q(E,(function(){L(n.avatar,n.user_id,n.email)})),function(e,n){var r=u("ion-item-option"),o=u("ion-item-options"),i=u("ion-card-subtitle"),C=u("ion-item"),L=u("ion-item-sliding");return c(),s(L,null,{default:l((function(){return[f(o,{side:"start"},{default:l((function(){return[f(r,{color:"success"},{default:l((function(){return[f(d(h),{slot:"icon-only",icon:d(p)},null,8,["icon"])]})),_:1})]})),_:1}),f(C,{onClick:n[0]||(n[0]=function(e){return function(t,e,n){try{var r=new CustomEvent("openDialogue",{detail:{user:t,user_id:e,email:n}}),o=a.getAvatarUrlFromContactInformationForID(e),i=H();if(a.activeChatsContainChatWithID(e))a.updateTimestampOfActiveChatWithID(e,i);else{var u={user:t,user_id:e,email:n,avatarUrl:o,lastAccessTimestamp:i};a.addToActiveChats(u),a.setCurrentDialoguePartner(u)}a.setLastActiveChatWasWithID(e),window.dispatchEvent(r)}catch(c){b.fire({title:"Error",text:"Dialog für Chat-Ansicht konnte nicht geöffnet werden"})}finally{k.push("/tabs/dialogue")}}(t.user,t.user_id,t.email)})},{default:l((function(){return[v("div",{class:"onhover",ref_key:"htmlRef",ref:E},[v("div",nt,[v("img",{src:t.avatar,alt:"avatar"},null,8,rt)]),f(d(g),null,{default:l((function(){return[f(d(m),null,{default:l((function(){return[y(_(t.user),1)]})),_:1}),f(i,null,{default:l((function(){return[y(_(t.user_id),1)]})),_:1}),f(i,null,{default:l((function(){return[y(_(t.email),1)]})),_:1})]})),_:1})],512)]})),_:1}),f(o,{side:"end"},{default:l((function(){return[f(r,null,{default:l((function(){return[f(d(h),{slot:"icon-only",icon:d(x)},null,8,["icon"])]})),_:1}),f(r,{color:"danger",onClick:n[1]||(n[1]=function(e){return function(t){try{var e=new CustomEvent("deleteUserWithId",{detail:{user_id:t}});window.dispatchEvent(e)}catch(n){b.fire({title:"Error",text:"Event zum Löschen des Nutzers konnte nicht veranlasst werden"})}a.resetCurrentDialoguePartner()}(t.user_id)})},{default:l((function(){return[f(d(h),{slot:"icon-only",icon:d(w)},null,8,["icon"])]})),_:1})]})),_:1})]})),_:1})}}}),ot=E(at,[["__scopeId","data-v-d449d4da"]]),it=a({__name:"AddContactModal",setup:function(t){var e=i(),n=function(){return C.dismiss(null,"cancel")};function r(){var t=new CustomEvent("idContactSearch",{detail:{idSuche:e.value}});window.dispatchEvent(t),C.dismiss(null,"confirm")}return function(t,a){return c(),L(P,null,[f(d(q),null,{default:l((function(){return[f(d(S),null,{default:l((function(){return[f(d(I),{slot:"start"},{default:l((function(){return[f(d(D),{color:"medium",onClick:n},{default:l((function(){return[y("Abbrechen")]})),_:1})]})),_:1}),f(d(j),null,{default:l((function(){return[y("Kontakt hinzufügen ...")]})),_:1}),f(d(I),{slot:"end"},{default:l((function(){return[f(d(D),{strong:!0,onClick:r},{default:l((function(){return[y("Hinzufügen")]})),_:1})]})),_:1})]})),_:1})]})),_:1}),f(d(A),{class:"ion-padding"},{default:l((function(){return[f(d(O),null,{default:l((function(){return[f(d(T),{modelValue:e.value,"onUpdate:modelValue":a[0]||(a[0]=function(t){return e.value=t}),label:"Nach ID suchen","label-placement":"stacked",placeholder:"ID"},null,8,["modelValue"])]})),_:1})]})),_:1})],64)}}}),ut=function(t){return V("data-v-39eda40b"),t=t(),Y(),t}((function(){return v("p",null,"query",-1)})),ct=a({__name:"ContactsPage",setup:function(t){var n=i([]),a=o();_();function p(){return v.apply(this,arguments)}function v(){return(v=r(e().mark((function t(){var r,o,i,u,c,s;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.value=[],t.next=3,F.graphql.request(tt,{user_id:a.getSessionID});case 3:r=t.sent,o=r.data.contacts.length,i=0;case 6:if(!(i<o)){t.next=17;break}return u=r.data.contacts[i].contact,t.next=10,F.graphql.request($,{user_id:u});case 10:c=t.sent,s={username:c.data.userdetails[0]?c.data.userdetails[0].username:"",avatarSrc:c.data.userdetails[0]?c.data.userdetails[0].avatar_url:"",user_id:c.data.userdetails[0]?c.data.userdetails[0].user_id:"",email:c.data.userdetails[0]?c.data.userdetails[0].email:""},a.contactsContainUserWithID(s.user_id)||a.addToContactInformation(s),n.value.push(s);case 14:i++,t.next=6;break;case 17:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function g(){return m.apply(this,arguments)}function m(){return(m=r(e().mark((function t(){var r;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(n.value=[],r=0;r<a.getContactInformation.length;r++)n.value.push(a.getContactInformation[r]);case 2:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function _(){return x.apply(this,arguments)}function x(){return(x=r(e().mark((function t(){var r,o;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.value=[],t.prev=1,t.next=4,F.graphql.request(Z,{user_id:a.getSessionID});case 4:if(r=t.sent,o=r.data.contacts_aggregate.aggregate.count,!(a.getContactInformation.length<o)){t.next=11;break}return t.next=9,p();case 9:t.next=13;break;case 11:return t.next=13,g();case 13:t.next=19;break;case 15:t.prev=15,t.t0=t.catch(1),console.log(t.t0),b.fire({icon:"error",title:"Fehler beim Laden der Kontakte"});case 19:case"end":return t.stop()}}),t,null,[[1,15]])})))).apply(this,arguments)}function w(t){var e;for(e=0;e<n.value.length;e++)if(n.value[e].user_id===t)return!0;return!1}var k=function(){var t=r(e().mark((function t(){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,C.create({component:it});case 2:t.sent.present();case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();function E(t){return I.apply(this,arguments)}function I(){return(I=r(e().mark((function t(n){var r;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,F.graphql.request(et,{user_id:n});case 2:return r=t.sent,t.abrupt("return",r.data.userdetails_aggregate.aggregate.count>0);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return window.addEventListener("deleteUserWithId",(function(t){z.fire({title:"Kontakt und zugehörige Nachrichten löschen?",showCancelButton:!0,confirmButtonText:"Löschen",denyButtonText:"Don't save",heightAuto:!1}).then(function(){var o=r(e().mark((function r(o){var i;return e().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!o.isConfirmed){e.next=13;break}if(i=t.detail.user_id,!w(i)){e.next=10;break}return e.next=6,F.graphql.request(N,{user_id:a.getSessionID,contact:i});case 6:e.sent.error?b.fire({icon:"error",title:"Fehler beim Löschen des Kontaktes"}):(K.fire({icon:"success",title:"Kontakt erfolgreich gelöscht"}),n.value=n.value.filter((function(t){return t.user_id!==i})),a.deleteContactInformationWithID(i),a.deleteFromActiveChats(i)),e.next=11;break;case 10:b.fire({icon:"error",title:"Kontakt existiert nicht ..."});case 11:e.next=14;break;case 13:b.fire({icon:"error",title:"Löschung abgebrochen"});case 14:case"end":return e.stop()}}),r)})));return function(t){return o.apply(this,arguments)}}())})),window.addEventListener("idContactSearch",function(){var t=r(e().mark((function t(r){var o,i,u,c;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(o=r.detail.idSuche,!w(o)){t.next=8;break}return t.next=5,M("Kontakt ist bereits in Liste ...");case 5:return t.abrupt("return");case 8:return t.next=10,E(o);case 10:if(!t.sent){t.next=32;break}return t.next=14,W("".concat(a.getSessionID,",").concat(o));case 14:return i=t.sent,t.next=17,F.graphql.request(G,{contact:o,user_id:a.getSessionID,friendship_hash:i});case 17:if(!t.sent.error){t.next=24;break}return t.next=21,M("Fehler beim Hinzufügen des Kontaktes");case 21:return t.abrupt("return");case 24:return t.next=26,J("Kontakt erfolgreich hinzugefügt");case 26:return t.next=28,F.graphql.request($,{user_id:o});case 28:u=t.sent,c={username:u.data.userdetails[0].username,avatarSrc:u.data.userdetails[0].avatar_url,user_id:u.data.userdetails[0].user_id,email:u.data.userdetails[0].email},n.value.push(c),a.contactsContainUserWithID(c.user_id)||a.addToContactInformation(c);case 32:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),function(t,e){var r=u("ion-refresher-content"),a=u("ion-refresher"),o=u("ion-list"),i=u("ion-button"),p=u("ion-footer");return c(),s(d(R),null,{default:l((function(){return[f(d(q),null,{default:l((function(){return[f(d(S),null,{default:l((function(){return[f(d(j),null,{default:l((function(){return[y("Kontakte")]})),_:1})]})),_:1}),f(d(A),{fullscreen:!0},{default:l((function(){return[f(a,{slot:"fixed","pull-factor":.5,"pull-min":100,"pull-max":200,onIonRefresh:e[0]||(e[0]=function(t){return e=t,void _().then((function(){setTimeout((function(){e.target.complete()}),1e3)}));var e})},{default:l((function(){return[f(r)]})),_:1}),f(d(q),{collapse:"condense"},{default:l((function(){return[f(d(S),null,{default:l((function(){return[f(d(j),{size:"large"},{default:l((function(){return[y("Contacts")]})),_:1})]})),_:1})]})),_:1}),f(o,{lines:"full"},{default:l((function(){return[(c(!0),L(P,null,U(n.value,(function(t){return c(),L("div",{key:t},[f(ot,{avatar:t.avatarSrc,email:t.email,user:t.username,user_id:t.user_id},null,8,["avatar","email","user","user_id"])])})),128))]})),_:1})]})),_:1}),ut]})),_:1}),f(p,null,{default:l((function(){return[f(d(S),null,{default:l((function(){return[f(i,{id:"addButton",shape:"round",onClick:k},{default:l((function(){return[f(d(h),{slot:"icon-only",icon:d(B)},null,8,["icon"])]})),_:1})]})),_:1})]})),_:1})]})),_:1})}}});t("default",E(ct,[["__scopeId","data-v-39eda40b"]]))}}}))}();