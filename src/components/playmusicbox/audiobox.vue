<template>
    <div class="audiobox">
         <div class="pic-text-box" v-if="songinfo">
             <div class="turnmode">
                <img v-if="songinfo.al" @mousemove="changeavater" 
                     
                :src="songinfo.al.picUrl" alt="">
                <img v-else-if="songinfo.album" @mousemove="changeavater" 
                     
                :src="songinfo.album.picUrl" alt="">
                <!--:src="songinfo.al.picUrl"-->
                <div @mouseout="changeavater" v-show="isavater" 
                     class="info"
                     @click="showthesonginfo"
                >
                    <i v-if="songinfo" class="fas fa-expand-arrows-alt"></i>
                </div>
             </div>
             <div v-if="songinfo" class="word">
                 <h4>
                     {{songinfo.name}}
                    <i class="far fa-heart"></i>
                   
                 </h4>
                 <span v-if="songinfo.ar">{{songinfo.ar[0].name}}</span>
                 <span v-else-if="songinfo.artists">{{songinfo.artists[0].name}}</span>
             </div>
         </div>
         <div class="audio-container">
             <div class="myplay">
                 <i @click="play" v-show="isplaying==false" class="fas fa-play"></i>
                 <i @click="pause" v-show="isplaying==true" class="fas fa-pause"></i>
             </div>
             <audio  class="my-audio" 
              :src="src"
              controls="controls"></audio>
         </div>
         <div @click="showthelist" class="own-songlist">
            <i class="fas fa-list"></i>
         </div>
         

    </div>
</template>

<script>

export default {
    name:'audiobox',
    props:['src','songinfo','isplaying'],
    data() {
        return {
            //頭像的選項...
            isavater:false,
            //isplaying:false,
            time:0,
            //臨時的src
            mysrc:'http://p3.music.126.net/_B1Fn_Z1WxHzqGLzLZDf-w==/109951163263882447.jpg',
            mysongurl:'http://m8.music.126.net/20210314102325/678d98437b5ed21786ed1aecc19eae16/ymusic/7a0a/0e2f/87ac/92a20ea5c429bb61e61bc5bc23f1f4c6.mp3'
        }
    },
    watch:{
       songinfo:function()
       {
           if(this.isplaying==true)
           {
               //this.isplaying=false;
           }
       }
    },
    methods: 
    {
        touch:function()
        {
          console.log('?');
        },
        play:function()
        {
          //this.isplaying=!this.isplaying
          this.$parent.isplaying=!this.$parent.isplaying;
          var a=document.getElementsByClassName("my-audio")[0];
          a.play();
          this.getaudiotime();
        },
        pause:function()
        {
           //this.isplaying=!this.isplaying
           this.$parent.isplaying=!this.$parent.isplaying;
           var a=document.getElementsByClassName("my-audio")[0];
           a.pause();
        },
        showthesonginfo:function()
        {
          this.$emit('showthesonginfo')
        },
        changeavater:function()
        {
            this.isavater=!this.isavater
        },
        showthelist:function()
        {
          this.$emit('show');
          this.getaudiotime();
        },
        getaudiotime:function()
        {
            var a=document.getElementsByClassName("my-audio")[0];
            //當前時間...
            //console.log(a.currentTime);
            //是否暫停.....
          
              var that=this;

             //console.log()
             var t2=setInterval(function()
              {
                that.$parent.mycurrenttime=a.currentTime;
               // console.log(that.$parent.mycurrenttime);
                if(a.paused==true)
                {
                    clearInterval(t2)
                }
              },100)
            
        }
    },
}
</script>

<style>
    .audiobox
    {
        width: 1010px;
        height: 60px;
        padding-top:10px;
        padding-left: 10px;
        z-index: 10000;
        position: absolute;
        border: 1px solid #E1E1E1;
        bottom: -77px;
        background-color: #F1F3F4;
        box-shadow: 15px 0 15px -15px rgb(0 0 0 / 0),
                   -15px 0 15px -15px rgb(0 0 0 / 0.3);
    }
    .my-audio
    {
    width: 100%;
    height: 100%;
   }
   .audio-container
   {
       width: 700px;
     height: 100%;
     float: left;
   }
   .pic-text-box
   {
       width: 250px;
       height: 100%;
       float: left;
   }
   .turnmode
   {
       width: 48px;
       position: relative;
       height: 48px;
       border-radius: 8px;
       margin-right: 14px;
       
       float: left;
   }
   .turnmode .info
   {
       position: absolute;
       width: 50px;
       height: 50px;
       top: -1px;
       opacity: 1;
       background-color: rgba(0, 0, 0, 0.5);
       border-radius: 5px;
       cursor: pointer;
        text-align: center;
   }
   .turnmode .info i
   {
       font-size: 35px;
       color: #DCD9D6;
       opacity: 0.5;
       line-height: 50px;
   }
   .turnmode img
   {
       width: 100%;
       border-radius: 5px;
   }
   .turnmode img:hover
   {
     
   }
   .word
   {
       float: left;
       height: 48px;
       width: 170px;
   }
   .word h4
   {
       margin-bottom: 8px;
       color: #313132;
       font-weight:normal;
       font-size: 16px;
       cursor: pointer;
   }
   .word h4:hover
   {
       color: black;
   }
   .word span
   {
       margin-left: 0px;
       font-size: 14px;
       color: #8E8E8F;
       cursor: pointer;
   }
   .word i
   {
       cursor: pointer;
   }
   .own-songlist
   {
       width: 50px;
       height: 60px;
       float: left;
   }
   .own-songlist i 
   {
       line-height: 67px;
       color: #8E8E8F;
       cursor: pointer;
   }
   .myplay
   {
       position: absolute;
       width: 30px;
       height: 30px;
       text-align: center;
       line-height: 30px;
       left: 273px;
       z-index: 555;
       bottom: 11px;
   }
   .myplay i
   {
       cursor: pointer;
   }
   
</style>