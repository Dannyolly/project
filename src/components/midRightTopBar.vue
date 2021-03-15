<template>
  <div id="mid-right-top-bar">
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      active-text-color="#EC4141"
      :default-active="activeIndex"
      >
      <!--dafault-active...是默認值...-->
        <el-menu-item  @click="goto('midRightMidBar')" index="1">
            個性推薦
        </el-menu-item>
        <el-menu-item  @click="goto('midSongList')" index="2">
            歌單
        </el-menu-item>
        <el-menu-item  @click="goto('ranking')" index="3">
            排行榜
        </el-menu-item>
        <el-menu-item  @click="goto('midSinger')" index="4">歌手</el-menu-item>
        <el-menu-item  @click="goto('midNewMusic')" index="5">最新音樂</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
/**
 * 0.8333
 */
export default {
  name: "midRightTopBar",
  data() {
    return {
      activeIndex:'1',
      lastpath:'/home/firstPage/midRightMidBar',
    }
  },
  methods: {
    /**
     * goto(str)  轉去其它路由....
     */
      goto:function(str) 
       {
         /**
          *  this.$route為上此的路徑....
          */
         
         //this.$route.path=this.lastpath;
         //此時為跳轉.....
         this.$router.push('/home/firstPage/'+str); 
         //console.log(this.$route.path);
         //this.lastpath=this.$route.path;
         //console.log(this.lastpath);
         //this.$router
       }
  },
};
</script>

<style>
a
{
    text-decoration: none;
}
#mid-right-top-bar {
  width:799px;
  height: 60px;
  padding-left: 20px;
}
.el-menu-item
{
  padding:0 18px;
}
.el-menu-item.is-active
{
    
    font-size: 18px;
}
</style>