!function(){"use strict";var e=window.wp.blocks,t=window.wp.element,o=window.wp.i18n,n=window.wp.blockEditor,r=window.wp.components,s=window.wp.data,a=window.wp.coreData;(0,e.registerBlockType)("inventory-presser/invp-hours-day",{edit:function(e){let{attributes:l,setAttributes:i}=e;const c=(0,n.useBlockProps)(),u=(p="location",(0,s.useSelect)((e=>{const t=["taxonomy",p,{per_page:-1,hide_empty:!1,context:"view"}],{getEntityRecords:o,isResolving:n}=e(a.store),r=o(...t);return{terms:r,isLoading:n("getEntityRecords",t),hasTerms:!(null==r||!r.length)}}),[p]));var p;const d=[];u.hasTerms&&(d.push({label:(0,o.__)("Please choose","inventory-presser"),value:0}),u.terms.forEach((e=>{d.push({label:e.name,value:e.id})})));const h=[];return u.hasTerms&&u.terms.forEach((e=>{e.id==l.location&&0!=e.id&&Object.keys(e.meta).forEach((t=>{if(new RegExp("hours_[0-9]_uid").test(t)&&""!=e.meta[t]){var o=e.meta["hours_"+t.replace(/[^0-9]+/g,"")+"_title"];h.push({label:o,value:e.meta[t]})}}))})),(0,t.createElement)(t.Fragment,null,(0,t.createElement)(n.BlockControls,null),(0,t.createElement)("div",c,(0,t.createElement)(r.Placeholder,{label:(0,o.__)("Hours Today","inventory-presser"),instructions:(0,o.__)("A sentence describing the car lot's hours today or the next day it is open.","inventory-presser")},(0,t.createElement)(r.SelectControl,{label:(0,o.__)("Location","inventory-presser"),value:l.location,options:d,onChange:e=>{i({location:parseInt(e)})}}),(0,t.createElement)(r.SelectControl,{label:(0,o.__)("Hours","inventory-presser"),value:l.hoursUid,options:h,onChange:e=>{i({hoursUid:e})}}))))},save:function(){return null}})}();