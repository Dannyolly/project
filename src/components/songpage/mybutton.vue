<template>
    <div class="mybutton">
        <slot name="left"></slot>

        <slot name="right"></slot>
        <div class="mybutton-line"></div>
    </div>
</template>

<script>
export default {
    name:'mybutton'
}
</script>

<style>
     .mybutton
     {
         width: 150px;
         height: 35px;
         border-radius: 20px;
         background-color: #EC4141;
         position: relative;
         float: left;
         margin-right: 10px;
     }
     .left-part
     {
         width: 115px;
         height: 100%;
         border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
          float: left;
          cursor: pointer;
          text-align: center;
          align-content: center;
          vertical-align:middle;
     }
     .left-part i
     {
       
         color: #FFFFFF;
         font-size: 13px;
           line-height: 35px;
           position: absolute;
           left: 20px;
     }
     .left-part span
     {
         display: inline-block;
           line-height: 35px;
           left: 35px;
           top: 0px;
           color: #FFFFFF;
           font-size: 15px;
           position: absolute;
     }
     .mybutton-line
     {
         position: absolute;
         width: 1px;
         height: 35px;
         background-color: #ED5353;
         left: 114px;
         top: 0px;
     }
     .right-part
     {
         width: 35px;
         height: 100%;
         border-top-right-radius: 20px;
         border-bottom-right-radius: 20px;
         float: left;
         cursor: pointer;
         text-align: center;
         line-height: 35px;
         color: #FFFFFF;
         font-size: 15px;
         font-weight: 100;
     }
     .left-part:hover
     {
         background-color: #D73535;
     }
     .right-part:hover
     {
         background-color: #CC3232;
     }
</style>