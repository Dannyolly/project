<template>
    <div id="mv">
      <div class="mymv">
        <div class="mv-top-container">
             <div class="left-container">
                  <h4>最新MV</h4>
             <i class="fas fa-chevron-right"></i>
             </div>
             <div class="right-container">
                  <div 
                   v-for="(item,index) in typearr" :key="item+index" class="tag-box1">
                    <div
                    @click="changeStr(str,index,1)"
                    :class="{active:theindex==index}" 
                    class="circle">{{item}}</div>
                  </div>

             </div>

        </div>
       <!--最新MV-->
        <div class="mv-container">
             <video-box class="video-realbox" v-for="(item,index) in mvarr" :key="item+index">
                <div slot="clickcount" class="playCount">
                <i class="fas fa-play">
                    {{item.playCount}}
                </i>
            </div>
            <img :src="item.cover" alt="" slot="video">
                 <h4 slot="h4" class="mv-title">{{item.name}}</h4>
             <span slot="text" class="video-box-text">
                {{item.artistName}}
              </span>
            </video-box>
        </div>
        <!--網易MV-->
         <div class="mv-mid-container">
             <div class="left-container">
                  <h4>網易出品</h4>
             <i class="fas fa-chevron-right"></i>
             </div>
        </div>
        
        <div class="mv-container" id="origin">
             <video-box class="video-realbox" v-for="(item,index) in originarr" :key="item+index">
                <div slot="clickcount" class="playCount">
                <i class="fas fa-play">
                    {{item.playCount}}
                </i>
            </div>
            <img :src="item.cover" alt="" slot="video">
                 <h4 slot="h4" class="mv-title">{{item.name}}</h4>
            </video-box>
        </div>
      
        <!--MV排行榜-->
           <div class="mv-mid-container">
             <div class="left-container">
                  <h4>MV排行榜</h4>
             <i class="fas fa-chevron-right"></i>
             </div>
             <div class="right1-container" id="da-right">
                  <div 
                   v-for="(item,index) in typearr" :key="item+index" class="tag-box1">
                    <div
                    @click="changeStr(str1,index,2)"
                    :class="{active:theindex1==index}" 
                    class="circle">{{item}}</div>
                  </div>
             </div>
            </div>

            <div class="mvranking">
               <mvrankingbox v-for="(item,index) in mvrankingarr" :key="item+index">
                    <span slot="index">{{index<9? ('0'+(index+1)):index+1}}</span>
                    <img slot="img" :src="item.cover" alt="">
                    <h4 slot="h4">{{item.name}}</h4>
                    <span slot="span">{{item.artistName}}</span>
               </mvrankingbox>
            </div>

     </div>
    </div>
</template>

