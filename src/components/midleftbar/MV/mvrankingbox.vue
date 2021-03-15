<template>
    <div class="rankingbox">
        <div class="leftindex">
            <slot name="index"></slot>
        </div>

        <div class="imgbox">
       
            <slot name="img"></slot>
        </div>
        <div class="right-text">
        <slot name="h4"></slot>
        <slot name="span"></slot>
        </div>

    </div>
</template>

<script>
export default {
   name:'rankingbox'    
}
</script>

<style>
     .rankingbox
     {
         width: 380px;
         height: 90px;
         position: relative;
         padding-bottom: 30px;
         border-bottom: 1px solid #F3F3F3;
         border-right: 1px solid #F3F3F3;
         float: left;
         margin-bottom: 20px;
         margin-right: 5px;
     }
     .rankingbox:nth-child(2n)
     {
         border-right: 0px;
     }
     .leftindex
     {
        width: 40px;
        height: 100%;
        position: relative;
        float: left;
     }
     .leftindex span
     {
       font-size: 23px;
       color: #9F9F9F;
       position: absolute;
       top: 30px;
       
     }
     .imgbox
     {
         height: 100%;
         width: 180px;
         float: left;
         margin-right: 0px;
     }
     .imgbox img
     {
         width: 100%;
         border-radius: 8px;

     }
     .right-text
     {
         width: 160px;
         height: 100%;
         float: left;
         position: relative;
     }
     .right-text h4
     {
         padding-top: 5px;
         margin-bottom: 10px;
         font-size: 14px;
         color: #373737;
         padding-left: 10px;
     }
     .right-text span
     {
         margin-left: 0px;
         font-size: 13px;
         color: #676767;
            padding-left: 10px;
     }
     
</style>