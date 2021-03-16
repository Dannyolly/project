<template>
    <div class="mybutton1">
        <div class="left-part">
            <slot name="icon"></slot>
            <slot name="text"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:'mybutton1'
}
</script>

<style>
     .mybutton1
     {
         width: 105px;
         height: 35px;
         border-radius: 20px;
         border:1px solid #D8D8D8;
         position: relative;
         float: left;
         margin-right: 10px;
     }
     .mybutton1 .left-part
     {
         width: 100%;
         height: 100%;
        border-radius: 20px;
          float: left;
          cursor: pointer;
          text-align: center;
          align-content: center;
          vertical-align:middle;
     }
     .mybutton1 .left-part i
     {
       
          color: #373737;
           font-size: 15px;
           line-height: 35px;
           position: absolute;
           left: 15px;
            top: 2px;
     }
     .mybutton1 .left-part span
     {
         display: inline-block;
           line-height: 35px;
           left: 30px;
           top: 2px;
           color: #373737;
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
     .mybutton1 .left-part:hover
     {
         background-color: #F2F2F2;
     }
   
</style>