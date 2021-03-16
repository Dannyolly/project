<template>
    <div id="songlist">
        <listbox v-for="item in songlistarr" :key="item.id">
             <img slot="img" :src="item.coverImgUrl" alt="">
             <div slot="name" class="listbox-text">
                 <span>{{item.name}}</span>
             </div>
            <span slot="cname"></span>
            <span slot="ename">{{String(item.trackCount)+'首'}}</span>

             <span slot="by">by</span>
             <span slot="creater" class="creator">{{item.creator.nickname}}</span>
        </listbox>
    </div>
</template>


<script>
const axios = require("axios");
import Listbox from '../singer/listbox.vue'
export default {
    name:'album',
    data() {
        return {
            songlistarr:[],
            playCount:0,
        }
    },
     //      歌手(obj) 專輯(obj) str(別名) 歌列單(array)
     //      當前li(number)  搜索的關鍵字..
  props: ["artist", "album", "str", "allList", "thisIndex","searchstr"],
    components:{
        Listbox
     
    },
      mounted() {
      this.getinfo();
  },
  watch:{
     songlistarr:function()
     {
         this.saveCount();
     }
  },
      methods: {
      getinfo:function()
      {
        var that=this
        this.$axios.get('http://localhost:3000/cloudsearch?keywords='+that.searchstr+"&type=1000")
        .then((result) => { 
            //console.log(result.data.result.albums[0].artist.alias[0]);
            //console.log(result.data.result.albums[0].artist.name);
            that.playCount=result.data.result.playlistCount;
            that.songlistarr=result.data.result.playlists;
            console.log(that.songlistarr);
        }).catch((err) => {
            
        });
      },
       saveCount:function()
      {
           this.$emit('receiveCount',this.playCount+'個歌單')
      },
  },
}
</script>

<style>
    #songlist{
         width: 799px;
         height: 83px;
         position: relative;
         cursor: pointer;
    }
    .creator{
        font-size: 13px;
    }
</style>