<template>
    <div id="best-box">
        <div class="best-box-icon">
           <slot name="img">

           </slot>
        </div>
        <div class="best-box-text">
          
             <slot name="best-box-information">
                 
             </slot>
             <slot name="contries"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'bestBox',
    components:{

    }
}
</script>

<style>
     #best-box
     {
         width: 368px;
         height: 80px;
         border-radius: 7px;
         cursor: pointer;
         position: relative;
         float: left;
         margin-right: 25px;
     }
     #best-box .best-box-icon
     {
         width: 86px;
         height: 100%;
         border-radius: 7px 0px 0px 7px;
         background-color: antiquewhite;
         float: left;
     }
     .best-box-icon img
     {
         width: 100%;
         height: 100%;
         border-radius: 7px 0px 0px 7px;
     }
     .best-box-text
     {
         width: 271.8px;
         height: 80px;
         border-radius: 0px 7px 7px 0px;
         background-color: #F4F4F4;
         float: left;
         line-height: 80px;
         padding-left: 10px;
     }
     .best-box-information
     {
       font-size: 15.5px;
       height: 80px;
       display: inline-block;
     }
     .best-box-information span
     {
         color: #989898;
         display: inline-block;
     }
     .best-box-information i
     {
         padding-left: 35px;
         font-size: 18px;
         color: #989898;
     }
     .best-box-right
     {
         position: absolute;
         top: 0px;
         right: 10px;
     }
</style>