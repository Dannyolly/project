<template>
    <div id="recommned-mv-box">
         <title-box>
            <h2 class="h2" slot="content">
                推薦MV
                <i class="fas fa-chevron-right" slot="text"></i>
            </h2>
        </title-box>
        <video-box v-for="item in recommendMvList" :key="item.playCount">
            <div slot="clickcount" class="playCount">
                <i class="fas fa-play">
                    {{item.playCount}}
                </i>
            </div>
            <img :src="item.picUrl" alt="" slot="video">
                 <h4 slot="h4" class="mv-title">{{item.name}}</h4>
             <span slot="text" class="video-box-text">
             {{item.artistName}}
            </span>
            <!--偷懶了...-->
        </video-box>
    </div>
</template>

<script>
import axios from 'axios';
import cutdown from '../publicfunction/function.js'
import TitleBox from '../titleBox.vue';
import VideoBox from '../VideoBox.vue';

export default {
    name:'RecommendMv',
    data() {
        return {
            recommendMvList:[],

        }
    },
    components:{
        VideoBox,
        TitleBox, 
    },
    watch:{
        recommendMvList:function()
        {
            this.setTheCorrectlength();
        }
    },
    mounted() {
        this.getMvList();
    },
    methods: {
        getMvList:function()
        {
            var that=this;
            this.$axios.get("http://localhost:3000/personalized/mv")
            .then((result) => {
                 //console.log(result.data.result);
                 that.recommendMvList=result.data.result;
                 that.recommendMvList.length=3;
                 //console.log(that.recommendMvList);
                
            }).catch((err) => {
                
            });

        },

        setTheCorrectlength:function()
        {
              /**
               * 開始改
               * 當字長>26時...則後全cut...
               */
              for(var i=0;i<this.recommendMvList.length;i++)
              {
                  
                  if(this.recommendMvList[i].name.length>20)
                  {
      
                     this.recommendMvList[i].name=cutdown(this.recommendMvList[i].name.length-20,this.recommendMvList[i].name)
 
                  }
              }
        }
    },
}
</script>

<style >
    #recommned-mv-box
    {
        margin-top: 20px;
        width: 799px;
        height: 250px;
        
    }
    img
    {
        cursor: pointer;
    }
    .playCount
    {
        width: 50px;
        height: 20px;
        position: absolute;
        right: 0px;
        top: 0px;
     
    }
    .playCount i
    {
        font-size: 11px;
        color: #ffffff;
    }
    .mv-title
    {
        font-size: 16px;
        color: #373737;
    }
</style>