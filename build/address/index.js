!function(){"use strict";var e=window.wp.blocks,n=window.wp.element,t=window.wp.i18n,l=window.wp.blockEditor,r=window.wp.components,o=window.wp.data,s=window.wp.coreData;(0,e.registerBlockType)("inventory-presser/invp-address",{edit:function(e){let{attributes:i,setAttributes:a}=e;const c=(0,l.useBlockProps)(),d=(p="location",(0,o.useSelect)((e=>{const n=["taxonomy",p,{per_page:-1,hide_empty:!1,context:"view"}],{getEntityRecords:t,isResolving:l}=e(s.store),r=t(...n);return{terms:r,isLoading:l("getEntityRecords",n),hasTerms:!(null==r||!r.length)}}),[p]));var p;const u=e=>{var n=[],t=document.getElementsByName("locations");if(t)for(var l=0;l<t.length;l++)t[l].checked&&n.push(parseInt(t[l].value));console.log(n),a({locations:n})},m=[],h=[];return d.hasTerms&&d.terms.forEach((e=>{if(m.push((0,n.createElement)("li",null,(0,n.createElement)(r.CheckboxControl,{label:e.name,name:"locations",value:e.id,checked:-1!==i.locations.indexOf(e.id),onChange:u}))),i.locations.length){if(-1===i.locations.indexOf(e.id))return;i.singleLine?h.push((0,n.createElement)("span",null,e.description.replace("\n",", ")," ")):h.push((0,n.createElement)("div",{dangerouslySetInnerHTML:{__html:(t=e.description,(t+"").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g,"$1<br />$2"))}}))}var t})),0==i.locations.length&&h.push([(0,n.createElement)(r.Placeholder,{label:(0,t.__)("Address","inventory-presser"),instructions:(0,t.__)("Displays addresses from the locations taxonomy. Choose an address in the block settings panel.","inventory-presser")})]),(0,n.createElement)(n.Fragment,null,(0,n.createElement)(l.BlockControls,null),(0,n.createElement)(l.InspectorControls,null,(0,n.createElement)(r.PanelBody,{title:(0,t.__)("Settings","inventory-presser"),initialOpen:!0},(0,n.createElement)(r.PanelRow,null,(0,n.createElement)("fieldset",null,(0,n.createElement)("h3",null,(0,t.__)("Addresses to Show","inventory-presser")),(0,n.createElement)("ul",{className:"locations"},m))),(0,n.createElement)(r.PanelRow,null,(0,n.createElement)("fieldset",null,(0,n.createElement)("h3",null,(0,t.__)("Other Settings","inventory-presser")),(0,n.createElement)(r.CheckboxControl,{label:(0,t.__)("Display on Single Line","inventory-presser"),help:(0,t.__)("Turn on for an inline <span>. Default behavior is a <div> containing line breaks.","inventory-presser"),checked:i.singleLine,onChange:e=>{a({singleLine:e})}}))))),(0,n.createElement)("div",c,h))},save:function(){return null}})}();