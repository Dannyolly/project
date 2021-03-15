<template>
    <div id="top-bar">
        <div class="top-left-bar" >
            <div @click="gohome" class="top-left-bar-logo">
                <img src="../assets/img/mylogo.png" alt="">
            </div>
            <div class="top-left-bar-text">
                网易云音乐
            </div>
        </div>
        <!--左轉 右轉....-->
        <div 
           class="top-mid-bar">
           <div 
           
           class="turn-left">
                <button>
                 <
                </button>
           </div>
           <div 
          
           class="turn-right">
                <!--disabled="disabled-->
                <button>
                     >
                </button>
           </div>
        <!--textbox-->
        <div class="inputbutton">
            <input v-model="message"
             @keyup.enter="goabout" 
            type="text" placeholder="搜索">
            <i class="fas fa-search"></i>
          </div>

            <!--song-->
        <div class="song">
            <button>
               <i class="fas fa-microphone"></i>
            </button>
        </div>
        
     

       </div>
        <div class="top-right-bar">
          <!--頭像...-->
          <div class="avatar">
              <div>
                  <i class="fas fa-user-circle"></i>
              </div>
            <span>
               未登錄
               <i class="fas fa-caret-down"></i>
             </span>
             <!--開通VIP-->
             <span>
                開通VIP
             </span>
          </div>
          <!--其它的各種設定...-->
          <div class="allbtnfunction">
              <!--設定...-->
             <div class="setting">
                 <i class="fas fa-cog"></i>
             </div>
             <!--皮膚...-->
             <div @click="openMySkin" class="skin">
                 <i class="fas fa-tshirt"></i>
             </div>
             <!--消息.....-->
             <div @click="openMyMessage" class="mymessage">
                 <i class="far fa-envelope"></i>
             </div>
             <div class="line">
               |
             </div>
             <!--後台化...不做了...-->
              <div >
              <i class="far fa-minus-square"></i>
              </div>
              <!--收起...-->
              <div>
                  一
              </div>
              <!--放大...-->
              <div class="square">
                   <i class="far fa-square"></i>  
              </div>
              <!--關閉-->
              <div class="close">
                <i class="fas fa-times"></i>
              </div>
          </div>
        </div>
        
        <!--

        消息列...................................
        ...........................................
        ...............................................
        ...........................................
        
        -->
        <div v-if="!isMessageList" class="skin-page">
         <h2>消息</h2>
         <div  class="message-list">
             <div class="pm">
                私信
             </div>
             <div class="comment">
               評論
             </div>
             <div class="clickme">
               @我
             </div>
             <div class="notice">
                通知
             </div>
         </div>
    </div>
           <!--

        消息列...................................
        ...........................................
        ...............................................
        ...........................................
        
        -->

        <!--

         --皮膚列.......................................
        ...........................................
        ...............................................
        ...........................................
        
        -->
       <div v-if="!isSkinList" class="skin-choose">
         <div>
             主題
         </div>

         <div class="box-color">
            <div class="black">

            </div>
            <div class="red">

            </div>
            <div class="pink">

            </div>
            
         </div>

       </div>

        

    </div>
</template>

<script>
const axios = require("axios");
//開消息出來...
var mymessage=document.getElementsByClassName("skin-page")

export default {
   name:'topBar',
   data() {
       return {
           isMessageList:'false',
           isSkinList:'false',
           message:''
       }
   },
   methods: {
       getImage:function()
       {
            axios.get("https://autumnfish.cn/homepage/dragon/ball")
                  .then(function(response)
                  {
                      console.log(response);
                    
                  },function(error){})
       },
       openMyMessage:function()
       {
         this.isMessageList=!this.isMessageList;
       },
       openMySkin:function()
       {
         this.isSkinList=!this.isSkinList;
       },
       gohome:function()
       {
         //console.log('home');
         this.$router.replace('/home/firstPage/midRightMidBar');
         //console.log(axios.defaults.withCredentials);
       },
       goabout:function()
       {
         //console.log('about');
         /**
          * 并不是goabout
          * 而是去searchPage...
          * 因為他兩者都是兄弟組件...
          * 所以用Home作為父組件...為中間傳值的容器...
          * 這里是要發送....
          */
         //發給父組件....home
         //不發給了...直接路由傳參...

         
         this.$emit('mysearch-message',this.message);

         //this.$router.push('/home/searchPage/'+this.message);

         this.$router.push({path:'/home/searchPage/song',query:{info:this.message}});
    
       }
   },    
}

</script>

<style>
  @import "../assets/css/topbar.css";
 .skin-choose{
     width: 300px;
     height: 200px;
     box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3);
     position: absolute;
     right: 50px;
     top:65px;
     font-size: 14px;
 }
 .skin-choose div:nth-child(1)
 {
     border-bottom: 1px solid #888888;
     width: 90%;
     margin: 5px auto;
 }
 .skin-choose .box-color
 {
     width: 90%;
     height: 80%;
     margin: 10px auto;
     
     background-color: aquamarine;
     display: flex;
     justify-content: space-around;
 }
 .skin-choose .box-color div
 {
     width: 30%;
     height: 50%;
     
     
 }
 .skin-choose .box-color .black
 {
     background-color: black;
     margin: 0px;
 }
 .skin-choose .box-color .red
 {
     background-color: red;
 }
 .skin-choose .box-color .pink
 {
     background-color: pink;
 }
</style>