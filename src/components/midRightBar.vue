<template>
    <div id="midRightBar">
       <mid-right-top-bar></mid-right-top-bar>
        
        <!--輪播圖的開始....-->
        <!--
            1-getSongUrl....就是忘了fk

            2-sendmusic.....是最新音樂傳上來的....

            3.getonesong----統一接口.....

            4.getallsong----統一接口.....
        -->
        <keep-alive>
           <router-view 
           
           @getSongUrl="getSongUrl"
           
           @receiveindex="getindex"

           @sendmusic="sendmusic"

           @getonesong="getonesong"

           @getallsong="getallsong"

           >
           </router-view>
        </keep-alive>
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
       /**------------------------------------------------------- */
        /**
         * 這里是從newmusic推薦音樂組件傳上來的值...還要傳多兩次...
         * 統一getonesong
         * 
         */
        getonesong:function(obj)
        {
            
            this.$emit('getonesong',obj);
        },
        getallsong:function(arr,num)
        {
            //console.log('2');
            this.$emit('getallsong',arr,num);
        },
        /**------------------------------------------------------- */

        /**--------------------------------------------------------- */
        /**
         * getsongurl這個是最新歌單發來的....
         */
       getSongUrl:function(url)
        {
           //console.log('receive1:'+url);
           this.$emit('getsongurl',url);
        },
        getindex:function(index)
        {
            console.log(index);
            this.index=index;
        },
        sendmusic:function(obj)
        {
            this.$emit('sendmusic',obj);
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