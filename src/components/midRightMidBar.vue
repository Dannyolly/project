
<template>
    <div id="mid-right-mid-bar">
        <banner></banner>
        <!--3.推薦歌單....>-->
        <recommend></recommend>
        <pushing></pushing>
        <new-music></new-music>
        <recommend-mv></recommend-mv>
        
    </div>
</template>

<script>
/**
 * 重構....
 * mid-right-mid-bar 改為 mid-right-(left)-bar
 * 此版因要滾動...所以要與top-bar 分離.....
 * 其實就是重設高度...把推薦音樂之類全放入這里.....
 * 只留選項條在mid-right-bar---(top-bar)....
 */
import Banner from './Banner'
import Pushing from './MidRightBarStuff/Pushing.vue'
import Recommend from './MidRightBarStuff/Recommend.vue'
import NewMusic from './NewMusic'
import RecommendMv from './MidRightBarStuff/RecommendMv.vue'
import Streamer from './streamer.vue'
export default {
    name:'midRightMidBar',
    components:{
       //輪播圖...
       Banner,
       Recommend,
       Pushing,
       NewMusic,
       RecommendMv,
      
    },
    data() {
        return {
            index:'1',      
        }
    },
    mounted() {
        
    },
    methods: {
        sendindex:function()
        {
            this.$emit('receiveindex',this.index);
        }
    },
}
</script>

<style>
    #mid-right-mid-bar
    {
      width: 799px;
      height: 462px;
      padding-left: 20px;
      position: absolute;
      top:80px;
      overflow: scroll;
    }
    ::-webkit-scrollbar
        {
            display: none;
        }
</style>