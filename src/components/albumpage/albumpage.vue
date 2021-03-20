<template>
  <div class="albumpage">

    <div class="songpage-top-bar">
        <div class="imgbox">
            <img v-if="albumobj.blurPicUrl" :src="albumobj.blurPicUrl" alt="">
            <img v-else-if="albumobj.artist" :src="albumobj.artist.picUrl" alt="">
        </div>   
        <div class="right-container">
            <div class="right-top-bar">
                <div class="type">專輯</div>
                <h2 v-if="albumobj.alias">{{albumobj.name+'        '+(albumobj.alias[0])}}</h2>
                 <h2 v-else-if="albumobj.alia">{{albumobj.name+'        '+(albumobj.alia[0])}}</h2>
            </div>

            <div class="button-bar">
                <mybutton>
                         <div @click="playall(1)" slot="left" class="left-part">
                            <i class="fas fa-play"></i>
                            <span>播放全部</span>
                         </div>
                         <div @click="playall(0)" slot="right" class="right-part">
                            <i class="fas fa-plus"></i>
                         </div>
                </mybutton>
                <mybutton-1>
                    <i slot="icon" class="far fa-folder"></i>
                    <span slot="text">收藏(181)</span>
                </mybutton-1>
                <mybutton-1>
                    <i slot="icon" class="far fa-share-square"></i>
                    <span slot="text">分享</span>
                </mybutton-1>
                <mybutton-1>
                    <i slot="icon" class="fas fa-arrow-circle-down"></i>
                    <span slot="text">下載全部</span>
                </mybutton-1>
            </div>

            <div class="bottom-bar">
                <div class="top">
                    <span id="top-tag">歌手: {{albumobj.artist.name}}</span>

                </div>
                <div class="mid">
                   <span>時間: 2021-03-18</span>
                </div>
            </div>

            
        </div>
        
        <div class="type-bar">
            <el-menu
       class="el-menu-demo"
      mode="horizontal"
      active-text-color="#EC4141"
      :default-active="activeIndex"
      >
      <!--dafault-active...是默認值...-->
        <el-menu-item @click="changechooseindex(0)" index="1">
            歌曲列表
        </el-menu-item>
        <el-menu-item  @click="changechooseindex(1)" index="2">
            評論({{albumcommentarr.length}})
        </el-menu-item>
        <el-menu-item @click="changechooseindex(2)" index="3">
            專輯詳情
           </el-menu-item>
          </el-menu>
        </div>
        <div class="last-container">

     
          <div class="bottom-position1">
          <div v-if="choose===0" class="bottom-real-position">
                <search-title :width="819"></search-title>
        <div class="search-list-box">
           <search-list v-for="(item,index) in albumsongarr" :key="item+index"
            id="search-list"
          >
        <span slot="num">{{
          index + 1 < 10 ? "0" + String(index + 1) : index + 1
        }}</span>
        <i slot="icon-like" class="far fa-heart"></i>
        <i slot="icon-download" class="far fa-arrow-alt-circle-down"></i>
        <span 
          @dblclick="playMusic(index)"
          slot="the-title"
          class="the-title"
          >{{item.name}}</span
        >
        <span slot="the-singer" class="the-singer">{{item.ar[0].name}}</span>
        <span slot="the-album" class="the-album">{{item.al.name}}</span>
        <!--al.id 為專輯的id碼...-->
        <span slot="time">03:08</span>
         <el-progress slot="hot" :percentage="50"></el-progress>
             </search-list>
        </div>
          </div>
          <div v-if="choose===1" class="bottom-real-position">
             <!--這里是留言區...-->
         <div class="comment-container">
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
                  <commentbox  v-for="(item,index) in albumcommentarr" :key="item+index">
                     <img v-if="item" slot="img" :src="item.user.avatarUrl" alt="">
                      <span v-if="item" slot="user-name" class="user-name">{{item.user.nickname}}: </span>
                    <span v-if="item" slot="content" class="content">{{item.content}}</span>
                    <div v-if="item" slot="date" class="data">2021年7月1日 11:21</div>
                     <span v-if="item"
                     slot="like" class="like" id="like">
                     <i   class="fas fa-thumbs-up">{{item.likeCount}}</i>
                     </span>
                </commentbox>
               
            </div>
        </div>
          </div>
        </div>

          </div>

    </div>
   </div>
</template>

<script>
import Commentbox from '../playmusicbox/commentbox.vue'
import SearchList from '../searchBar/searchList.vue'
import SearchTitle from '../searchBar/searchTitle.vue'
import Songlist from '../searchBar/songlist/songlist.vue'
import Mybutton from '../songpage/mybutton.vue'
import Mybutton1 from '../songpage/mybutton1.vue'
export default {
    name:'albumpage',
    components:
    {
        Commentbox,
        Mybutton1, 
        Mybutton,
        SearchList,
        SearchTitle,
        Songlist,
    },
    data() {
        return {
            choose:0,
            activeIndex:'1',
            albumobj:{},
            albumsongarr:[],
            albumcommentarr:[],

        }
    },
    mounted() {
        this.getalbumobj()
    },
    methods: {
        /**---------------------------------------------------------------------------- */
        /**
         * 獲取評論.....
         * getcomment
         */
        getalbumcomment:function()
        {
          var that=this;
          this.$axios.get("http://localhost:3000/comment/album?id="+this.albumobj.id)
          .then(res=>{
              console.log(res.data.comments);
              that.albumcommentarr=res.data.comments;

          })
        },
        /**---------------------------------------------------------------------------- */
        changechooseindex:function(index)
        {
           this.choose=index;
        },
        /**---------------------------------------------------------------------------- */
        playMusic:function(index)
        {
           //console.log(this.albumsongarr[index]);
           this.$emit('getonesong',this.albumsongarr[index])
        },
        playall:function()
        {
          this.$emit('getallsong',this.albumsongarr,this.albumsongarr.length);
        },
        /**------------------------------------------------------------------ */
        getalbumobj:function()
        {
            //console.log(this.$route.query.albumobj);
            this.albumobj=this.$route.query.albumobj;
            //獲取留言...
            this.getalbumcomment();

            var that=this;
            this.$axios.get("http://localhost:3000/album?id="+this.albumobj.id)
            .then((result) => {
               //console.log(result.data.songs);   
               that.albumsongarr=result.data.songs;
            }).catch((err) => {
                
            });
        },
    },
}
</script>

<style>
  @import "./style.css";

    .albumpage
    {
        width: 789px;
        float: left;
        position: relative;
        padding-top: 1px;
     
    }

</style>