<script>
const axios = require("axios");
import cut from '../../publicfunction/function1'
import cut1 from '../../publicfunction/function'
import VideoBox from '../../VideoBox.vue';
import Mvrankingbox from './mvrankingbox.vue';
export default {
    name:'mv',
    data() {
        return {
            typearr:['內地','港台','欧美','日本','韩国'],
            theindex:0,
            theindex1:0,
            str:'內地',
            str1:'內地',
            mvarr:[],
            originarr:[],
            mvrankingarr:[],
        }
    },
    components:{
        VideoBox,
        Mvrankingbox,
    },
    watch:{
     mvarr:function()
     {
         this.cutdown();
     },
     originarr:function()
     {
         this.cutdown1();
     },
     str:function()
     {
          this.getnewmvlist();
     },
     str1:function()
     {
        
          this.getmvranking();
     }
    },
    mounted() {
        this.getnewmvlist();
        this.getoriginmvlist();
        this.getmvranking();
    },
    methods: {
           changeStr:function(str,index,num)
            {
              if(str===this.str&&num==1)
              {
              this.str=this.typearr[index];
              this.theindex=index;
              }
              else if(str===this.str1&&num==2)
              {
                  this.str1=this.typearr[index];
                  this.theindex1=index
              }
            },
            
            /**
             * getmvlist
             */
            getoriginmvlist:function()
            {
                var that=this;
                this.$axios.get("http://localhost:3000/mv/exclusive/rcmd?limit=6")
                .then(res=>{
                    //console.log(res);
                    that.originarr=res.data.data
                })
            },
            getnewmvlist:function()
            {
              var that=this;
              this.$axios.get("http://localhost:3000/mv/all?limit=6&area="+that.str)
              .then(res=>{
                  //console.log(res);
                  that.mvarr=res.data.data;
                 
              })
            },
            /**
             * MV排行榜....
             */
            getmvranking:function()
            { 
              var that=this;
              if(that.str1==='內地')
              {
                  that.str1='';
              }
              this.$axios.get("http://localhost:3000/top/mv?limit=10&area="+that.str1)
              .then(res=>{
                  //console.log(res);
                  that.mvrankingarr=res.data.data;
              })
            },
            cutdown:function()
            {
                for(var i=0;i<this.mvarr.length;i++)
                {
                    if(this.mvarr[i].playCount>99999)
                    {
                        this.mvarr[i].playCount=cut(this.mvarr[i].playCount);
                    }
                    if(this.mvarr[i].name.length>14)
                    {
                        this.mvarr[i].name=cut1(this.mvarr[i].name.length-15,this.mvarr[i].name);
                    }
                }
            },
            cutdown1:function()
            {
              for(var i=0;i<this.originarr.length;i++)
                {
                    if(this.originarr[i].playCount>99999)
                    {
                        this.originarr[i].playCount=cut(this.originarr[i].playCount);
                    }
                }
            }
    },
}
</script>

<style>
    #origin h4
    {
     width: 240px;
    }
    #origin .video-realbox
    {
        margin-bottom: 20px;
    }
　　#mv
    {
        width: 799px;
        height: 480px;
        position: relative;
    }
    #da-right
    {
        position: absolute;
        right: 0px;
        top: 10px;
    }
    .mymv
    {
        width: 799px;
        height: 480px;
        position: relative;
        overflow: scroll;
    }
    .mv-top-container
    {
        width: 779px;
        height: 40px;
        padding-top: 10px;
        padding-left: 20px;
        margin-bottom: 10px;
    }
    .mv-mid-container
    {
        width: 779px;
        height: 40px;
        padding-left: 20px;
        margin-bottom: 20px;
        position: relative;
    }
    .mv-top-container .left-container
    {
      width: 83px;
      height: 30px;
      padding-bottom:10px;
      line-height: 50px;
      font-size: 17px;
      float: left;
      margin-right: 380px;
      cursor: pointer;
    }
    .left-container h4
    {
        display: inline-block;
        margin-right: 10px;
    }
    .left-container i
    {
        color: #A0A0A0;
        font-weight: 600;

    }
    .right-container
    {
        width: 280px;
        height: 100%;
        float: left;
        display: flex;
    }
    .right1-container
    {
        width: 280px;
        height: 100%;
        float: left;
        display: flex;
    }
    .tag-box1
    {
        flex: 1;
        text-align: center;
        font-size: 13px;
        position: relative;
        color: #9F9F9F;
    }
    .tag-box1 .circle
    {
     width: 45px;
     height: 20px;
     border-radius: 20px;
     line-height: 20px;
     position: absolute;
     top:10px;
     left: 6px;
     
     cursor: pointer;
    }
    .tag-box1 .circle:hover
    {
        color: black;
        
    }
    .active
    {
        background-color: #FCEBEB;
        color: #EC4141;
    }
    .circle.active:hover
    {
        color:#EC4141;
    }
    .mv-container
    {
        width: 779px;
        padding-left: 20px;
        height: 385px;
        
    }
    .video-realbox
    {
        margin-right: 2px;
        margin-bottom: 20px;
    }
    .video-realbox img
    {
        width: 100%;
    }
    .video-realbox span
    {
        font-size: 13px;
    }
    .mvranking
    {
        width: 779px;
        padding-left: 20px;
        height: 500px;
        position: relative;
    }
</style>
