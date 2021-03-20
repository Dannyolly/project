<template>
         <div  class="recommend-box" 
         :style="{width:width+'px',height:height+'px' }" >
            <!--imgslot-->
            <slot name="img"> </slot>
            <slot name="text"></slot>
            <slot name="artists"></slot>
            <slot name="play"></slot>
            
            <slot name="countbox">
                    <slot name="count"></slot>
            </slot>

            <!--歌單的需求...左下角的user id-->
            <slot name="user"></slot>
         </div>
         <!--這里外層有個div...的...有BUG則加....-->
</template>

<script>
export default {
    name:'imgbox',
    props:['width','height','margin-right'],
    
}
</script>

<style>
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
   #recommend h2
   {
       font-size: 21px;
       
   }
   #recommend h2:hover
   {
      color: black;
   }
   #recommend h2 i
   {
       font-size: 17px;
       color: #4C4C4C;
   }
   #recommend div
   {
       cursor: pointer;
   }
   .recommend-box
   {
       background-color: aqua;
       width: 140px;
       position: relative;
       height: 140px;
       border-radius: 5px;
       float: left;
       margin-right: 18px;
       margin-bottom: 70px;
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
   .recommend-text
   {
       bottom: -50px;
       font-size: 14px;
       height: 40px;
       width: 128px;
   }
   .recommend-box-play
   {
       width: 36px;
       height: 36px;
       border-radius: 50%;
       position: absolute;
       right:  10px;
       bottom: 10px;
       transition: all 0.4s;
        
       text-align: center;
       line-height: 36px;
   }
   .recommend-box:hover .recommend-box-play
   {
      background-color: #F0EFEF;
   }
   .recommend-box-play i
   {
      font-size: 13px;
      color: rgba(0, 0, 0, 0);
   }
   .recommend-box:hover  .recommend-box-play i
   {
       color: #DF3F40;
   }
   .click-count
   {
       position: absolute;
       right: 0px;
       width: 55px;
       font-size: 10px;   
       color: #ffffff;
       top: 10px;
   }
   .recommend-box img
   {
       width: 100%;
       height: 100%;
       border-radius: 8px;
   }
   .recommend-box
   {
       background-color: #D1D4D2;
   }
   .onece-count
   {
       width: 50px;
   }
   .user
   {
       position: absolute;
       width: 140px;
       height: 20px;
       left: 5px;
       bottom: 0px;
       color: #FFFFFF;
       cursor: pointer;
       
   }
   .user span
   {
       font-size: 12px;
    }
</style>