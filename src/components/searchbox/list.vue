<template>
    <div class="list">
        
        <slot name="num"></slot>
        <div class="list-right-bar">
          
            <slot name="name"></slot>
            <slot name="type"></slot>

            <slot name="playCount"></slot>
            <slot name="content"></slot>
   
        </div>
    </div>
</template>

<script>
export default {
    name:'list'
}
</script>
<style>
     .list
     {
         width: 100%;
         height: 60px;

         position: relative;
         cursor: pointer;
     }
     .list:hover
     {
         background-color: #F2F2F2;
     }
     .list-left-bar
     {
         width: 50px;
         height: 100%;
         line-height: 60px;
         text-align: center;
         font-size: 18px;
         float: left;
     }
     .list-right-bar
     {
         width: 300px;
         height: 40px;
         padding: 10px 0px;
     }
     .list-right-bar h4
     {
         font-size: 14px;
         color: #333333;
         width: auto;
         display: inline-block;
     }
     .list-right-bar span
     {
         font-style:italic;
         font-size: 12px;
         margin-right: 5px;
         display: inline-block;
     }
     .list-right-bar .HOT
     {
        width: 20px;
        padding-top: 10px;
        height: 14px;
     }
     .HOT img
     {
         width: 100%;
         height: 100%;
     }
     .list-right-bar .new
     {
         color: #29B829;
     }
     .list-right-bar span:nth-child(3)
     {
         color: #CCCCCC;
     }
     .list-right-bar .content
     {
         font-size: 13px;
         color: #999999;
     }
</style>