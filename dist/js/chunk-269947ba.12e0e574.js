(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-269947ba"],{4738:function(t,s,n){},"5fe8":function(t,s,n){},"79ba":function(t,s,n){"use strict";var i=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{style:{width:t.width+"px",height:t.height+"px"},attrs:{id:"listbox"}},[t._t("index"),n("div",{staticClass:"listbox-imgbox"},[t._t("img")],2),t._t("icon"),t._t("name"),n("div",{staticClass:"listbox-name"},[t._t("cname"),t._t("ename")],2),n("div",{staticClass:"bywhat"},[t._t("by"),t._t("creater")],2)],2)},e=[],a={name:"listbox",props:["width","height"]},r=a,o=(n("aa69"),n("2877")),c=Object(o["a"])(r,i,e,!1,null,null,null);s["a"]=c.exports},aa69:function(t,s,n){"use strict";n("5fe8")},bf7f:function(t,s,n){"use strict";n("4738")},f9d8:function(t,s,n){"use strict";n.r(s);var i=function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("div",{attrs:{id:"singer"}},t._l(t.singerarr,(function(s,i){return n("listbox",{key:i},[n("img",{attrs:{slot:"img",src:s.img1v1Url,alt:""},on:{click:function(s){return t.gotosingerpage(i)}},slot:"img"}),n("div",{staticClass:"listbox-text",attrs:{slot:"name"},slot:"name"},[n("span",[t._v(t._s(s.name))]),n("span",[t._v("("+t._s(s.alias[0])+")")])])])})),1)},e=[],a=n("79ba"),r=(n("bc3a"),{name:"singer",props:["artist","album","str","allList","thisIndex","searchstr"],components:{Listbox:a["a"]},data:function(){return{singerarr:[],singerCount:0}},watch:{singerarr:function(){this.saveCount()}},mounted:function(){this.getinfo(),this.saveCount()},methods:{gotosingerpage:function(t){this.$router.push({path:"/home/singerpage",query:{singerobj:this.singerarr[t]}})},getinfo:function(){var t=this;this.$axios.get("http://localhost:3000/cloudsearch?keywords="+t.searchstr+"&type=100").then((function(s){t.singerarr=s.data.result.artists,t.singerCount=s.data.result.artistCount})).catch((function(t){}))},saveCount:function(){this.$emit("receiveCount",this.singerCount+"位歌手")}}}),o=r,c=(n("bf7f"),n("2877")),u=Object(c["a"])(o,i,e,!1,null,null,null);s["default"]=u.exports}}]);
//# sourceMappingURL=chunk-269947ba.12e0e574.js.map