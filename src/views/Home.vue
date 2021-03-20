<template>
  <div class="home">
    <top-bar 
    :userinfo="userinfo"
    :islogin="loginsucuess" 
    @getonesong="getonesong" 
    @checkMv="checkMv" 
    @mysearch-message="getTheMessage"> </top-bar>
    <!--<mid-bar></mid-bar>-->
     <div class="login" v-show="isShowqrcode">
              <div @click="close" class="close1">
                <i class="far fa-window-close"></i>
              </div>
         <div class="img-box">
              <img class="decora" src="../assets/img/login.png" alt="">
         </div>
         <div class="input-container">
           <input v-model="phonenum" type="text" class="phone" name="" id="">
           <input v-model="password" type="password" class="password">
         </div>
         <div @click="submit" class="button3">
           <div>登錄</div>
           <div v-if="status=='502'" class="remind">手機號或密碼錯誤!</div>
         </div>
          
     </div>
    <mid-left-bar v-if="isShowMv == true"></mid-left-bar>
    <!--
        1--- @getonesong="getonesong"    是歌單發來的單歌曲...

        2--- @getallsong="getallsong"    是歌單中的播放全部......

        3--- @getSongUrl="getTheSongUrl" 為searchbar用的

        4--- @getsongurl="getsongurl"    是其它子子....子組件傳上來的url,,,

        5----@checkMv="checkMv".....     為打開MV...令leftbar和audio關閉....
       
        6----@sendmusic="getnewmusic"  是最新音樂new-music傳上來的obj...
         ----暫時統一接口....單曲都是傳sendmusic..上來的....
       -->
       <keep-alive include="midleftvideo,songList,midRightBar">
    <router-view
      @getonesong="getonesong"
      @getallsong="getallsong"

      @getthesongurl="getTheSongUrl"

      @getsongurl="getsongurl"

      @checkMv="checkMv"
      @sendmusic="getnewmusic"
    >
    </router-view>
       </keep-alive>
    <infobox
      :mycurrenttime="mycurrenttime"
      :isinfo="isinfo"
      :class="{ infoactive: isinfo == true }"
      :songword="songword"
      :songinfo="songinfo"
      :istouch="istouch"
    ></infobox>

    <div v-show="isShow" class="own-song-play-list">
      <div class="own-container">
        <!--這里是按鈕.....-->
        <div class="own-top-bar">
          <div class="outside-container">
            <div
              @click="changebutton(0)"
              :class="{ myacttive: buttonindex === 0 }"
              class="own-left-button"
            >
              播放列表
            </div>
            <div
              @click="changebutton(1)"
              :class="{ myacttive: buttonindex === 1 }"
              class="own-right-button"
            >
              歷史記錄
            </div>
          </div>
        </div>
        <!--這里是..列表....-->
        <div class="ownplaylist-container">
          <div class="top-functionlist">
            <div class="count">總{{ myplaylist.length }}首</div>
            <div class="right-container">
              <div class="collecall">
                <i class="far fa-folder"></i>
                <span>收藏全部</span>
              </div>
              <div class="ownline"></div>
              <div class="clean">
                <i @click="removeallplaylist" class="fas fa-trash-alt"></i>
                <span @click="removeallplaylist">清空</span>
              </div>
            </div>
          </div>
          <!--歌曲列表....-->
          <div class="own-mid-songlist" v-if="myplaylist.length!=0">
            <ownplaylist 
              :class="{ playing: index === playingindex }"
              v-for="(item, index) in myplaylist"
              :key="item + index"
            >
              <span
                @dblclick="choosesongfromlist(index)"
                id="songname"
                slot="songname"
                >{{ item.name }}</span
              >
              <span v-if="item.ar" id="own-name" slot="own-name">{{
                item.ar[0].name
              }}</span>
              <span v-else id="own-name" slot="own-name">{{
                item.artists[0].name
              }}</span>

              <div v-if="index === playingindex" slot="play" class="own-play">
                <i class="fas fa-play"></i>
              </div>
            </ownplaylist>
          </div>
        </div>
      </div>
    </div>

    <audiobox
      :isplaying="isplaying"
      v-if="isShowMv == true"
      @showthesonginfo="changeisinfo"
      @show="change"
      :src="audioUrl"
      :songinfo="songinfo"
    ></audiobox>
    <!--:src="audioUrl"-->
  </div>
