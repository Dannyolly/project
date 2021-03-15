<template>
    <div id="music-box">
        <a href="#">
        <div class="icon">
            <slot name="img">

            </slot>
            <div class="music-box-play-box">
               <i class="fas fa-play"></i>
            </div>
        </div>
        </a>
        <div class="music-box-content">

            <slot name="title"></slot>
            <div class="container">
              
                    <slot name="mv"></slot>
            
                
                <slot name="star-name"></slot>
            </div>
   
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style>
    .music-box-content .container
    {
        float: left;
        width: 140px;
        height: 40px;
    }
    .mv-box img
    {
        width: 100%;
        height: 100%;
    }
    .music-box-content .mv-box
    {
        width:  24px;
        height: 12px;
        padding-left: 3px;
        float: left;
        border-radius: 3px;
        border:3px #EC4141;
    }
   .star-name
   {
       padding-left: 4px;
       font-size: 11.5px;
       color: #9F9F9F;
   }
   #music-box
   {
       width: 250px;
       height: 50px;
       border-radius: 5px;
       float: left;
       margin-right: 10px;
       margin-bottom: 12px;
   }
   .icon h2
   {
       font-size: 14px;
   }
   .icon
   {
       width: 50px;
       height: 50px;
       float: left;
       border-radius: 5px;
       background-color: aliceblue;
       position: relative;
       
      
   }
   .music-box-content
   {
       width: 185px;
       height: 50px;
        border-radius: 0px 5px 5px 0px;
     
       padding-left: 5px;

   }
   .music-box-content:hover
   {
       background-color: #EAEAEA;
   }
   .music-box-content .title
   {
       font-size: 13px;
   }
   .icon img
   {
       width: 100%;
       height: 100%;
       border-radius: 5px;
   }
   .music-box-play-box
    {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        position:absolute;
        background-color: #E9E9EB;
        left: 13px;
        top: 10px;
        text-align: center;
        line-height:22px;
    }
    .music-box-play-box i
    {
        color:#EC4141 ;
        font-size: 11px;
    }
    .star-name:hover
    {
        color: #5F5F5F;
    }
    .star-name
    {
       width: 70px;
       height: 40px;
       float: left;
    }
</style>