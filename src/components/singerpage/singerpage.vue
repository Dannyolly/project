<template>
  <div class="singerpage">
    
    <div class="top-container">
      <div class="img-container">
        <img :src="singerobj.img1v1Url" alt="" />
      </div>

      <div class="singerpage-right-container">
        <h1>{{ singerobj.name }}</h1>
        <div class="button-container">
          <mybutton-1 :width="90" :height="35">
            <i slot="icon" class="far fa-folder"></i>
            <span slot="text">收藏</span>
          </mybutton-1>

          <mybutton-1 :height="35">
            <i slot="icon" class="fas fa-user"></i>
            <span slot="text">個人主頁</span>
          </mybutton-1>
        </div>
        <div class="text-container">
          <div class="songCount">單曲數:{{ singerobj.musicSize }}</div>
          <div class="albumCount">專輯數:{{ singerobj.albumSize }}</div>
        </div>
      </div>
    </div>
    <div class="mid-container">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        active-text-color="#EC4141"
        :default-active="activeIndex"
      >
        <!--dafault-active...是默認值...-->
        <el-menu-item @click="chooseindex(0)" index="1">
          專輯
        </el-menu-item>
        <el-menu-item @click="chooseindex(1)" index="2">
          MV
        </el-menu-item>
        <el-menu-item @click="chooseindex(2)" index="3">
          相似歌手
        </el-menu-item>
      </el-menu>

      <!--imgbox-->
      <!--改用第三種....美觀D...就系難D...但唔洗多做頁面..-->
      <!--top50-->

      <div class="singer-album" v-if="myindex===0">
          <div class="mid-img-container">
           <div class="img-left-container">
          <img-box>
            <img slot="img" src="../../assets/img/top50.png" alt="" />
            <div slot="text"></div>
          </img-box>
        </div>
        <h4></h4>
        <div class="img-right-container">
          <h4>熱門50首</h4>
          <div class="play-container">
             <i class="far fa-play-circle"></i>
            <i class="far fa-folder"></i>
          </div>
          <search-list
            v-for="(item, index) in top50arr"
            :key="item.name + index"
            :width="550"
            :albumwidth="0"
            :hotwidth="0"
            :singerwidth="0"
          >
            <span slot="num">{{
              index + 1 < 10 ? "0" + String(index + 1) : index + 1
            }}</span>
            <i slot="icon-like" class="far fa-heart"></i>
            <i slot="icon-download" class="far fa-arrow-alt-circle-down"></i>
            <span
                 @dblclick="play50song(index)"
              slot="the-title"
              class="the-title"
              >{{ item.name }}</span
            >
            <span slot="time">03:08</span>
            <!--al.id 為專輯的id碼...-->
          </search-list>
        </div>
         </div>
             
        <div class="mid-img-container" v-for="(item,index) in albumarr" :key="item+index">
           <div class="img-left-container">
          <img-box>
            <img slot="img" :src="item.blurPicUrl" alt="" />
            <div slot="text"></div>
          </img-box>
        </div>
        <h4></h4>
        <div class="img-right-container">
          <h4>{{item.name}}</h4>
          <div class="play-container">
            <i class="far fa-play-circle"></i>
            <i class="far fa-folder"></i>
          </div>
          <search-list @click="playsong(index,index1)"
            v-for="(item1, index1) in albumsongarr[index]"
            :key="item1.id+index1"
            :width="550"
            :albumwidth="0"
            :hotwidth="0"
            :singerwidth="0"
          >
            <span slot="num">{{
              index1 + 1 < 10 ? "0" + String(index1 + 1) : index1 + 1
            }}</span>
            <i slot="icon-like" class="far fa-heart"></i>
            <i slot="icon-download" class="far fa-arrow-alt-circle-down"></i>
            <span
              @dblclick="playsong(index,index1)"
              slot="the-title"
              class="the-title"
              >{{ item1.name }}</span
            >
            <span slot="time">03:08</span>
            <!--al.id 為專輯的id碼...-->
          </search-list>
        </div>
         </div>

      </div>
     
       <div class="singer-mv" v-if="myindex===1">
        <video-box v-for="(item,index) in mvarr" :key="item+index">
             <div slot="clickcount" class="playCount">
                <i class="fas fa-play">
                    {{item.playCount}}
                </i>
            </div>
            <img @click="gotomvpage(index)" :src="item.imgurl16v9" alt="" slot="video">
                 <h4 slot="h4" class="mv-title">{{item.name}}</h4>
            
        </video-box>
       </div>
      
      <div class="singer-info" v-if="myindex===2">
          <img-box :width="130"  v-for="(item,index) in simisingerarr" :key="item+index"> 
            <img @click="gotosingerpage(index)" slot="img" :src="item.img1v1Url" alt="" />
            <div slot="text">{{item.name}}</div>
          </img-box>
       

          
      </div>
    </div>
    
  </div>

