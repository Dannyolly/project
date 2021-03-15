<template>
    <div id="movie" >
        <div class="movie-container" v-for="item in videoarr" :key="item.name">
           <video-box class="movie-box" >
            <div slot="clickcount" class="playCount">
                <i class="fas fa-play">
                    {{item.playTime}}
                </i>
            </div>
            <img :src="item.coverUrl" alt="" slot="video">
                 <h4 slot="h4" class="mv-title" id="movie-box-movie">
                     {{item.title}}
                 </h4>
             <span slot="text" class="video-box-text" id="movie-box-text">
             {{item.creator[0].userName}}
            </span>
           </video-box>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
import cut     from '../../publicfunction/function1'
import cutdown from '../../publicfunction/function'
import VideoBox from '../../VideoBox.vue'
export default {
    name:'movie',
    components:{
        VideoBox
    },
    data() {
        return {
            videoCount:0,
            videoarr:[],
        }
    },
    watch:{
       videoarr:function()
       {
          this.checkout();
          this.saveCount();
       }
    },
    props: ["artist", "album", "str", "allList", "thisIndex","searchstr"],
    mounted() {
      this.getinfo();
     },
      methods:{
      checkout:function()
      {
         //console.log('in');
         for(var i=0;i<this.videoarr.length;i++)
         {
            if(this.videoarr[i].title.length>15)
            {
                this.videoarr[i].title=cutdown(this.videoarr[i].title.length-15,this.videoarr[i].title);
            }

            if(this.videoarr[i].playTime>9999)
            {
               this.videoarr[i].playTime=cut(this.videoarr[i].playTime);
            }
         }
      },
      saveCount:function()
      {
           this.$emit('receiveCount',this.videoCount+'個視頻')
      },
      getinfo:function()
      {
        var that=this
        this.$axios.get('https://autumnfish.cn/cloudsearch?keywords='+that.searchstr+"&type=1014")
        .then((result) => { 
           //console.log(result.data.result);
           //that.videoCount=result.data.result;
           that.videoarr=result.data.result.videos;
           that.videoCount=result.data.result.videoCount;
           //console.log(that.videoarr)
        }).catch((err) => {
            
        });
      },
  },
}
</script>

<style >
      #movie{
          width: 779px;
          height: 500px;
          padding-left: 40px;
      }
      #movie-box-movie
      {
        font-size: 14px;
      }
      #movie-box-text
      {
          font-size: 13px;
          height: 20px;
          margin-top: 0px;
      }
      .movie-container
      {
          width: 257px;
          height: 182px;
          float: left;
          margin-top: 20px;
      }
</style>