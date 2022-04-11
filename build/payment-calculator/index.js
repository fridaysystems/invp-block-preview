!function(){"use strict";var e=window.wp.blocks;function l(){return l=Object.assign||function(e){for(var l=1;l<arguments.length;l++){var t=arguments[l];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},l.apply(this,arguments)}var t=window.wp.element,a=window.wp.i18n,n=window.wp.blockEditor,o=window.wp.components,r=window.wp.data,c=window.wp.coreData;(0,e.registerBlockType)("create-block/invp-payment-calculator",{edit:function(e){var u;let{attributes:i,setAttributes:p}=e;const m=(0,n.useBlockProps)(),s=(0,r.useSelect)((e=>e("core/editor").getCurrentPostType()),[]),[v,_]=(0,c.useEntityProp)("postType",s,"meta");function d(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,l=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;var a=v[invp_blocks.meta_prefix+"price"],n=e||i.trade,o=l||i.apr,r=t||i.term,c=12,u=0;u=0==(o/=100*c)?r:(1-1/Math.pow(1+o,r))/o,console.log(a),console.log(i),console.log("term: "+r),console.log(u);var p=Math.round((a-n)/u*100)/100;console.log(p);var m=h(p);return console.log(m),m}function h(e){e=e.toString().replace(/\$|\,/g,""),isNaN(e)&&(e="0");var l=e==(e=Math.abs(e)),t=(e=Math.floor(100*e+.50000000001))%100;e=Math.floor(e/100).toString(),t<10&&(t="0"+t);for(var a=0;a<Math.floor((e.length-(1+a))/3);a++)e=e.substring(0,e.length-(4*a+3))+","+e.substring(e.length-(4*a+3));return(l?"":"-")+"$"+e+"."+t}return(0,t.createElement)(t.Fragment,null,(0,t.createElement)(n.InspectorControls,null,(0,t.createElement)(o.PanelBody,{title:(0,a.__)("Payment Calculator Settings","invp-payment-calculator"),initialOpen:!0},(0,t.createElement)(o.PanelRow,null,(0,t.createElement)("fieldset",null,(0,t.createElement)(o.TextControl,{label:(0,a.__)("Default APR","invp-payment-calculator"),help:(0,a.__)("What annual percentage rate should be pre-filled?","invp-payment-calculator"),value:i.defaultAPR,onChange:e=>{p({defaultAPR:e.replace(/[^0-9\.]+/g,"")})}}))))),(0,t.createElement)(n.BlockControls,null),(0,t.createElement)("div",l({},m,{id:"payment_calculator"}),(0,t.createElement)("ul",null,(0,t.createElement)("li",null,(0,t.createElement)(o.TextControl,{label:(0,a.__)("Cash/trade","invp-payment-calculator"),id:"trade",value:i.trade,onChange:e=>{e=e.replace(/[^0-9\.]+/g,""),p({trade:e}),p({payment:d(e)})}})),(0,t.createElement)("li",null,(0,t.createElement)(o.TextControl,{label:(0,a.__)("APR %*","invp-payment-calculator"),id:"apr",value:null!==(u=i.APR)&&void 0!==u?u:i.defaultAPR,onChange:e=>{e=e.replace(/[^0-9\.]+/g,""),p({APR:e}),p({payment:d(null,e)})}})),(0,t.createElement)("li",null,(0,t.createElement)(o.SelectControl,{label:(0,a.__)("Term","invp-payment-calculator"),id:"term",value:i.defaultTerm,options:[{label:(0,a.__)("12 months","invp-payment-calculator"),value:"12"},{label:(0,a.__)("18 months","invp-payment-calculator"),value:"18"},{label:(0,a.__)("24 months","invp-payment-calculator"),value:"24"},{label:(0,a.__)("30 months","invp-payment-calculator"),value:"30"},{label:(0,a.__)("36 months","invp-payment-calculator"),value:"36"},{label:(0,a.__)("42 months","invp-payment-calculator"),value:"42"},{label:(0,a.__)("48 months","invp-payment-calculator"),value:"48"},{label:(0,a.__)("60 months","invp-payment-calculator"),value:"60"},{label:(0,a.__)("72 months","invp-payment-calculator"),value:"72"},{label:(0,a.__)("84 months","invp-payment-calculator"),value:"84"}]})),(0,t.createElement)("li",null,(0,t.createElement)(o.TextControl,{label:(0,a.__)("Payment","invp-payment-calculator"),id:"payment",value:d,onChange:()=>{p({payment:d()})}}))),(0,t.createElement)("p",null,"*",i.disclaimer),(0,t.createElement)("input",{type:"hidden",id:"loan_amount",value:v[invp_blocks.meta_prefix+"price"]})))},save:function(){return null}})}();