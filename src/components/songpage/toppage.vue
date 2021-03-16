<template>
    <div class="songpage-top-bar">
        <div class="imgbox">
            <img :src="songobj.picUrl" alt="">
        </div>   
        <div class="right-container">
            <div class="right-top-bar">
                <div class="type">歌單</div>
                <h2>{{songobj.name}}</h2>
                <div class="singerinfo">
                    <img :src="creator.avatarUrl" alt="">
                    <span class="name">{{creator.nickname}}</span>
                    <span class="date">2021-02-11創建</span>
                </div>
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
                    <span>標簽: </span>
                    <div v-for="(item,index) in tags" :key="item+index" 
                    class="language">{{item}}</div>
                   
                </div>
                <div class="mid">
                   <span>歌曲:</span>
                   <span class="num">{{songobj.trackCount}}</span>
                   <span>播放:</span>
                   <span class="Count">{{songobj.playCount}}</span>
                </div>
                <div class="bottom">
                    <span>簡介:</span>
                    <span>{{songobj.copywriter}}</span>
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
            評論({{playlist.commentCount}})
        </el-menu-item>
        <el-menu-item @click="changechooseindex(2)" index="3">
            收藏者
           </el-menu-item>
          </el-menu>
        </div>
        <div class="bottom-position">
          <div v-if="choose===0" class="bottom-real-position">
                <search-title></search-title>
        <div class="search-list-box">
           <search-list
            id="search-list"
          v-for="(item, index) in songlist"
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
    </div>
</template>

<script>
import axios from 'axios'
import cut from '../../components/publicfunction/function'
import SearchTitle from '../searchBar/searchTitle.vue'
import Mybutton from './mybutton.vue'
import Mybutton1 from './mybutton1.vue'
import SearchList from '../searchBar/searchList.vue'
import commentbox from '../playmusicbox/commentbox'
import Commentbox from '../playmusicbox/commentbox.vue'
export default {
    name:'toppage',
    props:[],
    components:{
        Mybutton,
        Mybutton1,
        SearchTitle,
        SearchList,
        commentbox,
        Commentbox,
    },
    data() {
        return {
            sonIndex:-1,
            activeIndex:'1',
            //choose此值為選擇歌曲列表/評論....0..1...2....
            choose:0,
            commentarr:[],
            /*songobj為一些資料.... */
            songobj:{},
            songlist:[],
            /*標簽數組 */
            tags:[],
            /**
             * playlist...此歌單的各種細節...
             */
            playlist:{},
            creator:{},
        }
    },
    watch:{
      commentarr:function()
      {
          //this.setcommentarr();
      }
    },
    mounted() {
        this.setallsetting();
    },
    methods: {
    /**------------------------------------------------------------------- */
    /**
     * playall....歌單中的播放全部
     * (index)  index==0 時為只加入到音樂列表
     *          index==1 則為加入并播放....
     */
    playall:function(index)
    {
       this.$emit('getallsong',this.songlist,index);
    },

    /**------------------------------------------------------------------- */
    //改變選擇值...choose
    changechooseindex:function(index)
    {
      this.choose=index;
    },
    /**-------------------------------------------------------------------- */
        playMusic:function(index)   //只發一首回去....
        {
          console.log(this.songlist);
          this.$emit('getonesong',this.songlist[index]);
        },

    /**-------------------------------------------------------------------- */
        setallsetting:function()
        {
           var that=this;
           this.songobj=this.$route.query.arr;
           //剪取多出來的標題...
           //console.log(this.$route.query);    
           //得到id開始找詳情...
           this.findimportant();
           this.findsonglistcomment();
        },

    /**-------------------------------------------------------------------- */
        findimportant:function()
        {
          var that=this;
          this.$axios.get("http://localhost:3000/playlist/detail?id="+this.songobj.id)
          .then((result) => {
           //console.log(result.data);   
           that.playlist=result.data.playlist;
           that.creator=result.data.playlist.creator;
           that.tags=result.data.playlist.tags;
           that.songlist=result.data.playlist.tracks;
           //console.log(that.songlist)
          }).catch((err) => {
              
          });
        },
    /**----------------------------------------------------------------------- */
     //這個是看標題...太大則cut.....
        cutsongliststr:function()
        {
             if(this.songobj.name.length>15)
             {
             this.songobj.name=cut(this.songobj.name.length-15,this.songobj.name);
             }
        },
    /**------------------------------------------------------------------------ */
    ////
    /*
    * findcomment...
    * 找出歌單的評論.. 
    */
    findsonglistcomment:function()
    {
       var that=this;
       this.$axios.get("http://localhost:3000/comment/playlist?id="+this.songobj.id)
       .then((result) => {
          //console.log(result.data.comments);  
          that.commentarr=result.data.comments
          //console.log(that.commentarr);
       }).catch((err) => {
           
       });
    },
    /**---------------------------------------------------------------------------- */
    /**
     * setcommentarr....
     * 設定一個clickarr
     * 當點擊此數則變紅....??
     */
    },
}
</script>