</template>

<script>
import axios from "axios";
import MidLeftBar from "../components/midleftbar/midLeftBar.vue";
import MidRightBar from "../components/midRightBar.vue";
import MidRightMidBar from "../components/midRightMidBar.vue";
import MidRightTopBar from "../components/midRightTopBar.vue";
import Audiobox from "../components/playmusicbox/audiobox.vue";
import Infobox from "../components/playmusicbox/infobox.vue";
import Ownplaylist from "../components/playmusicbox/ownplaylist.vue";
import SearchBar from "../components/searchBar/searchBar.vue";
import songpage from "../components/songpage/songpage";
import cut from "../components/publicfunction/function";
/**
 * 重構一下.....假如midbar---是包含left-right
 * 則沒法動態變換rightbar....
 * 所以抽取出來放到Home里...
 *
 */
import TopBar from "../components/topBar.vue";
export default {
  name: "Home",
  data() {
    return {
      theMessage: "danny",
      //audioUrl....音樂連結....
      //audioUrlarr....保存起來的數組....
      // audiourlarr 是當從列表歌單中選取歌曲.....所提取連結的源頭
      audioUrl: "",
      audioUrlarr: [],
      //isShow是歌單列表
      //isInfo是單曲詳細資料....
      isShow: false,
      isinfo: false,
      //默認值....列表中的按鈕---默認是播放列表...
      buttonindex: 0,
      //mayplaylist----個人播放列表
      myplaylist: [],
      //歌手資料.....
      //songinfo....可作為當前選的歌.....
      //暫用.....................
      //songword....歌詞....
      //songid.....歌曲id...
      //playingindex....配合那首歌播放的值
      songinfo: {},
      songword: "",
      songid: "",
      playingindex: -1,

      //lastplayindex....
      //記下上次的播放index
      lastplayindex: -1,

      //因為MV界面要求全部...所以leftbar同audio都要沒
      /**
       * 所以用一個值表示...
       * isShowMv....
       * checkMv()....$emit發來的函數....
       */
      isShowMv: true,
      /**
       * 最後了呀....二維碼...
       * showqrcode
       */
      isShowqrcode:false,
      phonenum:'18672779201',
      password:'28300136a',
      wrong:false,
      //登錄狀態
      status:'',
      //是否登錄了.....
      loginsucuess:false,
      //用戶的資料..
      userinfo:{},
      //是否播放中...
      isplaying:false,
      //當前播放的時間....
      mycurrenttime:'0',
      //是否移動過時間軸....
      istouch:false,
    };
  },
  watch: 
  {
    //當audio
    songinfo:function()
    {
        this.isplaying=false;
    },
    myplaylist: function () {
     // this.checkoutnamelength();
    },
    isShowqrcode:function()
    {
      if(this.isShowqrcode==false)
      {
        return;
      }
    },
    status:function(){
      /**登錄成功..................... */
      if(this.status=='200')
      {
        this.loginsucuess=true;
        this.isShowqrcode=false;
      }
    }
  },
  methods: {
    /**----------------------------------------------------------------------------- */
    removeallplaylist:function()
    {
      /**
       * 清除1.playlist
       *    2.audioUrllist
       */
      
      for(var i=0;i<this.myplaylist.length;i++)
      {
        this.myplaylist.pop();
      }
      for(var i=0;i<this.audioUrlarr.length;i++)
      {
        this.audioUrlarr.pop();
      }
      this.myplaylist.length=0;
      this.audioUrlarr.length=0;
    },
    /**---------------------------------------------------------------------------- */
    submit:function()
    {
      /**
       * 200為登入成功
       * 502為失敗...
       */
      var that=this;
      this.$axios.get("http://localhost:3000/login/cellphone?phone="+this.phonenum+'&password='+this.password)
      .then(res=>{
        console.log(res);
        that.status=res.data.code;
        that.userinfo=res.data.profile;
        console.log(that.userinfo);
      })
    },
    /**------------------------------------------------------- */
    /**
     * 這里是從newmusic推薦音樂組件傳上來的值...還要傳多兩次...
     * 統一sendmusic()
     * 直接調用getonesong...
     * 但呢個接口有D仆街...矩系album.....平時找的歌單則是al......
     * 你老母.........
     * 1.獲取歌詞------------this.getsongword()
     * 2.放入myplaylist------ this.myplaylist.push(songinfo)
     * 3.然後checkWhichsong---重新指向該歌詞.....
     * 4.依該歌曲請求播放地址....
     * 5.放入that.audioUrl且push進audioUrlarr
     * 老套路...但要改D野....
     * 當artists則用這個...
     * 當ar 則用getonesong....
     */
    getnewmusic: function (obj) {
      //console.log(obj);
      //console.log(songinfo);
      this.songinfo = obj;
      console.log(this.songinfo);
      this.getsongword();
      this.myplaylist.push(obj);
      console.log(this.myplaylist);
      this.checkwhichsong();

      var that = this;

      this.$axios
        .get("http://localhost:3000/song/url?id=" + this.songinfo.id)
        .then((res) => {
          //console.log(res.data.data[0].url);
          that.audioUrl = res.data.data[0].url;
          that.audioUrlarr.push(res.data.data[0].url);
        });
    },
    /**------------------------------------------------------------------ */
    close:function()
    {
      this.isShowqrcode=!this.isShowqrcode;
    },
    /**-------------------------------------------------------------------- */
    //因為MV界面要求全部...所以leftbar同audio都要沒
    /**
     * 所以用一個值表示...
     * isShowMv....
     * checkMv()....$emit發來的函數....
     */
    checkMv: function () {
      this.isShowMv = !this.isShowMv;
    },
    /**-------------------------------------------------------------------- */
    /**
     * checkoutnamelength()
     * 檢查playlist中的artists name的展度....
     * 使用cut函數....
     */
    checkoutnamelength: function () {
      if (this.myplaylist[i].ar != undefined) {
        for (var i = 0; i < this.myplaylist.length; i++) {
          if (this.myplaylist[i].ar[0].name.length > 15) {
            this.myplaylist[i].ar[0].name = cut(
              this.myplaylist[i].ar[0].name.length - 5,
              this.myplaylist[i].ar[0].name
            );
          }
        }
      } else {
        for (var i = 0; i < this.myplaylist.length; i++) {
          if (this.myplaylist[i].artists[0].name.length > 15) {
            this.myplaylist[i].artists[0].name = cut(
              this.myplaylist[i].artists[0].name.length - 5,
              this.myplaylist[i].artists[0].name
            );
          }
        }
      }
    },
    /**-------------------------------------------------------------------- */
    /**
     * getallsong(arr,index)
     * 歌單中傳來的整個歌單...
     * 當index==0則不播放音樂...
     * 當index==1則自動播放音樂....
     * 其實就是當index...不賦值給audiourl....
     * 後續步驟跟getonesong一樣....(順序不一,過程也有一些不一.....)
     * 1.獲取歌詞------------this.getsongword()
     * 2.放入myplaylist------ this.myplaylist.push(songinfo)
     * 3.然後checkWhichsong---重新指向該歌詞.....
     * 4.依該歌曲請求播放地址....
     * 5.放入that.audioUrl且push進audioUrlarr
     * 默認播放的話(1)則取數組的第一個放進去....
     *
     */
    getallsong: function (arr, index) {
      this.songinfo = arr[0];
      this.getsongword;
      this.lastplayindex = this.myplaylist.length;
      for (var i = 0; i < arr.length; i++) {
        this.myplaylist.push(arr[i]);
      }
      this.checkwhichsong();

      //第4,5步.....4.依該歌曲請求播放地址....
      //           5.放入that.audioUrl且push進audioUrlarr
      // 判斷一下是0或1.....
      //  1則全放入且播放....
      // audioUrl為播放...

      var that = this;
      for (var i = 0; i < arr.length; i++) {
        this.$axios
          .get("http://localhost:3000/song/url?id=" + arr[i].id)
          .then((res) => {
            //console.log(res.data.data[0].url);
            that.audioUrlarr.push(res.data.data[0].url);
            //console.log(that.audioUrlarr);
          });
      }
      //console.log(that.audioUrlarr);
      //拿第一首歌為默認播放...
      that.choosesongfromlist(this.lastplayindex);
    },

    /**-------------------------------------------------------------------- */
    /**
     * getonesong({})
     * 只獲取一首歌......來至歌單....
     * 三個操作...
     * 1.獲取歌詞------------this.getsongword()
     * 2.放入myplaylist------ this.myplaylist.push(songinfo)
     * 3.然後checkWhichsong---重新指向該歌詞.....
     * 4.依該歌曲請求播放地址....
     * 5.放入that.audioUrl且push進audioUrlarr
     */
    getonesong: function (songinfo) {
      console.log(songinfo);
      console.log('ok');
      this.songinfo = songinfo;
      this.getsongword();
      this.myplaylist.push(songinfo);
      this.checkwhichsong();

      var that = this;
      this.$axios
        .get("http://localhost:3000/song/url?id=" + this.songinfo.id)
        .then((res) => {
          //console.log(res.data.data[0].url);
          that.audioUrl = res.data.data[0].url;
          that.audioUrlarr.push(res.data.data[0].url);
        });
    },

    /**----------------是否彈出歌曲細節框------------------------------------------------- */
    changeisinfo: function () {
      this.isinfo = !this.isinfo;
    },
    /**----------------------------------------------------------------- */
    changebutton: function (index) {
      this.buttonindex = index;
    },
    /**----------------------------------------------------------------- */
    /**
     * 改變isShow的值
     */
    /**----------------------------------------------------------------- */
    change: function () {
      this.isShow = !this.isShow;
    },
    //獲取子子子....子組件的songurl
    /**----------------------------------------------------------------- */
    getsongurl: function (url) {
      //console.log(url);
      this.audioUrl = url;
    },

    /**----------------------------------------------------------------- */
    //獲取子組件發來的songUrl......
    getTheSongUrl: function (info,url) {
      this.songinfo = info;
      this.myplaylist.push(info);
      // console.log(this.songinfo);
      this.checkwhichsong();
      this.audioUrl=url;
      //this.audioUrl = this.$route.query.songurl;
      //console.log(this.$route.query);
      this.getsongword();
      //放入音樂盒的url arr
      this.audioUrlarr.push(this.audioUrl);
      //console.log(this.audioUrlarr);
    },

    /**----------------------------------------------------------------- */
    /**
     * getsongword()
     * 因為要動態點歌...
     * 所以要分拆功能從getTheSongUrl...
     *
     */
    /**----------------------------------------------------------------- */
    getsongword: function () {
      //歌詞...
      var that = this;
      this.$axios
        .get("http://localhost:3000/lyric?id=" + this.songinfo.id)
        .then((res) => {
          that.songword = res.data.lrc.lyric;
          //console.log(that.songword);
        });
    },
    /**----------------------------------------------------------------- */

    getTheMessage: function (message) {
      this.theMessage = message;
      //console.log('mymessage'+' '+this.theMessage);
    },
    /**----------------------------------------------------------------- */

    /**
     * checkwhichsong()
     * 這個是用來check現在是那一首歌....O(n)2333
     */
    checkwhichsong: function () {
      for (var i = 0; i < this.myplaylist.length; i++) {
        if (this.songinfo === this.myplaylist[i]) {
          this.playingindex = i;
          break;
        }
      }
    },
    /**----------------------------------------------------------------- */

    /**
     * 從個人列表歌單中選歌....
     * choosesongfromlist
     */
    choosesongfromlist: function (index) {
      //console.log(index);
      //this.isplaying=false;
      this.songinfo = this.myplaylist[index];
      this.audioUrl = this.audioUrlarr[index];
      this.playingindex = index;
      this.getsongword();
    },

    /**----------------------------------------------------------------- */
  },
  components: {
    TopBar,
    MidLeftBar,
    MidRightTopBar,
    MidRightBar,
    MidRightMidBar,
    SearchBar,
    Audiobox,
    Ownplaylist,
    Infobox,
    songpage,
  },
};
</script>
<style>
.home {
  width: 1020px;
  height: 600px;
  position: relative;
  margin: 0px auto;
  background-color: #ffffff;
  box-shadow: 15px 0 15px -15px rgba(0, 0, 0, 0.3),
    -15px 0 15px -15px rgba(0, 0, 0, 0.3);
}
#midRightBar {
  float: left;
  width: 819px;
  height: 541px;
  position: relative;
}
.own-song-play-list {
  width: 420px;
  height: 540px;
  position: absolute;
  right: 0px;
  z-index: 9999;
  overflow: scroll;
  background-color: #ffffff;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
}
.own-container {
  position: relative;
  width: 420px;
  height: 100%;
  transition: height 1s;
}
.own-top-bar {
  width: 310px;
  height: 50px;
  padding-left: 100px;
  padding-top: 10px;
}
.outside-container {
  width: 219px;
  height: 30px;
  position: relative;
  border-radius: 20px;
  border: 1px solid#BBBBBB;
  display: flex;
}
.outside-container .own-left-button {
  flex: 1;
  text-align: center;
  line-height: 35px;
  font-size: 13px;
  border-radius: 20px;
  cursor: pointer;
}
.outside-container .own-right-button {
  flex: 1;
  text-align: center;
  line-height: 35px;
  font-size: 13px;
  border-radius: 20px;
  cursor: pointer;
}
.own-right-button:hover {
  background-color: #f5f5f5;
}
.own-left-button:hover {
  background-color: #f5f5f5;
}
.myacttive {
  background-color: #bbbbbb;
  color: #f6f6f6;
}
.myacttive:hover {
  background-color: #bbbbbb;
  color: #f6f6f6;
}
.ownplaylist-container {
  width: 400px;
  padding-left: 20px;
  height: 480px;
}
.ownplaylist-container .top-functionlist {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #f3f3f3;
}
.top-functionlist .count {
  font-size: 13px;
  line-height: 40px;
  color: #d7d7d7;
  float: left;
  margin-right: 160px;
}
.top-functionlist .right-container {
  float: left;
  width: 200px;
  line-height: 40px;
  display: flex;
  position: relative;
}
.right-container .collecall {
  width: 100px;
  height: 40px;
  text-align: center;
}
.right-container .collecall i {
  font-size: 18px;
  color: #8d8d8d;
  cursor: pointer;
}
.right-container .collecall i:hover {
  color: #333333;
}
.right-container .collecall span {
  font-size: 13px;
  color: #333333;
  cursor: pointer;
}
.right-container .clean {
  width: 100px;
  height: 40px;
  position: absolute;
  right: 0px;
  text-align: center;
}
.right-container .clean i {
  font-size: 17px;
  color: #8d8d8d;
  cursor: pointer;
}
.right-container .clean i:hover {
  color: #333333;
}
.right-container .clean span {
  font-size: 13px;
  cursor: pointer;
  color: #333333;
}
.ownline {
  background-color: #e6e6e6;
  width: 1px;
  height: 20px;
  position: absolute;
  left: 53%;
  top: 10px;
}
.own-mid-songlist {
  width: 100%;
  height: 439px;
  overflow: scroll;
}
.login
{
  width: 300px;
  height: 450px;
  box-shadow: -5px 5px 10px rgba(0, 0, 0, 0.5);
  position: absolute;
  background-color: #FFFFFF;
  z-index: 9999999999999;
  top: 100px;
  left: 420px;
}
.login .login-text
{
  padding-top: 40px;
  font-weight: 500;
  text-align: center;
}
.login img
{
  width: 100%;
  height: 100%;
  margin-bottom: 10px;
}
.login .img-box
{
  width: 250px;
  height: 150px;
  padding-left: 25px;
  padding-top: 40px;
  font-size: 14px;
  text-align: center;
}
.input-container
{
  width: 220px;
  height: 60px;
  padding-left: 35px;
  margin-bottom: 20px;
}
.input-container input:nth-child(1)
{
  width: 200px;
  padding-left: 20px;
  height: 25px;
  border:1px solid #D8D8D8;
  border-bottom: 0px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.input-container input:nth-child(2)
{
  width: 200px;
  padding-left: 20px;
  height: 25px;
  border:1px solid #D8D8D8;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.button3
{
  width: 220px;
  height: 60px;
  padding-left: 35px;
  text-align: center;
  line-height: 30px;
  position: relative;
}
.button3 div:nth-child(1)
{
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #EA4848;
  color: #FFFFFF;
}
.button3 div:nth-child(1):hover
{
  background-color: #C72E2E;
}
.button3 div:nth-child(2)
{
   font-size: 14px;
   color:#C72E2E ;
}
.close1
{
  width: 30px;
  height: 30px;
  position: absolute;
  color: #A5A5A5;
  right: 0;
  top: 10px;
  cursor: pointer;
}
</style>
