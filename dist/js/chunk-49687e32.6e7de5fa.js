(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-49687e32"],{"178a":function(t,s,a){"use strict";a("e370")},2718:function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"video"}},[a("div",{staticClass:"video-top-bar"},[a("div",{staticClass:"button-container",attrs:{id:"real-button"}},[a("div",{staticClass:"myvideo-button",on:{click:t.showthelist}},[t._v(" "+t._s(t.str)+" "),a("i",{staticClass:"fas fa-chevron-right"})])]),a("div",{staticClass:"rightcontainer"},t._l(t.typearr,(function(s,i){return a("div",{key:s+i,staticClass:"typebox",class:{myactive:t.theIndex===i},on:{click:function(s){return t.change(i)}}},[t._v(" "+t._s(s)+" ")])})),0),a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}],staticClass:"showtype-container"},[a("div",{staticClass:"real-container"},[a("div",{staticClass:"alltag"},[a("span",{class:{boxactive:1==t.isALL},on:{click:t.afterclickall}},[t._v("全部視頻")])]),a("div",{staticClass:"mytaglist"},t._l(t.taglist,(function(s,i){return a("div",{key:s+i,staticClass:"mytagbox",class:{boxactive:i==t.theIndex1},on:{click:function(s){return t.change1(i)}}},[t._v(" "+t._s(s.name)+" "),a("div",{staticClass:"clickbox"})])})),0)])])]),a("div",{staticClass:"video-bigcontainer"},[a("video-box",[a("div",{staticClass:"playCount",attrs:{slot:"clickcount"},slot:"clickcount"},[a("i",{staticClass:"fas fa-play"},[t._v(" 123 ")])]),a("img",{attrs:{slot:"video",src:"",alt:""},slot:"video"}),a("h4",{staticClass:"mv-title",attrs:{slot:"h4"},slot:"h4"},[t._v("123")]),a("span",{staticClass:"video-box-text",attrs:{slot:"text"},slot:"text"},[t._v(" 123 ")])])],1)])},e=[],n=(a("b0c0"),a("8ea8")),l=a("fa32"),c=a("8ccb"),o=(a("bc3a"),{name:"myvideo",data:function(){return{typearr:["翻唱","听BGM","生活","游戏","ACG","音乐","最佳饭制","现场","舞蹈","MV"],theIndex:-1,taglist:[],theIndex1:-1,isALL:!0,str:"全部視頻",isShow:!1,videolist:[]}},watch:{taglist:function(){}},mounted:function(){this.gettaglist(),this.getvideolist()},methods:{showthelist:function(){this.isShow=!this.isShow},afterclickall:function(){this.str="全部視頻",this.isALL=!0,this.theIndex1=-1,this.theIndex=-1},change:function(t){this.theIndex=t,this.str=this.typearr[t],this.isALL=!1,this.theIndex1=-1},change1:function(t){this.theIndex1=t,this.str=this.taglist[t].name,this.isALL=!1,this.theIndex=-1},gettaglist:function(){var t=this;this.$axios.get("http://localhost:3000/video/group/list").then((function(s){t.taglist=s.data.data}))},getvideolist:function(){console.log("???"),this.$axios.get("http://localhost:3000/video/group?id=9104").then((function(t){console.log(t)})).catch((function(t){}))}},components:{Showtag:n["a"],Taglist:l["a"],VideoBox:c["a"]}}),r=o,h=(a("653f"),a("2877")),u=Object(h["a"])(r,i,e,!1,null,null,null);s["default"]=u.exports},"352b":function(t,s,a){},"653f":function(t,s,a){"use strict";a("352b")},"8ea8":function(t,s,a){"use strict";var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"showtag"}},[t._t("tag")],2)},e=[],n={name:"showtag"},l=n,c=(a("cda5"),a("2877")),o=Object(c["a"])(l,i,e,!1,null,null,null);s["a"]=o.exports},c8a8:function(t,s,a){},cda5:function(t,s,a){"use strict";a("c8a8")},e370:function(t,s,a){},fa32:function(t,s,a){"use strict";var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{attrs:{id:"taglist"}},[a("div",{staticClass:"taglist-all"},[a("span",{on:{click:t.alllistsend}},[t._v("全部歌單")])]),a("div",{staticClass:"tag-category"},[a("div",{staticClass:"language"},[a("language-title",{attrs:{height:60}},[a("i",{staticClass:"fas fa-globe",attrs:{slot:"icon"},slot:"icon"}),a("span",{attrs:{slot:"category"},slot:"category"},[t._v("語種")])]),a("mylist",t._l(t.languagearr,(function(s,i){return a("div",{key:s.name,attrs:{slot:"span"},slot:"span"},[a("span",{class:{tagactive:t.languageindex===i},on:{click:function(a){return t.sendback(s,i)}}},[t._v(" "+t._s(s.name)+" ")])])})),0)],1)]),a("div",{staticClass:"tag-style"},[a("div",{staticClass:"language",attrs:{id:"style"}},[a("language-title",{attrs:{height:180}},[a("i",{staticClass:"far fa-keyboard",attrs:{slot:"icon"},slot:"icon"}),a("span",{attrs:{slot:"category"},slot:"category"},[t._v("風格")])]),a("mylist",{attrs:{height:180}},t._l(t.stylearr,(function(s,i){return a("div",{key:s.name,attrs:{slot:"span"},slot:"span"},[a("span",{class:{tagactive:t.styleindex===i},on:{click:function(a){return t.sendback(s,i)}}},[t._v(" "+t._s(s.name)+" ")])])})),0)],1)]),a("div",{staticClass:"view"},[a("div",{staticClass:"language"},[a("language-title",{attrs:{height:100}},[a("i",{staticClass:"fas fa-mug-hot",attrs:{slot:"icon"},slot:"icon"}),a("span",{attrs:{slot:"category"},slot:"category"},[t._v("場景")])]),a("mylist",{attrs:{height:110}},t._l(t.viewarr,(function(s,i){return a("div",{key:s.name,attrs:{slot:"span"},slot:"span"},[a("span",{class:{tagactive:t.viewindex===i},on:{click:function(a){return t.sendback(s,i)}}},[t._v(" "+t._s(s.name)+" ")])])})),0)],1)]),a("div",{staticClass:"feel"},[a("div",{staticClass:"language"},[a("language-title",{attrs:{height:100}},[a("i",{staticClass:"fas fa-smile",attrs:{slot:"icon"},slot:"icon"}),a("span",{attrs:{slot:"category"},slot:"category"},[t._v("情感")])]),a("mylist",{attrs:{height:110}},t._l(t.feelarr,(function(s,i){return a("div",{key:s.name,attrs:{slot:"span"},slot:"span"},[a("span",{class:{tagactive:t.feelindex===i},on:{click:function(a){return t.sendback(s,i)}}},[t._v(" "+t._s(s.name)+" ")])])})),0)],1)]),a("div",{staticClass:"topical"},[a("div",{staticClass:"language"},[a("language-title",{attrs:{height:150}},[a("i",{staticClass:"fas fa-th-large",attrs:{slot:"icon"},slot:"icon"}),a("span",{attrs:{slot:"category"},slot:"category"},[t._v("主題")])]),a("mylist",{attrs:{height:150}},t._l(t.topicalarr,(function(s,i){return a("div",{key:s.name,attrs:{slot:"span"},slot:"span"},[a("span",{class:{tagactive:t.topicalindex===i},on:{click:function(a){return t.sendback(s,i)}}},[t._v(" "+t._s(s.name)+" ")])])})),0)],1)])])},e=[],n=(a("b0c0"),function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-title",style:{height:t.height+"px"}},[t._t("icon"),t._t("category")],2)}),l=[],c={name:"languageTitle",props:["height"],computed:{},data:function(){return{myheight:0}}},o=c,r=a("2877"),h=Object(r["a"])(o,n,l,!1,null,null,null),u=h.exports,g=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"list",style:{height:t.height+"px"}},[t._t("span")],2)},d=[],v={name:"mylist",props:["height","width"],data:function(){return{}}},f=v,p=Object(r["a"])(f,g,d,!1,null,null,null),x=p.exports,y={name:"taglist",props:["languagearr","stylearr","viewarr","feelarr","topicalarr"],data:function(){return{languageindex:-1,styleindex:-1,viewindex:-1,feelindex:-1,topicalindex:-1,indexarr:[-1,-1,-1,-1,-1]}},components:{LanguageTitle:u,Mylist:x},methods:{check:function(t,s){return this.indexarr[0]===s},alllistsend:function(){this.$emit("collect","全部歌单")},sendback:function(t,s){switch(this.$emit("collect",t.name),this.languageindex=-1,this.styleindex=-1,this.viewindex=-1,this.feelindex=-1,this.topicalindex=-1,this.indexarr[t.category]=s,console.log(this.indexarr[t.category]),t.category){case 0:this.languageindex=s;break;case 1:this.styleindex=s;break;case 2:this.viewindex=s;break;case 3:this.feelindex=s;break;case 4:this.topicalindex=s;break}}}},m=y,_=(a("178a"),Object(r["a"])(m,i,e,!1,null,null,null));s["a"]=_.exports}}]);
//# sourceMappingURL=chunk-49687e32.6e7de5fa.js.map