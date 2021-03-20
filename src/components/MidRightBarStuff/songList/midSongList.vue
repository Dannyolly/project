<template>
    <div id="midright-songlist">
        <div class="songlist-container">
            <best-song-list>
                <img :src="bestPic" slot="img" alt="">
                <h3 slot="title">{{besttitle}}</h3>
                <span slot="text">{{besttext}}</span>
            </best-song-list>
            <searchtag @receivetag="settag">
                
            </searchtag>

            <div class="video-container">
             <img-box  v-for="(item,index) in songlistarr" :key="item.name+index" 
               :width="180" :height="180">
               <img @click="gotosongpage(index)" slot="img" :src="item.coverImgUrl" alt="">
               <span slot="text" class="recommend-text">{{item.name}}</span>
               <div slot="play" class="recommend-box-play">
                 <i class="fas fa-play"></i>
               </div>
               <div slot="countbox" class="click-count">
                    <i class="fas fa-play">
                       <span class="onece-count" slot="count">{{item.playCount}}</span>
                    </i>
                </div>
                <div slot="user" class="user">
                    <i class="fas fa-user-circle"></i>
                     <span>{{item.creator.nickname}}</span>
                </div>
             </img-box>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import cut from '../../publicfunction/function1'
import bestSongList from './bestSongList.vue'
import Searchtag from './searchTag';
import VideoBox from '../../VideoBox.vue';
import ImgBox from '../../ImgBox.vue';
export default {
    name:'songList',
    components:{
        bestSongList,
        Searchtag,
        ImgBox,
    },
    data(){
      return{
          bestarr:[], 
          bestPic:'',
          besttitle:'',
          besttext:'',
          thetag:'华语',
          songlistarr:[],

      }
    },
    watch:{
       bestarr:function()
       {
          this.setinfo();
       },
       thetag:function()
       {
          this.getbestSonglist();
          this.getlistwithtag();
       },
       songlistarr:function()
       {
          this.checkCount();
       }
    },
    mounted() {
        this.getbestSonglist();
        this.getlistwithtag();
    },
    methods: 
    {
        /**---------------------------------------------------------- */
        /**
         * gotosongpage(songobj)....統一接口...
         * 都是去到歌單頁
         */
         gotosongpage:function(index)
         {
          console.log(this.songlistarr[index]);
          this.$router.push({path:'/home/songpage' ,query:{arr:this.songlistarr[index]}});
         },

        /**---------------------------------------------------------- */

        /**
         * checkcount()..
         */
        checkCount:function() 
        {
            for(var i=0;i<this.songlistarr.length;i++)
            {
              if(this.songlistarr[i].playCount>99999)
              {
                  this.songlistarr[i].playCount=cut(this.songlistarr[i].playCount);
              }
            }
        },
        /**
         * 收到子組件的tag...
         * settag()
         */
        settag:function(name)
        {
          //console.log('im receive');
          this.thetag=name
          //console.log(this.thetag);
        },
        /**
         * setinfo() ..設置...
         */
         setinfo:function()
         { 
           if(this.bestarr[0].coverImgUrl!=undefined)
           {
               this.bestPic=this.bestarr[0].coverImgUrl;
           }
           else
           {
               this.bestPic=''
           }
           this.besttext=this.bestarr[0].copywriter;
           this.besttitle=this.bestarr[0].name;
         },
        //獲取精品歌單....
        getbestSonglist:function()
        {
              /**
               * bestarr是精品歌單數組..入面還有其它歌單....
               */
              var that=this;
              this.$axios.get("http://localhost:3000/top/playlist/highquality?cat="+that.thetag)
              .then((result) => {
                  
                that.bestarr=result.data.playlists;
                ///console.log(that.bestarr); 
              }).catch((err) => {
                  
              });
        },
        /**
         * 獲取歌單....
         */
        getlistwithtag:function()
        {
                var that=this;
                this.$axios.get("http://localhost:3000/top/playlist?order&cat="+that.thetag)
                .then((res)=>{
                    /**
                     * name
                     * playCount
                     * coverImgUrl
                     * creator.nickname
                     * creator...有用....
                     */
                    // console.log(res.data.playlists);
                     that.songlistarr=res.data.playlists;
                })
        }
    },
}
</script>

<style>
     .songlist-container
    {
       width: 799px;
       height: 482px;
       padding-left: 20px;
       position: relative;
       overflow: scroll;
    }
    .video-container
    {
        width: 799px;
        height: 500px;
        float: left;
    }
</style>