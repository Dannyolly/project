<template>

      <div class="list">
                 <slot name="index"></slot>
                 <slot name="list-icon"></slot>
                 <slot name="list-songname"></slot>
                 <slot name="list-text"></slot>
                 
       </div>
</template>

<script>
export default {
    name:'list'
}
</script>

<style>
    .ranking-list
     {
         float: left;
         width: 550px;
         height: 200px;
         margin-bottom: 42px;
     }
     .ranking-list .list
     {
         width: 100%;
         height: 35px;
         border-radius: 5px;
     }
     .ranking-list .list:nth-child(2n+1)
     {
         background-color: #F9F9F9;
     }
     .ranking-list .list .index
     {
         line-height: 30px;
         margin-right: 12px;
     }
     .ranking-list .list .list-icon
     {
         line-height: 10px;
         margin-right: 15px;
         color: #9B9B9B;
     }
     .ranking-list .list .list-songname
     {
        font-size: 13.5px;
        color: #363636;
     }
     .firstthird
     {
         color:#EE4141;
     }
     .ranking-list .list .list-text
     {
         color: #9B9B9B;
         font-size: 13px;

     }
     .watchall
     {
         font-size: 13px;
         line-height: 30px;
         color: #676767;
         padding-left:4px;
         cursor: pointer;
     }
     .watchall:hover
     {
         color: black;
     }
</style>