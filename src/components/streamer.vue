<template>
    <div id="streamer">
        <title-box>
            <h2 slot="content">
                主播電台
                <i class="fas fa-chevron-right" slot="text"></i>
            </h2>
        </title-box>
        <img-box>
           <img src="" slot="img" alt="">
           <span slot="text" class="recommend-text">
              
            </span>
        </img-box>
    </div>
</template>

<script>
import ImgBox from './ImgBox.vue'
import TitleBox from './titleBox.vue'
const axios = require("axios");
//import get from './publicfunction/function'
export default {
    name:'streamer',
    data() {
        return {
            streamerList:[],
        }
    },
    components:{
        TitleBox,
        ImgBox,
    },
    mounted() {
        this.getStreamerList();
    },
    methods: {
        getStreamerList:function()
        {
           //var result=get("personalized/djprogram");
          // console.log(result)
           var that=this;
           this.$axios.get("https://autumnfish.cn/dj/personalize/recommend?limit=4")
           .then((result) => {
             that.streamerList=result.data.data;
             console.log(result);
           }).catch((err) => {
               
           });
        }
    },
}
</script>

<style >
#streamer
{
  width: 799px;
  height: 300px;
  background-color: aquamarine;
}
</style>