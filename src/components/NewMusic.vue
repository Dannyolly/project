<template>
    <div id="new-music-box">
        <title-box>
            <h2 slot="content">
                最新音樂
                <i class="fas fa-chevron-right" slot="text"></i>
            </h2>
        </title-box>
        <musicbox v-for="(item,index) in NewMusicArr" :key="item.duration">

            
            <img @click="sendmusic(index)"  slot="img" :src="item.album.blurPicUrl" alt="">
            
            <span class="title" slot="title">

                {{item.name}}
            </span>
              <div slot="mv" v-if="item.mvid!=0" class="mv-box">

                <!--Mv按鈕..............-->
                  <img  src="../assets/img/mv.png" alt="">
           
              </div>
            <div  class="star-name" slot="star-name">{{item.artists[0].name}}</div>
        </musicbox>
        
    </div>
</template>

<script>
import axios from 'axios';
import TitleBox from './titleBox.vue';
import Musicbox from './musicbox.vue';
export default {
    name:'NewMusic',
    components:{
        TitleBox,
        Musicbox,
    },
    data(){
       return{
           NewMusicArr:[],
           NewMusicArtistsArr:[],
           num:12,
           Key:'',
       }
    },
    mounted() {
        this.getNewMusicPic();
    },
    methods: {
        /**------------------------------------------------------------------ */
        sendmusic:function(index)
        {

           this.$emit('sendmusic',this.NewMusicArr[index]);
        },
        /**------------------------------------------------------------------ */
        getNewMusicPic: function()
        {
            /**
             * mvid....直接路由傳值.....
             * song....直接父傳值吧....shit...
             */
            var that=this
            this.$axios.get("http://localhost:3000/top/song?type=0")
            .then((result)=>{
                 that.NewMusicArr=result.data.data;
                 //that.NewMusicArtistsArr=result.album[].artists;
                 that.NewMusicArr.length=that.num;
                 //console.log(that.NewMusicArr)
            }).catch((error)=>{

            })
            //that.setArrNum(that.num,that.NewMusicArr);
            //console.log(that.NewMusicArr);

        },
    },
}
</script>

<style>
    #new-music-box
    {
        width: 799px;
        height: 315px;
      
    }
</style>