<template>
    <div id="video-box-big">
        <div class="video-box">
           <slot name="clickcount"></slot>

           <slot name="video">
              
           </slot>
           <!--

            <div class="play-box">
                <i class="fas fa-play"></i>
            </div> 

            -->
         
           <slot name="playbox"></slot>
        </div>
        <slot name="h4"></slot>
        <slot name="text" class="video-box-text">

        </slot>
    </div>
</template>

<script>
export default {
    name:'VideoBox',
    
}
</script>

<style>
     #video-box-big
     {
         height: 181.1px;
         float: left;
     }
     .play-box i
     {
         font-size: 12px;
     }
     .video-box
     {
         width: 239px;
         height: 141.1px;
         border-radius: 8px;
         margin-right: 18px;
         position: relative;
         background-color:bisque;
     }
     .video-box .play-box
     {
         background-color: rgba(0, 0, 0, 0.3);
         width: 20px;
         height: 20px;
         position: absolute;
         border-radius: 50%;
         top:10px;
         left: 10px;
         font-size: 8px;
         text-align: center;
         line-height: 20px;
         color: #ffffff;
     }

     .video-box-text
     {
         color:#373737;
         width: 230px;
         height: 40px;
         display: inline-block;
         margin-left: 0px;
         margin-top: 5px;
         font-size: 14px;
     }
     .video-box img
     {
         max-width: 100%;
         height: 100%;
         border-radius: 8px;
     }
</style>