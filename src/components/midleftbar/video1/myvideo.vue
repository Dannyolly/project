<template>
    <div id="video">
        <div class="video-top-bar">
            <div  class="button-container" id="real-button">
                <div @click="showthelist" class="myvideo-button">
                {{str}}
                <i class="fas fa-chevron-right"></i>
                </div>
            </div>
            <div class="rightcontainer">
                <div :class="{myactive:theIndex===index}" 
                @click="change(index)"
                class="typebox" v-for="(item,index) in typearr" :key="item+index">
                    {{item}}
                </div>
            </div>
            <!--tag-->
             <div v-show="isShow" class="showtype-container">
                <div class="real-container">
                    <!--全部視頻-->
                    <div class="alltag">
                       <span @click="afterclickall" :class="{boxactive:isALL==true}">全部視頻</span>
                    </div>
                    <div class="mytaglist">
                        <div class="mytagbox"
                        :class="{boxactive:index==theIndex1}"
                        @click="change1(index)"
                        v-for="(item,index) in taglist" :key="item+index"
                        >
                          {{item.name}}
                            <div class="clickbox"></div>
                        </div>
                    </div>

                </div>
             </div>
             
           
        </div>
          <div class="video-bigcontainer">
            <video-box>
                <div slot="clickcount" class="playCount">
                <i class="fas fa-play">
                    123
                </i>
            </div>
            <img src="" alt="" slot="video">
                 <h4 slot="h4" class="mv-title">123</h4>
             <span slot="text" class="video-box-text">
              123
            </span>
            </video-box>
          </div>
    </div>
</template>
<script>
import Showtag from '../../MidRightBarStuff/songList/showtag.vue'
import Taglist from '../../MidRightBarStuff/songList/taglist.vue'
import VideoBox from '../../VideoBox.vue';
const axios = require("axios");
export default {
    name:'myvideo',
    data() {
        return {
            typearr:['翻唱','听BGM','生活','游戏'
              ,'ACG','音乐','最佳饭制','现场','舞蹈','MV'],
            theIndex:-1,
            taglist:[],
            theIndex1:-1,
            isALL:true,
            str:'全部視頻',
            isShow:false,
            videolist:[],
        }
    },
    watch:{
        taglist:function()
        {
            //console.log(this.taglist);
        }
    },
    mounted() {
        this.gettaglist();
        this.getvideolist();
    },
    methods: {
        showthelist:function()
        {
           this.isShow=!this.isShow;
        },
        afterclickall:function()
        {
            this.str='全部視頻';
            this.isALL=true;
            this.theIndex1=-1;
            this.theIndex=-1;  
        },
        //改theIndex
        change:function(index)
        {
          this.theIndex=index;
          this.str=this.typearr[index];
          this.isALL=false;
          this.theIndex1=-1;
        },
        change1:function(index)
        {
           this.theIndex1=index;
           this.str=this.taglist[index].name;
           this.isALL=false;
           this.theIndex=-1;
        },
        gettaglist:function()
        {
               var that=this;
              this.$axios.get("http://localhost:3000/video/group/list")
              .then(res=>{
                  //console.log(res.data.data);
                  this.taglist=res.data.data;

              })
        },
        getvideolist:function()
        {
            var that=this;
            console.log("???")
            this.$axios.get("http://localhost:3000/video/group?id=9104")
            .then((result) => {
                //console.log(result)
                console.log(result);
            }).catch((err) => {
                
            });
        }
    },
    components:{
      Showtag,
        Taglist,
        VideoBox,

    },
}
</script>

<style>
    #real-button
    {
        width: 100px;
        height: 50px;
        padding: 0px;
        padding-top: 5px;
    }
    #video
    {
        width: 799px;
        height: 480px;
        overflow: scroll;
    }
    .video-top-bar
    {
        width: 100%;
        height: 60px;
        padding-top: 20px;

        position: relative;
    }
    .button-container
    {
        padding-left: 20px;
        float: left;
        margin-right: 150px;
    }
    .myvideo-button
    {
        width: 100px;
        height: 30px;
        font-size: 13.5px;
        text-align: center;
        line-height: 35px;
        border-radius: 20px;
        border:1px solid #D8D8D8;
        cursor: pointer;
    }
    .myvideo-button:hover
    {
        background-color: #F2F2F2;
    }
    .rightcontainer
    {
        width: 520px;
        height: 35px;
        padding-top: 5px;
        float: left;
        display: flex;
       color: #676767;

    }
    .typebox
    {
         flex: 1;
         font-size: 13px;
         text-align: center;
         line-height: 30px;
         cursor: pointer;
         height: 25px;
         width: 30px;
         border-radius: 20px;
    }
    .typebox:hover
    {
        color:black
    }
    .myactive
    {
        background-color:  #FCEBEB;
        color:#EC4141;
    }
    .showtype-container
    {
       width: 650px;
        height: 520px;
         padding-bottom: 30px;
       position: absolute;
       top: 60px;
       left: 20px;
    
       
    }
    .real-container
    {
        position: relative;
        width: 640px;
        padding-left: 10px;
        height: 460px;
        border-radius: 8px;
        box-shadow: 1px 1px 3.5px rgba(0, 0, 0, 0.3);
         z-index: 999;
            overflow: scroll;
            background-color: #FFFFFF;
    }
    .alltag
    {
        border-radius: 8px;
        width: 100%;
        height: 50px;
        font-size: 13px;
        padding-left: 10px;
        padding-top: 10px;
        border-bottom: 1px solid #E5E5E5;
    }
    .alltag span
    {
        cursor: pointer;
        position: absolute;
        top: 20px;
        display: inline-block;
        width: 70px;
        height: 30px;
        text-align: center;
        line-height: 35px;
        border-radius: 20px;
    }
    .alltag:hover
    {
        color:#EC4141;
    }
    .mytaglist
    {
        width: 555px;
        height: 379px;
        padding-left: 45px;
        padding-right: 20px;
        padding-top: 20px;
    }
    .mytagbox
    {
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 20px;
      margin-right: 20px;
      float: left;
      font-size: 13px;
      margin-bottom: 20px;
      position: relative;
    }
    .boxactive
    {
        background-color:#FCEBEB;
         color:#EC4141;
    }
    .clickbox
    {
        position: absolute;
        width: 50px;
        height: 15px;
        top:20%;
        left: 10%;
        cursor: pointer;
    }
    .video-bigcontainer
    {
        width: 779px;
        padding-left: 20px;
        height: 400px;
        position: relative;
    }
</style>