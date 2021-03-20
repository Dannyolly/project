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
                <button @click="goleft">
                 <
                </button>
           </div>
           <div 
          
           class="turn-right">
                <!--disabled="disabled-->
                <button @click="goright">
                     >
                </button>
           </div>
        <!--textbox-->
        <div class="inputbutton">
            <!--             搜索......                  -->
            <input v-model="message"
             @keyup.enter="gosearchpage" 
             @keypress="search"
             @click="hotsearch"
            type="text" placeholder="搜索">
            <i class="fas fa-search"></i>

             <!--             搜索......                  -->
        </div>
        <!--這里是搜索框.......................-->
        <div   class="search-message-list" :class="{click:isSearch==true}">
           <div v-if="message==''" class="the-real-hot-search">
               <div class="search-history">熱搜榜</div>
               <list  v-for="(item,index) in hotlist" :key="item.score+index">
                <div  slot="num" class="list-left-bar">{{index+1}}</div>
                <h4  @click="gosearch(index)" slot="name">{{item.searchWord}}</h4>
                <span @click="gosearch(index)" v-if="item.iconUrl" slot="type" class="HOT">
                    <img :src="item.iconUrl" alt="">
                </span>
                <span slot="playCount">{{item.score}}</span>
                <div @click="gosearch(index)" slot="content" class="content">{{item.content}}</div>
               </list>
           </div>
           <!---->
           <div v-if="message!=''" class="the-real-search" >
               <div class="my-search-test">搜"{{message}}"相關的結果</div>
               <listtype >
                   <i slot="icon" id="type-icon" class="fas fa-music"></i>
                   <span slot="type">單曲</span>
                   <div @click="getonesong(index)" v-for="(item,index) in result.songs" :key="item+index" slot="list" class="searchword-list">
                       {{item.name}} - {{item.artists[0].name}}
                    </div>
               </listtype>
               <listtype >
                   <i slot="icon" id="type-icon" class="fas far fa-user"></i>
                   <span slot="type">歌手</span>
                   <div @click="gotosingerpage(index)" v-for="(item,index) in result.artists" :key="item+index" slot="list" class="searchword-list">
                       {{item.name}}
                    </div>
               </listtype>
               <listtype >
                   <i slot="icon" id="type-icon" class="fas fa-record-vinyl"></i>
                   <span slot="type">專輯</span>
                   <div @click="gotoalbumpage(index)" v-for="(item,index) in result.albums" :key="item+index" slot="list" class="searchword-list">
                       {{item.name}} - {{item.artist.name}}
                    </div>
               </listtype>
                  <listtype >
                   <i slot="icon" id="type-icon" class="fas fa-list"></i>
                   <span slot="type">歌單</span>
                   <div @click="gotosongpage(index)" v-for="(item,index) in result.playlists" :key="item+index" slot="list" class="searchword-list">
                       {{item.name}}
                    </div>
               </listtype>
                 
           </div>
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
              <div class="user" >
                  <i v-if="islogin==false" class="fas fa-user-circle"></i>
                  <img v-else :src="userinfo.avatarUrl" alt="">
              </div>
            <span v-if="islogin==false" @click="login">
               未登錄
               <i class="fas fa-caret-down"></i>
             </span>
             <!--當登錄成功後.....-->
            <span v-if="islogin==true">
                {{userinfo.nickname}}
              <i class="fas fa-caret-down"></i>
            </span>
             <!--開通VIP-->
         
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
import cut from '../components/publicfunction/function'
import List from '../components/searchbox/list'
import Listtype from './searchbox/listtype.vue';
import titleBoxVue from './titleBox.vue';
const axios = require("axios");
//開消息出來...
var mymessage=document.getElementsByClassName("skin-page")

