import{d as S,u as A,r as c,o as _,c as I,w as e,a as t,b as n,e as x,I as b,f as m,g as f,h as v,i as h,t as C,j as E,k as L,l as B,S as $,m as N,n as P,p as F,q as V,s as W,F as z,v as K,x as R,y as j,z as q,A as H,_ as O}from"./index-2f13bec8.js";import{g as G,p as J,a as y}from"./methods-607f4662.js";const M=["src"],Q={key:0,class:"contactUsername"},X={key:1},Y=S({__name:"ChatElement",props:{avatarSrc:String,contactUserID:String,contactUsername:String,contactEmail:String,lastAccessTimestamp:String},setup(a){const r=A();function p(u,s,i){try{const l=new CustomEvent("openDialogue",{detail:{user:u,user_id:s,email:i}}),o=G();r.updateTimestampOfActiveChatWithID(s,o),r.setLastActiveChatWasWithID(s),window.dispatchEvent(l)}catch(l){}finally{B.push("/tabs/dialogue")}}async function d(u){$.fire({title:"Chat mit Kontakt löschen?",showCancelButton:!0,confirmButtonText:"Löschen",denyButtonText:"Don't save",heightAuto:!1}).then(async s=>{if(s.isConfirmed)try{r.deleteFromActiveChats(u),r.resetCurrentDialoguePartner(),await J("Chat erfolgreich gelöscht")}catch(i){await y("Fehler beim Löschen des Chats")}else await y("Chat konnte nicht gelöscht werden")})}return(u,s)=>{const i=c("ion-icon"),l=c("ion-item-option"),o=c("ion-item-options"),g=c("ion-col"),U=c("ion-row"),w=c("ion-grid"),D=c("ion-item"),T=c("ion-item-sliding");return _(),I(T,null,{default:e(()=>[t(o,{side:"start"},{default:e(()=>[t(l,{color:"success"},{default:e(()=>[t(i,{slot:"icon-only",icon:n(x)},null,8,["icon"])]),_:1})]),_:1}),t(D,{onClick:s[0]||(s[0]=k=>p(a.contactUsername,a.contactUserID,a.contactEmail))},{default:e(()=>[t(w,null,{default:e(()=>[t(U,null,{default:e(()=>[t(g,{size:"auto"},{default:e(()=>[t(n(b),{id:"contactAvatar"},{default:e(()=>[m("img",{src:a.avatarSrc},null,8,M)]),_:1})]),_:1}),t(g,null,{default:e(()=>[a.contactUsername?(_(),f("div",Q,[t(n(v),null,{default:e(()=>[h(C(a.contactUsername),1)]),_:1})])):(_(),f("div",X,[t(n(v),null,{default:e(()=>[h(C(a.contactUserID),1)]),_:1})]))]),_:1}),t(g,null,{default:e(()=>[t(n(v),{id:"lastTimestamp"},{default:e(()=>[h("["+C(a.lastAccessTimestamp)+"]",1)]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}),t(o,{side:"end"},{default:e(()=>[t(l,null,{default:e(()=>[t(i,{slot:"icon-only",icon:n(E)},null,8,["icon"])]),_:1}),t(l,{color:"danger"},{default:e(()=>[t(i,{slot:"icon-only",icon:n(L),onClick:s[1]||(s[1]=k=>d(a.contactUserID))},null,8,["icon"])]),_:1})]),_:1})]),_:1})}}});const Z=a=>(q("data-v-b8ab7859"),a=a(),H(),a),tt={key:0},et=Z(()=>m("div",{align:"center"},[m("h1",{id:"forever-alone-head"},"🧐"),m("h3",null,"Nothing to see here ...")],-1)),nt=[et],at=S({__name:"ChatsPage",setup(a){const r=A();return(p,d)=>{const u=c("ion-refresher-content"),s=c("ion-refresher"),i=c("ion-item"),l=c("ion-list");return _(),I(n(j),null,{default:e(()=>[t(n(N),{message:"Lade Kontakte ..."}),t(n(R),null,{default:e(()=>[t(n(P),null,{default:e(()=>[t(n(F),null,{default:e(()=>[h("Chats")]),_:1})]),_:1}),t(n(V),{fullscreen:!0},{default:e(()=>[t(s,{slot:"fixed","pull-factor":.5,"pull-min":100,"pull-max":200,onIonRefresh:d[0]||(d[0]=o=>p.handleRefresh(o))},{default:e(()=>[t(u)]),_:1}),t(l,{id:"chatsList"},{default:e(()=>[(_(!0),f(z,null,W(n(r).getActiveChats,o=>(_(),I(i,{key:o.user_id,id:"chatElement"},{default:e(()=>[t(Y,{avatarSrc:o.avatarUrl,lastAccessTimestamp:o.lastAccessTimestamp,contactUserID:o.user_id,contactUsername:o.user,contactEmail:o.email},null,8,["avatarSrc","lastAccessTimestamp","contactUserID","contactUsername","contactEmail"])]),_:2},1024))),128))]),_:1}),n(r).getActiveChats.length==0?(_(),f("div",tt,nt)):K("",!0)]),_:1})]),_:1})]),_:1})}}});const ct=O(at,[["__scopeId","data-v-b8ab7859"]]);export{ct as default};
