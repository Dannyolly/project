<template>
  <div id="searchBar">
    <el-table
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      v-loading="loading"
      style="width: 100%; height: 100%"
    >
    </el-table>
    <!--標題---title-->
    <h3 class="search-bar-title">找到{{str}}</h3>
    <!--選項條...element-ui-->
    <div class="choosing-box">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#EC4141"
        :default-active="activeIndex"
      >
        <el-menu-item index="1"  @click="goto('song')"> 單曲 </el-menu-item>
        <el-menu-item index="2"  @click="goto('singer')"> 歌手 </el-menu-item>
        <el-menu-item index="3"  @click="goto('album')"> 專輯 </el-menu-item>
        <el-menu-item index="4"  @click="goto('movie')"> 視頻 </el-menu-item>
        <el-menu-item index="5"  @click="goto('songlist')"> 歌單 </el-menu-item>
      </el-menu>
    </div>

    <!--最佳匹配.....-->
    <!--
           * 打算再分4個子頁...
           * 1--單曲---song
           * 2--歌手---singer
           * 3--專輯---album
           * 4--視頻---movie.....
         -->

    <!--查到的列表-標題.....-->
    <!--
         <search-title></search-title>
         -->

    <!--查到的列表--list-->
    <!--最外層容器...-->
    <!--getSongUrl...這是兒子傳給祖父....這里在傳給home父組件用....-->
    <router-view
      @getthesongurl="getTheSongUrl"
      :artist="artist"
      :album="album"
      :str="str"
      :allList="allList"
      :thisIndex="thisIndex"
      :searchstr="searchstr"
      @receiveCount="saveCount"
    >
    </router-view>
    <!--
         <router-view></router-view>
         -->
  </div>
</template>
<script>
import { get } from "../../router/request.js";
import BestBox from "./bestBox.vue";
import cutdouwn from "../publicfunction/function.js";
import SearchTitle from "./searchTitle.vue";
import SearchList from "./searchList.vue";
import titleBoxVue from "../titleBox.vue";
import bestMatch from "./song/bestMatch.vue";