</template>

<script>
import ImgBox from "../ImgBox.vue";
import SearchList from "../searchBar/searchList.vue";
import Mybutton1 from "../songpage/mybutton1.vue";
import cut from "../publicfunction/function";
import VideoBox from '../VideoBox.vue';
export default {
  name: "singerpage",
  components: {
    Mybutton1,
    ImgBox,
    SearchList,
    VideoBox,
  },
  data() {
    return {
      activeIndex: "1",
      myindex:0,
      singerobj: {},
      albumarr: [],
      top50arr: [],
      /**
       *  albumarr入面沒有裝歌...FK...
       *  只能重新請求多一次...再找各專輯的歌曲...
       *  而這個就用albumsongarr放...
       */
      albumsongarr:[],
      //Mv的數組...
      mvarr:[],
      //相似歌手的數組...
      simisingerarr:[],
    };
  },
  watch: {
    $route: {
      immediate: true,
      handler: function () {
        this.getsingerobj();

      },
    },
    top50arr: function () {
      this.checkoutlength();
    },
    albumarr:function()
    {
      this.getalbumsongs();
    },
    myindex:function()
    {
      if(this.myindex===1)
      {
        this.activeIndex=String(this.myindex);
        this.getsingermv()
      }
      else if(this.myindex===2)
      {
        this.getsimisinger();
      }
    },
    mvarr:function()
    {
      //console.log("hello?");
      this.cutdown();
    },
  },
  mounted() {
    this.getsingerobj()
  },
  methods: {
    /**---------------------------------------------------------------------------- */
    /**
     * 大概有2個功能.....
     * 1.gotomvpage..,...
     * 2.gotosingerpage....
     * 兩者都是通過router傳值.....
     */
    /**----gotomvpage */
    gotomvpage:function(index)
    {
      this.$router.push({path:'/home/mvpage',query:{arr:this.mvarr[index],singerobj:this.singerobj,pre:this.$route.path,save:1}});
    },
    /**----gotosingerpage */
    gotosingerpage:function(index)
    {
      this.$router.push({path:'/home/singerpage',query:{singerobj:this.simisingerarr[index]}})
    },
    /**---------------------------------------------------------------------------- */
    cutdown:function()
    {
       for(var i=0;i<this.mvarr.length;i++)
       {
         if(this.mvarr[i].name.length>20)
         {
           this.mvarr[i].name=cut(this.mvarr[i].name.length-20,this.mvarr[i].name);
         }
       }
    },

    /**-------------------------------------------------------------------------------- */
    /**
     * getsingerinfo
     * 提取歌手詳情...
     * 不做了...
     * 改為相似歌手
     */
    getsimisinger:function()
    {
       var that = this;
      this.$axios
        .get("http://localhost:3000/simi/artist?id="+ this.singerobj.id)
        .then((res) => {
          console.log(res.data.artists);
          this.simisingerarr=res.data.artists;
        });
    },
    /**------------------------------------------------------------------------------- */
    /**
     * getsingermv
     */
    getsingermv:function()
    {
      var that = this;
      this.$axios
        .get("http://localhost:3000/artist/mv?id=" + this.singerobj.id)
        .then((res) => {
          //console.log(res.data.mvs);
          that.mvarr=res.data.mvs;
        });
    },
    /**---------------------------------------------------------- */
    /**
     * 導航條選擇.....
     * album Mv singerinfo  closesinger
     * chooseindex(index)
     */
    chooseindex:function(index)
    {
      this.myindex=index;
    },
    /**---------------------------------------------------------- */
    /**
     * play50song(index)
     * index是專輯的第幾首歌...
     * 這里自己先請求吧..
     * 在返回songobj......
     * 這個是給熱門50首用的.....
     */
    play50song:function(index)
    {
     // console.log(this.albumsongarr[index][index1]);
      //console.log(this.top50arr[index]);
      this.$emit('getonesong',this.top50arr[index]);
      //this.$emit('getonesong',this.albumsongarr[index][index1])
     // await this.$axios.get("http://localhost:3000/")
    },
    /**----------------------------------------------------------*/
    /**---------------------------------------------------------- */
    /**
     * playsong(index,index1)
     * index是第x個專輯.....index1是專輯的第幾首歌...
     * 這里自己先請求吧....同步.....
     * 在返回songobj......
     * 這個不是給熱門50首用的.....
     */
    playsong:function(index,index1)
    {
     // console.log(this.albumsongarr[index][index1]);
      this.$emit('getonesong',this.albumsongarr[index][index1])
     // await this.$axios.get("http://localhost:3000/")
    },
    /**----------------------------------------------------------*/
    /**
     * 剪取長度.....
     * checkoutlength()
     */
    checkoutlength: function () {
      for (var i = 0; i < this.top50arr.length; i++) {
        if (this.top50arr[i].name.length > 15) {
          this.top50arr[i].name = cut(
            this.top50arr[i].name.length - 10,
            this.top50arr[i].name
          );
        }
      }
    },
    /**--------------------------------------------------------- */
    /**
     * 獲取熱門歌曲50首....
     */
    gettop50song: function () {
      var that = this;
      this.$axios
        .get("http://localhost:3000/artist/top/song?id=" + this.singerobj.id)
        .then((res) => {
          //console.log(res.data.songs);
          that.top50arr = res.data.songs;
          that.top50arr.length = 10;
        });
    },
    /**------------------------------------------------------- */
    /**
     * 獲取歌手專輯.....
     */
    getsingeralbum: function () {
      var that = this;
      this.$axios
        .get(
          "http://localhost:3000/artist/album?limit=30&id=" + this.singerobj.id
        )
        .then((result) => {
          //console.log(result.data.hotAlbums);
          that.albumarr = result.data.hotAlbums;
        })
        .catch((err) => {});
    },
    /**------------------------------------------------------ */
    /**
     * 專輯內沒有歌曲...fk
     * 所以要每個專輯再請求....
     * getalbumsongs()
     */
    getalbumsongs:async function()
    {
       //124074100
       var that=this;
       for(var i=0;i<this.albumarr.length;i++)
       {
         await this.$axios.get("http://localhost:3000/album?id="+this.albumarr[i].id)
               .then(res=>{
                 that.albumsongarr.push(res.data.songs);
               })
       }
       //console.log(that.albumsongarr[0]);
    },
    /**------------------------------------------------------ */
    /**
     * 獲取歌手資料.....
     */
    getsingerobj: function () {
      //console.log(this.$route.query.arr);
      this.singerobj = this.$route.query.singerobj;
      //獲取後...開始獲取其它信息....
      //這個是歌手專輯....
      this.getsingeralbum();
      this.gettop50song();
    },
    /**------------------------------------------------------ */
   
  },
};
</script>

<style>
@import "./style.css";
.singerpage {
  width: 789px;
  float: left;
  position: relative;
  height: 510px;
  padding-top: 30px;
  padding-left: 30px;
  overflow: scroll;
}
</style>