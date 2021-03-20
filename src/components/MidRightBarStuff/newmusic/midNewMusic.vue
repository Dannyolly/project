<template>
    <div id="mid-new-music">
       <!--選分頁-->
       <div class="button-container">
            <div class="circle-container">
                <div class="leftright-container">
                  <div :class="{acctive:num===1}" @click="turnIn('new1',1)" class="left">新歌速遞</div>
                  <div :class="{acctive:num===2}"  @click="turnIn('new2',2)" class="right">新碟上架</div>
                </div>
            </div>
       </div>

       <router-view @getonesong="getonesong" @getallsong="getallsong">
       </router-view>
    </div>
</template>

<script>
import New1 from './publish/new1.vue'
import New2 from './update/new2.vue'
export default {
    name:'newmusic',
    components:{
        New2,
        New1,
    },
    data() {
        return {
            num:1,
        }
    },
    methods: {
        // 進入new1 or new2
        //統一接口....getSongUrl()
        getallsong:function(arr,num)
        {
              
              this.$emit('getallsong',arr,num);
        },
        getonesong:function(arr)
        {
         //console.log('o');
         this.$emit('getonesong',arr);
        },
        turnIn:function(str,num)
        {
            this.$router.push('/home/firstPage/midNewMusic/'+str);
            this.num=num;
        },
    },
}
</script>

<style>
    #mid-new-music
    {
        width: 789px;
        height: 484px;
        padding-left:30px;
        position: relative;
        overflow: scroll;
    }
    .button-container
    {
        width: 100%;
        padding-top: 20px;
        height: 60px;
        position: relative;
        z-index: 10;
    }
    .button-container .circle-container
    {
        width: 235px;
        height: 30px;
        position: absolute;
        border: 1px solid #BBBBBB;
        border-radius: 20px;
        left: 257px;
        align-items: center;
    }
    .leftright-container
    {
        position: relative;
    }
    .leftright-container .left
    {
        width: 117.5px;
        height: 30px;
        border-radius: 20px;
        float: left;
        cursor: pointer;
        position: absolute;
        top: -0.2px;
        font-size: 13px;
        text-align: center;
        line-height: 32px;
    }
    .leftright-container .right
    {
        width: 117.5px;
        height: 30px;
        border-radius: 20px;
        float: left;
        cursor: pointer;
        position: absolute;
        top: -0.2px;
        left: 117.5px;
        font-size: 13px;
        text-align: center;
        line-height: 32px;
    }
    .acctive
    {
        background-color: #BBBBBB;
        color: #FFFFFF;
        
    }
    .leftright-container div:hover
    {
         background-color: #F4F4F4;
    }
    .leftright-container .acctive:hover
    {
        background-color: #BBBBBB;
    }
</style>