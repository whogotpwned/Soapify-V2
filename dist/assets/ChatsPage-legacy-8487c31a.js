!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */e=function(){return r};var n,r={},o=Object.prototype,i=o.hasOwnProperty,a=Object.defineProperty||function(t,e,n){t[e]=n.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",l=c.asyncIterator||"@@asyncIterator",s=c.toStringTag||"@@toStringTag";function f(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(n){f=function(t,e,n){return t[e]=n}}function h(t,e,n,r){var o=e&&e.prototype instanceof w?e:w,i=Object.create(o.prototype),c=new I(r||[]);return a(i,"_invoke",{value:j(t,n,c)}),i}function p(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}r.wrap=h;var d="suspendedStart",v="suspendedYield",m="executing",y="completed",g={};function w(){}function b(){}function x(){}var _={};f(_,u,(function(){return this}));var L=Object.getPrototypeOf,E=L&&L(L(T([])));E&&E!==o&&i.call(E,u)&&(_=E);var k=x.prototype=w.prototype=Object.create(_);function S(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function C(e,n){function r(o,a,c,u){var l=p(e[o],e,a);if("throw"!==l.type){var s=l.arg,f=s.value;return f&&"object"==t(f)&&i.call(f,"__await")?n.resolve(f.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):n.resolve(f).then((function(t){s.value=t,c(s)}),(function(t){return r("throw",t,c,u)}))}u(l.arg)}var o;a(this,"_invoke",{value:function(t,e){function i(){return new n((function(n,o){r(t,e,n,o)}))}return o=o?o.then(i,i):i()}})}function j(t,e,r){var o=d;return function(i,a){if(o===m)throw new Error("Generator is already running");if(o===y){if("throw"===i)throw a;return{value:n,done:!0}}for(r.method=i,r.arg=a;;){var c=r.delegate;if(c){var u=A(c,r);if(u){if(u===g)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===d)throw o=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=m;var l=p(t,e,r);if("normal"===l.type){if(o=r.done?y:v,l.arg===g)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(o=y,r.method="throw",r.arg=l.arg)}}}function A(t,e){var r=e.method,o=t.iterator[r];if(o===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=n,A(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),g;var i=p(o,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,g;var a=i.arg;return a?a.done?(e[t.resultName]=a.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,g):a:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function U(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function I(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function T(e){if(e||""===e){var r=e[u];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function t(){for(;++o<e.length;)if(i.call(e,o))return t.value=e[o],t.done=!1,t;return t.value=n,t.done=!0,t};return a.next=a}}throw new TypeError(t(e)+" is not iterable")}return b.prototype=x,a(k,"constructor",{value:x,configurable:!0}),a(x,"constructor",{value:b,configurable:!0}),b.displayName=f(x,s,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,x):(t.__proto__=x,f(t,s,"GeneratorFunction")),t.prototype=Object.create(k),t},r.awrap=function(t){return{__await:t}},S(C.prototype),f(C.prototype,l,(function(){return this})),r.AsyncIterator=C,r.async=function(t,e,n,o,i){void 0===i&&(i=Promise);var a=new C(h(t,e,n,o),i);return r.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},S(k),f(k,s,"Generator"),f(k,u,(function(){return this})),f(k,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},r.values=T,I.prototype={constructor:I,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(U),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,o){return c.type="throw",c.arg=t,e.next=r,o&&(e.method="next",e.arg=n),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var u=i.call(a,"catchLoc"),l=i.call(a,"finallyLoc");if(u&&l){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),U(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;U(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:T(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),g}},r}function n(t,e,n,r,o,i,a){try{var c=t[i](a),u=c.value}catch(l){return void n(l)}c.done?e(u):Promise.resolve(u).then(r,o)}function r(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)}))}}System.register(["./index-legacy-086f5e54.js","./methods-legacy-5d482884.js"],(function(t,n){"use strict";var o,i,a,c,u,l,s,f,h,p,d,v,m,y,g,w,b,x,_,L,E,k,S,C,j,A,O,U,I,T,D,P,N,F;return{setters:[function(t){o=t.d,i=t.u,a=t.r,c=t.o,u=t.c,l=t.w,s=t.a,f=t.b,h=t.e,p=t.I,d=t.f,v=t.g,m=t.h,y=t.i,g=t.t,w=t.j,b=t.k,x=t.l,_=t.S,L=t.m,E=t.n,k=t.p,S=t.q,C=t.s,j=t.F,A=t.v,O=t.x,U=t.y,I=t.z,T=t.A,D=t._},function(t){P=t.g,N=t.p,F=t.a}],execute:function(){var n=document.createElement("style");n.textContent="#contactAvatar{height:70px;width:70px}#lastTimestamp{position:absolute;top:50%;transform:translateY(-40%);transform:translate(-20%);font-style:italic}.contactUsername{position:absolute;top:50%;transform:translateY(-25%);transform:translate(15%);font-weight:700}ion-item{--min-height: 120px;min-height:150px}#banner[data-v-b8ab7859]{width:70vw;margin-left:auto;margin-right:auto;display:block;max-width:100%;height:auto;padding:10px}#chatsList[data-v-b8ab7859]{padding-top:20px}#chatElement[data-v-b8ab7859]{height:90px;font-size:30px}#forever-alone-head[data-v-b8ab7859]{font-size:50px;height:100px;line-height:100px;text-align:center}\n",document.head.appendChild(n);var G=["src"],z={key:0,class:"contactUsername"},Y={key:1},B=o({__name:"ChatElement",props:{avatarSrc:String,contactUserID:String,contactUsername:String,contactEmail:String,lastAccessTimestamp:String},setup:function(t){var n=i();function o(){return o=r(e().mark((function t(o){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:_.fire({title:"Chat mit Kontakt löschen?",showCancelButton:!0,confirmButtonText:"Löschen",denyButtonText:"Don't save",heightAuto:!1}).then(function(){var t=r(e().mark((function t(r){return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!r.isConfirmed){t.next=14;break}return t.prev=1,n.deleteFromActiveChats(o),n.resetCurrentDialoguePartner(),t.next=6,N("Chat erfolgreich gelöscht");case 6:t.next=12;break;case 8:return t.prev=8,t.t0=t.catch(1),t.next=12,F("Fehler beim Löschen des Chats");case 12:t.next=16;break;case 14:return t.next=16,F("Chat konnte nicht gelöscht werden");case 16:case"end":return t.stop()}}),t,null,[[1,8]])})));return function(e){return t.apply(this,arguments)}}());case 1:case"end":return t.stop()}}),t)}))),o.apply(this,arguments)}return function(e,r){var i=a("ion-icon"),_=a("ion-item-option"),L=a("ion-item-options"),E=a("ion-col"),k=a("ion-row"),S=a("ion-grid"),C=a("ion-item"),j=a("ion-item-sliding");return c(),u(j,null,{default:l((function(){return[s(L,{side:"start"},{default:l((function(){return[s(_,{color:"success"},{default:l((function(){return[s(i,{slot:"icon-only",icon:f(h)},null,8,["icon"])]})),_:1})]})),_:1}),s(C,{onClick:r[0]||(r[0]=function(e){return function(t,e,r){try{var o=new CustomEvent("openDialogue",{detail:{user:t,user_id:e,email:r}}),i=P();n.updateTimestampOfActiveChatWithID(e,i),n.setLastActiveChatWasWithID(e),window.dispatchEvent(o)}catch(a){}finally{x.push("/tabs/dialogue")}}(t.contactUsername,t.contactUserID,t.contactEmail)})},{default:l((function(){return[s(S,null,{default:l((function(){return[s(k,null,{default:l((function(){return[s(E,{size:"auto"},{default:l((function(){return[s(f(p),{id:"contactAvatar"},{default:l((function(){return[d("img",{src:t.avatarSrc},null,8,G)]})),_:1})]})),_:1}),s(E,null,{default:l((function(){return[t.contactUsername?(c(),v("div",z,[s(f(m),null,{default:l((function(){return[y(g(t.contactUsername),1)]})),_:1})])):(c(),v("div",Y,[s(f(m),null,{default:l((function(){return[y(g(t.contactUserID),1)]})),_:1})]))]})),_:1})]})),_:1})]})),_:1})]})),_:1}),s(L,{side:"end"},{default:l((function(){return[s(_,null,{default:l((function(){return[s(i,{slot:"icon-only",icon:f(w)},null,8,["icon"])]})),_:1}),s(_,{color:"danger"},{default:l((function(){return[s(i,{slot:"icon-only",icon:f(b),onClick:r[1]||(r[1]=function(e){return function(t){return o.apply(this,arguments)}(t.contactUserID)})},null,8,["icon"])]})),_:1})]})),_:1})]})),_:1})}}}),W={key:0},K=[function(t){return I("data-v-b8ab7859"),t=t(),T(),t}((function(){return d("div",{align:"center"},[d("h1",{id:"forever-alone-head"},"🧐"),d("h3",null,"Nothing to see here ...")],-1)}))];t("default",D(o({__name:"ChatsPage",setup:function(t){var e=i();return function(t,n){var r=a("ion-refresher-content"),o=a("ion-refresher"),i=a("ion-item"),h=a("ion-list");return c(),u(f(U),null,{default:l((function(){return[s(f(L),{message:"Lade Kontakte ..."}),s(f(O),null,{default:l((function(){return[s(f(E),null,{default:l((function(){return[s(f(k),null,{default:l((function(){return[y("Chats")]})),_:1})]})),_:1}),s(f(S),{fullscreen:!0},{default:l((function(){return[s(o,{slot:"fixed","pull-factor":.5,"pull-min":100,"pull-max":200,onIonRefresh:n[0]||(n[0]=function(e){return t.handleRefresh(e)})},{default:l((function(){return[s(r)]})),_:1}),s(h,{id:"chatsList"},{default:l((function(){return[(c(!0),v(j,null,C(f(e).getActiveChats,(function(t){return c(),u(i,{key:t.user_id,id:"chatElement"},{default:l((function(){return[s(B,{avatarSrc:t.avatarUrl,lastAccessTimestamp:t.lastAccessTimestamp,contactUserID:t.user_id,contactUsername:t.user,contactEmail:t.email},null,8,["avatarSrc","lastAccessTimestamp","contactUserID","contactUsername","contactEmail"])]})),_:2},1024)})),128))]})),_:1}),0==f(e).getActiveChats.length?(c(),v("div",W,K)):A("",!0)]})),_:1})]})),_:1})]})),_:1})}}}),[["__scopeId","data-v-b8ab7859"]]))}}}))}();