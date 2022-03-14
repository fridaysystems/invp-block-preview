!function(){"use strict";var e,n={101:function(){var e=window.wp.blocks;function n(){return n=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},n.apply(this,arguments)}var t=window.wp.element,r=window.wp.i18n,l=window.wp.blockEditor,o=window.wp.data,a=window.wp.coreData,s=window.wp.components;(0,e.registerBlockType)("create-block/invp-fuel-economy",{edit:function(e){let{attributes:i,setAttributes:c}=e;const u=(0,l.useBlockProps)(),_=(0,o.useSelect)((e=>e("core/editor").getCurrentPostType()),[]),[m,p]=(0,a.useEntityProp)("postType",_,"meta"),v=m.inventory_presser_fuel_economy_1_name,y=m.inventory_presser_fuel_economy_1_combined,d=e=>{p({...m,inventory_presser_fuel_economy_1_combined:e})},f=m.inventory_presser_fuel_economy_1_city,h=e=>{p({...m,inventory_presser_fuel_economy_1_city:e})},b=m.inventory_presser_fuel_economy_1_highway,g=e=>{p({...m,inventory_presser_fuel_economy_1_highway:e})},E={count:0};if(""!=m.inventory_presser_fuel_economy_1_city&&E.count++,""!=m.inventory_presser_fuel_economy_2_city&&E.count++,0==E.count)return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(l.BlockControls,null),(0,t.createElement)(s.Placeholder,n({},u,{label:"Fuel Economy",instructions:"No miles per gallon data saved for this vehicle."}),(0,t.createElement)(s.TextControl,{label:"Combined MPG",tagName:"p",onChange:d,value:y}),(0,t.createElement)(s.TextControl,{label:"Highway MPG",tagName:"p",onChange:g,value:b}),(0,t.createElement)(s.TextControl,{label:"City MPG",tagName:"p",onChange:h,value:f})));const C=[(0,t.createElement)(t.Fragment,null,(0,t.createElement)("div",{class:"fuel-name"},(0,t.createElement)(s.TextControl,{label:"Fuel 1 Name",tagName:"p",onChange:e=>{p({...m,inventory_presser_fuel_economy_1_name:e})},value:v,hideLabelFromVision:"true"})),(0,t.createElement)("div",{class:"fuel-economy-fuel"},(0,t.createElement)("div",{class:"fuel-economy-combined"},(0,t.createElement)("span",{class:"number"},(0,t.createElement)(s.TextControl,{label:"Combined MPG",tagName:"p",onChange:d,value:y,hideLabelFromVision:"true"}))),(0,t.createElement)("div",{class:"fuel-economy-combined-label"},(0,r.__)("combined","inventory-presser")),(0,t.createElement)("div",{class:"mpg"},(0,r.__)("MPG","inventory-presser"),(0,t.createElement)("svg",{class:"fuel-pump",xmlns:"http://www.w3.org/2000/svg",width:"792",height:"720",viewBox:"0 0 792 720"},(0,t.createElement)("path",{class:"fuel-pump-img",d:"M598.1 406c0 74.3-0.1 160.3-0.1 234.6 0 7.3 0.1 14.9 0 22.2 -0.2 29.6-1 29.6-31.6 29.6 -96.7 0.1-193.4 0-290.1-0.1 -19.1 0-38.3-0.1-58.3 0 -23.7 0.1-24.7-0.9-24.7-29.4 0.3-186.6-0.3-373.3-0.3-560 0-47.1 28.1-74.7 76.8-75 79.1-0.5 158.2-0.5 237.3-0.1 15.2 0.1 30.9 1.9 45.6 5.6 26 6.7 45.6 29.1 45.1 54.9 -0.1 3 0.3 26.1 0.3 26.1s10.2 11.7 25.5 24.5c23.7 20.1 44.9 42.9 67.7 64.1 21.8 20.2 31.2 45 31.5 73.3 0.3 35.7 2 71.4-0.5 106.9 -2.6 36.4 8 76.7 28.7 105.9 21.8 30.8 38.2 76.5 25.4 124.7 -15.5 44.3-40.7 63.6-91.2 60.2 -35.5-2.4-63-30.7-63.6-67.8 -0.7-46.1 0.3-92.3-0.1-138.4 -0.1-13.5 0-32.6-0.7-46.1C619.9 403.3 608.9 406 598.1 406zM285.7 73.3c-33.7-0.1-49.4 13.7-49.4 46 0 42.7 0.1 85.6 0.1 128.7 0 27.3 10 40.2 37.5 41.2 79.8 2.7 164.7 4 244.6 3 24.6-0.3 38.9-18.4 38.9-42.2 0.1-44-0.1-90-0.1-131.8 0-32.9-12.6-43-46.4-43.9C474.7 73.1 322.9 73.4 285.7 73.3zM598.5 378.7c53.8 0 51.5 20.6 52.1 67.6 0.6 50.3 1.1 100.5 1.3 150.8 0.2 43.6 26 49.5 46.3 48.4 27.1-1.5 47-22.7 49.1-49.7 2.2-27.9-1.6-54.6-16.8-78.5 -29-45.7-44.7-93.7-38.6-148.8 1.2-10.7-9-25.1-16.5-32.5 -55.2-53.9-45.9-58-46.4-111.9 0-4.1-0.8-41.9-0.8-41.9l-29.6-26.9C598.5 155.5 598.5 312.3 598.5 378.7z"}))),(0,t.createElement)("div",{class:"fuel-economy-city"},(0,t.createElement)("span",{class:"number"},(0,t.createElement)(s.TextControl,{label:"City MPG",tagName:"p",onChange:h,value:f,hideLabelFromVision:"true"}))),(0,t.createElement)("div",{class:"fuel-economy-city-label"},(0,r.__)("city","inventory-presser")),(0,t.createElement)("div",{class:"fuel-economy-highway"},(0,t.createElement)("span",{class:"number"},(0,t.createElement)(s.TextControl,{label:"City MPG",tagName:"p",onChange:g,value:b,hideLabelFromVision:"true"}))),(0,t.createElement)("div",{class:"fuel-economy-highway-label"},(0,r.__)("highway","inventory-presser"))))];if(i.includeAnnualStats){const e=m.inventory_presser_fuel_economy_1_five_year_savings,n=e=>{p({...m,inventory_presser_fuel_economy_1_five_year_savings:e})},l=m.inventory_presser_fuel_economy_1_annual_consumption,o=e=>{p({...m,inventory_presser_fuel_economy_1_annual_consumption:e})},a=m.inventory_presser_fuel_economy_1_annual_cost,i=e=>{p({...m,inventory_presser_fuel_economy_1_annual_cost:e})},c=m.inventory_presser_fuel_economy_1_annual_emissions,u=e=>{p({...m,inventory_presser_fuel_economy_1_annual_emissions:e})};C.push((0,t.createElement)("dl",{class:"fuel-economy-annual-stats"},(0,t.createElement)("dt",null,(0,r.__)("Five year savings compared to average vehicle","inventory-presser")),(0,t.createElement)("dd",null,"$"," ",(0,t.createElement)(s.TextControl,{value:e,label:(0,r.__)("Five year savings compared to average vehicle","inventory-presser"),hideLabelFromVision:"true",onChange:n})),(0,t.createElement)("dt",null,(0,r.__)("Annual fuel consumption","inventory-presser")),(0,t.createElement)("dd",null,(0,t.createElement)(s.TextControl,{value:l,label:(0,r.__)("Annual fuel consumption","inventory-presser"),hideLabelFromVision:"true",onChange:o})," ",(0,r.__)("barrels","inventory-presser")),(0,t.createElement)("dt",null,(0,r.__)("Annual fuel cost","inventory-presser")),(0,t.createElement)("dd",null,"$"," ",(0,t.createElement)(s.TextControl,{value:a,label:(0,r.__)("Annual fuel cost","inventory-presser"),hideLabelFromVision:"true",onChange:i})),(0,t.createElement)("dt",null,(0,r.__)("Annual tailpipe CO2 emissions","inventory-presser")),(0,t.createElement)("dd",null,(0,t.createElement)(s.TextControl,{value:c,label:(0,r.__)("Annual tailpipe CO2 emissions","inventory-presser"),hideLabelFromVision:"true",onChange:u})," ",(0,r.__)("grams per mile","inventory-presser"))))}return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(l.BlockControls,null),(0,t.createElement)(l.InspectorControls,null,(0,t.createElement)(s.PanelBody,{title:(0,r.__)("Fuel Economy Settings","inventory-presser"),initialOpen:!0},(0,t.createElement)(s.PanelRow,null,(0,t.createElement)("fieldset",null,(0,t.createElement)(s.CheckboxControl,{label:(0,r.__)("Show Annual Stats","inventory-presser"),help:(0,r.__)("Include annual consumption, cost, and emissions?","inventory-presser"),checked:i.includeAnnualStats,onChange:()=>{c({includeAnnualStats:!i.includeAnnualStats})}}))))),(0,t.createElement)("div",u,C))},save:function(){return null}})}},t={};function r(e){var l=t[e];if(void 0!==l)return l.exports;var o=t[e]={exports:{}};return n[e](o,o.exports,r),o.exports}r.m=n,e=[],r.O=function(n,t,l,o){if(!t){var a=1/0;for(u=0;u<e.length;u++){t=e[u][0],l=e[u][1],o=e[u][2];for(var s=!0,i=0;i<t.length;i++)(!1&o||a>=o)&&Object.keys(r.O).every((function(e){return r.O[e](t[i])}))?t.splice(i--,1):(s=!1,o<a&&(a=o));if(s){e.splice(u--,1);var c=l();void 0!==c&&(n=c)}}return n}o=o||0;for(var u=e.length;u>0&&e[u-1][2]>o;u--)e[u]=e[u-1];e[u]=[t,l,o]},r.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},function(){var e={206:0,254:0};r.O.j=function(n){return 0===e[n]};var n=function(n,t){var l,o,a=t[0],s=t[1],i=t[2],c=0;if(a.some((function(n){return 0!==e[n]}))){for(l in s)r.o(s,l)&&(r.m[l]=s[l]);if(i)var u=i(r)}for(n&&n(t);c<a.length;c++)o=a[c],r.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return r.O(u)},t=self.webpackChunkinvp_block_boilerplate=self.webpackChunkinvp_block_boilerplate||[];t.forEach(n.bind(null,0)),t.push=n.bind(null,t.push.bind(t))}();var l=r.O(void 0,[254],(function(){return r(101)}));l=r.O(l)}();