  <!--3.推薦歌單....>-->
<template>
   <div id="fixing"> 
    <div id="recommend">
        <!--封裝好了...-->
        <title-box>
            <h2 slot="content">
                推薦歌單
                <i class="fas fa-chevron-right" slot="text"></i>
            </h2>
        </title-box>

      <!--上層-->
      <div class="recommend-top">

         <!--組件化中...67.--->
         <img-box  
         v-for="(item,index) in recommendSongListPicArr" :key="item.name"
         >
          <img :src="picArr[index]" 
           @click="gosongpage(index)"
           alt="" 
           slot="img">
           <span slot="text" class="recommend-text">
              {{item.name}}
            </span>
              <div slot="play" class="recommend-box-play">
                 <i class="fas fa-play"></i>
               </div>
            <div slot="countbox" class="click-count">
                <i class="fas fa-play">
                 <span class="onece-count" slot="count">
                   {{item.playCount}}
                  </span>
                </i>
            </div>
           <span slot="count">
                {{item.playCount}}
            </span>

            
         </img-box>

       </div>
       
      
       

    </div>  
   </div>
</template>

<script>
import ImgBox from '../ImgBox.vue';
import TitleBox from '../titleBox.vue';


const axios = require("axios");

export default {
    name:'Recommend',
    components:{
        ImgBox,
        TitleBox,

    },
    props:{
        num:Number,
    },
    data() {
        return {
            recommendSongListPicArr:[],
            picArr:[],
        }
    },
    //預加載一些屬性...
    watch:{
        recommendSongListPicArr : function()
        {
             this.setCount();
        }
    },
    mounted() {
        this.getSongList();
    },
    methods: {
        /**--------------------------------------------------------------- */
        /**
         * gosongpage
         * 跳轉到歌單頁面...
         */
        gosongpage:function(index)
        {
          //console.log('ok');
          //console.log(this.recommendSongListPicArr[index]);
         this.$router.push({path:'/home/songpage' ,query:{arr:this.recommendSongListPicArr[index]},});
        },

        /**------------------------------------------------------------- */

        getSongList:function()
        {
            var _this=this;
            this.$axios.get("http://localhost:3000/personalized?limit=10")
            .then((result) => {
                _this.recommendSongListPicArr=result.data.result;
                //console.log(_this.recommendSongListPicArr);
            }).catch((err) => {
                
            });
        },

        /**------------------------------------------------------------- */

        setCount:function()
        {
              //把大於99999的數整排除...
            for(var i=0;i<this.recommendSongListPicArr.length;i++)
            {
                if(this.recommendSongListPicArr[i].playCount>99999)
                {
                    this.recommendSongListPicArr[i].playCount=this.recommendSongListPicArr[i].playCount
                    var a=String(this.recommendSongListPicArr[i].playCount)
                    // 消去後4位數...因為js沒得轉int類型....
                    var b=a.substring(a.length-4)
                    a=a.replace(b,'');
                    a=a+'万'
                    this.recommendSongListPicArr[i].playCount=a;
                }
            }
            for(var i=0;i<this.recommendSongListPicArr.length;i++)
            {
                this.picArr[i]=this.recommendSongListPicArr[i].picUrl;
            }
            
        },
        setRecommendSongListItem:function()
        {
           
        }
    },
}
</script>

<style>
   .onece-count
   {
       margin-left: 0px;
   }
   #fixing
   {
       height: 500px;
   }
   #recommend
   {
       width: 799px;
       height: 325px;
       margin-top: 30px;
       color: #373737;
   }
   #recommend div
   {
       cursor: pointer;
   }
   .recommend-box
   {
       width: 140px;
       position: relative;
       height: 140px;
       border-radius: 5px;
       float: left;
       margin-right: 18px;
       margin-bottom: 80px;
   }
   .recommend-bottom
   {
      margin-top: 71px;
   }
   .recommend-top
   {
       /*
       *  190*2....
        */
       height: 440px;
   }
 
</style>