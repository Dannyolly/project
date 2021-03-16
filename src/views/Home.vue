<template>
  <div class="home" >
     <top-bar @checkMv="checkMv" @mysearch-message="getTheMessage">
     </top-bar>
     <!--<mid-bar></mid-bar>-->
       <mid-left-bar v-if="isShowMv==true"></mid-left-bar>
       <!--
        1--- @getonesong="getonesong"    是歌單發來的單歌曲...

        2--- @getallsong="getallsong"    是歌單中的播放全部......

        3--- @getSongUrl="getTheSongUrl" 為searchbar用的

        4--- @getsongurl="getsongurl"    是其它子子....子組件傳上來的url,,,

        5----@checkMv="checkMv".....     為打開MV...令leftbar和audio關閉....
       -->
            <router-view
            @getonesong="getonesong"

            @getallsong="getallsong"

            @getthesongurl="getTheSongUrl"

            @getsongurl="getsongurl"

            @checkMv="checkMv"
            >

            </router-view>

       <infobox :isinfo="isinfo" 
       :class="{infoactive:isinfo==true}" 
       :songword="songword"
       :songinfo="songinfo"
       ></infobox>
       
       <div v-show="isShow"  class="own-song-play-list">
         <div class="own-container">
           <!--這里是按鈕.....-->
             <div class="own-top-bar">
                  <div class="outside-container">
                    <div @click="changebutton(0)" :class="{myacttive:buttonindex===0}" class="own-left-button">
                      播放列表
                    </div>
                    <div @click="changebutton(1)" :class="{myacttive:buttonindex===1}" class="own-right-button">
                      歷史記錄
                    </div>
                  </div>
             </div>
            <!--這里是..列表....-->
            <div class="ownplaylist-container">
                <div class="top-functionlist">
                  <div class="count">總{{myplaylist.length}}首</div>
                  <div class="right-container">
                     <div class="collecall">
                        <i class="far fa-folder"></i>
                        <span>收藏全部</span>
                       </div>
                       <div class="ownline"></div>
                     <div class="clean">
                       <i class="fas fa-trash-alt"></i>
                       <span>清空</span>
                       </div>
                  </div>

                </div>
                <!--歌曲列表....-->
                 <div class="own-mid-songlist">
                    <ownplaylist  :class="{playing:index===playingindex}" v-for="(item,index) in myplaylist" :key="item+index">
                      <span  @dblclick="choosesongfromlist(index)" id="songname" slot="songname">{{item.name}}</span>
                      <span id="own-name" slot="own-name">{{item.ar[0].name}}</span>
                       <div v-if="index===playingindex" slot="play" class="own-play"><i class="fas fa-play"></i></div>
                    </ownplaylist>
                  </div>
            </div>
         </div>
       </div>

       <audiobox v-if="isShowMv==true" @showthesonginfo="changeisinfo" 
       @show="change"  :src="audioUrl" :songinfo="songinfo"></audiobox>
       <!--:src="audioUrl"-->
  </div>
</template>

<script>
import axios from 'axios'
import MidLeftBar from '../components/midleftbar/midLeftBar.vue'
import MidRightBar from '../components/midRightBar.vue'
import MidRightMidBar from '../components/midRightMidBar.vue'
import MidRightTopBar from '../components/midRightTopBar.vue'
import Audiobox from '../components/playmusicbox/audiobox.vue'
import Infobox from '../components/playmusicbox/infobox.vue'
import Ownplaylist from '../components/playmusicbox/ownplaylist.vue'
import SearchBar from '../components/searchBar/searchBar.vue'
import songpage from '../components/songpage/songpage'
import cut from '../components/publicfunction/function'
/**
 * 重構一下.....假如midbar---是包含left-right
 * 則沒法動態變換rightbar....
 * 所以抽取出來放到Home里...
 * 
 */
