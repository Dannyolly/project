<template>
    <div class="rankingbox">
        <div class="ranking-pic">
            <slot name="img"></slot>
        </div>
  
    </div>
</template>
<script>
import list from './list.vue'
export default {
  components: { list },
    name:'rankingbox',
    props:['top5arr','top5obj1','top5obj2','top5obj3','top5obj4']
}
</script>

<style>
     .rankingbox
     {
        width: 175px;
        height: 240px;
        position:relative;
     }
     .ranking-pic
     {
         width: 175px;
         height: 175px;
         border-radius: 8px;
         margin-right: 27px;
         float: left;
     }
     .ranking-pic img
     {
         width: 100%;
         height: 100%;
         border-radius: 8px;
     }
     
</style>