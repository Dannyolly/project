<template>
  <div class="mvpage">
    <div class="big-container">
      <div class="mvpage-leftcontainer">
        <div class="title">
          <i @click="out" class="fas fa-chevron-left" slot="text"></i>
          <span>MV詳情</span>
        </div>
        <!--video-->
        <video width="615px" height="350px" :src="videoUrl" controls></video>

        <div class="mvpage-img-content">
          <div class="image">
            <img src="" alt="" />
          </div>
          <span>{{videoobj.artistName}}</span>
        </div>
        <div class="title-content">
          <h1>{{videoobj.name}}</h1>
          <div class="public">發布: {{videoobj.publishTime}}</div>
          <div class="title-playCount">播放: 106万次</div>
          <div class="intro">
            {{videoobj.desc}}
          </div>

          <div class="mvpage-button">
            <mybutton-1> 
                <i slot="icon" class="far fa-thumbs-up"></i>
                <span slot="text">赞(6775)</span>
            </mybutton-1>
            <mybutton-1>
              <i slot="icon" class="far fa-folder"></i>
              <span slot="text">收藏{{videoobj.subCount}}</span>
            </mybutton-1>
            <mybutton-1>
              <i slot="icon" class="far fa-share-square"></i>
              <span slot="text">分享({{videoobj.shareCount}}</span>
            </mybutton-1>
            <mybutton-1>
              <i slot="icon" class="fas fa-arrow-circle-down"></i>
              <span slot="text">下載全部</span>
            </mybutton-1>
          </div>

        </div>
       <div class="mvpage-comment-container">
                    <!--這里是留言區...-->
         <div class="comment-container">
           <h2>評論<span>({{videoobj.commentCount}})</span></h2>
          <div class="own-comment-box">
             <input type="text" name="" id="" placeholder="發表評論" />
             <div class="pen">
              <i class="fas fa-pen"></i>
             </div>
             <div class="own-smile">
               <i class="far fa-smile"></i>
             </div>
              <div class="add">@</div>
            </div>
            
            <div class="nice-comment">
                <h4>精彩評論</h4>
                
                <commentbox v-for="(item,index) in commentarr" :key="item+index">
                     <img v-if="item" slot="img" :src="item.user.avatarUrl" alt="">
                      <span v-if="item" slot="user-name" class="user-name">{{item.user.nickname}}: </span>
                    <span v-if="item" slot="content" class="content">{{item.content}}</span>
                    <div v-if="item" slot="date" class="data">2021年7月1日 11:21</div>
                     <span v-if="item"
                     slot="like" class="like" id="like">
                     <i   class="fas fa-thumbs-up">{{item.likedCount}}</i>
                     </span>
                </commentbox>
            
            </div>

        </div>
           </div>
        </div>

       <!--右邊開始....-->
      <div class="mvpage-rightcontainer">
          <div class="title">
          <span>相關推薦</span>
          </div>

          <othermv v-for="(item,index) in closemvarr" :key="item.name+index">
               <img slot="img" :src="item.cover" alt="">
               <i  slot="playCount" class="fas fa-play">12321</i>
               <span slot="title" class="title">{{item.name}}</span>
               <span slot="by" class="by">by {{item.artistName}}</span>
          </othermv>
      </div>

    </div>
  </div>
</template>

<script>
import Commentbox from '../playmusicbox/commentbox.vue';
import Mybutton from "../songpage/mybutton.vue";
import Mybutton1 from "../songpage/mybutton1.vue";
import TitleBox from "../titleBox.vue";
import Othermv from './othermv.vue';
export default {
  name: "mvpage",
  data() {
    return {
        videoobj:{},
        videoUrl:'',
        commentarr:[],
        artistsid:0,
        closemvarr:[],
    };
  },
  watch:{
     $route:{
        immediate: true,
        handler:function()
        {
            this.getvideoarr();
           
        }
    },
  },
  components: {
    TitleBox,
    Mybutton,
    Mybutton1,
    Othermv,
    Commentbox
  },
  methods: {
    /**---------------------------------------------------------------------------- */
    /**
     * out() 
     * 用來從MV返回上一頁....
     */
    out:function()
    {
        this.$emit('checkMv');
        this.$router.go(-1);
    },

      /**------------------------------------------------------------------------- */
    /**
     * get相像mv....
     * getclosemv
     */
    getclosemv:function()
    {
      var that=this;
      this.$axios.get("http://localhost:3000/simi/mv?mvid="+this.videoobj.id)
      .then(res=>{
          console.log(res.data.mvs);
          that.closemvarr=res.data.mvs
      })
    },
    /**------------------------------------------------------------------------- */
    /**
     * get歌手cover....
     * getimgurl
     */
    getimgurl:function()
    {
       var that=this;
       this.$axios.get("http://localhost:3000/artist/detail?id="+this.videoobj.id)
       .then(res=>
       {
           //console.log(res);
       })
    },
    /**-------------------------------------------------------------------------- */
    /**
     * getmvcommnet
     * 根據id 請求MV.......
     */
    getmvcommnet:function()
    {
        var that=this;
        this.$axios.get("http://localhost:3000/comment/mv?id="+this.videoobj.id)
        .then(res=>{
            //console.log(res.data.hotComments);
            that.commentarr=res.data.hotComments;
        })
    },
    /**-------------------------------------------------------------------------- */
    /**
     * 因為下面的請求得不得videourl....
     * 所以再請求多次
     * getmvaddr()
     */
    getmvaddr:function()
    {
       var that=this;
       this.$axios.get("http://localhost:3000/mv/url?r=1080&id="+this.videoobj.id)
       .then(res=>{
           that.videoUrl=res.data.data.url;
           //console.log(res.data)
       })
    },
    /**-------------------------------------------------------------------------- */
    /**
     * getvideoarr()
     * 從route中拿取數組...
     */
    getvideoarr:function()
    {
         //console.log(this.$route.query.arr);
         this.videoobj=this.$route.query.arr;
         //獲取地址....
         this.getmvaddr();
         //獲取留言.....
         this.getmvcommnet();
         //獲取頭像...or  詳情....
         //this.getimgurl();
         //獲取相似mv
         this.getclosemv();
         //拿到數據後....
         var that=this;
        // console.log(this.videoobj)
         //console.log(this);
         this.$axios.get("http://localhost:3000/mv/detail?mvid="+this.videoobj.id)
         .then((result) => {
          //console.log(result.data.data)   
          that.videoobj=result.data.data;
         }).catch((err) => {
             
         });
         
    },
    /**------------------------------------------------------------------------ */
    //告知打開MVpage....則leftbar和audiobox都要關閉...
    checkMv: function () {
      this.$emit('checkMv');
    },
  },
  mounted() {
    this.checkMv();
    //this.$emit('checkMv');
  },
};
</script>

<style>
@import "./style.css";
</style>