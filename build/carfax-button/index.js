!function(){"use strict";var e=window.wp.blocks;function t(){return t=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},t.apply(this,arguments)}var r=window.wp.element,n=(window.wp.i18n,window.wp.blockEditor),o=window.wp.components,a=window.wp.data,c=window.wp.coreData;(0,e.registerBlockType)("create-block/invp-carfax-button",{edit:function(){const e=(0,n.useBlockProps)(),l=(0,a.useSelect)((e=>e("core/editor").getCurrentPostType()),[]),[i,s]=(0,c.useEntityProp)("postType",l,"meta"),p=""==i[invp_blocks.meta_prefix+"carfax_url_report"]?"http://www.carfax.com/VehicleHistory/p/Report.cfx?vin="+i[invp_blocks.meta_prefix+"vin"]:i[invp_blocks.meta_prefix+"carfax_url_report"],u=i[invp_blocks.meta_prefix+"carfax_url_icon"],f=function(){const e=(0,a.useSelect)((e=>e("core").getSite()),[]);return e?e.url:null}()+"/wp-content/plugins/inventory-presser/images/show-me-carfax"+("1"==i[invp_blocks.meta_prefix+"carfax_one_owner"]?"-1-owner":"")+".svg",w=""==u?f:u;return invp_blocks.use_carfax_provided_buttons&&""==u?(0,r.createElement)(r.Fragment,null,(0,r.createElement)(n.BlockControls,null),(0,r.createElement)(o.Placeholder,t({},e,{label:"Carfax Button",instructions:"No button URL saved for this vehicle. The site is configured to use Carfax-provided buttons at Vehicles → Options."}),(0,r.createElement)(o.TextControl,{label:"Carfax Button URL",tagName:"p",onChange:e=>{s({...i,[invp_blocks.meta_prefix+"carfax_url_icon"]:e})},value:u}))):(0,r.createElement)(r.Fragment,null,(0,r.createElement)(n.BlockControls,null),(0,r.createElement)("div",t({className:"carfax-wrapper"},e),(0,r.createElement)("a",{href:p,target:"_blank",rel:"noopener noreferrer"},(0,r.createElement)("img",{src:w,alt:"SHOW ME THE CARFAX"}))))},save:function(){return null}})}();