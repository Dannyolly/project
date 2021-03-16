<template>
    <div id="album">
        <listbox v-for="item in albumarr" :key="item.trackCount">
             <img slot="img" :src="item.blurPicUrl" alt="">
             <div slot="name" class="listbox-text">
                 <span>{{item.name}}</span>
                 <span v-if="item.alias">({{item.alias[0]}})</span>
             </div>
            <span slot="cname">{{item.artist.name}}</span>
            <span slot="ename">({{item.artist.alias[0]}})</span>
              
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
            albumarr:[],
            albumCount:'',
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
       albumarr:function()
       {
           this.saveCount();
       }
   },
      methods: {
      getinfo:function()
      {
        var that=this
        this.$axios.get('http://localhost:3000/cloudsearch?keywords='+that.searchstr+"&type=10")
        .then((result) => { 
            //console.log(result.data.result.albums[0].artist.alias[0]);
            //console.log(result.data.result.albums[0].artist.name);
           that.albumarr=result.data.result.albums;
           //console.log(result.data.result.albumCount);
           that.albumCount=result.data.result.albumCount;
        }).catch((err) => {
            
        });
      },
        saveCount:function()
        {
          //console.log(this.singerCount);
          this.$emit('receiveCount',this.albumCount+'張專輯')
          //console.log(this.singerCount+'位歌手');
        }
  },
}
</script>

<style>
    #album{
         width: 799px;
         height: 83px;
         position: relative;
    }
</style>