export default {
   name:'topBar',
   components:{
        List,
      Listtype,
   },
   data() {
       return {
           isMessageList:'false',
           isSkinList:'false',
           message:'',
           hotlist:[],
           /**控制searchlist的彈出 */
           isSearch:'false',
           /**搜索出的建議框 */
           result:{},
       }
   },
props:['islogin','userinfo'],
   watch:{
      message:function()
      {
        var that=this;
        setTimeout(function(){
            that.search()
        },1000)
        //this.search();
       
      },
      /**
       * 當收到username...
       * 則剪短......
       */
      userinfo:function()
      {
          if(this.userinfo.nickname.length>6)
          {
              this.userinfo.nickname=cut(this.userinfo.nickname.length-6,this.userinfo.nickname);
          }
      }
   },
   /**------------------------------------------------------------- */


   methods: 
   {
       login:function()
       {
          this.$parent.isShowqrcode=!this.$parent.isShowqrcode;
       },
       /**------------------------------------------------------------ */
       /**
        * searchpage....里的功能..
        * 1-getonesong.....
        * 2-gosingerpage....
        * 3-goalbumpage
        * 4-gosongpage......
        */

       /**
        * 1-getonesong
        * 可以直接傳....
        * 
        */
       getonesong:function(index)
       {
         //console.log("?");
         this.change();
         this.$emit("getonesong",this.result.songs[index]);
       },
       gotosingerpage:function(index)
       {
           this.change();
           this.$router.push({path:'/home/singerpage',query:{singerobj:this.result.artists[index]}});
       }
       ,
       gotoalbumpage:function(index)
       {
           this.change();
           this.$router.push({path:'/home/albumpage',query:{albumobj:this.result.albums[index]}});
       },
       gotosongpage:function(index)
       {
           this.change();
           this.$router.push({path:'/home/songpage',query:{arr:this.result.playlists[index]}});
       },
       /**--------------------------------------------------------------- */

       /**---------------------------------------------------------- */
       /**
        * 每打一個搜索...
        * search
        */
       search:function()
       {
        var that=this;
        this.$axios.get("http://localhost:3000/search/suggest?keywords="+this.message)
        .then(res=>{
           // console.log(res.data.result);
            that.result=res.data.result;
        })
       },
       /**--------------------------------------------------------- */
       hotsearch:function()
       {   
           this.change();
           var that=this;
           this.$axios.get("http://localhost:3000/search/hot/detail")
           .then(res=>{
             //  console.log(res.data.data);
               that.hotlist=res.data.data;
           })
       },
       /**-------------------------------------------------------- */
       goleft:function()
       {
          this.$router.go(-1);
          
       },
       goright:function()
       {
          this.$router.go(1);
       },
       getImage:function()
       {
            axios.get("http://localhost:3000/homepage/dragon/ball")
                  .then(function(response)
                  {
                     // console.log(response);
                    
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
         //this.$emit('checkMv');
         this.$router.replace('/home/firstPage/midRightMidBar');
         
         //console.log(axios.defaults.withCredentials);
       },
       gosearchpage:function()
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

         this.change();
         this.$emit('mysearch-message',this.message);

         //this.$router.push('/home/searchPage/'+this.message);

         this.$router.push({path:'/home/searchPage/song',query:{info:this.message}});
    
       },
       /**------------------------------------------------------------------------ */
       gosearch:function(index)
       {
          /**
           * 這個是點擊熱搜榜的東西....
           */
           this.message=this.hotlist[index].searchWord;
           this.isSearch=!this.isSearch;
           //console.log("?");
           this.gosearchpage();
       },
       change:function()
       {
         if(this.isSearch==true)
         {
             this.isSearch=false;
         }
         else
         {
             this.isSearch=true;
         }
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
     z-index: 9000;
     background-color: #FFFFFF;
 }
 .skin-page
 {
     z-index: 100001;
     background-color: #FFFFFF;
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
 .search-message-list
 {
     width: 350px;
     padding-top: 0px;
     padding-bottom:0px;
     border-radius: 10px;
     height: 0px;
     position: absolute;
     background-color: #FFFFFF;
     box-shadow:1px 1px 10px rgba(0, 0, 0, 0.3);
     z-index: 9000;
     top: 55px;
     left: 260px;
     overflow: scroll;
     transition: all 0.3s linear 0.3s;
 }
 .search-message-list.click
 {
     height: 400px;
     padding-top: 15px;
     padding-bottom: 1px;
 }
 .search-history
 {
     width: 100px;
     height: 20px;
     margin-bottom: 20px;
     padding-left:20px;
     font-size: 14px;
     color: #666666;
 }
 .the-real-search
 {
     width: 100%;
     height: 100%;
     font-size: 13px;
     position: relative;
     
 }
 .my-search-test
 {
     width: 200px;
     height: 30px;
     padding-left: 10px;
     cursor: pointer;
 }

 .my-search-test:hover
 {
     color: #666666;
 }
 .avatar .user img
 {
     width: 100%;
     height: 100%;
     border-radius: 50%;
 }
</style>