//單曲...
import song from "./song/song";
const axios = require("axios");
export default {
  name: "searchBar",
  //父傳子的值....
  //改為路由傳參...
  props: {
    message: String, //搜索值...
  },
  data() {
    return {
      artist: [], //歌手....
      album: [], //專輯
      str: "首單曲", //關鍵詞...?
      searchstr: "天气", //查詢的的詞....
      allList: [], // 先放入全部資料...在一一放入另一個數組setList...
      idList: [],
      albumlist: [],
      num: "10",
      isActive: false,
      thisIndex: 0,  //歌的列表用的....用途是指定當前的行....
      activeIndex:'1', //選項條用的.... 由0 .......n-1
      loading: true, //加載用的
      songUrl: "",
      songCount:0,
      isSave:false,
    };
  },

  components: {
    // 單曲......
    song,
  },
  watch: {
    //當第一次綁定則會執行???
    //賦值不當是變化---vue-watch函數...
    //immediate...別亂用...這是賦值時則用..則數組創建又當是..
    //handler是watch的函數.....之前一直寫錯....

    allList: {
      handler() {
        this.correctTitle();
      },
      //immediate:true
    },
    searchstr: {
      handler() {
        this.setsearchstr();
        this.close();
      },
      immediate: true,
    },
    //同一頁面跳轉...
    //http://www.jianshu.com/p/56263ad8d2ff
    $route(to, from) {
      //this.start();
      this.setsearchstr();
      this.getBextMatch();
      this.getSongList();
      this.correctTitle();
    },
  },
  mounted() {
    this.getBextMatch();
    this.getSongList();
  },
  methods: {
    /**
     * 當getSonglist 後....
     * 因為沒法實時加入name...(Js語法可以直接加)
     * 比如arr[i].name='danny' ....arr[i]沒有此屬性...當可以當對象這樣加入去
     * 可能是異步操作...所以導致加入不了!??????????
     * 即此時當allList已放好....
     * watch 函數則執行 setAllList....
     * http://www.jianshu.com/p/b70f1668d08f
     * start....close 是為關閉或重新打開...加載組件...
     * 父收子的方法getTheSongUrl...再傳多次上去...
     */
    getTheSongUrl: function (info) 
    {
      //新增.....arr----歌的資料...
      //console.log(info);
      //console.log('父收到了');
      //console.log(this.$route.query);
      this.$emit("getthesongurl",info); //再傳多次上去...
    },
    /*
    playMusic:function(index)
    {
     var that=this;
     console.log(this.allList[index].id);
     get({
       url:"/song/url?id="+this.allList[index].id
     }).then((res)=>{
        that.songUrl=res.data.data[0].url;
        console.log(res);
        that.$emit('getSongUrl');
        that.$router.push({path:'/home/searchPage',query:{info:that.searchstr,songurl:that.songUrl}});
        that.close();
     });
    },
    /**
     *   checkoutunderline() ... 
     *   選項條不自動...
     */

    
    /** goto 函數....
     *  去其它兄弟路由用的...
     */
    
    goto: function (str) {
      //console.log(this.$route)
      if(str==='song')
      {
        this.str=this.songCount+'首單曲'
      }
      //選項條變紅色..
      /*
      switch (str) {
        case 'song'    :this.activeIndex='1';break;
        case 'singer'  :this.activeIndex='2';break;
        case 'album'   :this.activeIndex='3';break;
        case 'movie'   :this.activeIndex='4';break;
        case 'songlist':this.activeIndex='5';break;
        default:break;
      }
      */

      this.$router.push({
        path: this.$route.matched[1].path + "/" + str,
        query: this.$route.query,
      });
    },
      /**
       * saveCount()
       * 保存子組件的Count數..
       */
      saveCount:function(str)
      {
        this.str=str;
      },

      start: function () {
      this.loading = false;
      var a = document.querySelectorAll(
        ".el-table.el-table--fit.el-table--enable-row-hover.el-table--small"
      );
      a[0].style.cssText = "width: 100%; height: 100%;";
    },
    close: function () {
      setTimeout(() => {
        this.loading = false;
        var a = document.querySelectorAll(
          ".el-table.el-table--fit.el-table--enable-row-hover.el-table--small"
        );
        a[0].style.cssText = "width: 0%; height: 0%;";
        // var b=document.getElementsByClassName("el-table__empty-block");
        // b[0].style.cssText='';
      }, 1000);
      this.loading = true;
    },
    setsearchstr: function () {
      this.searchstr = this.$route.query.info;
      //console.log("ok" + "" + this.searchstr);
      //取消Loading
    },
    /*
    chance: function (index) {
      this.thisIndex = index;
      //console.log(this.thisIndex);
    },
    */
    correctTitle: function () {
      for (var i = 0; i < this.allList.length; i++) {
        if (this.allList[i].name.length > 12) {
          this.allList[i].name = cutdouwn(
            this.allList[i].name.length - 12,
            this.allList[i].name
          );
        }
      }
    },
    idFindTheAlbum: function () {
      //this.setList[1].albumName='danny';
      //console.log(this.setList[1]);
      /*
                    for(var i=0;i<this.allList.length;i++)
                    {

                    this.setList[i].albumName=this.allList[i].al.name
                    this.setList[i].artist=this.allList[i].ar[0].name
                    that.setList[i].id=this.allList[i].al.id;
                    }
                    */
      var that = this;
      console.log(this.allList);
      //this.$axios.get("http://localhost:3000/album?"+that.allList.)

      /*
                   for(var i=0;i<this.allList.length;i++)
                    {
                     that.idList[i]=that.allList[i].al.id;
                     
                    }
                    this.$axios.get("http://localhost:3000/album?id="+that.idList[0])
                    .then((result)=>{
                      console.log(result);
                    }).catch((error)=>{

                    })
                    */
    },
    getSongList: function () {
      this.getsongCount();
      var that = this;
      //console.log('searching:'+this.searchstr);
      //console.log(that.searchstr);
      this.$axios
        .get(
          "http://localhost:3000/cloudsearch?keywords=" +
            that.searchstr +
            "&type=1&limit=100"
        )
        .then((result) => {
          /**
           * .albuum.name  標題
           * .artists[0]
           * result.data.result.songs
           * 專輯id=95215880
           *
           * 專輯名是/album?id=...
           * result.data.album.name
           */
           that.allList = result.data.result.songs;
          //console.log(result);
          //console.log(that.setList)
          //console.log(that.allList);
        })
        .catch((error) => {});
    },
    getsongCount: function () {
      var that = this;
      this.$axios.get(
        "http://localhost:3000/cloudsearch?keywords=" +
          that.searchstr +
          "&type=1"
      ).then((result)=>{
        ///console.log(result.data.result.songCount);
        that.songCount=result.data.result.songCount;
        if(that.isSave==false)
        {
        that.str=that.songCount+that.str;
        that.isSave=true;
        }
        //console.log(that.songCount);
      })
    },
    getBextMatch: function () {
      var that = this;
      this.$axios
        .get(
          "http://localhost:3000/search/multimatch?keywords=" + that.searchstr
        )
        .then((result) => {
          that.artist = result.data.result.artist[0];
          that.album = result.data.result.album[0];
          that.str = result.data.result.album[0].alias[0];
          that.str = cutdouwn(that.str.length - 7, that.str);

          console.log(that.artist);

          /**  都是[0]
           * 歌手 .img1v1Url
           * 名  .name
           * 類別 occupation
           * 別名??? trans
           */
          /**
           * 名 .name
           * 圖 .picUrl
           * 類型 .type
           * () .alias[0]
           */
        })
        .catch((err) => {});
    },
  },
};
</script>
<style>
.search-list-box {
  width: 819px;
  height: 270px;
}
#searchBar {
  float: left;
  width: 819px;
  height: 541px;
  position: relative;
  overflow: scroll;
}
#searchBar h3 {
  padding-left: 30px;
  margin-bottom: 0px;
}
.choosing-box {
  padding-left: 10px;
}
.el-menu-demo.el-menu--horizontal.el-menu {
  padding-top: 0px;
}
.best-match {
  width: 789px;
  height: 130px;
  padding-left: 30px;
}
.best-match h5 {
  padding-top: 15px;
}
</style>