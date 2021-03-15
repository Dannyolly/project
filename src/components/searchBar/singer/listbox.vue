<template>
    <div id="listbox" :style="{width:width+'px',height:height+'px'}">
        <slot name="index"></slot>
        <div class="listbox-imgbox">
             <slot name="img"></slot>
           
        </div>
            <slot name="icon"></slot>
             <slot name="name"></slot>
             <!-- -->
         <div class="listbox-name">
            <slot name="cname"></slot>
            <slot name="ename"></slot>
         </div>
         <div class="bywhat">
          <slot name="by"></slot>
          <slot name="creater"></slot>
         </div>
    </div>
</template>
<script>
export default {
    name:'listbox',
    props:['width','height']
}
</script>
<style>
     .bywhat{
      position: absolute;
      width: 200px;
      height: 83px;
      right: 50px;
      line-height: 83px;

     }
     .bywhat span:nth-child(1)
     {
         color: #969697;
         font-size: 12px;
     }
     .bywhat span:nth-child(2)
     {
         color: #616162;
         cursor: pointer;
     }
     .bywhat span:nth-child(2):hover
     {
         color: black;
     }
     #listbox{
         width: 819px;
         height: 83px;
         position:relative;
     }
     .listbox-text span:nth-child(1)
     {
         font-size: 14px;
     }
     .listbox-text span:nth-child(2){
         color: #969697;
     }
     .listbox-imgbox img
     {
         width: 100%;
         height: 100%;
         border-radius: 5px;
     }
     .listbox-imgbox{
         width: 64px;
         height: 64px;
         border-radius: 5px;
         margin-left: 30px;
         position: absolute;
         top:9.5px;
     }
     .listbox-text
     {
         width: 310px;
         height: 83px;
         line-height: 83px;
         left: 100px;
         position: absolute;
     }
     #listbox:nth-child(2n)
     {
         background-color: #F9F9F9;
     }
     #listbox:hover
     {
         background-color: #F0F1F2;
     }
     .listbox-name{
         width: 300px;
         height: 83px;
         position: absolute;
         left: 410px;
         line-height: 83px;
         font-size: 14px;
     }
     .listbox-name span:nth-child(2){
          color: #969697;
     }
     .index{
         position:absolute;
         top: 38%;
         color: #CACACA;
     }
</style>