import TopBar from '../components/topBar.vue'
export default {
  name: 'Home',
  data() {
    return {
       theMessage:'danny',
       //audioUrl....音樂連結....
       //audioUrlarr....保存起來的數組....
       // audiourlarr 是當從列表歌單中選取歌曲.....所提取連結的源頭
       audioUrl:'',
       audioUrlarr:[],
       //isShow是歌單列表
       //isInfo是單曲詳細資料....
       isShow:false,
       isinfo:false,
       //默認值....列表中的按鈕---默認是播放列表...
       buttonindex:0,
       //mayplaylist----個人播放列表
       myplaylist:[],
       //歌手資料.....
       //songinfo....可作為當前選的歌.....
       //暫用.....................
       //songword....歌詞....
       //songid.....歌曲id...
       //playingindex....配合那首歌播放的值
       songinfo:{},
       songword:'',
       songid:'',
       playingindex:-1,

       //lastplayindex....
       //記下上次的播放index
       lastplayindex:-1,

       //因為MV界面要求全部...所以leftbar同audio都要沒
       /**
        * 所以用一個值表示...
        * isShowMv....
        * checkMv()....$emit發來的函數....
        */
       isShowMv:true,
    }
  },
  watch:{
     //當audio
     myplaylist:function()
     {
       this.checkoutnamelength();
     }
  },
  methods: {
    /**-------------------------------------------------------------------- */
     //因為MV界面要求全部...所以leftbar同audio都要沒
       /**
        * 所以用一個值表示...
        * isShowMv....
        * checkMv()....$emit發來的函數....
       */
    checkMv:function()
    {
      this.isShowMv=!this.isShowMv;
    },
    /**-------------------------------------------------------------------- */
    /**
     * checkoutnamelength()
     * 檢查playlist中的artists name的展度....
     * 使用cut函數....
     */
    checkoutnamelength:function()
    {
      for(var i=0;i<this.myplaylist.length;i++)
      {
        if(this.myplaylist[i].ar[0].name.length>15)
        {
          this.myplaylist[i].ar[0].name=cut(this.myplaylist[i].ar[0].name.length-5,this.myplaylist[i].ar[0].name);
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
    getallsong:function(arr,index)
    {
       this.songinfo=arr[0];
       this.getsongword;
       this.lastplayindex=this.myplaylist.length;
       for(var i=0;i<arr.length;i++)
       {
         this.myplaylist.push(arr[i]);
       }
       this.checkwhichsong();
       
       //第4,5步.....4.依該歌曲請求播放地址....
       //           5.放入that.audioUrl且push進audioUrlarr
       // 判斷一下是0或1.....
       //  1則全放入且播放....
       // audioUrl為播放...

       var that=this;
       for(var i=0;i<arr.length;i++)
       {
       this.$axios.get("http://localhost:3000/song/url?id="+arr[i].id)
           .then(res=>{
            //console.log(res.data.data[0].url);
             that.audioUrlarr.push(res.data.data[0].url);
              //console.log(that.audioUrlarr);
           })
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
    getonesong:function(songinfo)
    {
      //console.log(songinfo);
      this.songinfo=songinfo;
      this.getsongword();
      this.myplaylist.push(songinfo);
      this.checkwhichsong();

      var that=this;
      this.$axios.get("http://localhost:3000/song/url?id="+this.songinfo.id)
      .then(res=>{
        //console.log(res.data.data[0].url);
        that.audioUrl=res.data.data[0].url;
        that.audioUrlarr.push(res.data.data[0].url);
      })
    },

    /**----------------是否彈出歌曲細節框------------------------------------------------- */
    changeisinfo:function()
    {
      this.isinfo=!this.isinfo;
    },
    /**----------------------------------------------------------------- */
    changebutton:function(index)
    {
      this.buttonindex=index;
    },
    /**----------------------------------------------------------------- */
    /**
     * 改變isShow的值
     */
    /**----------------------------------------------------------------- */
    change:function()
    {
       this.isShow=!this.isShow;
    },
    //獲取子子子....子組件的songurl
    /**----------------------------------------------------------------- */
    getsongurl:function(url)
    {
        console.log(url);
        this.audioUrl=url;
    },

    /**----------------------------------------------------------------- */
    //獲取子組件發來的songUrl......
    getTheSongUrl:function(info)
    {
      this.songinfo=info;
      this.myplaylist.push(info);
      //console.log(this.myplaylist);
      this.checkwhichsong();
      this.audioUrl=this.$route.query.songurl;
      console.log(this.$route.query)
      this.getsongword();
      //放入音樂盒的url arr
      this.audioUrlarr.push(this.audioUrl);
      console.log(this.audioUrlarr);
    },

    /**----------------------------------------------------------------- */
    /**
     * getsongword()
     * 因為要動態點歌...
     * 所以要分拆功能從getTheSongUrl...
     * 
     */
    /**----------------------------------------------------------------- */
    getsongword:function()
    {
     //歌詞...
      var that=this;
      this.$axios.get("http://localhost:3000/lyric?id="+this.songinfo.id)
      .then(res=>{
        that.songword=res.data.lrc.lyric;
      })
    },
    /**----------------------------------------------------------------- */

    getTheMessage:function(message)
    {
      this.theMessage=message;
      //console.log('mymessage'+' '+this.theMessage);
    },
    /**----------------------------------------------------------------- */

    /**
     * checkwhichsong()
     * 這個是用來check現在是那一首歌....O(n)2333
     */
    checkwhichsong:function()
    {
       for(var i=0;i<this.myplaylist.length;i++)
       {
         if(this.songinfo===this.myplaylist[i])
         {
           this.playingindex=i;
           break;
         }
       }
    },
    /**----------------------------------------------------------------- */

    /**
     * 從個人列表歌單中選歌....
     * choosesongfromlist
     */
    choosesongfromlist:function(index)
    {
      //console.log(index);
      this.songinfo=this.myplaylist[index];
      this.audioUrl=this.audioUrlarr[index];
      this.playingindex=index;
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
  }
}
</script>
<style>
   
   .home
   {
      width: 1020px;
       height: 600px;
       position: relative;
       margin: 0px auto;
       background-color: #FFFFFF;
       box-shadow:15px 0 15px -15px rgba(0, 0, 0, 0.3),
                   -15px 0 15px -15px rgba(0, 0, 0, 0.3);

   }
   #midRightBar{
        float:left;
        width: 819px;
        height: 541px;
        position: relative;
        
    }
    .own-song-play-list
    {
      width: 420px;
       height: 540px;
      position: absolute;
      right: 0px;
      z-index: 9999;
      overflow: scroll;
      background-color: #FFFFFF;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
    }
    .own-container
    {
      position: relative;
      width: 420px;
      height: 100%;
      transition: height 1s;
    }
    .own-top-bar
    {
      width: 310px;
      height: 50px;
      padding-left: 100px;
      padding-top: 10px;
    }
    .outside-container
    {
      width: 219px;
      height: 30px;
      position: relative;
      border-radius: 20px;
      border:1px solid#BBBBBB;
      display:flex;
    }
    .outside-container .own-left-button
    {
      flex: 1;
      text-align: center;
      line-height: 35px;
      font-size: 13px;
      border-radius: 20px;
      cursor: pointer;
    }
    .outside-container .own-right-button
    {
      flex: 1;
      text-align: center;
      line-height: 35px;
      font-size: 13px;
      border-radius: 20px;
      cursor: pointer;
    }
    .own-right-button:hover
    {
      background-color: #F5F5F5;
    }
    .own-left-button:hover
    {
      background-color: #F5F5F5;
    }
    .myacttive
    {
          background-color: #BBBBBB;
          color: #F6F6F6;
    }
    .myacttive:hover
    {
         background-color: #BBBBBB;
          color: #F6F6F6;
    }
    .ownplaylist-container
    {
      width: 400px;
      padding-left:20px;
      height: 480px;
    }
    .ownplaylist-container .top-functionlist
    {
       width: 100%;
       height: 40px;
       border-bottom: 1px solid #F3F3F3;
    }
    .top-functionlist .count
    {
      font-size: 13px;
      line-height: 40px;
      color: #D7D7D7;
      float: left;
      margin-right: 160px;
    }
    .top-functionlist .right-container
    {
      float: left;
      width: 200px;
      line-height: 40px;
      display: flex;
      position: relative;
    }
    .right-container .collecall
    {
      width: 100px;
      height: 40px;
      text-align: center;
    }
    .right-container .collecall i
    {
      font-size: 18px;
      color: #8D8D8D;
      cursor: pointer;
    }
    .right-container .collecall i:hover
    {
      color: #333333;
    }
    .right-container .collecall span
    {
      font-size: 13px;
      color: #333333;
      cursor: pointer;
    }
    .right-container .clean
     {
       width: 100px;
       height: 40px;
       position: absolute;
       right: 0px;
       text-align: center;
     }
      .right-container .clean i
    {
      font-size: 17px;
      color: #8D8D8D;
      cursor: pointer;
    }
    .right-container .clean i:hover
    {
      color: #333333;
    }
    .right-container .clean span
    {
      font-size: 13px;
      cursor: pointer;
      color: #333333;
    }
    .ownline
    {
        background-color: #E6E6E6;
        width: 1px;
        height: 20px;
        position: absolute;
        left: 53%;
        top: 10px;
    }
    .own-mid-songlist
    {
      width: 100%;
      height: 439px;
      overflow:scroll;
    }
</style>
