<template>
    <div id="mid-left-bar">
        <div class="mid-left-bar-head">
            <ul>
                <li @click="goto('firstPage/midRightMidBar')"><h4>發現音樂</h4></li>
                <li @click="goto('video')">視頻</li>
                <li>朋友</li>
                <li>直播</li>
                <li>私人FM</li>
            </ul>
        </div>
        <div class="mid-left-bar-body">
            <h5>
                我的音樂
            </h5>
            <div class="choose">

                <i class="fas fa-music"></i>
                <span></span>
                <span>本地音樂</span>
            </div>
            <div class="choose">
                <i class="far fa-arrow-alt-circle-down"></i>
                <span></span>
                <span>下載管理</span>
            </div>
        </div>
        <div class="mid-left-bar-bottom">
           <div class="my-song-list">
             <div class="h5">
                 創建的歌單
                 <!-- down....-->
              <i @click="openBuildSongList" 
                 v-if="!isBuildSongList"
              class="fas fa-caret-right"></i>

              <i @click="openBuildSongList" 
                 v-else
              class="fas fa-caret-down"></i>
             </div>

             <div class="plus">
                 +
             </div>
             <!--歌單...-->

             <ul v-if="isBuildSongList==true" >
                <li>
                     <i class="far fa-heart"></i>
                     我喜愛的音樂
                </li>
             </ul>
           </div>
        </div>

    </div>
</template>
<script>
export default {
   name:'danny',
   data() {
       return {
          isBuildSongList:false,
          //換標號.....創建歌單的按鉡...
          buildarr:['fas fa-caret-right','fas fa-caret-right']
       }
   },
   methods: {
        goto:function(str)
        {
          console.log(str);
          this.$router.push('/home/'+str);
        },
        openBuildSongList:function()
        {
            if(this.isBuildSongList==false)
            {
                this.isBuildSongList=true;
            }
            else
            {
               this.isBuildSongList=false;
            }
            console.log(this.isBuildSongList);
        }
   },

}
</script>

<style>
 /*
 *引入樣式......
 */
 @import "../../assets/css/midleftbar.css";
  #mid-left-bar{
      float: left;
  }
</style>
