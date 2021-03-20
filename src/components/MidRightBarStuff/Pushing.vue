<!--獨家推送...-->
<template>
    <div id="pushing">
       <title-box>
           <h2 slot="content">
                獨家放送
                <i class="fas fa-chevron-right" slot="text"></i>
            </h2>
       </title-box>

       <video-box  v-for="(item,index) in videoListArr" :key="item.name">
           <div slot="playbox" class="play-box">
                 <i class="fas fa-play"></i>
            </div>
           <img @click="gotomvpage(index)" :src="item.sPicUrl" alt="" slot="video">
           <span slot="text" class="video-box-text">
            {{item.name}}
            </span>
       </video-box> 

    

    </div>
</template>

<script>
import axios from 'axios';
import TitleBox from '../titleBox.vue';
import VideoBox from '../VideoBox.vue';
export default {
    name:'Pushing',
    data() {
        return {
            videoListArr:[],
        }
    },
    components:{
       TitleBox,
        VideoBox,
   },
   mounted() {
       this.getVidoeList();
   },
   methods: {
       gotomvpage:function(index)
       {
          // console.log('hi');
           this.$router.push({path:'/home/mvpage',query:{arr:this.videoListArr[index],pre:this.$route.path,save:0}});
       },
       getVidoeList:function()
       {
           var _this=this;
           this.$axios.get("http://localhost:3000/personalized/privatecontent")
           .then((result)=>{
               //console.log(result.data.result)
               _this.videoListArr=result.data.result;
               //console.log(_this.videoListArr);
           }).catch((error)=>{

           })
       }
   },
}
</script>

<style>
     
     #pushing
     {
         width: 100%;
         height: 253px;
     }
    h2
    {
        margin-top: 0px;
    }
    
</style>