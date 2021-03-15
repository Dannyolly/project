<template>
    <div  class="ownplaylist">
        <!--播放的狀態....-->
        <slot name="play"></slot>
        <div class="left-name">
            <slot name="songname"></slot>
        </div>
        <div class="own-artist">
            <slot name="own-name"></slot>
        </div>
        <div class="link">
            <i class="fas fa-link"></i>
        </div>
    </div>
</template>

<script>
export default {
    name:'ownplaylist',
    props:['isplay',],
    data() {
        return {
            playing:false,
        }
    },
}
</script>

<style>
     #songname
     {
         display: inline-block;
         width: 150px;
     }
     .own-play
     {
         position: absolute;
         font-size: 13px;
         color: #EC4141;
         left: -5px;
         top: 8px;
         margin-right: 10px;
     }
     .ownplaylist
     {
         width: 400px;
         height: 30px;
         position: relative;
     }
     .ownplaylist:hover
     {
         background-color: #F4F5F5;
     }
     .ownplaylist:nth-child(2n)
     {
         background-color: #FAFAFA;
     }
     .ownplaylist .left-name
     {
         line-height: 30px;
         font-size: 13px;
         width: 200px;
         float: left;
         padding-left: 10px;
     }
     .left-name span
     {
         color: #000000;
         cursor: pointer;
     }
     .ownplaylist .own-artist span:hover
     {
          color: #000000;
     } 
     .ownplaylist .own-artist span
     {
            cursor: pointer;
     }
     .ownplaylist .own-artist
     {
          line-height: 30px;
         font-size: 13px;
         width: 100px;
         color: #666666;
         float: left;
     }
     .ownplaylist .link i
     {
          line-height: 28px;
         font-size: 13px;
         color: #666666;
         cursor: pointer;
     }
     .playing span
     {
         color: #EC4141;
     }
     .playing i
     {
         color: #EC4141;
     }
     .playing .left-name span
     {
         color: #EC4141;
     }
</style>