(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-271f65a0","chunk-339954f1"],{6374:function(e,t,n){"use strict";n.r(t);n("4e82");var c=n("7a23"),r=Object(c["createTextVNode"])("目录"),o=Object(c["createTextVNode"])("菜单"),a=Object(c["createTextVNode"])("按钮"),l={class:"icon-wrap"},i=Object(c["createVNode"])("br",null,null,-1),u={class:"dialog-footer"};function d(e,t,n,d,s,b){var p=Object(c["resolveComponent"])("el-radio"),f=Object(c["resolveComponent"])("el-radio-group"),m=Object(c["resolveComponent"])("el-form-item"),j=Object(c["resolveComponent"])("el-input"),O=Object(c["resolveComponent"])("el-cascader"),v=Object(c["resolveComponent"])("el-input-number"),h=Object(c["resolveComponent"])("gl-button"),k=Object(c["resolveComponent"])("gl-svg"),g=Object(c["resolveComponent"])("el-button"),V=Object(c["resolveComponent"])("el-popover"),_=Object(c["resolveComponent"])("el-form"),y=Object(c["resolveComponent"])("el-dialog"),w=Object(c["resolveDirective"])("loading"),C=Object(c["resolveDirective"])("repeat");return Object(c["openBlock"])(),Object(c["createBlock"])(y,{width:"500px",title:e.form.id?"编辑":"新增",modelValue:e.visible,"onUpdate:modelValue":t[13]||(t[13]=function(t){return e.visible=t}),"close-on-click-modal":!1,onClosed:e.dialogClosedHandle},{footer:Object(c["withCtx"])((function(){return[Object(c["createVNode"])("span",u,[Object(c["createVNode"])(h,{sort:"cancel",onClick:t[11]||(t[11]=function(t){return e.visible=!1})}),Object(c["withDirectives"])(Object(c["createVNode"])(h,{sort:"confirm",type:"primary",onClick:t[12]||(t[12]=function(t){return e.submit()})},null,512),[[C]])])]})),default:Object(c["withCtx"])((function(){return[Object(c["withDirectives"])(Object(c["createVNode"])(_,{model:e.form,rules:e.rules,ref:"refForm",onKeyup:t[10]||(t[10]=Object(c["withKeys"])((function(t){return e.submit()}),["enter"])),"label-position":"top"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(m,{label:"类型",prop:"type"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(f,{modelValue:e.form.type,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.form.type=t})},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(p,{label:0},{default:Object(c["withCtx"])((function(){return[r]})),_:1}),Object(c["createVNode"])(p,{label:1},{default:Object(c["withCtx"])((function(){return[o]})),_:1}),Object(c["createVNode"])(p,{label:2},{default:Object(c["withCtx"])((function(){return[a]})),_:1})]})),_:1},8,["modelValue"])]})),_:1}),Object(c["createVNode"])(m,{label:"中文名称",prop:"name_cn"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(j,{modelValue:e.form.name_cn,"onUpdate:modelValue":t[2]||(t[2]=function(t){return e.form.name_cn=t}),placeholder:"中文名称"},null,8,["modelValue"])]})),_:1}),Object(c["createVNode"])(m,{label:"英文名称",prop:"name_en"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(j,{modelValue:e.form.name_en,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.form.name_en=t}),placeholder:"英文名称"},null,8,["modelValue"])]})),_:1}),Object(c["createVNode"])(m,{label:"上级",prop:"parent_id"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(O,{modelValue:e.form.parent_id,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.form.parent_id=t}),options:e.menus,props:e.menusProps,"show-all-levels":!1},null,8,["modelValue","options","props"])]})),_:1}),1===e.form.type||2===e.form.type?(Object(c["openBlock"])(),Object(c["createBlock"])(m,{key:0,label:"URL",prop:"url"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(j,{modelValue:e.form.url,"onUpdate:modelValue":t[5]||(t[5]=function(t){return e.form.url=t}),placeholder:"URL"},null,8,["modelValue"])]})),_:1})):Object(c["createCommentVNode"])("",!0),0!==e.form.type?(Object(c["openBlock"])(),Object(c["createBlock"])(m,{key:1,label:"授权标识",prop:"permission"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(j,{modelValue:e.form.permission,"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.form.permission=t}),placeholder:"授权标识"},null,8,["modelValue"])]})),_:1})):Object(c["createCommentVNode"])("",!0),Object(c["createVNode"])(m,{label:"排序",prop:"sort"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(v,{modelValue:e.form.sort,"onUpdate:modelValue":t[7]||(t[7]=function(t){return e.form.sort=t}),"controls-position":"right",min:0,label:"排序"},null,8,["modelValue"])]})),_:1}),2!==e.form.type?(Object(c["openBlock"])(),Object(c["createBlock"])(m,{key:2,label:"图标",prop:"icon"},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(V,{trigger:"click",placement:"top","popper-class":"popper-menu-add-edit",width:"330px"},{reference:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(j,{modelValue:e.form.icon,"onUpdate:modelValue":t[9]||(t[9]=function(t){return e.form.icon=t}),placeholder:"图标",readonly:""},null,8,["modelValue"])]})),default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])("div",l,[Object(c["createVNode"])(h,{sort:"clear",type:"text",onClick:t[8]||(t[8]=function(t){return e.form.icon=""})}),i,(Object(c["openBlock"])(!0),Object(c["createBlock"])(c["Fragment"],null,Object(c["renderList"])(e.icons,(function(t,n){return Object(c["openBlock"])(),Object(c["createBlock"])(g,{key:n,class:[{"is-active":t===e.form.icon},"icon-btn"],size:"mini",onClick:function(n){return e.iconActiveHandle(t)}},{default:Object(c["withCtx"])((function(){return[Object(c["createVNode"])(k,{name:t},null,8,["name"])]})),_:2},1032,["class","onClick"])})),128))])]})),_:1})]})),_:1})):Object(c["createCommentVNode"])("",!0)]})),_:1},8,["model","rules"]),[[w,e.loading]])]})),_:1},8,["title","modelValue","onClosed"])}var s=n("5530"),b=n("1da1"),p=(n("96cf"),n("acfb")),f=n("f36f"),m=n("ed08"),j=n("1530"),O=Object(c["defineComponent"])({emits:["refresh"],setup:function(e,t){var n=t.emit,r=Object(p["a"])(),o=r.$message,a=Object(c["ref"])(),l=Object(c["reactive"])({visible:!1,loading:!1,icons:[],menus:[],form:{id:null,parent_id:0,name_cn:"",name_en:"",url:"",type:1,permission:"",icon:null,sort:0}}),i=Object(c["reactive"])(function(){var e=function(e,t,n){1!==l.form.type||/(?:[\0-\x08\x0E-\x1F!-\x9F\xA1-\u167F\u1681-\u1FFF\u200B-\u2027\u202A-\u202E\u2030-\u205E\u2060-\u2FFF\u3001-\uD7FF\uE000-\uFEFE\uFF00-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/.test(t)?n():n(new Error("请输入URL"))};return{name_cn:[{required:!0,message:"请输入中文名称",trigger:"blur"}],name_en:[{required:!0,message:"请输入英文名称",trigger:"blur"}],parent_id:[{required:!0,message:"请选择上级",trigger:"change"}],url:[{validator:e,trigger:"blur"}]}}()),u=Object(c["computed"])((function(){var e={emitPath:!1,checkStrictly:!0,value:"id",label:"name_cn",children:"children"};return e})),d=function(){var e=Object(b["a"])(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return l.visible=!0,l.loading=!0,l.form.id=t,e.next=5,Object(f["i"])();case 5:if(n=e.sent,n&&(n.data.push({id:0,parent_id:0,name_cn:"一级菜单",name_en:"First level menu"}),l.menus=Object(m["e"])(n.data,"id","parent_id")),!l.form.id){e.next=12;break}return e.next=10,Object(f["f"])(l.form.id);case 10:r=e.sent,r&&(l.form=r.data);case 12:Object(c["nextTick"])((function(){l.loading=!1}));case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),O=function(){a.value.validate(function(){var e=Object(b["a"])(regeneratorRuntime.mark((function e(t){var c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t){e.next=12;break}if(l.form.id){e.next=7;break}return e.next=4,Object(f["a"])(l.form);case 4:e.t0=e.sent,e.next=10;break;case 7:return e.next=9,Object(f["e"])(l.form);case 9:e.t0=e.sent;case 10:c=e.t0,c&&(l.visible=!1,o({message:"操作成功!",type:"success"}),n("refresh"));case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},v=function(e){l.form.icon=e},h=function(){a.value.resetFields()};return Object(c["onBeforeMount"])((function(){l.icons=j["a"].getNames(),d()})),Object(s["a"])(Object(s["a"])({refForm:a},Object(c["toRefs"])(l)),{},{rules:i,menusProps:u,init:d,submit:O,iconActiveHandle:v,dialogClosedHandle:h})}});O.render=d;t["default"]=O},acfb:function(e,t,n){"use strict";var c=n("7a23");t["a"]=function(){var e=Object(c["getCurrentInstance"])(),t=e.appContext,n=t.config.globalProperties,r=n.$message,o=n.$confirm,a=n.$loading;return{$message:r,$confirm:o,$loading:a}}},db0b:function(e,t,n){"use strict";n.r(t);var c=n("7a23"),r=Object(c["withScopeId"])("data-v-84b94c36");Object(c["pushScopeId"])("data-v-84b94c36");var o={class:"g-container"},a={key:1},l=Object(c["createTextVNode"])("目录"),i=Object(c["createTextVNode"])("菜单"),u=Object(c["createTextVNode"])("按钮"),d={key:0},s={key:1},b={key:0},p={key:1},f={key:1},m={key:1},j={key:1};Object(c["popScopeId"])();var O=r((function(e,t,n,O,v,h){var k=Object(c["resolveComponent"])("gl-button"),g=Object(c["resolveComponent"])("el-form-item"),V=Object(c["resolveComponent"])("el-form"),_=Object(c["resolveComponent"])("el-table-column"),y=Object(c["resolveComponent"])("gl-svg"),w=Object(c["resolveComponent"])("el-tag"),C=Object(c["resolveComponent"])("el-switch"),x=Object(c["resolveComponent"])("el-table"),N=Object(c["resolveComponent"])("add-edit"),B=Object(c["resolveDirective"])("permission"),F=Object(c["resolveDirective"])("loading");return Object(c["openBlock"])(),Object(c["createBlock"])("div",o,[Object(c["createVNode"])(V,{ref:"refForm",inline:""},{default:r((function(){return[Object(c["createVNode"])(g,null,{default:r((function(){return[Object(c["withDirectives"])(Object(c["createVNode"])(k,{sort:"add",type:"primary",onClick:t[1]||(t[1]=function(t){return e.addEditHandle()})},null,512),[[B,"backstage:menu:create"]])]})),_:1})]})),_:1},512),Object(c["withDirectives"])(Object(c["createVNode"])(x,{border:"",class:"g-table","element-loading-spinner":"el-icon-loading",data:e.list,lazy:"",load:e.loadHandle,"tree-props":e.props,"row-key":"id"},{default:r((function(){return[Object(c["createVNode"])(_,{"header-align":"center",label:"中文名称",prop:"name_cn","min-width":"150"}),Object(c["createVNode"])(_,{align:"center",label:"英文名称",prop:"name_en","min-width":"150"},{default:r((function(e){var t=e.row;return[Object(c["createTextVNode"])(Object(c["toDisplayString"])(t.name_en?t.name_en:"—"),1)]})),_:1}),Object(c["createVNode"])(_,{align:"center",label:"图标",width:"80"},{default:r((function(e){var t=e.row;return[2!==t.type?(Object(c["openBlock"])(),Object(c["createBlock"])(y,{key:0,name:t.icon||""},null,8,["name"])):(Object(c["openBlock"])(),Object(c["createBlock"])("span",a,"—"))]})),_:1}),Object(c["createVNode"])(_,{align:"center",label:"类型",prop:"type",width:"90"},{default:r((function(e){var t=e.row;return[0===t.type?(Object(c["openBlock"])(),Object(c["createBlock"])(w,{key:0,size:"small"},{default:r((function(){return[l]})),_:1})):1===t.type?(Object(c["openBlock"])(),Object(c["createBlock"])(w,{key:1,size:"small",type:"success"},{default:r((function(){return[i]})),_:1})):2===t.type?(Object(c["openBlock"])(),Object(c["createBlock"])(w,{key:2,size:"small",type:"info"},{default:r((function(){return[u]})),_:1})):Object(c["createCommentVNode"])("",!0)]})),_:1}),Object(c["createVNode"])(_,{align:"center",label:"URL",prop:"url","min-width":"150","show-overflow-tooltip":!0},{default:r((function(e){var t=e.row;return[0!==t.type?(Object(c["openBlock"])(),Object(c["createBlock"])("span",d,Object(c["toDisplayString"])(t.url),1)):(Object(c["openBlock"])(),Object(c["createBlock"])("span",s,"—"))]})),_:1}),Object(c["createVNode"])(_,{"header-align":"center",align:"center",label:"授权标识",prop:"permission","min-width":"150","show-overflow-tooltip":!0},{default:r((function(e){var t=e.row;return[0!==t.type?(Object(c["openBlock"])(),Object(c["createBlock"])("span",b,Object(c["toDisplayString"])(t.permission),1)):(Object(c["openBlock"])(),Object(c["createBlock"])("span",p,"—"))]})),_:1}),Object(c["createVNode"])(_,{"header-align":"center",align:"center",label:"排序",prop:"sort",width:"80"}),Object(c["createVNode"])(_,{align:"center",label:"是否显示",prop:"is_display","min-width":"90"},{default:r((function(t){var n=t.row;return[Object(c["withDirectives"])(Object(c["createVNode"])(C,{onChange:function(t){return e.displayHandle(n)},modelValue:n.is_display,"onUpdate:modelValue":function(e){return n.is_display=e},"active-color":"#13ce66","inactive-color":"#ff4949","active-value":1,"inactive-value":0},null,8,["onChange","modelValue","onUpdate:modelValue"]),[[B,"backstage:menu:display"]])]})),_:1}),Object(c["createVNode"])(_,{align:"center",label:"是否缓存",prop:"is_alive","min-width":"110"},{default:r((function(t){var n=t.row;return[0!==n.type&&n.url?Object(c["withDirectives"])((Object(c["openBlock"])(),Object(c["createBlock"])(C,{key:0,onChange:function(t){return e.keepAliveHandle(n)},modelValue:n.is_alive,"onUpdate:modelValue":function(e){return n.is_alive=e},"active-color":"#13ce66","inactive-color":"#ff4949","active-value":1,"inactive-value":0},null,8,["onChange","modelValue","onUpdate:modelValue"])),[[B,"backstage:menu:alive"]]):(Object(c["openBlock"])(),Object(c["createBlock"])("span",f,"—"))]})),_:1}),Object(c["createVNode"])(_,{align:"center",label:"是否在tab显示",prop:"is_tab","min-width":"130"},{default:r((function(t){var n=t.row;return[0!==n.type&&n.url?Object(c["withDirectives"])((Object(c["openBlock"])(),Object(c["createBlock"])(C,{key:0,disabled:0===n.is_display,onChange:function(t){return e.tabHandle(n)},modelValue:n.is_tab,"onUpdate:modelValue":function(e){return n.is_tab=e},"active-color":"#13ce66","inactive-color":"#ff4949","active-value":1,"inactive-value":0},null,8,["disabled","onChange","modelValue","onUpdate:modelValue"])),[[B,"backstage:menu:tab"]]):(Object(c["openBlock"])(),Object(c["createBlock"])("span",m,"—"))]})),_:1}),Object(c["createVNode"])(_,{align:"center",label:"是否支持tab多开",prop:"is_multiple","min-width":"160"},{default:r((function(t){var n=t.row;return[0!==n.type&&n.url?Object(c["withDirectives"])((Object(c["openBlock"])(),Object(c["createBlock"])(C,{key:0,disabled:0===n.is_display||0===n.is_tab,onChange:function(t){return e.multipleHandle(n)},modelValue:n.is_multiple,"onUpdate:modelValue":function(e){return n.is_multiple=e},"active-color":"#13ce66","inactive-color":"#ff4949","active-value":1,"inactive-value":0},null,8,["disabled","onChange","modelValue","onUpdate:modelValue"])),[[B,"backstage:menu:multiple"]]):(Object(c["openBlock"])(),Object(c["createBlock"])("span",j,"—"))]})),_:1}),Object(c["createVNode"])(_,{align:"center",label:"操作",width:"100",fixed:"right"},{default:r((function(t){var n=t.row;return[Object(c["withDirectives"])(Object(c["createVNode"])(k,{sort:"edit",type:"text",size:"small",onClick:function(t){return e.addEditHandle(n.id)}},null,8,["onClick"]),[[B,"backstage:menu:update"]]),Object(c["withDirectives"])(Object(c["createVNode"])(k,{sort:"delete",type:"text",size:"small",onClick:function(t){return e.delHandle(n.id)}},null,8,["onClick"]),[[B,"backstage:menu:delete"]])]})),_:1})]})),_:1},8,["data","load","tree-props"]),[[F,e.loading]]),e.visible?(Object(c["openBlock"])(),Object(c["createBlock"])(N,{key:0,ref:"refAddEdit",onRefresh:e.setList},null,8,["onRefresh"])):Object(c["createCommentVNode"])("",!0)])})),v=n("5530"),h=n("1da1"),k=(n("96cf"),n("159b"),n("acfb")),g=n("6374"),V=n("f36f"),_=Object(c["defineComponent"])({components:{AddEdit:g["default"]},setup:function(){var e=Object(k["a"])(),t=e.$message,n=e.$confirm,r=Object(c["ref"])(),o=Object(c["ref"])(),a={children:"children",hasChildren:"hasChildren"},l=Object(c["reactive"])({loading:!1,visible:!1,list:[]}),i=function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){var t,n,c,r=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t=r.length>0&&void 0!==r[0]?r[0]:0,n={parent_id:t},e.next=4,Object(V["g"])(n);case 4:return c=e.sent,c&&c.data.forEach((function(e){2!==e.type&&(e.hasChildren=!0)})),e.abrupt("return",c);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),u=function(){var e=Object(h["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return l.loading=!0,l.list=[],e.next=4,i();case 4:if(e.t0=e.sent.data,e.t0){e.next=7;break}e.t0=[];case 7:l.list=e.t0,Object(c["nextTick"])((function(){l.loading=!1}));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(e,t,n){i(e.id).then((function(e){n(e?e.data:[])}))},s=function(e){l.visible=!0,Object(c["nextTick"])((function(){o.value.init(e)}))},b=function(e){n("确定对[id=".concat(e,"]进行[删除]操作?"),"提示",{confirmButtonText:"确认",cancelButtonText:"取消",type:"warning"}).then((function(){var n={id:e};Object(V["c"])(n).then((function(e){e&&(t({message:"操作成功!",type:"success"}),u())}))})).catch((function(){}))},p=function(e){if(e.id){var n={key:e.id,value:e.is_display};Object(V["d"])(n).then((function(n){n?t({message:"操作成功!",type:"success"}):e.is_display=1===e.is_display?0:1}))}},f=function(e){if(e.id){var n={key:e.id,value:e.is_alive};Object(V["b"])(n).then((function(n){n?t({message:"操作成功!",type:"success"}):e.is_alive=1===e.is_alive?0:1}))}},m=function(e){if(e.id){var n={key:e.id,value:e.is_tab};Object(V["k"])(n).then((function(n){n?t({message:"操作成功!",type:"success"}):e.is_tab=1===e.is_tab?0:1}))}},j=function(e){if(e.id){var n={key:e.id,value:e.is_multiple};Object(V["h"])(n).then((function(n){n?t({message:"操作成功!",type:"success"}):e.is_multiple=1===e.is_multiple?0:1}))}};return Object(c["onBeforeMount"])((function(){u()})),Object(v["a"])(Object(v["a"])({refForm:r,refAddEdit:o,props:a},Object(c["toRefs"])(l)),{},{setList:u,loadHandle:d,addEditHandle:s,delHandle:b,displayHandle:p,keepAliveHandle:f,tabHandle:m,multipleHandle:j})}});_.render=O,_.__scopeId="data-v-84b94c36";t["default"]=_},f36f:function(e,t,n){"use strict";n.d(t,"g",(function(){return r})),n.d(t,"f",(function(){return o})),n.d(t,"a",(function(){return a})),n.d(t,"e",(function(){return l})),n.d(t,"c",(function(){return i})),n.d(t,"d",(function(){return u})),n.d(t,"b",(function(){return d})),n.d(t,"k",(function(){return s})),n.d(t,"h",(function(){return b})),n.d(t,"i",(function(){return p})),n.d(t,"j",(function(){return f}));var c=n("b775");function r(e){return Object(c["a"])({url:"/backstage/menu/list",method:"get",params:e})}function o(e){return Object(c["a"])({url:"/backstage/menu/info/".concat(e),method:"get"})}function a(e){return Object(c["a"])({url:"/backstage/menu/create",method:"post",data:e})}function l(e){return Object(c["a"])({url:"/backstage/menu/update",method:"post",data:e})}function i(e){return Object(c["a"])({url:"/backstage/menu/delete",method:"post",data:e})}function u(e){return Object(c["a"])({url:"/backstage/menu/display",method:"post",data:e})}function d(e){return Object(c["a"])({url:"/backstage/menu/alive",method:"post",data:e})}function s(e){return Object(c["a"])({url:"/backstage/menu/tab",method:"post",data:e})}function b(e){return Object(c["a"])({url:"/backstage/menu/multiple",method:"post",data:e})}function p(){return Object(c["a"])({url:"/backstage/menu/select",method:"get"})}function f(){return Object(c["a"])({url:"/backstage/menu/self/select",method:"get"})}}}]);