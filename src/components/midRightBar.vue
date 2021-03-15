<template>
    <div id="midRightBar">
       <mid-right-top-bar></mid-right-top-bar>
        <!--輪播圖的開始....-->

        <router-view @getSongUrl="getSongUrl" @receiveindex="getindex">

        </router-view>
    </div>
</template>

<script>

/**
 * 這應該是首頁的面版...(應該說為組件....)
 * 大概分配為以下幾列組件.....(順序排....)
 * 1.title-----首頁的選擇-----對應的是(個性推薦)
 * ----個性推薦----歌單-----主播電台----排行榜----歌手----最新音樂...
 * 2.Banner----輪播圖
 * 3.推薦歌單....>
 * 口 口 口 口
 * 口 口 口 口...
 * .......
 * midright吧也暫時不用????
 */
import MidRightMidBar from './midRightMidBar.vue'
import midRightTopBar from './midRightTopBar'
import MidRightTopBar from './midRightTopBar.vue'
export default {
    name:'midRightBar',
    data() {
        return {
            index:'1',
        }
    },
    components:{
        MidRightMidBar,
        MidRightTopBar,
    },
    methods: {
      getSongUrl:function(url)
        {
           console.log('receive1:'+url);
           this.$emit('getsongurl',url);
        },
        getindex:function(index)
        {
            console.log(index);
            this.index=index;
        }
    },
}
</script>

<style>
    #midRightBar{
        float:left;
        width: 819px;
        height: 481px;
        position: relative;
        
    }
</style>