!function(){function t(e,r){return t=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},t(e,r)}function e(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,o=r(t);if(e){var i=r(this).constructor;n=Reflect.construct(o,arguments,i)}else n=o.apply(this,arguments);return function(t,e){if(e&&("object"===s(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(this,n)}}function r(t){return r=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},r(t)}function n(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */n=function(){return e};var t,e={},r=Object.prototype,o=r.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},u=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function f(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{f({},"")}catch(t){f=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof w?e:w,a=Object.create(o.prototype),u=new N(n||[]);return i(a,"_invoke",{value:P(t,r,u)}),a}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=h;var d="suspendedStart",v="suspendedYield",y="executing",m="completed",g={};function w(){}function b(){}function R(){}var E={};f(E,u,(function(){return this}));var x=Object.getPrototypeOf,O=x&&x(x(I([])));O&&O!==r&&o.call(O,u)&&(E=O);var L=R.prototype=w.prototype=Object.create(E);function _(t){["next","throw","return"].forEach((function(e){f(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function r(n,i,a,u){var c=p(t[n],t,i);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"==s(f)&&o.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,u)}),(function(t){r("throw",t,a,u)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,u)}))}u(c.arg)}var n;i(this,"_invoke",{value:function(t,o){function i(){return new e((function(e,n){r(t,o,e,n)}))}return n=n?n.then(i,i):i()}})}function P(e,r,n){var o=d;return function(i,a){if(o===y)throw new Error("Generator is already running");if(o===m){if("throw"===i)throw a;return{value:t,done:!0}}for(n.method=i,n.arg=a;;){var u=n.delegate;if(u){var c=S(u,n);if(c){if(c===g)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===d)throw o=m,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=y;var s=p(e,r,n);if("normal"===s.type){if(o=n.done?m:v,s.arg===g)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=m,n.method="throw",n.arg=s.arg)}}}function S(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,S(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),g;var i=p(o,e.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,g;var a=i.arg;return a?a.done?(r[e.resultName]=a.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,g):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function j(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(j,this),this.reset(!0)}function I(e){if(e||""===e){var r=e[u];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var n=-1,i=function r(){for(;++n<e.length;)if(o.call(e,n))return r.value=e[n],r.done=!1,r;return r.value=t,r.done=!0,r};return i.next=i}}throw new TypeError(s(e)+" is not iterable")}return b.prototype=R,i(L,"constructor",{value:R,configurable:!0}),i(R,"constructor",{value:b,configurable:!0}),b.displayName=f(R,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,R):(t.__proto__=R,f(t,l,"GeneratorFunction")),t.prototype=Object.create(L),t},e.awrap=function(t){return{__await:t}},_(k.prototype),f(k.prototype,c,(function(){return this})),e.AsyncIterator=k,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new k(h(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},_(L),f(L,l,"Generator"),f(L,u,(function(){return this})),f(L,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=I,N.prototype={constructor:N,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(T),!e)for(var r in this)"t"===r.charAt(0)&&o.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function n(n,o){return u.type="throw",u.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var c=o.call(a,"catchLoc"),s=o.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),T(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;T(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:I(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),g}},e}function o(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(s){return void r(s)}u.done?e(c):Promise.resolve(c).then(n,o)}function i(t){return function(){var e=this,r=arguments;return new Promise((function(n,i){var a=t.apply(e,r);function u(t){o(a,n,i,u,c,"next",t)}function c(t){o(a,n,i,u,c,"throw",t)}u(void 0)}))}}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function u(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,(o=n.key,i=void 0,i=function(t,e){if("object"!==s(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!==s(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}(o,"string"),"symbol"===s(i)?i:String(i)),n)}var o,i}function c(t,e,r){return e&&u(t.prototype,e),r&&u(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}System.register(["./DialoguePage-legacy-1b900a4e.js","./index-legacy-7660dc9c.js","./ShowContactDetailsModal-legacy-05aff9de.js","./methods-legacy-5ff9f7fb.js","./ExploreContainer-legacy-b1f75c2b.js"],(function(r,o){"use strict";var u,l;return{setters:[function(t){u=t.W},function(t){l=t.Q},null,null,null],execute:function(){var o={};var f,h,p,d,v,y=function(t){return t&&t.__esModule?t:{default:t}},m={exports:{}};function g(){return f||(f=1,function(t){var e=function(t){var e,r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(D){l=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var i=e&&e.prototype instanceof g?e:g,a=Object.create(i.prototype),u=new T(n||[]);return o(a,"_invoke",{value:k(t,r,u)}),a}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(D){return{type:"throw",arg:D}}}t.wrap=f;var p="suspendedStart",d="suspendedYield",v="executing",y="completed",m={};function g(){}function w(){}function b(){}var R={};l(R,a,(function(){return this}));var E=Object.getPrototypeOf,x=E&&E(E(N([])));x&&x!==r&&n.call(x,a)&&(R=x);var O=b.prototype=g.prototype=Object.create(R);function L(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function _(t,e){function r(o,i,a,u){var c=h(t[o],t,i);if("throw"!==c.type){var l=c.arg,f=l.value;return f&&"object"===s(f)&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,u)}),(function(t){r("throw",t,a,u)})):e.resolve(f).then((function(t){l.value=t,a(l)}),(function(t){return r("throw",t,a,u)}))}u(c.arg)}var i;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return i=i?i.then(o,o):o()}})}function k(t,e,r){var n=p;return function(o,i){if(n===v)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return I()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=P(a,r);if(u){if(u===m)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===p)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=v;var c=h(t,e,r);if("normal"===c.type){if(n=r.done?y:d,c.arg===m)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=y,r.method="throw",r.arg=c.arg)}}}function P(t,r){var n=r.method,o=t.iterator[n];if(o===e)return r.delegate=null,"throw"===n&&t.iterator.return&&(r.method="return",r.arg=e,P(t,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),m;var i=h(o,t.iterator,r.arg);if("throw"===i.type)return r.method="throw",r.arg=i.arg,r.delegate=null,m;var a=i.arg;return a?a.done?(r[t.resultName]=a.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):a:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function S(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function j(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function T(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(S,this),this.reset(!0)}function N(t){if(t){var r=t[a];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,i=function r(){for(;++o<t.length;)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return i.next=i}}return{next:I}}function I(){return{value:e,done:!0}}return w.prototype=b,o(O,"constructor",{value:b,configurable:!0}),o(b,"constructor",{value:w,configurable:!0}),w.displayName=l(b,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===w||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,l(t,c,"GeneratorFunction")),t.prototype=Object.create(O),t},t.awrap=function(t){return{__await:t}},L(_.prototype),l(_.prototype,u,(function(){return this})),t.AsyncIterator=_,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new _(f(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},L(O),l(O,c,"Generator"),l(O,a,(function(){return this})),l(O,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=N,T.prototype={constructor:T,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(j),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return u.type="throw",u.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=n.call(a,"catchLoc"),s=n.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),j(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:N(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=e}catch(r){"object"===("undefined"==typeof globalThis?"undefined":s(globalThis))?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}}(m)),m.exports}!function(t){var e=y;Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(t){return o.apply(this,arguments)};var r=e(p?h:(p=1,h=g())),n=e(function(){if(v)return d;function t(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(s){return void r(s)}u.done?e(c):Promise.resolve(c).then(n,o)}return v=1,d=function(e){return function(){var r=this,n=arguments;return new Promise((function(o,i){var a=e.apply(r,n);function u(e){t(a,o,i,u,c,"next",e)}function c(e){t(a,o,i,u,c,"throw",e)}u(void 0)}))}},d}());function o(){return(o=(0,n.default)(r.default.mark((function t(e){var n,o;return r.default.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=document.createElement("video"),o=new Promise((function(t,e){n.addEventListener("loadedmetadata",(function(){n.duration===1/0?(n.currentTime=Number.MAX_SAFE_INTEGER,n.ontimeupdate=function(){n.ontimeupdate=null,t(n.duration),n.currentTime=0}):t(n.duration)})),n.onerror=function(t){return e(t.target.error)}})),n.src="string"==typeof e||e instanceof String?e:window.URL.createObjectURL(e),t.abrupt("return",o);case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}}(o);var w=l(o),b=function(){return new Error("FAILED_TO_RECORD")},R=function(){return new Error("RECORDING_HAS_NOT_STARTED")},E=function(){return new Error("FAILED_TO_FETCH_RECORDING")},x=["audio/aac","audio/webm;codecs=opus","audio/mp4","audio/webm","audio/ogg;codecs=opus"],O=function(){return new Promise((function(){}))},L=function(){function t(){a(this,t),this.mediaRecorder=null,this.chunks=[],this.pendingResult=O()}var e,r,o,u,s;return c(t,[{key:"startRecording",value:(s=i(n().mark((function e(){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null==this.mediaRecorder){e.next=2;break}throw new Error("ALREADY_RECORDING");case 2:return e.next=4,t.canDeviceVoiceRecord();case 4:if(e.sent.value){e.next=7;break}throw new Error("DEVICE_CANNOT_VOICE_RECORD");case 7:return e.next=9,t.hasAudioRecordingPermission().catch((function(){return{value:!0}}));case 9:if(e.sent.value){e.next=12;break}throw new Error("MISSING_PERMISSION");case 12:return e.abrupt("return",navigator.mediaDevices.getUserMedia({audio:!0}).then(this.onSuccessfullyStartedRecording.bind(this)).catch(this.onFailedToStartRecording.bind(this)));case 13:case"end":return e.stop()}}),e,this)}))),function(){return s.apply(this,arguments)})},{key:"stopRecording",value:(u=i(n().mark((function t(){return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(null!=this.mediaRecorder){t.next=2;break}throw R();case 2:return t.prev=2,this.mediaRecorder.stop(),this.mediaRecorder.stream.getTracks().forEach((function(t){return t.stop()})),t.abrupt("return",this.pendingResult);case 8:throw t.prev=8,t.t0=t.catch(2),E();case 11:return t.prev=11,this.prepareInstanceForNextOperation(),t.finish(11);case 14:case"end":return t.stop()}}),t,this,[[2,8,11,14]])}))),function(){return u.apply(this,arguments)})},{key:"pauseRecording",value:function(){if(null==this.mediaRecorder)throw R();return"recording"===this.mediaRecorder.state?(this.mediaRecorder.pause(),Promise.resolve({value:!0})):Promise.resolve({value:!1})}},{key:"resumeRecording",value:function(){if(null==this.mediaRecorder)throw R();return"paused"===this.mediaRecorder.state?(this.mediaRecorder.resume(),Promise.resolve({value:!0})):Promise.resolve({value:!1})}},{key:"getCurrentStatus",value:function(){return null==this.mediaRecorder?Promise.resolve({status:"NONE"}):"recording"===this.mediaRecorder.state?Promise.resolve({status:"RECORDING"}):"paused"===this.mediaRecorder.state?Promise.resolve({status:"PAUSED"}):Promise.resolve({status:"NONE"})}},{key:"onSuccessfullyStartedRecording",value:function(e){var r=this;return this.pendingResult=new Promise((function(o,a){r.mediaRecorder=new MediaRecorder(e),r.mediaRecorder.onerror=function(){r.prepareInstanceForNextOperation(),a(b())},r.mediaRecorder.onstop=i(n().mark((function e(){var i,u,c,s;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=(i=t.getSupportedMimeType())){e.next=5;break}return r.prepareInstanceForNextOperation(),a(E()),e.abrupt("return");case 5:if(!((u=new Blob(r.chunks,{type:i})).size<=0)){e.next=10;break}return r.prepareInstanceForNextOperation(),a(new Error("EMPTY_RECORDING")),e.abrupt("return");case 10:return e.next=12,t.blobToBase64(u);case 12:return c=e.sent,e.next=15,w(u);case 15:s=e.sent,r.prepareInstanceForNextOperation(),o({value:{recordDataBase64:c,mimeType:i,msDuration:1e3*s}});case 18:case"end":return e.stop()}}),e)}))),r.mediaRecorder.ondataavailable=function(t){return r.chunks.push(t.data)},r.mediaRecorder.start()})),{value:!0}}},{key:"onFailedToStartRecording",value:function(){throw this.prepareInstanceForNextOperation(),b()}},{key:"prepareInstanceForNextOperation",value:function(){if(null!=this.mediaRecorder&&"recording"===this.mediaRecorder.state)try{this.mediaRecorder.stop()}catch(t){}this.pendingResult=O(),this.mediaRecorder=null,this.chunks=[]}}],[{key:"canDeviceVoiceRecord",value:(o=i(n().mark((function e(){var r;return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!=(null===(r=null===navigator||void 0===navigator?void 0:navigator.mediaDevices)||void 0===r?void 0:r.getUserMedia)&&null!=t.getSupportedMimeType()){e.next=4;break}return e.abrupt("return",{value:!1});case 4:return e.abrupt("return",{value:!0});case 5:case"end":return e.stop()}}),e)}))),function(){return o.apply(this,arguments)})},{key:"hasAudioRecordingPermission",value:(r=i(n().mark((function t(){return n().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.abrupt("return",navigator.permissions.query({name:"microphone"}).then((function(t){return{value:"granted"===t.state}})).catch((function(){throw new Error("COULD_NOT_QUERY_PERMISSION_STATUS")})));case 1:case"end":return t.stop()}}),t)}))),function(){return r.apply(this,arguments)})},{key:"requestAudioRecordingPermission",value:(e=i(n().mark((function e(){return n().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.hasAudioRecordingPermission().catch((function(){return{value:!1}}));case 2:if(!e.sent.value){e.next=5;break}return e.abrupt("return",{value:!0});case 5:return e.abrupt("return",navigator.mediaDevices.getUserMedia({audio:!0}).then((function(){return{value:!0}})).catch((function(){return{value:!1}})));case 6:case"end":return e.stop()}}),e)}))),function(){return e.apply(this,arguments)})},{key:"getSupportedMimeType",value:function(){if(null==(null===MediaRecorder||void 0===MediaRecorder?void 0:MediaRecorder.isTypeSupported))return null;var t=x.find((function(t){return MediaRecorder.isTypeSupported(t)}));return null!=t?t:null}},{key:"blobToBase64",value:function(t){return new Promise((function(e){var r=new FileReader;r.onloadend=function(){var t=String(r.result),n=t.split("base64,"),o=n.length>1?n[1]:t;e(o.trim())},r.readAsDataURL(t)}))}}]),t}(),_=function(r){!function(e,r){if("function"!=typeof r&&null!==r)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(r&&r.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),r&&t(e,r)}(o,r);var n=e(o);function o(){var t;return a(this,o),(t=n.apply(this,arguments)).voiceRecorderInstance=new L,t}return c(o,[{key:"canDeviceVoiceRecord",value:function(){return L.canDeviceVoiceRecord()}},{key:"hasAudioRecordingPermission",value:function(){return L.hasAudioRecordingPermission()}},{key:"requestAudioRecordingPermission",value:function(){return L.requestAudioRecordingPermission()}},{key:"startRecording",value:function(){return this.voiceRecorderInstance.startRecording()}},{key:"stopRecording",value:function(){return this.voiceRecorderInstance.stopRecording()}},{key:"pauseRecording",value:function(){return this.voiceRecorderInstance.pauseRecording()}},{key:"resumeRecording",value:function(){return this.voiceRecorderInstance.resumeRecording()}},{key:"getCurrentStatus",value:function(){return this.voiceRecorderInstance.getCurrentStatus()}}]),o}(u);r("VoiceRecorderWeb",_)}}}))}();
