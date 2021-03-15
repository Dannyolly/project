<template>
  <div id="song">
    <best-match :artist="artist" :album="album" :str="str"></best-match>
    <search-title></search-title>
    <div class="search-list-box">
      <search-list
        v-for="(item, index) in allList"
        :class="{ active: index === sonIndex }"
        :key="item.id"
      >
        <span slot="num">{{
          index + 1 < 10 ? "0" + String(index + 1) : index + 1
        }}</span>
        <i slot="icon-like" class="far fa-heart"></i>
        <i slot="icon-download" class="far fa-arrow-alt-circle-down"></i>
        <span
          @dblclick="playMusic(index)"
          @click="chance(index)"
          slot="the-title"
          class="the-title"
          >{{ item.name }}</span
        >
        <span slot="the-singer" class="the-singer">{{ item.ar[0].name }}</span>
        <span slot="the-album" class="the-album">{{ item.al.name }}</span>
        <!--al.id 為專輯的id碼...-->
        <span slot="time">03:08</span>
        <el-progress slot="hot" :percentage="50"></el-progress>
      </search-list>
    </div>
  </div>
</template>
<script>
import SearchList from "../searchList.vue";
import SearchTitle from "../searchTitle.vue";
import bestMatch from "./bestMatch.vue";

//引入axios的封裝...
  import {get} from '../../../router/request'
export default {
  
  name: "song",
  //      歌手(obj) 專輯(obj) str(別名) 歌列單(array)
  //      當前li(number)  搜索的關鍵字..
  props: ["artist", "album", "str", "allList", "thisIndex","searchstr"],
  components: {
    bestMatch,
    SearchTitle,
    SearchList,
  },
  data() {
    return {
      //@-1
      sonIndex: this.thisIndex,
    };
  },
  /**
   * @-1
   * https://forum.vuejs.org/t/props-props/25997/3
   * 2021-3-7  13:37
   * 父組件傳入子組件的值
   * 是不能由子組件去改變
   * 但好以在子組件的data()建一個局部變量
   * 來代替此操作....
   */
  methods: {
    chance: function (index) {
      this.sonIndex = index;
      //console.log(this.thisIndex);
    },
    /**
     * 一些父組件的方法....
     * 組件樹做得不好...
     */
    playMusic: function (index) 
    {
      var that = this;
      console.log(this.allList[index].id);
      //console.log(this.allList[index]);
      get({
        url: "/song/url?id=" + this.allList[index].id,
      }).then((res) => {
        that.songUrl = res.data.data[0].url;
        //console.log(res);
        that.$emit("getthesongurl",that.allList[index]);
        //console.log(that.searchstr);

        // 不用加song???? wtf....
        that.$router.push({
          path: "/home/searchPage/song",
          query: { info: that.searchstr, songurl: that.songUrl },
        });
        that.close();
      });
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
  },
};
</script>

<style>
</style>