<style>
   .bottom-real-position .comment-container
   {
       padding-left: 30px;
   }
   .bottom-real-position
   {
       position: relative;
       width: 100%;
       height: 100%;
       overflow: scroll;
   }
   .bottom-position
   {
       width: 819px;
       height: 265px;
       position: absolute;
       left: 200px;
       top:340px;
   }
   #search-title
   {
       float: left;
   }
   .search-list-box {
     width: 789px;
     height: 270px;
     float: left;
   }
  .songpage-top-bar
    {
        width: 789px;
        height: 200px;
        padding-left: 30px;
        padding-top: 30px;
    }
   .songpage-top-bar .imgbox
   {
       width: 190px;
       height: 190px;
       border-radius: 8px;
       margin-right: 20px;
       float: left;
   }
   .songpage-top-bar .imgbox img
   {
       width: 100%;
       height: 100%;
       border-radius: 8px;
   }
   .right-container
   {
       width: 568px;
       height: 100%;
       float: left;
       position: relative;
   }
   .right-container .right-top-bar
   {
       width: 100%;
       height: 65px;
       padding-top: 5px;
       margin-bottom: 10px;
   }
   .right-container .right-top-bar .type
   {
       width: 35px;
       height: 20px;
       border:1px solid #F28C8C;
       border-radius: 3px;
       background-color: #FFFFFF;
       text-align: center;
       line-height: 25px;
       color: #EC4141;
       font-size: 14px;
       margin-right: 10px;
       float: left;
   }
   .right-top-bar h2
   {
       margin:0px;
       font-size: 24px;
   }
   .right-top-bar .singerinfo
   {
       width: 100%;
       height: 40px;
       float: left;
       position: relative;
       padding-top: 7px;
   }
   .right-top-bar .singerinfo img
   {
       width: 30px;
       height: 30px;
       border-radius: 50%;
       margin-right: 7px;
       float: left;
   }
   .right-top-bar .singerinfo .name
   {
     margin: 0px;
     font-size: 13px;
     line-height: 31px;
     float: left;
      color: #5091CA;
      cursor: pointer;
      margin-right: 7px;
   }
   .right-top-bar .singerinfo .name:hover
   {
       color: #0B58B0;
   }
   .right-top-bar .singerinfo .date
   {
       font-size: 13px;
       line-height: 30px;
   }
   .button-bar
   {
       width: 100%;
       height: 50px;
   }
   .bottom-bar
   {
       width: 100%;
       height: 55px;
   }
   .bottom-bar div
   {
       width: 100%;
       height: 18px;
       font-size: 13px;
       margin-bottom: 5px;
   }
   .bottom-bar .top .language
   {
       font-size: 14px;
       margin-left: 0px;
       margin-right: 5px;
       width: auto;
       cursor: pointer;
       display: inline-block;
       color: #507DAF;
   }
   .bottom-bar .top .language:hover
   {
       color: #0B58B0;
   }
   .bottom-bar .mid span:nth-child(2)
   {
     margin-right:10px;
   }
   .type-bar
   {
       width: 100%;
       height: 44px;
       float: left;

   }
   .type-bar .el-menu-demo.el-menu--horizontal.el-menu
   {
       width: 100%;
       height: 100%;
   }
   .type-bar .el-menu-demo.el-menu--horizontal.el-menu li
   {
       height: 100%;
   }
</style>