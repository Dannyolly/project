<template>
    <div class="midleftvideo">
        <el-menu
       class="el-menu-demo"
       mode="horizontal"
       active-text-color="#EC4141"
       :default-active="activeIndex"
      >
      <!--dafault-active...是默認值...-->
        <el-menu-item  @click="goto('myvideo')" index="1">
            視頻
        </el-menu-item>
        <el-menu-item  @click="goto('mv')" index="2">
            MV
        </el-menu-item>
    </el-menu>

        <router-view></router-view>
    </div>
</template>

<script>
import midleftmv from './MV/midleftmv'
import myvideo from './video1/myvideo'
export default {
    name:'midleftvideo',
    data() {
        return {
            activeIndex:'1',
        }
    },
    methods: {
        goto:function(str)
        {
           this.$router.push(str);
        }
    },
    components:{
        midleftmv,
        myvideo,
    }
      
}
</script>

<style>
    .midleftvideo
    {
       width: 799px;
       height: 541px;
       padding-left: 20px;
       float: left;
       position: relative;
    }
    .is-active
    {
        font-weight: bolder;
    }
</style>